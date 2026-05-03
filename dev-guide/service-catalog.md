# Service Catalog

## Core Services Architecture

### Access & Identity Domain

#### `auth-service`
**Responsibility**: JWT tokens, RBAC, user authentication, OAuth2
**Database**: identity-db
**Endpoints**:
- `POST /auth/login` - Email/password login
- `POST /auth/register` - User registration
- `POST /auth/refresh` - Token refresh
- `GET /auth/verify` - Token validation
- `POST /auth/oauth/:provider` - OAuth callback

**Dependencies**: Redis (session cache), Email service
**Key Decisions**: Uses bcrypt for passwords, Redis for token blacklisting

---

#### `user-profile-service`
**Responsibility**: User profiles, preferences, settings, avatars
**Database**: identity-db
**Endpoints**:
- `GET /users/:id` - Get profile
- `PUT /users/:id` - Update profile
- `GET /users/:id/preferences` - Get preferences
- `PUT /users/:id/preferences` - Update preferences

**Dependencies**: auth-service (for identity verification)

---

### Catalog & Content Domain

#### `catalog-service`
**Responsibility**: Podcasts, episodes, metadata, search indexing
**Database**: catalog-db
**Endpoints**:
- `GET /podcasts` - List podcasts
- `GET /podcasts/:id` - Get podcast details
- `POST /podcasts` - Create podcast (creator)
- `PUT /podcasts/:id` - Update podcast
- `GET /podcasts/:id/episodes` - List episodes
- `GET /episodes/:id` - Get episode details
- `POST /episodes` - Create episode (creator)
- `PUT /episodes/:id` - Update episode
- `POST /episodes/:id/publish` - Publish episode

**Key Concepts**:
- Podcast entity: title, description, cover art, category, creator_id
- Episode entity: title, description, audio_url, duration, chapters, transcript
- Uses PostgreSQL partitioning for episodes table
- CDC (Debezium) → Kafka → Elasticsearch for search

**Dependencies**: media-processing-service, search-service

---

#### `creator-service`
**Responsibility**: Creator profiles, verification, team management
**Database**: catalog-db (shared with catalog)
**Endpoints**:
- `GET /creators/:id` - Creator profile
- `PUT /creators/:id` - Update creator profile
- `POST /creators/:id/verify` - Request verification
- `GET /creators/:id/team` - List team members
- `POST /creators/:id/team` - Invite team member
- `PUT /creators/:id/team/:member_id` - Update role

**Dependencies**: auth-service, notification-service

---

### Media Domain

#### `media-upload-service`
**Responsibility**: Handle audio/image uploads, validation, S3 storage
**Database**: media-db
**Endpoints**:
- `POST /upload/podcast-cover` - Upload cover art
- `POST /upload/episode-audio` - Upload audio file
- `GET /upload/:upload_id/status` - Check upload status

**Flow**:
1. Generate presigned S3 URL
2. Client uploads to S3 (raw-uploads/)
3. Trigger Kafka: `media.upload.requested`
4. Return upload_id for tracking

**Dependencies**: S3, Kafka

---

#### `media-processing-service`
**Responsibility**: Audio processing, FastStart optimization, waveform generation
**Database**: media-db
**Consumes**:
- Kafka: `media.upload.requested`

**Actions**:
1. Download from S3 (raw-uploads/)
2. Run FFmpeg: `-movflags faststart`
3. Generate waveform data
4. Upload to S3 (optimized-audio/)
5. Trigger Kafka: `media.processed`

**Dependencies**: S3, Kafka, FFmpeg

---

### Playback Domain

#### `playback-auth-service`
**Responsibility**: Entitlement checks, signed URL generation
**Database**: entitlement-db
**Endpoints**:
- `POST /playback/authorize` - Check if user can play episode
- `GET /playback/signed-url` - Generate signed CDN URL

**Logic**:
- Check entitlements (subscription, one-time purchase, creator membership)
- Verify user has access to episode
- Generate CloudFront signed URL (TTL: 2-4 hours)
- Optional: IP-binding, token binding

**Dependencies**: entitlement-service, Redis (entitlement cache)

---

#### `playback-session-service`
**Responsibility**: Track playback sessions, resume positions
**Database**: library-db
**Endpoints**:
- `POST /playback/session/start` - Start session
- `PUT /playback/session/:id/heartbeat` - Update position
- `POST /playback/session/:id/end` - End session
- `GET /playback/resume` - Get resume position

**Dependencies**: Redis (session state), Kafka (telemetry events)

---

#### `playback-telemetry-service`
**Responsibility**: Ingest playback events, heartbeats, progress
**Database**: analytics-db
**Endpoints**:
- `POST /telemetry/heartbeat` - Receive playback heartbeat
- `POST /telemetry/event` - Receive playback event

**Consumes** (Kafka):
- `playback.heartbeat.received`
- `playback.session.started`
- `playback.session.ended`
- `playback.progress.committed`

**Actions**:
- Validate & deduplicate events (idempotency key)
- Write to analytics-db (partitioned by time)
- Update real-time aggregates in Redis

**Dependencies**: Kafka, Redis, PostgreSQL

---

