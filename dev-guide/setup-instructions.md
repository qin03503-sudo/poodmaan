# Setup Instructions

## Prerequisites

### Required Tools
- Docker & Docker Compose
- Go 1.21+
- Node.js 18+ & pnpm
- PostgreSQL 15+ (or use Docker)
- Redis 7+ (or use Docker)
- Kafka (or use Docker)
- kubectl & helm (for K8s deployment)
- Terraform (for infra)
- buf (for Protobuf)

### Optional Tools
- k6 (load testing)
- ArgoCD CLI
- AWS CLI (for S3)
- Stripe CLI (for webhooks)

---

## Local Development Setup (Docker Compose)

### 1. Clone & Initialize
```bash
git clone <repo-url>
cd podcast-platform
cp .env.example .env
# Edit .env with your settings
```

### 2. Start Infrastructure Services
```bash
cd deploy/compose
docker-compose -f docker-compose.local.yml up -d

# Verify services are running
docker ps

# Should see:
# - postgres (identity, catalog, etc.)
# - redis
# - kafka + zookeeper
# - elasticsearch
# - clickhouse
# - minio (local S3)
# - prometheus
# - grafana
```

### 3. Set up Databases
```bash
# Run migrations for each service
for service in auth-service user-profile-service catalog-service; do
  cd services/$service
  migrate -path migrations -database "$DATABASE_URL" up
  cd ../..
done
```

### 4. Start Go Services (Bckend)
```bash
# Terminal 1: Auth Service
cd services/auth-service
go run cmd/server/main.go

# Terminal 2: Catalog Service
cd services/catalog-service
go run cmd/server/main.go

# Terminal 3: Media Upload Service
cd services/media-upload-service
go run cmd/server/main.go

# Terminal 4: Playback Auth Service
cd services/playback-auth-service
go run cmd/server/main.go
```

### 5. Start Frontend Apps
```bash
# Terminal 5: Web App
cd apps/web
pnpm install
pnpm dev

# Terminal 6: Creator Studio
cd apps/creator-studio
pnpm install
pnpm dev

# Terminal 7: Admin Console
cd apps/admin-console
pnpm install
pnpm dev
```

### 6. Verify Setup
```bash
# Check services health
curl http://localhost:8080/health  # auth-service
curl http://localhost:8081/health  # catalog-service

# Check web app
open http://localhost:3000

# Check creator studio
open http://localhost:3001

# Check admin console
open http://localhost:3002
```

---

## Service Ports Reference

| Service | Port | Health Check |
|---------|------|-------------|
| auth-service | 8080 | `/health` |
| user-profile-service | 8081 | `/health` |
| catalog-service | 8082 | `/health` |
| creator-service | 8083 | `/health` |
| media-upload-service | 8084 | `/health` |
| media-processing-service | 8085 | `/health` |
| playback-auth-service | 8086 | `/health` |
| playback-session-service | 8087 | `/health` |
| playback-telemetry-service | 8088 | `/health` |
| user-library-service | 8089 | `/health` |
| search-service | 8090 | `/health` |
| billing-service | 8091 | `/health` |
| entitlement-service | 8092 | `/health` |
| notification-service | 8093 | `/health` |
| analytics-service | 8094 | `/health` |
| recommendation-service | 8095 | `/health` |
| moderation-service | 8096 | `/health` |
| ads-service | 8097 | `/health` |
| payout-service | 8098 | `/health` |
| export-batch-service | 8099 | `/health` |

| Frontend App | Port |
|------------|------|
| web | 3000 |
| creator-studio | 3001 |
| admin-console | 3002 |

---

## Environment Variables (.env)

### Database
```bash
# Identity DB
IDENTITY_DB_HOST=localhost
IDENTITY_DB_PORT=5432
IDENTITY_DB_USER=postgres
IDENTITY_DB_PASSWORD=postgres
IDENTITY_DB_NAME=identity

# Catalog DB
CATALOG_DB_HOST=localhost
CATALOG_DB_PORT=5432
CATALOG_DB_USER=postgres
CATALOG_DB_PASSWORD=postgres
CATALOG_DB_NAME=catalog
```

