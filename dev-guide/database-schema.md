# Database Schema Overview

## Database-per-Service Pattern

Each microservice owns its database. No cross-service database access.

---

## Identity Database (identity-db)

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(100),
  avatar_url VARCHAR(500),
  role VARCHAR(20) DEFAULT 'listener',  -- listener, creator, moderator, admin
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

### Sessions Table
```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  refresh_token_hash VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at);
```

### User Preferences Table
```sql
CREATE TABLE user_preferences (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  preference_key VARCHAR(50),
  preference_value TEXT,
  PRIMARY KEY (user_id, preference_key)
);
```

---

## Catalog Database (catalog-db)

### Creators Table
```sql
CREATE TABLE creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES identity-db.users(id),
  display_name VARCHAR(100) NOT NULL,
  bio TEXT,
  avatar_url VARCHAR(500),
  is_verified BOOLEAN DEFAULT FALSE,
  verification_status VARCHAR(20) DEFAULT 'pending',  -- pending, verified, rejected
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_creators_user_id ON creators(user_id);
```

### Podcasts Table (Partitioned by created_at)
```sql
CREATE TABLE podcasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES creators(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  cover_image_url VARCHAR(500),
  category VARCHAR(50),
  language VARCHAR(10) DEFAULT 'en',
  status VARCHAR(20) DEFAULT 'draft',  -- draft, published, archived
  rss_feed_url VARCHAR(500),
  total_episodes INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
) PARTITION BY RANGE (created_at);

CREATE TABLE podcasts_2026 PARTITION OF podcasts
  FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');

CREATE INDEX idx_podcasts_creator_id ON podcasts(creator_id);
CREATE INDEX idx_podcasts_status ON podcasts(status);
CREATE INDEX idx_podcasts_category ON podcasts(category);
```

### Episodes Table (Partitioned by created_at)
```sql
CREATE TABLE episodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  podcast_id UUID REFERENCES podcasts(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  audio_url VARCHAR(500),
  duration_seconds INT,
  episode_number INT,
  season_number INT,
  status VARCHAR(20) DEFAULT 'draft',  -- draft, ready, published, archived
  published_at TIMESTAMP,
  transcript_url VARCHAR(500),
  chapter_markers JSONB,  -- [{start_seconds, title, ...}]
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
) PARTITION BY RANGE (created_at);

CREATE TABLE episodes_2026 PARTITION OF episodes
  FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');

CREATE INDEX idx_episodes_podcast_id ON episodes(podcast_id);
CREATE INDEX idx_episodes_status ON episodes(status);
CREATE INDEX idx_episodes_published_at ON episodes(published_at DESC);
CREATE INDEX idx_episodes_podcast_status ON episodes(podcast_id, status);
```

### Podcast Categories Table
```sql
CREATE TABLE podcast_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  parent_id INT REFERENCES podcast_categories(id)
);
```

---

## Media Database (media-db)

### Uploads Table
```sql
CREATE TABLE uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL,
  podcast_id UUID,
  upload_type VARCHAR(20),  -- audio, cover_image
  original_filename VARCHAR(255),
  file_size_bytes BIGINT,
  mime_type VARCHAR(50),
  s3_bucket VARCHAR(100),
  s3_key VARCHAR(500),
  status VARCHAR(20) DEFAULT 'uploading',  -- uploading, processing, ready, failed
  processing_error TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_uploads_creator_id ON uploads(creator_id);
CREATE INDEX idx_uploads_status ON uploads(status);
```

### Audio Processing Jobs Table
```sql
CREATE TABLE audio_processing_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  upload_id UUID REFERENCES uploads(id),
  episode_id UUID,
  status VARCHAR(20) DEFAULT 'queued',  -- queued, processing, completed, failed
  output_s3_bucket VARCHAR(100),
  output_s3_key VARCHAR(500),
  duration_seconds INT,
  waveform_data JSONB,
  error_message TEXT,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Library Database (library-db)

### Followed Podcasts Table
```sql
CREATE TABLE followed_podcasts (
  user_id UUID NOT NULL,
  podcast_id UUID NOT NULL,
  followed_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, podcast_id)
);

CREATE INDEX idx_followed_user_id ON followed_podcasts(user_id);
```

### Saved Episodes Table
```sql
CREATE TABLE saved_episodes (
  user_id UUID NOT NULL,
  episode_id UUID NOT NULL,
  saved_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, episode_id)
);

