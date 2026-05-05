# 🚀 Quick Start Guide

## One-Command Start (Recommended)

```bash
cd /mnt/hard/workspace/poodmaan
docker-compose up
```

Wait 30-60 seconds for services to initialize, then open:

- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Backend API**: http://localhost:5000/api/health
- **MinIO Console**: http://localhost:9001 (minioadmin/minioadmin)

## What You Get

### 🏠 Home Page (`/`)
- Gallery of all podcasts
- Click any podcast to see details and episodes

### 🎙️ Podcast Page (`/podcast/:id`)
- Podcast info and cover image
- List of all episodes
- Click episode to play it

### 📻 Episode Player (`/episode/:id`)
- Full audio player with controls
- Play/pause, seek, time display
- Episode details and description

### ⚙️ Admin Panel (`/admin`)
**Podcasts Tab:**
- Create new podcasts
- Upload cover images
- See all podcasts
- Delete podcasts

**Episodes Tab:**
- Select a podcast
- Create episodes
- Upload audio files
- Delete episodes

## File Structure

```
backend/
├── src/
│   ├── index.js              # Main server
│   ├── db.js                 # Database connection
│   ├── init-db.js            # Schema initialization
│   ├── minio.js              # MinIO setup
│   ├── controllers/
│   │   ├── podcast.js        # Podcast CRUD
│   │   ├── episode.js        # Episode CRUD
│   │   └── user.js           # User management
│   └── routes/
│       ├── podcasts.js       # Podcast endpoints
│       ├── episodes.js       # Episode endpoints
│       └── upload.js         # File upload endpoint
└── Dockerfile

frontend/
├── app/
│   ├── page.jsx              # Home page
│   ├── admin/page.jsx        # Admin panel
│   ├── podcast/[id]/page.jsx # Podcast detail
│   ├── episode/[id]/page.jsx # Episode player
│   └── globals.css
├── components/
│   ├── AudioPlayer.jsx       # Audio player
│   └── PodcastCard.jsx       # Podcast card
├── lib/
│   └── api.js                # API client
└── Dockerfile
```

## Testing the Platform

1. **Create a Podcast:**
   - Go to `/admin`
   - Fill in title and description
   - (Optional) Upload a cover image
   - Click "Create Podcast"

2. **Create an Episode:**
   - Go to `/admin` → "Manage Episodes"
   - Select the podcast you created
   - Fill in episode details
   - **Must upload an audio file** (MP3, WAV, etc.)
   - Click "Create Episode"

3. **Listen to Podcast:**
   - Go to `/` (home page)
   - Click on the podcast you created
   - Click on an episode
   - Use the player to play the episode

## API Examples

### Create a Podcast
```bash
curl -X POST http://localhost:5000/api/podcasts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Awesome Podcast",
    "description": "A great podcast",
    "creatorId": 1,
    "coverImageUrl": "http://..."
  }'
```

### Upload a File
```bash
curl -X POST http://localhost:5000/api/upload/upload \
  -F "file=@/path/to/file.mp3"
```

### Get All Podcasts
```bash
curl http://localhost:5000/api/podcasts
```

### Create an Episode
```bash
curl -X POST http://localhost:5000/api/episodes \
  -H "Content-Type: application/json" \
  -d '{
    "podcastId": 1,
    "title": "Episode 1",
    "description": "First episode",
    "audioFileUrl": "http://...",
    "durationSeconds": 3600,
    "episodeNumber": 1
  }'
```

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Port 5432 already in use | `docker stop podcast-db && docker rm podcast-db` |
| Port 9000 already in use | `docker stop podcast-minio && docker rm podcast-minio` |
| Frontend can't reach API | Check `.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:5000/api` |
| Database connection error | Wait 10 seconds for DB to initialize |
| Files not uploading | Make sure MinIO is running and accessible |

## Next: Development

After initial setup, you can:

1. **Stop containers**: `docker-compose down`
2. **Run locally without Docker**:
   ```bash
   # Terminal 1: Backend
   cd backend && npm run dev
   
   # Terminal 2: Frontend
   cd frontend && npm run dev
   
   # Keep Docker services running
   docker-compose up postgres minio
   ```

3. **Add features** (see code comments for where to add them):
   - Authentication
   - Search
   - Filtering
   - Follow podcasts
   - User accounts
   - Analytics

## Support

For help, check:
- `README.md` - Full documentation
- Backend logs: `docker logs podcast-backend`
- Frontend logs: `docker logs podcast-frontend`
- API health: `curl http://localhost:5000/api/health`

Enjoy your podcast platform! 🎉
