# Repository Structure

Poodmaan is organized as a monorepo so the listener app, creator tools, shared UI, BFF/data access, contracts, and future services can evolve together.

## Current Runnable Apps

```text
apps/web/                 Listener web app on port 3000
apps/creator-studio/      Creator/content management app and API routes on port 3001
packages/bff/             Phase 0 data/storage module used by Creator Studio API routes
packages/ui/              Shared React UI components and global styles
docker-compose.yml        Local Postgres, MinIO, Creator Studio, and Web app
```

## Future Expansion Areas

```text
apps/admin-console/       Internal ops UI scaffold
services/                 Future backend services
workers/                  Async consumers and batch jobs
contracts/                API, protobuf, and event contracts
db/                       Migrations and seeds
infra/                    Terraform, Kubernetes, Helm, and platform manifests
deploy/                   Deployment packaging
tools/                    Codegen, validators, scripts, and load tests
docs/                     Architecture, product, API, runbook, and security docs
```

## Boundaries

`apps/web` is read-only from the user point of view and calls the Creator Studio API through `ADMIN_API_URL`.

`apps/creator-studio` owns Phase 0 CRUD and upload APIs under `/api/*`.

`packages/bff` is a temporary Phase 0 backend module. Split it into services only when there is a concrete service boundary to validate.

`packages/ui` is shared presentation code. App-specific components should stay inside each app under `src/components` or future `src/features` folders.
