# AGENTS.md - Poodmaan Fast Start

## Current Status

This repository is a Phase 0 monorepo foundation for a podcast platform. It is intentionally small and runnable while leaving clear folders for the larger enterprise architecture described in `docs/product/research-to-spec.md`.

## What Works Now

- PostgreSQL database via Docker Compose
- MinIO object storage via Docker Compose
- Next.js listener web app
- Next.js Creator Studio app with API routes
- Basic CRUD for podcasts and episodes
- File upload for cover images and audio
- Simple episode audio player
- Shared UI package

## Quick Start

```bash
docker-compose up
```

Open:

- Listener app: `http://localhost:3000`
- Creator Studio: `http://localhost:3001`
- API health: `http://localhost:3001/api/health`
- MinIO console: `http://localhost:9001` with `minioadmin` / `minioadmin`

## File Structure

```text
apps/
  web/                 Listener web app
    src/app/           App Router pages
    src/components/    Listener-specific components
    src/lib/           Listener API client
  creator-studio/      Creator/content app and Phase 0 API
    src/app/           UI routes and API routes
    src/lib/           Browser API helpers
  admin-console/       Future internal ops scaffold
packages/
  bff/                 Phase 0 database and MinIO module
  ui/                  Shared UI components and global styles
docs/
  architecture/        Architecture notes
  product/             Product research/spec document
```

See `docs/architecture/repo-structure.md` for the full repo map.

## Important Architecture Notes

### Database Schema

Auto-created by `packages/bff/src/index.js` when API routes are called:

- `users` for the temporary creator account
- `podcasts` for show metadata
- `episodes` for episode metadata and audio URLs
- `follows` reserved for a future listener library feature

The Creator Studio still uses `creatorId: 1` for Phase 0.

### API Design

The Phase 0 API is served from `apps/creator-studio` on port `3001`:

- `GET /api/podcasts`
- `GET /api/podcasts/:id`
- `POST /api/podcasts`
- `PUT /api/podcasts/:id`
- `DELETE /api/podcasts/:id`
- `GET /api/episodes/podcast/:podcastId`
- `GET /api/episodes/:id`
- `POST /api/episodes`
- `PUT /api/episodes/:id`
- `DELETE /api/episodes/:id`
- `POST /api/upload`

Uploads currently return direct MinIO URLs. Signed URLs and private buckets are future architecture work.

### Frontend API Client

`apps/web/src/lib/api.js` reads `ADMIN_API_URL`, defaulting to `http://localhost:3001/api`.

In Docker Compose, `ADMIN_API_URL` is set to `http://creator-studio:3001/api`.

## Development Workflow

### Add a UI Page

1. Add routes under `apps/web/src/app` or `apps/creator-studio/src/app`.
2. Keep app-specific components under that app's `src/components` folder.
3. Move reusable UI primitives to `packages/ui` only when reused by more than one app.

### Add a Phase 0 API Endpoint

1. Add or update a route under `apps/creator-studio/src/app/api`.
2. Put shared database/storage logic in `packages/bff/src/index.js`.
3. Update the relevant app API client.

### Modify the Database

1. Update the schema in `packages/bff/src/index.js`.
2. Reset local state with `docker-compose down -v` if needed.
3. Restart with `docker-compose up`.

## Common Commands

```bash
pnpm dev
pnpm build
pnpm --filter @poodmaan/web dev
pnpm --filter @poodmaan/creator-studio dev
docker-compose up
docker-compose down
docker-compose logs -f creator-studio
docker-compose logs -f web
```

## Known Limitations

- No authentication or authorization
- No persistent player across routes/devices
- No search, discovery, or library features
- No analytics, monetization, billing, or payouts
- No private media access or signed URLs
- No migrations yet
- No separate backend services yet

Keep Phase 0 runnable. Only split into services, migrations, contracts, or infra when a concrete implementation needs that boundary.