CREATE INDEX idx_saved_user_id ON saved_episodes(user_id);
```

### Playback History Table (Partitioned by date)
```sql
CREATE TABLE playback_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  episode_id UUID NOT NULL,
  podcast_id UUID NOT NULL,
  playback_position_seconds INT DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  last_played_at TIMESTAMP,
  play_count INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
) PARTITION BY RANGE (created_at);

CREATE TABLE playback_history_2026 PARTITION OF playback_history
  FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');

CREATE INDEX idx_playback_user_id ON playback_history(user_id);
CREATE INDEX idx_playback_episode_id ON playback_history(episode_id);
CREATE INDEX idx_playback_last_played ON playback_history(user_id, last_played_at DESC);
```

### Playlists Table
```sql
CREATE TABLE playlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_playlists_user_id ON playlists(user_id);
```

### Playlist Episodes Table
```sql
CREATE TABLE playlist_episodes (
  playlist_id UUID REFERENCES playlists(id) ON DELETE CASCADE,
  episode_id UUID NOT NULL,
  position INT NOT NULL,
  added_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (playlist_id, episode_id)
);

CREATE INDEX idx_playlist_episodes_playlist ON playlist_episodes(playlist_id);
```

### Playback Queue Table
```sql
CREATE TABLE playback_queue (
  user_id UUID NOT NULL,
  episode_id UUID NOT NULL,
  position INT NOT NULL,
  added_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, episode_id)
);
```

---

## Billing Database (billing-db)

### Subscriptions Table
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  plan_id VARCHAR(50) NOT NULL,  -- free, premium_monthly, premium_yearly
  status VARCHAR(20) NOT NULL,  -- active, cancelled, past_due, unpaid
  current_period_start TIMESTAMP NOT NULL,
  current_period_end TIMESTAMP NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  payment_provider VARCHAR(20),  -- stripe, paypal, apple_iap, google_play
  provider_subscription_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
```

### Payment Transactions Table (Immutable)
```sql
CREATE TABLE payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  subscription_id UUID REFERENCES subscriptions(id),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  status VARCHAR(20) NOT NULL,  -- succeeded, failed, pending
  payment_method VARCHAR(20),  -- card, paypal, apple_pay, google_pay
  provider_transaction_id VARCHAR(255),
  receipt_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_payments_user_id ON payment_transactions(user_id);
CREATE INDEX idx_payments_status ON payment_transactions(status);
```

### Invoices Table
```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  subscription_id UUID REFERENCES subscriptions(id),
  invoice_number VARCHAR(50) UNIQUE,
  subtotal DECIMAL(10,2) NOT NULL,
  tax DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'open',  -- open, paid, void
  invoice_pdf_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  paid_at TIMESTAMP
);
```

### Entitlements Table
```sql
CREATE TABLE entitlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  entitlement_type VARCHAR(50) NOT NULL,  -- subscription, one_time_purchase, creator_membership, gifted
  resource_id UUID,  -- podcast_id or episode_id (if applicable)
  source_type VARCHAR(20),  -- subscription, purchase, gift, promotional
  source_id UUID,  -- subscription_id or payment_id
  starts_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_entitlements_user_id ON entitlements(user_id);
CREATE INDEX idx_entitlements_active ON entitlements(user_id, is_active) WHERE is_active = TRUE;
```

### Payouts Table (Creator payouts)
```sql
CREATE TABLE payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  status VARCHAR(20) DEFAULT 'pending',  -- pending, processing, completed, failed
  payout_method VARCHAR(20),  -- bank_transfer, paypal, stripe_connect
  provider_payout_id VARCHAR(255),
  tax_withheld DECIMAL(10,2) DEFAULT 0,
  period_start DATE,
  period_end DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

CREATE INDEX idx_payouts_creator_id ON payouts(creator_id);
```

---

## Analytics Database (analytics-db) - ClickHouse

### Playback Events Table (OLAP)
```sql
CREATE TABLE playback_events (
  event_id UUID,
  user_id UUID,
  episode_id UUID,
  podcast_id UUID,
  event_type String,  -- play, pause, complete, heartbeat
  position_seconds Int32,
  device_type String,  -- mobile, web, tablet
  app_version String,
  timestamp DateTime
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (episode_id, timestamp);
```

