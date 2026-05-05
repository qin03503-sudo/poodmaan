import pool from './db.js';

export async function initDb() {
  try {
    // Create tables
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
    console.log('✓ Database tables created');

    // Create default admin user if it doesn't exist
    try {
      const userCheck = await pool.query("SELECT id FROM users WHERE username = 'admin'");
      if (userCheck.rows.length === 0) {
        const result = await pool.query(
          "INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id",
          ['admin', 'admin@podcast.local', 'temp_hash', 'creator']
        );
        console.log(`✓ Default admin user created (id: ${result.rows[0].id})`);
      } else {
        console.log('✓ Admin user already exists');
      }
    } catch (userErr) {
      console.log('⚠ Could not create admin user (may already exist):', userErr.message.substring(0, 50));
    }

    console.log('✓ Database initialization complete');
  } catch (err) {
    console.error('✗ Database initialization error:', err.message);
    throw err;
  }
}
