# API Contracts Summary

## API Architecture

### External APIs (REST/GraphQL)
- **Consumer API**: `api.example.com/v1/...`
- **Creator API**: `creator.example.com/v1/...`
- **Admin API**: `admin.example.com/v1/...`

### Internal Communication (gRPC)
- Service-to-service: HTTP/2 + Protobuf
- Schema Registry: Confluent Schema Registry / Buf
- No direct database access between services

---

## Consumer API (Public)

### Authentication
```
POST /v1/auth/login
POST /v1/auth/register
POST /v1/auth/refresh
GET  /v1/auth/verify
POST /v1/auth/oauth/:provider
```

### Discovery & Search
```
GET  /v1/discover                    # Discovery rails
GET  /v1/discover/trending            # Trending content
GET  /v1/search?q=:query            # Search podcasts/episodes
GET  /v1/search/autocomplete?q=:query  # Autocomplete
GET  /v1/podcasts/:id                # Podcast details
GET  /v1/podcasts/:id/episodes       # Podcast episodes
```

### Playback
```
GET  /v1/episodes/:id               # Episode details
POST /v1/playback/authorize          # Check play access
GET  /v1/playback/signed-url        # Get CDN signed URL
POST /v1/playback/session/start     # Start playback session
PUT  /v1/playback/session/:id/heartbeat  # Update position
POST /v1/playback/session/:id/end   # End session
```

### Library
```
GET  /v1/library/followed           # Followed podcasts
POST /v1/library/follow/:podcast_id  # Follow podcast
DELETE /v1/library/follow/:podcast_id # Unfollow
GET  /v1/library/saved              # Saved episodes
POST /v1/library/save/:episode_id   # Save episode
GET  /v1/library/history            # Playback history
GET  /v1/library/playlists          # User playlists
POST /v1/library/playlists          # Create playlist
PUT  /v1/library/playlists/:id     # Update playlist
```

### User
```
GET  /v1/user/profile                # Get profile
PUT  /v1/user/profile                # Update profile
GET  /v1/user/settings              # Get settings
PUT  /v1/user/settings              # Update settings
```

### Billing & Subscription
```
GET  /v1/billing/subscription       # Get subscription
PUT  /v1/billing/subscription       # Change plan
DELETE /v1/billing/subscription     # Cancel
POST /v1/billing/checkout           # Create checkout
GET  /v1/billing/invoices          # List invoices
POST /v1/billing/refund            # Request refund
GET  /v1/billing/entitlements       # List entitlements
```

---

## Creator API

### Authentication & Onboarding
```
POST /v1/creator/onboard            # Start creator onboarding
GET  /v1/creator/profile            # Creator profile
PUT  /v1/creator/profile            # Update profile
GET  /v1/creator/team              # List team members
POST /v1/creator/team              # Invite member
PUT  /v1/creator/team/:id          # Update member role
```

### Podcast Management
```
GET  /v1/podcasts                   # List creator's podcasts
POST /v1/podcasts                   # Create podcast
GET  /v1/podcasts/:id               # Podcast details
PUT  /v1/podcasts/:id               # Update podcast
DELETE /v1/podcasts/:id               # Delete podcast
```

### Episode Management
```
GET  /v1/podcasts/:id/episodes      # List episodes
POST /v1/episodes                   # Create episode (upload)
GET  /v1/episodes/:id              # Episode details
PUT  /v1/episodes/:id              # Update episode
POST /v1/episodes/:id/publish       # Publish episode
POST /v1/episodes/:id/schedule      # Schedule episode
GET  /v1/episodes/:id/analytics     # Episode analytics
```

### Media Upload
```
POST /v1/upload/episode-audio       # Get presigned URL
POST /v1/upload/cover-image        # Upload cover art
GET  /v1/upload/:upload_id/status   # Check processing status
```

### Analytics
```
GET  /v1/analytics/overview         # Dashboard overview
GET  /v1/analytics/audience         # Audience insights
GET  /v1/analytics/revenue          # Revenue breakdown
GET  /v1/analytics/retention        # Retention curves
```