### Episode Analytics Table (Materialized View)
```sql
CREATE MATERIALIZED VIEW episode_daily_stats
ENGINE = SummingMergeTree()
PARTITION BY toYYYYMM(date)
ORDER BY (episode_id, date)
AS SELECT
  episode_id,
  toDate(timestamp) as date,
  count() as play_count,
  uniq(user_id) as unique_listeners,
  sumIf(duration_seconds, event_type = 'complete') as completed_plays
FROM playback_events
GROUP BY episode_id, date;
```

---

## Moderation Database (moderation-db)

### Reports Table
```sql
CREATE TABLE content_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_user_id UUID,
  content_type VARCHAR(20),  -- episode, podcast, comment
  content_id UUID NOT NULL,
  report_type VARCHAR(50),  -- copyright, harassment, inappropriate, spam
  description TEXT,
  status VARCHAR(20) DEFAULT 'pending',  -- pending, reviewing, resolved, dismissed
  assigned_to UUID,  -- moderator user_id
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_reports_status ON content_reports(status);
CREATE INDEX idx_reports_content ON content_reports(content_type, content_id);
```

### Moderation Cases Table
```sql
CREATE TABLE moderation_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID REFERENCES content_reports(id),
  content_type VARCHAR(20),
  content_id UUID NOT NULL,
  decision VARCHAR(20),  -- approve, remove, warn_creator, ban_creator
  decision_reason TEXT,
  moderator_id UUID NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Audit Logs Table
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id UUID NOT NULL,
  action VARCHAR(100) NOT NULL,  -- user.ban, episode.remove, payout.approve
  object_type VARCHAR(50),
  object_id UUID,
  reason TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_actor ON audit_logs(actor_user_id);
CREATE INDEX idx_audit_object ON audit_logs(object_type, object_id);
CREATE INDEX idx_audit_created ON audit_logs(created_at DESC);
```

---

## Redis Data Structures

### Session Cache
```
Key: session:{session_id}
Value: JSON {user_id, expires_at, ...}
TTL: 30 days
```

### Entitlement Cache
```
Key: entitlements:{user_id}
Value: SET of entitlement strings
TTL: 1 hour
```

### Playback Position Cache
```
Key: playback_position:{user_id}:{episode_id}
Value: position in seconds
TTL: 24 hours
```

### Rate Limiting
```
Key: rate_limit:{ip_address}:{endpoint}
Value: request count
TTL: 1 minute
```

### Hot Content Cache
```
Key: trending_episodes
Value: JSON array of episode IDs
TTL: 5 minutes
```

---

## S3 Bucket Structure

### Bucket: `enterprise-podcast-storage-prod`
```
raw-uploads/
  {creator_uuid}/
    {upload_uuid_timestamp}.mp3

optimized-audio/
  {podcast_uuid}/
    {episode_uuid}/
      audio_faststart.mp3

images/
  covers/
    {podcast_uuid}/
      1080.webp
      300.webp

transcripts/
  {podcast_uuid}/
    {episode_uuid}/
      ai_transcript_en.vtt
      ai_transcript_es.vtt

waveforms/
  {podcast_uuid}/
    {episode_uuid}/
      waveform.json
```

---

## Data Lifecycle

### Hot Data (0-7 days)
- Redis: sessions, entitlements, positions
- PostgreSQL: recent rows (billing, history)

### Warm Data (7-90 days)
- PostgreSQL read replicas: queries
- ClickHouse: analytics

### Cold Data (90+ days)
- S3: archived audio (infrequent access)
- S3 Glacier: old analytics backups

---

## Migrations

### Tools
- Go: `golang-migrate` or `goose`
- Pattern: `000001_create_users.up.sql` / `000001_create_users.down.sql`

### Running Migrations
```bash
# For each service
cd services/*-service
migrate -path migrations -database "$DATABASE_URL" up
```

---

## Full Schema Files

The complete schema definitions are in:
- `db/identity/migrations/` - User & auth schemas
- `db/catalog/migrations/` - Podcast & episode schemas
- `db/media/migrations/` - Upload & processing schemas
- `db/library/migrations/` - Library & playback schemas
- `db/billing/migrations/` - Subscription & payment schemas
- `db/moderation/migrations/` - Reports & moderation schemas
- `db/analytics/migrations/` - ClickHouse schemas

See original docs: `docs/2-architecture/11-11-ساختار-db.md`
