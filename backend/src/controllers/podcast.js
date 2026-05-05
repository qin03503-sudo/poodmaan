import pool from '../db.js';

export async function getPodcasts() {
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

export async function createPodcast(title, description, creatorId, coverImageUrl) {
  const result = await pool.query(`
    INSERT INTO podcasts (title, description, creator_id, cover_image_url)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `, [title, description, creatorId, coverImageUrl]);
  return result.rows[0];
}

export async function updatePodcast(id, title, description, coverImageUrl) {
  const result = await pool.query(`
    UPDATE podcasts
    SET title = $1, description = $2, cover_image_url = $3, updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *
  `, [title, description, coverImageUrl, id]);
  return result.rows[0];
}

export async function deletePodcast(id) {
  const result = await pool.query('DELETE FROM podcasts WHERE id = $1 RETURNING id', [id]);
  return result.rowCount > 0;
}
