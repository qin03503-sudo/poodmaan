import pg from 'pg';
import { Client } from 'minio';

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'podcast_db',
});

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: Number(process.env.MINIO_PORT || 9000),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
});

let initPromise;

export function ensureInitialized() {
  if (!initPromise) {
    initPromise = Promise.all([initDb(), initMinIO()]);
  }

  return initPromise;
}

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255),
      role VARCHAR(50) DEFAULT 'listener',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS podcasts (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      creator_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      cover_image_url VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS episodes (
      id SERIAL PRIMARY KEY,
      podcast_id INTEGER NOT NULL REFERENCES podcasts(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      audio_file_url VARCHAR(500) NOT NULL,
      duration_seconds INTEGER,
      episode_number INTEGER,
      published_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS follows (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      podcast_id INTEGER NOT NULL REFERENCES podcasts(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, podcast_id)
    );
  `);

  const userCheck = await pool.query("SELECT id FROM users WHERE username = 'admin'");
  if (userCheck.rows.length === 0) {
    await pool.query(
      'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4)',
      ['admin', 'admin@podcast.local', 'temp_hash', 'creator']
    );
  }
}

async function initMinIO() {
  const bucketName = process.env.MINIO_BUCKET || 'podcast-storage';
  const exists = await minioClient.bucketExists(bucketName);

  if (!exists) {
    await minioClient.makeBucket(bucketName, 'us-east-1');
  }
}

export async function getPodcasts() {
  await ensureInitialized();
  const result = await pool.query(`
    SELECT p.*, u.username as creator_name,
      COUNT(DISTINCT f.id) as follower_count
    FROM podcasts p
    LEFT JOIN users u ON p.creator_id = u.id
    LEFT JOIN follows f ON p.id = f.podcast_id
    GROUP BY p.id, u.username
    ORDER BY p.created_at DESC
  `);
  return result.rows;
}

export async function getPodcastById(id) {
  await ensureInitialized();
  const result = await pool.query(`
    SELECT p.*, u.username as creator_name,
      COUNT(DISTINCT f.id) as follower_count
    FROM podcasts p
    LEFT JOIN users u ON p.creator_id = u.id
    LEFT JOIN follows f ON p.id = f.podcast_id
    WHERE p.id = $1
    GROUP BY p.id, u.username
  `, [id]);
  return result.rows[0];
}

export async function createPodcast({ title, description, creatorId, coverImageUrl }) {
  await ensureInitialized();
  const result = await pool.query(`
    INSERT INTO podcasts (title, description, creator_id, cover_image_url)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `, [title, description, creatorId, coverImageUrl]);
  return result.rows[0];
}

export async function updatePodcast(id, { title, description, coverImageUrl }) {
  await ensureInitialized();
  const result = await pool.query(`
    UPDATE podcasts
    SET title = $1, description = $2, cover_image_url = $3, updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *
  `, [title, description, coverImageUrl, id]);
  return result.rows[0];
}

export async function deletePodcast(id) {
  await ensureInitialized();
  const result = await pool.query('DELETE FROM podcasts WHERE id = $1 RETURNING id', [id]);
  return result.rowCount > 0;
}

export async function getEpisodes(podcastId) {
  await ensureInitialized();
  const result = await pool.query(`
    SELECT * FROM episodes
    WHERE podcast_id = $1
    ORDER BY episode_number DESC, published_at DESC
  `, [podcastId]);
  return result.rows;
}

export async function getEpisodeById(id) {
  await ensureInitialized();
  const result = await pool.query('SELECT * FROM episodes WHERE id = $1', [id]);
  return result.rows[0];
}

export async function createEpisode({ podcastId, title, description, audioFileUrl, durationSeconds, episodeNumber }) {
  await ensureInitialized();
  const result = await pool.query(`
    INSERT INTO episodes (podcast_id, title, description, audio_file_url, duration_seconds, episode_number, published_at)
    VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
    RETURNING *
  `, [podcastId, title, description, audioFileUrl, durationSeconds, episodeNumber]);
  return result.rows[0];
}

export async function updateEpisode(id, { title, description, durationSeconds }) {
  await ensureInitialized();
  const result = await pool.query(`
    UPDATE episodes
    SET title = $1, description = $2, duration_seconds = $3, updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *
  `, [title, description, durationSeconds, id]);
  return result.rows[0];
}

export async function deleteEpisode(id) {
  await ensureInitialized();
  const result = await pool.query('DELETE FROM episodes WHERE id = $1 RETURNING id', [id]);
  return result.rowCount > 0;
}

export async function uploadObject(file) {
  await ensureInitialized();
  const bucketName = process.env.MINIO_BUCKET || 'podcast-storage';
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${crypto.randomUUID()}-${file.name}`;

  await minioClient.putObject(bucketName, fileName, buffer, buffer.length, {
    'Content-Type': file.type,
  });

  const publicUrl = process.env.MINIO_PUBLIC_URL || 'http://localhost:9000';
  return {
    fileName,
    fileUrl: `${publicUrl}/${bucketName}/${fileName}`,
    size: buffer.length,
    mimetype: file.type,
  };
}
