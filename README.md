# Poodmaan

Poodmaan is a Phase 0 podcast platform foundation organized as a monorepo. It currently runs a listener web app, a Creator Studio app with Next.js API routes, PostgreSQL, MinIO storage, and shared UI components.

## Current Features

- Listener podcast gallery, podcast detail pages, episode pages, and audio playback
- Creator Studio for creating/deleting podcasts and episodes
- Cover image and audio uploads to MinIO
- PostgreSQL schema auto-initialization for users, podcasts, episodes, and follows
- Shared UI package for common components and styles

## Structure

```text
apps/
  web/                 Listener web app, port 3000
  creator-studio/      Creator/content app and API routes, port 3001
  admin-console/       Future internal ops scaffold
packages/
  bff/                 Phase 0 data/storage module
  ui/                  Shared React UI components and styles
docs/
  architecture/        Architecture notes
  product/             Product research/spec material
contracts/             Future API and event contracts
services/              Future backend services
workers/               Future async workers
db/                    Future migrations and seeds
infra/                 Future infrastructure-as-code
deploy/                Future deployment packaging
tools/                 Future repo automation
```

See `docs/architecture/repo-structure.md` for the boundary rules.

## Quick Start

```bash
docker-compose up
```

Open:

- Listener app: `http://localhost:3000`
- Creator Studio: `http://localhost:3001`
- API health: `http://localhost:3001/api/health`
- MinIO console: `http://localhost:9001` with `minioadmin` / `minioadmin`

## Local Development

```bash
pnpm install
pnpm dev
```

Run one app:

```bash
pnpm --filter @poodmaan/web dev
pnpm --filter @poodmaan/creator-studio dev
```

## API Endpoints

The Phase 0 API is served by `apps/creator-studio` under `http://localhost:3001/api`.

- `GET /api/health`
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

## Documentation

- `AGENTS.md` for contributor fast-start instructions
- `QUICKSTART.md` for manual testing examples
- `docs/product/research-to-spec.md` for the product proposal/research document
- `docs/architecture/repo-structure.md` for the current monorepo layout
