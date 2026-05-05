# AGENTS.md - Podcast Platform Fast Start

## Current Status (Phase 0)

This is **zero-step foundation** - a minimal working Docker Compose setup for the podcast platform. Not the full enterprise build; just a running app to begin from.

**What works now:**
- PostgreSQL database (auto-initialized)
- MinIO object storage (auto-initialized)
- Node.js/Express backend API
- Next.js frontend
- Basic CRUD for podcasts and episodes
- File upload (images + audio)
- Simple audio player
- Admin panel for content management

## Quick Start

```bash
docker-compose up
```

Wait 30-60 seconds. Then visit:
- Frontend: http://localhost:3000
- Admin: http://localhost:3000/admin
- API health: http://localhost:5000/api/health
- MinIO console: http://localhost:9001 (minioadmin/minioadmin)

## File Structure

```
backend/              # Node.js/Express API
├── src/
│   ├── index.js      # Server entry, initializes DB + MinIO
│   ├── db.js         # PostgreSQL connection
│   ├── init-db.js    # Schema (users, podcasts, episodes, follows)
│   ├── minio.js      # MinIO setup + bucket creation
│   ├── controllers/  # CRUD logic (podcast.js, episode.js, user.js)
│   └── routes/       # API endpoints (/podcasts, /episodes, /upload)
├── package.json      # Dependencies: express, pg, minio, multer
└── Dockerfile

frontend/             # Next.js React app
├── app/
│   ├── page.jsx      # Home (podcast gallery)
│   ├── podcast/[id]/page.jsx   # Podcast detail + episodes
│   ├── episode/[id]/page.jsx   # Episode player
│   ├── admin/page.jsx          # Admin panel
│   └── globals.css
├── components/       # AudioPlayer.jsx, PodcastCard.jsx
├── lib/api.js        # Axios client for all API calls
├── next.config.js    # NEXT_PUBLIC_API_URL setup
└── Dockerfile

docker-compose.yml    # Postgres, MinIO, backend, frontend
.env.example          # Old config (can ignore for now)
backend/.env.local    # Actual backend env (DB + MinIO credentials)
frontend/.env.local   # Actual frontend env (API_URL)
```

## Important Architecture Notes

### Database Schema
Auto-created in `backend/src/init-db.js` on server startup:
- `users` - creators + listeners (basic)
- `podcasts` - title, description, creator_id, cover_image_url
- `episodes` - podcast_id, title, audio_file_url, duration_seconds, episode_number
- `follows` - user_id + podcast_id (for future "follow" feature)

**Key:** No auth yet. Admin panel uses hardcoded `creatorId: 1`.

### API Design
- `GET /api/podcasts` - list all
- `GET /api/podcasts/:id` - single with follower count
- `POST /api/podcasts` - create (needs title, description, creatorId, optional coverImageUrl)
- `GET /api/episodes/podcast/:podcastId` - episodes for one podcast
- `POST /api/episodes` - create (needs podcastId, title, audioFileUrl, episodeNumber)
- `POST /api/upload/upload` - multipart upload → returns file URL

**Key:** All URLs returned by upload endpoint are MinIO direct URLs (e.g., `http://localhost:9000/podcast-storage/uuid-filename.mp3`).

### Frontend & API Client
`frontend/lib/api.js` - single Axios instance with `NEXT_PUBLIC_API_URL` as base.

**Key:** Frontend runs on 3000, backend on 5000. Docker Compose sets API_URL correctly; local dev needs `.env.local`.

### Audio Player
`frontend/components/AudioPlayer.jsx` - basic HTML5 `<audio>` element with:
- Play/pause button
- Seek bar
- Time display
- No playlist, no queue, no resume across pages

**Key:** Player is local state only. No persistence to DB yet.

## Development Workflow

### Add Backend Endpoint
1. Create controller function in `backend/src/controllers/`
2. Create route in `backend/src/routes/`
3. Import + use in `backend/src/index.js`
4. Test via `curl` or update frontend API client

### Add Frontend Page
1. Create `.jsx` file in `frontend/app/` or nested under `frontend/app/[folder]/`
2. Use client component (`'use client'`) if interactive
3. Call `lib/api.js` functions to fetch data
4. Test in browser

### Modify Database
1. Edit SQL in `backend/src/init-db.js`
2. Drop database: `docker-compose down -v` (removes volume)
3. Restart: `docker-compose up`

**Key:** DB auto-initializes on server start. No migrations yet.

## Common Commands

```bash
# Start everything
docker-compose up

# Stop everything
docker-compose down

# Remove volumes (reset DB + MinIO)
docker-compose down -v

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Restart one service
docker-compose restart backend

# Delete stopped containers
docker-compose rm -f
```

## Testing Endpoints

```bash
# Create podcast
curl -X POST http://localhost:5000/api/podcasts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Podcast",
    "description": "Test",
    "creatorId": 1
  }'

# Upload file
curl -X POST http://localhost:5000/api/upload/upload \
  -F "file=@/path/to/audio.mp3"

# Get all podcasts
curl http://localhost:5000/api/podcasts
```

## Known Limitations (Phase 0)

- ❌ No authentication or user accounts
- ❌ No authorization (anyone can create/delete podcasts)
- ❌ No audio resume across pages or devices
- ❌ No search, filtering, or discovery
- ❌ No analytics or playback tracking
- ❌ No subscription/monetization
- ❌ No creator dashboard or stats
- ❌ No notifications
- ❌ Creator ID hardcoded to 1

**These are Phase 1+ features.**

## Environment Variables

**Backend** (`backend/.env.local`):
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

**Frontend** (`frontend/.env.local`):
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

In Docker Compose, these are set automatically.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Port 5432 in use | `docker stop podcast-db; docker rm podcast-db` |
| Port 9000 in use | `docker stop podcast-minio; docker rm podcast-minio` |
| Frontend blank | Check browser console for API errors; verify `NEXT_PUBLIC_API_URL` |
| DB connection error | Wait 10 sec; check `docker-compose logs postgres` |
| Upload fails | Verify MinIO is running; check `MINIO_ENDPOINT` is accessible |
| Can't access MinIO console | Go to `http://localhost:9001`, not 9000 |

## Next Phase (Not Now)

After this zero-step works stably, the roadmap phases are:
1. **Architecture & Risk Closure (30 days)** - ADRs, domain ownership, POC validation
2. **Platform Blueprint (30 days)** - Security, observability, standards
3. **Execution Setup (30 days)** - Build order, governance, hiring plan

See `proposal` file for full 90-day roadmap. For now, just keep the Docker Compose app running.

## References

- `QUICKSTART.md` - Testing & API examples
- `README.md` - Full documentation
- `proposal` - 90-day roadmap (Phase 1+ planning)
