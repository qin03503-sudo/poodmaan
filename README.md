# 🎙️ Podcast Platform - Fast Start

A complete podcast platform with database, backend API, frontend, and MinIO storage.

## Features

✅ **Main Page** - Podcast gallery with all podcasts
✅ **Podcast Page** - Individual podcast details with episode list
✅ **Episode Page** - Episode details with audio player
✅ **Audio Player** - Play/pause, seek, time tracking
✅ **Admin Panel** - Manage podcasts and episodes
✅ **File Upload** - Upload cover images and audio files to MinIO
✅ **Database** - PostgreSQL with optimized schema

## Architecture

```
poodmaan/
├── backend/          # Node.js/Express API
├── frontend/         # Next.js frontend
├── docker-compose.yml
└── README.md
```

## Quick Start with Docker

The fastest way to get everything running:

```bash
# Install dependencies (optional, Docker will handle it)
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# Start all services
docker-compose up
```

This will start:
- **PostgreSQL** on `localhost:5432`
- **MinIO** on `localhost:9000` (UI: `localhost:9001`)
- **Backend API** on `localhost:5000`
- **Frontend** on `localhost:3000`

## Manual Setup (Development)

### 1. Start Dependencies

```bash
# PostgreSQL
docker run -d --name podcast-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=podcast_db \
  -p 5432:5432 \
  postgres:15-alpine

# MinIO
docker run -d --name podcast-minio \
  -p 9000:9000 -p 9001:9001 \
  -e MINIO_ROOT_USER=minioadmin \
  -e MINIO_ROOT_PASSWORD=minioadmin \
  minio/minio server /data --console-address ":9001"
```

### 2. Start Backend

```bash
cd backend
npm install
npm run dev
```

Server runs on `http://localhost:5000`

### 3. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs on `http://localhost:3000`

## API Endpoints

### Podcasts
- `GET /api/podcasts` - Get all podcasts
- `GET /api/podcasts/:id` - Get podcast by ID
- `POST /api/podcasts` - Create podcast
- `PUT /api/podcasts/:id` - Update podcast
- `DELETE /api/podcasts/:id` - Delete podcast

### Episodes
- `GET /api/episodes/podcast/:podcastId` - Get episodes for podcast
- `GET /api/episodes/:id` - Get episode by ID
- `POST /api/episodes` - Create episode
- `PUT /api/episodes/:id` - Update episode
- `DELETE /api/episodes/:id` - Delete episode

### Upload
- `POST /api/upload/upload` - Upload file (image/audio)

## Pages

- `/` - Home page with podcast gallery
- `/podcast/:id` - Podcast details page
- `/episode/:id` - Episode player page
- `/admin` - Admin panel (create/manage podcasts and episodes)

## Admin Panel Features

- Create new podcasts with cover images
- Upload podcast cover images
- Create episodes for podcasts
- Upload episode audio files
- Delete podcasts and episodes
- View all podcasts and episodes

## MinIO Setup (First Time)

1. Go to `http://localhost:9001`
2. Login with `minioadmin` / `minioadmin`
3. The `podcast-storage` bucket will be created automatically

## Database Schema

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  role VARCHAR(50) DEFAULT 'listener',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Podcasts table
CREATE TABLE podcasts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  creator_id INTEGER REFERENCES users(id),
  cover_image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Episodes table
CREATE TABLE episodes (
  id SERIAL PRIMARY KEY,
  podcast_id INTEGER REFERENCES podcasts(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  audio_file_url VARCHAR(500) NOT NULL,
  duration_seconds INTEGER,
  episode_number INTEGER,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Follows table
CREATE TABLE follows (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  podcast_id INTEGER REFERENCES podcasts(id),
  UNIQUE(user_id, podcast_id)
);
```

## Environment Variables

### Backend (.env.local)
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=podcast_db
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=podcast-storage
API_PORT=5000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Development Tips

1. **Database queries** - Check `backend/src/controllers/` for database operations
2. **API routes** - Check `backend/src/routes/` for route definitions
3. **Frontend components** - Check `frontend/components/` for reusable components
4. **API client** - Check `frontend/lib/api.js` for API calls

## Troubleshooting

**MinIO connection error?**
- Make sure MinIO is running: `docker ps | grep minio`
- Check if port 9000 is available

**Database connection error?**
- Make sure PostgreSQL is running: `docker ps | grep postgres`
- Check credentials in `.env.local`

**Frontend can't reach API?**
- Make sure backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in frontend `.env.local`

## Next Steps

1. Add authentication (JWT)
2. Add user registration/login
3. Add follow/subscribe functionality
4. Add search and filtering
5. Add recommendations engine
6. Add analytics
7. Add payment processing (for premium features)

## License

MIT
