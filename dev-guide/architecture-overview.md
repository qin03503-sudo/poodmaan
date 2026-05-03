# Architecture Overview

## System Layers

### 1. Client Layer
**Web Apps (Next.js 14+)**
- `apps/web` - Consumer podcast app with persistent audio player
- `apps/creator-studio` - Content management & analytics
- `apps/admin-console` - Internal operations & moderation

**Mobile App**
- React Native (iOS/Android)
- Offline-first with encrypted downloads
- Background audio playback
- Cross-device sync

### 2. Edge & Delivery Layer
- **CDN**: CloudFront (primary) + Fastly (failover)
- **Origin Shield**: Request collapsing, geo-routing
- **Audio Delivery**: HTTP 206 byte-range requests, FastStart enabled
- **Signed URLs**: Short TTL (2-4 hours), IP-bound optional
- **Multi-CDN**: Health-aware failover

### 3. Access Layer
- **API Gateway**: Kong/Traefik - HTTP/REST to gRPC translation
- **BFFs (Backend-for-Frontend)**:
  - `gateway-bff` - Consumer app aggregation
  - `creator-bff` - Creator Studio aggregation
  - `admin-bff` - Admin Console aggregation
- **Authentication**: JWT access tokens, refresh tokens, OAuth2

### 4. Application / Domain Services Layer

#### Core Domain Services (Go microservices)
| Service | Responsibility | Database |
|---------|---------------|----------|
| `auth-service` | JWT, RBAC, user management | identity-db |
| `user-profile-service` | Profile, preferences, settings | identity-db |
| `catalog-service` | Podcasts, episodes, metadata | catalog-db |
| `creator-service` | Creator profiles, verification | catalog-db |
| `media-upload-service` | Upload handling, validation | media-db |
| `media-processing-service` | Transcoding, FastStart, waveform | media-db |
| `playback-auth-service` | Entitlement checks, signed URLs | entitlement-db |
| `playback-session-service` | Session tracking, state | library-db |
| `playback-telemetry-service` | Heartbeats, progress, events | analytics-db |
| `user-library-service` | Follows, saves, playlists, history | library-db |
| `search-service` | Full-text search, discovery | search-index |
| `billing-service` | Subscriptions, payments, ledger | billing-db |
| `entitlement-service` | Access grants, subscriptions | entitlement-db |
| `notification-service` | Push, email, in-app notifications | notification-db |
| `analytics-service` | Event aggregation, reporting | analytics-db |
| `recommendation-service` | Hybrid ML recommendations | feature-store |
| `moderation-service` | Content review, reports | moderation-db |
| `ads-service` | Ad serving, pacing, targeting | billing-db |
| `payout-service` | Creator payouts, tax handling | billing-db |
| `export-batch-service` | Bulk exports, reports | - |

### 5. Asynchronous Data & Event Layer
**Kafka Topics**
- `media.upload.requested` → Processing pipeline
- `media.processed` → Search indexing
- `catalog.entity.changed` → Read model updates
- `playback.heartbeat.received` → Analytics
- `billing.subscription.changed` → Entitlement updates
- `notification.triggered` → Delivery

**CDC (Change Data Capture)**
- Debezium → Kafka Connect → Elasticsearch/ClickHouse
- Avoids dual-writes, ensures consistency

### 6. Data & Storage Layer
| Storage | Usage | Technology |
|---------|-------|------------|
| **PostgreSQL** | Operational data (per service) | RDS/Aurora, read replicas, partitioning |
| **Redis** | Caching, real-time state | Clustered, eviction policies |
| **Kafka** | Event streaming | Strimplzi operator, replication |
| **S3** | Audio files, images, transcripts | Lifecycle policies, versioning |
| **Elasticsearch** | Search index | SSPL/OpenSearch |
| **ClickHouse** | Analytics OLAP | Druid alternative |

### 7. Analytics / AI / Recommendation Layer
- **Feature Store**: Feast/custom for ML features
- **Model Serving**: Online inference for recommendations
- **Batch Processing**: Offline model training
- **Real-time Features**: Session-based, behavioral signals

### 8. Platform Engineering & Operators Layer
**Kubernetes (EKS)**
- Node pools: general, compute-heavy, memory-heavy, burst
- HPA, VPA, PodDisruptionBudget
- Service Mesh (Istio): mTLS, traffic policies, canary

**Operators**
- Postgres Operator (CrunchyData/Zalando)
- Redis Operator
- Strimzi Kafka Operator
- Cert-Manager, External-Secrets, ArgoCD, KEDA, Kyverno

### 9. Security / Governance / Compliance Layer
- **Zero Trust**: mTLS between all services
- **Secrets**: HashiCorp Vault / AWS Secrets Manager
- **WAF**: Cloudflare / AWS WAF, bot protection
- **DRM**: Optional watermarking for premium content
- **Compliance**: GDPR, data residency, right to be forgotten

## Data Flow Examples

### Playback Flow
```
Mobile/Web → CDN (Signed URL) → S3 (audio)
              ↓
    Playback-Auth-Service (entitlement check)
              ↓
    Playback-Telemetry-Service (heartbeat events)
              ↓
         Kafka → Analytics-DB
```

### Content Publishing Flow
```
Creator Studio → Media-Upload-Service
                    ↓
            S3 (raw upload)
                    ↓
         Kafka: media.upload.requested
                    ↓
        Media-Processing-Service (FastStart)
                    ↓
            S3 (optimized audio)
                    ↓
         Kafka: media.processed
                    ↓
            Catalog-Service (metadata)
                    ↓
         Kafka: catalog.entity.changed
                    ↓
         Search-Indexer → Elasticsearch
```

## Key Architecture Principles
1. **Database-per-Service**: No cross-service DB access
2. **gRPC Internally**: Binary protobuf, HTTP/2, low latency
3. **Event-Driven**: Kafka for async communication
4. **CDC over Dual-Write**: Debezium for search/index updates
5. **HTTP 206 over HLS**: Instant playback for long-form audio
6. **Multi-Region**: Active-Active/Passive for HA
7. **Observability**: Metrics, logs, traces, SLOs
