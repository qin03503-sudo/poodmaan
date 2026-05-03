# Enterprise Podcast Streaming Platform - Developer Guide

## Overview
A global-scale enterprise podcast streaming platform similar to Spotify/Apple Podcasts, with:
- **Consumer App**: Podcast discovery, playback, library management
- **Creator Studio**: Content management, analytics, monetization
- **Admin Console**: Moderation, support, operations
- **Monorepo Architecture**: Next.js apps, Go microservices, Kafka, PostgreSQL, Redis, S3/CDN

## Quick Links
- [Architecture Overview](./architecture-overview.md)
- [Service Catalog](./service-catalog.md)
- [Development Roadmap](./development-roadmap.md)
- [API Contracts](./api-contracts.md)
- [Database Schema](./database-schema.md)
- [Setup Instructions](./setup-instructions.md)

## Project Structure
```
podcast-platform/
├── apps/                    # Frontend applications
│   ├── web/                # Next.js consumer app
│   ├── creator-studio/      # Next.js creator portal
│   ├── admin-console/       # Internal admin panel
│   └── mobile/             # React Native app
├── services/                # Go microservices
│   ├── auth-service/
│   ├── catalog-service/
│   ├── media-processing-service/
│   ├── billing-service/
│   └── ... (20+ services)
├── workers/                 # Kafka consumers & background jobs
├── packages/                # Shared TypeScript packages
├── contracts/               # Proto/OpenAPI schemas
├── db/                      # Database migrations
├── infra/                   # Terraform, Kubernetes, Helm
├── deploy/                  # Docker, Docker Compose, ArgoCD
└── tools/                   # Codegen, scripts, testing
```

## Core Technologies
| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14+, TypeScript, Material Design 3, Zustand |
| Backend | Go 1.21+, gRPC, Protobuf |
| Database | PostgreSQL (per service), Redis |
| Messaging | Kafka, Kafka Connect, Debezium |
| Storage | S3 (audio, images, transcripts) |
| CDN | CloudFront + Fastly (multi-CDN) |
| Infra | Kubernetes (EKS), Terraform, ArgoCD |
| Monitoring | Prometheus, Grafana, Jaeger, OpenSearch |

## Development Phases
1. **Phase 1 (Weeks 1-4)**: Foundation - Auth, Catalog, Basic Playback
2. **Phase 2 (Weeks 5-8)**: Core Features - Library, Search, Creator Studio
3. **Phase 3 (Weeks 9-12)**: Advanced - Monetization, Analytics, Admin
4. **Phase 4 (Weeks 13-16)**: Scale - Multi-region, Optimization

See [Development Roadmap](./development-roadmap.md) for details.

## Key Design Decisions
- **Audio Delivery**: HTTP 206 (byte-range) + FastStart, no HLS/DASH
- **State Management**: Zustand for persistent audio player
- **Communication**: gRPC internally, REST/GraphQL externally
- **Data Strategy**: Database-per-service, CDC for search index
- **Security**: Zero Trust, mTLS, Signed URLs, Vault

## Getting Started
1. Read [Setup Instructions](./setup-instructions.md)
2. Check [Service Catalog](./service-catalog.md) to understand components
3. Review [API Contracts](./api-contracts.md) for integration points
4. Follow [Development Roadmap](./development-roadmap.md)

## Documentation Sources
Original research and architecture documents are in `docs/` directory:
- `docs/1-research/` - Product research and UX specs
- `docs/2-architecture/` - Monorepo and system architecture
- `docs/3-review/` - CTO review and enhancements