### Redis
```bash
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

### Kafka
```bash
KAFKA_BROKERS=localhost:9092
KAFKA_SCHEMA_REGISTRY=http://localhost:8081
```

### S3 (MinIO for local)
```bash
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET=podcast-storage
```

### JWT
```bash
JWT_SECRET=your-super-secret-jwt-key-change-in-prod
JWT_EXPIRY_HOURS=24
```

### CDN (CloudFront for prod, local for dev)
```bash
CDN_BASE_URL=http://localhost:9000/podcast-storage
CDN_SIGNED_URL_SECRET=your-cdn-secret
```

### Payment Providers (Stripe for dev)
```bash
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
```

---

## Generating Protobuf Code

### Install buf
```bash
brew install bufbuild/buf/buf  # macOS
# or
go install github.com/bufbuild/buf/cmd/buf@latest
```

### Generate Code
```bash
cd contracts/proto

# Lint protos
buf lint

# Check breaking changes
buf breaking --against '.git#branch=main'

# Generate Go code
buf generate

# Generate TypeScript code (if configured)
buf generate --template buf.gen.ts.yaml
```

---

## Running Tests

### Go Services
```bash
cd services/auth-service
go test ./... -v -cover

# Run with race detection
go test -race ./...
```

### Frontend Apps
```bash
cd apps/web
pnpm test

# E2E tests
pnpm test:e2e
```

### Integration Tests
```bash
cd test/integration
go test ./... -v
```

---

## Loading Sample Data

### Create Test User
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","display_name":"Test User"}'
```

### Create Test Podcast (Creator)
```bash
# First, register a creator
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"creator@example.com","password":"Test123!","display_name":"Test Creator","role":"creator"}'

# Then create a podcast
curl -X POST http://localhost:3001/api/v1/podcasts \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Podcast","description":"A test podcast","category":"Technology"}'
```

### Upload Sample Episode
```bash
# Get presigned URL
curl -X POST http://localhost:3001/api/v1/upload/episode-audio \
  -H "Authorization: Bearer <token>" \
  -d '{"episode_id":"<episode_id>","file_type":"audio/mpeg"}'

# Upload file to S3 (use the returned URL)
# Then publish episode
curl -X POST http://localhost:3001/api/v1/episodes/<episode_id>/publish \
  -H "Authorization: Bearer <token>" \
  -d '{"visibility":"public"}'
```

---

## Monitoring & Debugging

### Prometheus & Grafana
```bash
# Access Grafana
open http://localhost:3000/grafana
# Default login: admin/admin

# View Prometheus metrics
open http://localhost:9090
```

### Jaeger (Tracing)
```bash
open http://localhost:16686
```

### Kafka Topics
```bash
# List topics
docker exec -it kafka kafka-topics --bootstrap-server localhost:9092 --list

# Consume from topic
docker exec -it kafka kafka-console-consumer --bootstrap-server localhost:9092 --topic media.upload.requested --from-beginning
```

---

## Common Issues & Fixes

### Port Already in Use
```bash
# Find process using port
lsof -i :8080

# Kill process
kill -9 <PID>
```

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Check logs
docker logs postgres

# Verify connection
psql -h localhost -U postgres -d identity
```

### Kafka Not Starting
```bash
# Check Zookeeper first
docker logs zookeeper

# Then check Kafka
docker logs kafka

# Reset Kafka (WARNING: deletes all data)
docker-compose down -v
docker-compose up -d
```

---

## Next Steps

1. Read [Architecture Overview](./architecture-overview.md)
2. Check [Service Catalog](./service-catalog.md) to understand components
3. Follow [Development Roadmap](./development-roadmap.md)
4. Review [API Contracts](./api-contracts.md) for integration points
5. Start with Phase 1: Implement `auth-service` and `catalog-service`

---

## Project Structure Quick Reference

```
podcast-platform/
├── apps/                  # Frontend apps (Next.js)
├── services/              # Go microservices
├── workers/              # Kafka consumers
├── packages/             # Shared TypeScript packages
├── contracts/            # Proto/OpenAPI schemas
├── db/                   # Database migrations
├── infra/                # Terraform, K8s, Helm
├── deploy/               # Docker, ArgoCD
├── tools/                # Codegen, scripts
├── docs/                 # Original research & architecture docs
│   ├── 1-research/     # Product research
│   ├── 2-architecture/ # Monorepo architecture
│   └── 3-review/       # CTO review
└── dev-guide/            # Developer guide (this document)
    ├── README.md
    ├── architecture-overview.md
    ├── service-catalog.md
    ├── development-roadmap.md
    ├── api-contracts.md
    ├── database-schema.md
    └── setup-instructions.md
```

---

## Getting Help

- **Documentation**: Check `docs/` for original research
- **Issues**: Use GitHub Issues for bugs/features
- **Chat**: Join team Slack channel
- **Email**: <team@podcast-platform.com>