### Library Domain

#### `user-library-service`
**Responsibility**: Followed podcasts, saved episodes, playlists, history
**Database**: library-db
**Endpoints**:
- `GET /library/followed` - List followed podcasts
- `POST /library/follow/:podcast_id` - Follow podcast
- `DELETE /library/follow/:podcast_id` - Unfollow
- `GET /library/saved` - List saved episodes
- `POST /library/save/:episode_id` - Save episode
- `GET /library/history` - Playback history
- `GET /library/playlists` - List playlists
- `POST /library/playlists` - Create playlist
- `PUT /library/playlists/:id` - Update playlist

**Dependencies**: catalog-service (for metadata), Redis (caching)

---

### Search & Discovery Domain

#### `search-service`
**Responsibility**: Full-text search, faceted search, autocomplete
**Database**: search-index (Elasticsearch/Typesense)
**Endpoints**:
- `GET /search` - Search podcasts/episodes/transcripts
- `GET /search/autocomplete` - Autocomplete suggestions
- `GET /search/trending` - Trending content
- `GET /discover` - Discovery rails (personalized)

**Data Flow**:
1. PostgreSQL (catalog-db) → Debezium CDC → Kafka
2. Kafka Connect → Elasticsearch index
3. Search service queries Elasticsearch

**Dependencies**: Kafka, Elasticsearch, Redis (cache)

---

#### `recommendation-service`
**Responsibility**: Hybrid recommendations (collaborative + content-based)
**Database**: feature-store (Redis/Feast), analytics-db
**Endpoints**:
- `GET /recommendations/for-you` - Personalized recommendations
- `GET /recommendations/similar/:episode_id` - Similar episodes
- `GET /recommendations/because-you-listened` - Contextual recommendations

**Components**:
- Feature computation pipeline (batch + real-time)
- Online feature store (Redis)
- Model serving layer
- Experiment framework (A/B testing)

**Dependencies**: analytics-service, search-service, Kafka

---

### Billing & Monetization Domain

#### `billing-service`
**Responsibility**: Subscriptions, payments, invoices, ledger
**Database**: billing-db (immutable ledger design)
**Endpoints**:
- `POST /billing/checkout` - Create checkout session
- `GET /billing/subscription` - Get current subscription
- `PUT /billing/subscription` - Change plan
- `DELETE /billing/subscription` - Cancel subscription
- `GET /billing/invoices` - List invoices
- `POST /billing/refund` - Process refund

**Payment Providers**:
- Stripe (primary)
- PayPal (secondary)
- Apple IAP, Google Play (mobile)

**Key Concepts**:
- Double-entry ledger mindset
- Immutable payment events
- Idempotent payment processing
- Reconciliation jobs

**Dependencies**: Kafka (subscription changes), entitlement-service

---

#### `entitlement-service`
**Responsibility**: Access grants, subscription validation, grace periods
**Database**: entitlement-db
**Endpoints**:
- `GET /entitlements/:user_id` - List user entitlements
- `POST /entitlements/check` - Check specific entitlement
- `POST /entitlements/grant` - Grant access (admin)
- `POST /entitlements/revoke` - Revoke access

**Logic**:
- Composable entitlements (platform sub + creator sub + one-time + gifted)
- Precedence rules, expiry logic, grace periods
- Cached in Redis (high-read, low-latency)

**Dependencies**: billing-service, Redis

---

#### `payout-service`
**Responsibility**: Creator payouts, tax handling, balance tracking
**Database**: billing-db (shared with billing)
**Endpoints**:
- `GET /payouts/balance` - Get creator balance
- `GET /payouts/history` - Payout history
- `POST /payouts/request` - Request payout
- `GET /payouts/methods` - Get payout methods
- `POST /payouts/methods` - Add payout method

**Key Concepts**:
- Versioned payout calculations
- Auditable, replayable payouts
- Tax/VAT handling
- Dispute-friendly records

**Dependencies**: billing-service, Kafka (payout events)

---

#### `ads-service` (optional)
**Responsibility**: Ad serving, pacing, frequency capping
**Database**: billing-db
**Endpoints**:
- `POST /ads/decision` - Get ad decision
- `POST /ads/impression` - Log ad impression
- `POST /ads/click` - Log ad click

**Dependencies**: Kafka (ad events), Redis (pacing, frequency caps)

---

### Analytics & Intelligence Domain

#### `analytics-service`
**Responsibility**: Event aggregation, reporting, dashboards
**Database**: analytics-db (ClickHouse/Druid)
**Endpoints**:
- `GET /analytics/overview` - Dashboard overview
- `GET /analytics/episode/:id` - Episode analytics
- `GET /analytics/audience` - Audience insights
- `GET /analytics/revenue` - Revenue analytics

**Data Flow**:
- Raw events → Kafka → Stream processing → OLAP storage
- Materialized views for common queries
- Near-real-time for creator dashboard (< 5 min freshness)

**Dependencies**: Kafka, ClickHouse, Redis (caching)

---

### Notifications Domain

