import pool from '../db.js';

export async function getEpisodes(podcastId) {
  const result = await pool.query(`
    SELECT * FROM episodes
    WHERE podcast_id = $1
    ORDER BY episode_number DESC, published_at DESC
  `, [podcastId]);
  return result.rows;
}

export async function getEpisodeById(id) {
  const result = await pool.query(`
    SELECT * FROM episodes WHERE id = $1
  `, [id]);
  return result.rows[0];
}

export async function createEpisode(podcastId, title, description, audioFileUrl, durationSeconds, episodeNumber) {
  const result = await pool.query(`
    INSERT INTO episodes (podcast_id, title, description, audio_file_url, duration_seconds, episode_number, published_at)
    VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
    RETURNING *
  `, [podcastId, title, description, audioFileUrl, durationSeconds, episodeNumber]);
  return result.rows[0];
}

export async function updateEpisode(id, title, description, durationSeconds) {
  const result = await pool.query(`
    UPDATE episodes
    SET title = $1, description = $2, duration_seconds = $3, updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *
  `, [title, description, durationSeconds, id]);
  return result.rows[0];
}

export async function deleteEpisode(id) {
  const result = await pool.query('DELETE FROM episodes WHERE id = $1 RETURNING id', [id]);
  return result.rowCount > 0;
}
