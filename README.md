# Podcast Platform - Enterprise Podcast Streaming Platform

![Podcast Platform](https://img.shields.io/badge/status-MVP-blue) ![License](https://img.shields.io/badge/license-MIT-green)

A global-scale enterprise podcast streaming platform built with modern technologies, similar to Spotify Podcasts and Apple Podcasts.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                        │
│  Web App (Next.js) │ Creator Studio (Next.js) │ Admin Console │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                     Edge & Delivery                        │
│                    CloudFront + Fastly                          │
│                   S3 (Audio Storage)                            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      Access Layer                         │
│                   API Gateway (Kong)                           │
│         BFFs: Gateway │ Creator │ Admin                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  Application Services (Go)                    │
│ Auth │ Catalog │ Media │ Playback │ Library │ Search │ Billing │ ... │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   Data & Event Layer                       │
│         PostgreSQL │ Redis │ Kafka │ Elasticsearch           │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14+, TypeScript, Material Design 3, Zustand |
| **Backend** | Go 1.21+, gRPC, Protocol Buffers |
| **Database** | PostgreSQL (per service), Redis |
| **Messaging** | Kafka, Kafka Connect, Debezium |
| **Storage** | S3 (audio, images, transcripts) |
| **CDN** | CloudFront + Fastly (multi-CDN) |
| **Infra** | Kubernetes (EKS), Terraform, ArgoCD |
| **Monitoring** | Prometheus, Grafana, Jaeger, OpenSearch |

## 📂 Project Structure

```
podcast-platform/
├── apps/                    # Frontend applications
│   ├── web/                # Next.js consumer app
│   ├── creator-studio/      # Next.js creator portal
│   ├── admin-console/       # Internal admin panel
│   └── mobile/             # React Native app (future)
├── services/                # Go microservices
│   ├── auth-service/
│   ├── catalog-service/
│   └── ... (20+ services)
├── workers/                 # Kafka consumers
├── packages/                # Shared TypeScript packages
├── contracts/               # Proto/OpenAPI schemas
├── db/                      # Database migrations
├── infra/                   # Terraform, Kubernetes
├── deploy/                  # Docker, ArgoCD
├── tools/                   # Codegen, scripts
├── docs/                    # Original research docs
│   ├── 1-research/
│   ├── 2-architecture/
│   └── 3-review/
└── dev-guide/              # Developer documentation
    ├── README.md
    ├── architecture-overview.md
    ├── service-catalog.md
    ├── development-roadmap.md
    ├── api-contracts.md
    ├── database-schema.md
    └── setup-instructions.md
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Go 1.21+
- Node.js 18+ & pnpm
- PostgreSQL 15+ (or use Docker)
- Redis 7+ (or use Docker)
- Kafka (or use Docker)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd podcast-platform
   ```

2. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

3. **Start infrastructure services**
   ```bash
   make docker-up
   # or
   cd deploy/compose && docker-compose -f docker-compose.local.yml up -d
   ```

4. **Run database migrations**
   ```bash
   make migrate
   ```

5. **Start backend services** (in separate terminals)
   ```bash
   cd services/auth-service && go run cmd/server/main.go
   cd services/catalog-service && go run cmd/server/main.go
   # ... start other services
   ```

6. **Start frontend apps** (in separate terminals)
   ```bash
   cd apps/web && pnpm dev          # http://localhost:3000
   cd apps/creator-studio && pnpm dev  # http://localhost:3001
   cd apps/admin-console && pnpm dev    # http://localhost:3002
   ```

Or use the convenience command:
```bash
make dev
```

## 📖 Documentation

### For Developers
- **[Developer Guide](./dev-guide/README.md)** - Start here!
- **[Setup Instructions](./dev-guide/setup-instructions.md)** - Local development setup
- **[Architecture Overview](./dev-guide/architecture-overview.md)** - System design
- **[Service Catalog](./dev-guide/service-catalog.md)** - All services & APIs
- **[API Contracts](./dev-guide/api-contracts.md)** - REST/gRPC APIs, Kafka events
- **[Database Schema](./dev-guide/database-schema.md)** - Table structures
- **[Development Roadmap](./dev-guide/development-roadmap.md)** - 4-phase plan

### Original Research Docs
- **[Product Research](./docs/1-research/)** - UX research & design specs
- **[Architecture Docs](./docs/2-architecture/)** - Monorepo design (45 files)
- **[CTO Review](./docs/3-review/)** - Architecture review (99 files)

## 🎯 Development Phases

### Phase 1: Foundation (Weeks 1-4)
- [ ] Auth service (JWT, OAuth)
- [ ] Catalog service (Podcasts, Episodes)
- [ ] Media upload & processing
- [ ] Basic playback with CDN
- **Milestone**: Users can register, upload, and play podcasts

### Phase 2: Core Features (Weeks 5-8)
- [ ] Library management (follows, saves)
- [ ] Search & discovery
- [ ] Creator Studio basics
- [ ] Playback features (queue, speed, etc.)
- **Milestone**: Full consumer experience

### Phase 3: Monetization (Weeks 9-12)
- [ ] Billing service (Stripe integration)
- [ ] Subscriptions & payments
- [ ] Creator payouts
- [ ] Admin console
- **Milestone**: Platform generates revenue

### Phase 4: Scale & Enterprise (Weeks 13-16)
- [ ] Multi-region deployment
- [ ] Advanced analytics & ML recommendations
- [ ] Enterprise security & compliance
- [ ] Mobile app (React Native)
- **Milestone**: Enterprise-grade, global platform

See [Development Roadmap](./dev-guide/development-roadmap.md) for details.

## 🛠️ Common Commands

```bash
make help              # Show all commands
make dev                # Start local development
make test               # Run all tests
make lint               # Run all linters
make docker-build       # Build Docker images
make migrate            # Run database migrations
make proto              # Generate protobuf code
make setup              # Initial setup for new developers
```

## 🧪 Testing

```bash
# Go services
cd services/auth-service && go test ./... -v -cover

# Frontend apps
cd apps/web && pnpm test

# E2E tests
pnpm test:e2e

# Load testing
k6 run tools/load-test/playback.js
```

## 📊 Monitoring

- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3003 (admin/admin)
- **Jaeger**: http://localhost:16686
- **Kafka UI**: http://localhost:8080

## 🤝 Contributing

1. Read the [Developer Guide](./dev-guide/README.md)
2. Check the [Service Catalog](./dev-guide/service-catalog.md)
3. Follow the [Development Roadmap](./dev-guide/development-roadmap.md)
4. Create feature branches from `develop`
5. Write tests for new features
6. Run `make lint` and `make test` before submitting PR
7. Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Support

- **Documentation**: Check `dev-guide/` and `docs/`
- **Issues**: Use GitHub Issues for bugs/features
- **Discussions**: Join team Slack channel
- **Email**: team@podcast-platform.com

---

**Built with ❤️ by the Podcast Platform Team**