#### `notification-service`
**Responsibility**: Push notifications, emails, in-app notifications
**Database**: notification-db
**Endpoints**:
- `POST /notifications/send` - Send notification
- `GET /notifications` - List user notifications
- `PUT /notifications/:id/read` - Mark as read

**Channels**:
- Push: Firebase Cloud Messaging / APNS
- Email: SendGrid / SES
- In-app: WebSocket / polling

**Dependencies**: Kafka (notification events)

---

### Moderation & Safety Domain

#### `moderation-service`
**Responsibility**: Content moderation, reports, appeals
**Database**: moderation-db
**Endpoints**:
- `POST /moderation/report` - Submit report
- `GET /moderation/queue` - Moderation queue
- `GET /moderation/case/:id` - Case details
- `POST /moderation/case/:id/decide` - Make decision
- `GET /moderation/audit-logs` - Audit trail

**Workflow**:
1. Report submitted → Kafka: `moderation.report.submitted`
2. Assigned to moderator (round-robin/load-based)
3. Evidence reviewed (audio, transcript, metadata)
4. Decision made (approve/reject/escalate)
5. Action taken (remove, warn, ban)
6. Audit log entry created

**Dependencies**: Kafka, S3 (evidence storage)

---

## Workers (Kafka Consumers)

### `rss-crawler`
**Responsibility**: Fetch & parse podcast RSS feeds
**Implementation**: Go worker pool (thousands of goroutines)
**Consumes**: Scheduled triggers (cron)
**Actions**:
1. Fetch RSS feed from URL
2. Parse episodes (XML)
3. Detect new episodes
4. Trigger Kafka: `catalog.episode.discovered`

**Dependencies**: Kafka, catalog-service

---

### `search-indexer`
**Responsibility**: Index catalog changes in Elasticsearch
**Consumes**:
- Kafka: `catalog.entity.changed`
- Kafka: `media.processed`

**Actions**:
1. Receive entity change event
2. Fetch full entity (if needed)
3. Index in Elasticsearch
4. Update search index mappings

**Dependencies**: Kafka, Elasticsearch

---

### `playback-consumers`
**Responsibility**: Process playback events for analytics
**Consumes**:
- Kafka: `playback.heartbeat.received`
- Kafka: `playback.session.started`
- Kafka: `playback.session.ended`

**Actions**:
1. Deduplicate events (idempotency)
2. Update analytics-db (ClickHouse)
3. Update real-time Redis aggregates
4. Trigger recommendations update (if needed)

**Dependencies**: Kafka, ClickHouse, Redis

---

### `billing-consumers`
**Responsibility**: Process billing events, update entitlements
**Consumes**:
- Kafka: `billing.subscription.changed`
- Kafka: `billing.payment.succeeded`
- Kafka: `billing.payment.failed`

**Actions**:
1. Update subscription status
2. Trigger entitlement updates
3. Send notifications (payment success/failure)
4. Update analytics (revenue events)

**Dependencies**: Kafka, billing-service, entitlement-service, notification-service

---

### `notification-consumers`
**Responsibility**: Send notifications based on events
**Consumes**: Various event topics
**Actions**:
1. Receive event (new episode, payment, moderation)
2. Determine notification channels (push/email/in-app)
3. Send via appropriate provider
4. Log delivery status

**Dependencies**: Kafka, notification-service

---

### `analytics-consumers`
**Responsibility**: Stream processing for analytics
**Consumes**: All event topics
**Actions**:
1. Aggregate events in windows
2. Compute metrics (CTR, completion rate, drop-off)
3. Update OLAP storage
4. Update creator dashboards

**Dependencies**: Kafka, ClickHouse, Redis

---

## Shared Packages

### `packages/ui`
**Description**: Shared design system (Material Design 3)
**Exports**: Button, Card, Dialog, Tabs, Menu, Skeleton, etc.
**Tokens**: Colors, typography, spacing, M3 tokens

### `packages/player-core`
**Description**: Shared audio player logic
**Exports**: Audio engine, queue management, media session, telemetry, offline support

### `packages/web-api-client`
**Description**: Generated API client for web apps
**Generated from**: OpenAPI specs

### `packages/shared-types`
**Description**: Shared TypeScript types
**Includes**: User, Podcast, Episode, Billing types

### `packages/eslint-config`, `packages/ts-config`
**Description**: Shared linting and TypeScript configs

---

## Development Priority

### P0 - Core Experience
1. `auth-service` - Users can't use the app without auth
2. `catalog-service` - Content must exist to be played
3. `media-upload-service` + `media-processing-service` - Content must be processed
4. `playback-auth-service` + CDN setup - Audio must be playable
5. `playback-telemetry-service` - Must track playback

### P0 - Consumer App
1. `user-library-service` - Library, follows, saves
2. `search-service` - Discovery, search
3. `recommendation-service` - Personalization

### P1 - Creator Studio
1. `creator-service` - Creator profiles, team management
2. Creator onboarding flows
3. Analytics (basic)

### P1 - Monetization
1. `billing-service` - Subscriptions, payments
2. `entitlement-service` - Access control
3. `payout-service` - Creator payouts

### P2 - Enterprise
1. `moderation-service` - Content safety
2. `ads-service` - Ad platform
3. Admin console features