### Monetization
```
GET  /v1/monetization/settings      # Get monetization settings
POST /v1/monetization/enable        # Enable monetization
GET  /v1/monetization/payouts       # Payout history
POST /v1/monetization/payouts       # Request payout
```

---

## Admin API (Internal)

### Dashboard & Search
```
GET  /v1/admin/dashboard              # Admin dashboard stats
GET  /v1/admin/search?q=:query        # Global search (users, creators, etc.)
```

### User Management
```
GET  /v1/admin/users                  # List users
GET  /v1/admin/users/:id              # User details
PUT  /v1/admin/users/:id              # Update user
POST /v1/admin/users/:id/override     # Grant entitlement override
GET  /v1/admin/users/:id/audit        # User audit log
```

### Creator Management
```
GET  /v1/admin/creators              # List creators
GET  /v1/admin/creators/:id          # Creator details
PUT  /v1/admin/creators/:id          # Update creator
POST /v1/admin/creators/:id/verify   # Verify creator
```

### Moderation
```
GET  /v1/admin/moderation/queue      # Moderation queue
GET  /v1/admin/moderation/case/:id   # Case details
POST /v1/admin/moderation/case/:id    # Make decision
GET  /v1/admin/moderation/reports    # List reports
```

### Billing Management
```
GET  /v1/admin/billing/refunds       # List refund requests
POST /v1/admin/billing/refund/:id    # Approve/deny refund
GET  /v1/admin/billing/payouts       # List payouts
```

### Audit & System
```
GET  /v1/admin/audit-logs            # Audit trail
GET  /v1/admin/system/health        # System health
GET  /v1/admin/system/flags         # Feature flags
```

---

## gRPC Internal Services (Protobuf)

### Example: Catalog Service (Protobuf)
```protobuf
syntax = "proto3";

package catalog.v1;

service CatalogService {
  rpc GetPodcast(GetPodcastRequest) returns (Podcast);
  rpc ListPodcasts(ListPodcastsRequest) returns (ListPodcastsResponse);
  rpc CreatePodcast(CreatePodcastRequest) returns (Podcast);
  rpc UpdatePodcast(UpdatePodcastRequest) returns (Podcast);
  rpc DeletePodcast(DeletePodcastRequest) returns (Empty);
  
  rpc GetEpisode(GetEpisodeRequest) returns (Episode);
  rpc ListEpisodes(ListEpisodesRequest) returns (ListEpisodesResponse);
  rpc CreateEpisode(CreateEpisodeRequest) returns (Episode);
  rpc UpdateEpisode(UpdateEpisodeRequest) returns (Episode);
  rpc PublishEpisode(PublishEpisodeRequest) returns (Episode);
}

message Podcast {
  string id = 1;
  string creator_id = 2;
  string title = 3;
  string description = 4;
  string cover_image_url = 5;
  string category = 6;
  PodcastStatus status = 7;
  int64 created_at = 8;
  int64 updated_at = 9;
}

message Episode {
  string id = 1;
  string podcast_id = 2;
  string title = 3;
  string description = 4;
  string audio_url = 5;
  int64 duration_seconds = 6;
  EpisodeStatus status = 7;
  repeated Chapter chapters = 8;
  string transcript_url = 9;
  int64 published_at = 10;
}
```

### Example: Auth Service (Protobuf)
```protobuf
package auth.v1;

service AuthService {
  rpc Register(RegisterRequest) returns (AuthResponse);
  rpc Login(LoginRequest) returns (AuthResponse);
  rpc RefreshToken(RefreshRequest) returns (AuthResponse);
  rpc ValidateToken(ValidateRequest) returns (ValidateResponse);
  rpc CheckPermission(CheckPermissionRequest) returns (CheckPermissionResponse);
}

message AuthResponse {
  string access_token = 1;
  string refresh_token = 2;
  int64 expires_in = 3;
  User user = 4;
}
```

---

## Kafka Events (JSON Schema)

