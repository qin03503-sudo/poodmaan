import pool from '../db.js';

export async function createUser(username, email, passwordHash) {
  const result = await pool.query(`
    INSERT INTO users (username, email, password_hash, role)
    VALUES ($1, $2, $3, 'listener')
    RETURNING id, username, email, role
  `, [username, email, passwordHash]);
  return result.rows[0];
}

export async function getUserById(id) {
  const result = await pool.query(`
    SELECT id, username, email, role, created_at FROM users WHERE id = $1
  `, [id]);
  return result.rows[0];
}

export async function getUserByUsername(username) {
  const result = await pool.query(`
    SELECT * FROM users WHERE username = $1
  `, [username]);
  return result.rows[0];
}

export async function getUserByEmail(email) {
  const result = await pool.query(`
    SELECT * FROM users WHERE email = $1
  `, [email]);
  return result.rows[0];
}
