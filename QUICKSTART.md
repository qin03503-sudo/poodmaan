# Quick Start

## Start Everything

```bash
docker-compose up
```

After services initialize, open:

- Listener app: `http://localhost:3000`
- Creator Studio: `http://localhost:3001`
- API health: `http://localhost:3001/api/health`
- MinIO console: `http://localhost:9001` with `minioadmin` / `minioadmin`

## What To Test

1. Open `http://localhost:3001`.
2. Create a podcast with a title, description, and optional cover image.
3. Switch to Episodes.
4. Select the podcast, upload an audio file, and create an episode.
5. Open `http://localhost:3000`.
6. Open the podcast and episode, then use the player.

## API Examples

Create a podcast:

```bash
curl -X POST http://localhost:3001/api/podcasts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Awesome Podcast",
    "description": "A great podcast",
    "creatorId": 1,
    "coverImageUrl": null
  }'
```

Upload a file:

```bash
curl -X POST http://localhost:3001/api/upload \
  -F "file=@/path/to/file.mp3"
```

Get all podcasts:

```bash
curl http://localhost:3001/api/podcasts
```

Create an episode:

```bash
curl -X POST http://localhost:3001/api/episodes \
  -H "Content-Type: application/json" \
  -d '{
    "podcastId": 1,
    "title": "Episode 1",
    "description": "First episode",
    "audioFileUrl": "http://localhost:9000/podcast-storage/example.mp3",
    "durationSeconds": 3600,
    "episodeNumber": 1
  }'
```

## Common Commands

```bash
pnpm dev
pnpm --filter @poodmaan/web dev
pnpm --filter @poodmaan/creator-studio dev
pnpm build
docker-compose logs -f creator-studio
docker-compose logs -f web
docker-compose down
docker-compose down -v
```

## Notes

- PostgreSQL and MinIO are local development dependencies.
- The Phase 0 API is implemented with Next.js API routes in `apps/creator-studio/src/app/api`.
- The database schema is currently initialized from `packages/bff/src/index.js`.
- Future service, contract, infra, and migration folders are scaffolds until those boundaries are implemented.