### Media Events
```json
{
  "specversion": "1.0",
  "type": "media.upload.requested",
  "source": "media-upload-service",
  "id": "uuid",
  "time": "2026-05-03T10:00:00Z",
  "data": {
    "upload_id": "uuid",
    "creator_id": "uuid",
    "podcast_id": "uuid",
    "file_type": "audio/mpeg",
    "file_size": 104857600,
    "bucket": "raw-uploads",
    "key": "{creator_uuid}/{upload_uuid}.mp3"
  }
}
```

### Playback Events
```json
{
  "specversion": "1.0",
  "type": "playback.heartbeat.received",
  "source": "playback-telemetry-service",
  "id": "uuid",
  "time": "2026-05-03T10:05:00Z",
  "data": {
    "session_id": "uuid",
    "user_id": "uuid",
    "episode_id": "uuid",
    "current_position_seconds": 300,
    "device_type": "mobile",
    "app_version": "1.0.0"
  }
}
```

### Billing Events
```json
{
  "specversion": "1.0",
  "type": "billing.subscription.changed",
  "source": "billing-service",
  "id": "uuid",
  "time": "2026-05-03T10:10:00Z",
  "data": {
    "user_id": "uuid",
    "subscription_id": "uuid",
    "old_plan": "free",
    "new_plan": "premium",
    "change_type": "upgrade",
    "effective_at": "2026-05-03T10:10:00Z"
  }
}
```

---

## Authentication & Authorization

### JWT Token Structure
```json
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "role": "listener",  // listener, creator, admin, moderator
  "creator_id": "uuid",  // if creator
  "entitlements": ["premium", "ad-free"],
  "iat": 1714742400,
  "exp": 1714746000
}
```

### RBAC Roles
| Role | Permissions |
|------|-------------|
| `listener` | Play free content, follow podcasts, save episodes |
| `premium` | All listener + play premium content, download |
| `creator` | Manage own podcasts, episodes, analytics |
| `creator_admin` | Manage team, payout settings |
| `moderator` | Review reported content, make decisions |
| `admin` | Full access to admin console |
| `support` | View users, handle billing issues |

---

## API Versioning Strategy

### Versioning
- **URL versioning**: `/v1/`, `/v2/` (external APIs)
- **Protobuf versioning**: `package catalog.v1;` (internal)
- **Backward compatibility**: Required for all changes
- **Deprecation**: Sunset policy with 6-month notice

### Breaking Changes
- New major version required
- Old version supported for 6 months
- Migration guide provided
- Automated migration scripts

---

## Rate Limiting

### Per-User Limits
| Endpoint Type | Rate Limit |
|---------------|-----------|
| Auth endpoints | 10 requests/minute |
| Search | 60 requests/minute |
| Playback auth | 100 requests/minute |
| General API | 1000 requests/minute |

### Per-IP Limits (Unauthenticated)
- 100 requests/minute globally
- Bot detection triggers temporary ban

---

## Error Handling

### Standard Error Response
```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Episode not found",
    "details": "Episode with ID xyz does not exist",
    "request_id": "uuid",
    "timestamp": "2026-05-03T10:15:00Z"
  }
}
```

### Common Error Codes
| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHENTICATED` | 401 | Invalid/missing token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `RESOURCE_NOT_FOUND` | 404 | Resource doesn't exist |
| `VALIDATION_ERROR` | 400 | Invalid request body |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

---

## Contract-First Development

### Tools
- **Protobuf**: `buf` for linting, breaking change detection
- **OpenAPI**: `swagger` / `openapi-generator` for client generation
- **Events**: JSON Schema validation with `ajv`

### Workflow
1. Define contract (proto, openapi, or JSON schema)
2. Run `buf lint` / `openapi lint` to validate
3. Run `buf breaking` to check compatibility
4. Generate code: `buf generate` / `openapi-generator`
5. Implement service against generated interfaces
6. Run contract tests before merging

---

## Full Contract Files

The full contract definitions are in:
- **Protobuf**: `contracts/proto/` (gRPC services)
- **OpenAPI**: `contracts/openapi/` (REST APIs)
- **Events**: `contracts/events/` (Kafka event schemas)

See original architecture docs:
- `docs/2-architecture/10-10-ساختار-contracts.md`
- `docs/2-architecture/21-21-ساختار-API-Gateway-در-repo.md`
