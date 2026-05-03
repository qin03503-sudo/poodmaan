# 3) طراحی Kafka Topicها

الان می‌رسیم به یکی از مهم‌ترین بخش‌ها.

## اصل‌های طراحی Kafka

هر topic باید:

-   domain-specific باشد
    
-   versionable باشد
    
-   key مشخص داشته باشد
    
-   retention و DLQ داشته باشد
    
-   schema contract داشته باشد
    

---

## 3.1 دسته‌بندی Topicها

### A. Media Topics

-   `media.uploaded.v1`
    
-   `media.processing.requested.v1`
    
-   `media.processed.v1`
    
-   `media.processing.failed.v1`
    

### B. Catalog Topics

-   `catalog.podcast.changed.v1`
    
-   `catalog.episode.changed.v1`
    
-   `catalog.episode.published.v1`
    
-   `catalog.episode.unpublished.v1`
    

### C. Playback Topics

-   `playback.session.started.v1`
    
-   `playback.heartbeat.v1`
    
-   `playback.progress.committed.v1`
    
-   `playback.completed.v1`
    
-   `playback.failed.v1`
    

### D. Billing Topics

-   `billing.subscription.changed.v1`
    
-   `billing.payment.succeeded.v1`
    
-   `billing.payment.failed.v1`
    
-   `billing.entitlement.changed.v1`
    
-   `billing.payout.generated.v1`
    

### E. Notification Topics

-   `notification.triggered.v1`
    
-   `notification.delivery.requested.v1`
    
-   `notification.delivery.result.v1`
    

### F. Moderation Topics

-   `moderation.case.opened.v1`
    
-   `moderation.case.updated.v1`
    
-   `moderation.content.flagged.v1`
    

### G. Recommendation / Feature Topics

-   `features.user.updated.v1`
    
-   `features.episode.updated.v1`
    
-   `recommendation.list.generated.v1`
    

### H. Search Sync Topics

-   `search.index.upsert.requested.v1`
    
-   `search.index.delete.requested.v1`
    

---

## 3.2 ساختار Payload پیشنهادی Event

هر event بهتر است envelope استاندارد داشته باشد:

```
JSON

```
{  
  "event_id": "uuid",  
  "event_type": "playback.heartbeat.v1",  
  "event_version": 1,  
  "occurred_at": "2026-04-13T10:10:10Z",  
  "producer": "telemetry-service",  
  "trace_id": "trace-uuid",  
  "key": "user_uuid_or_episode_uuid",  
  "payload": {}  
}
```
```

---

## 3.3 مثال payload برای `playback.heartbeat.v1`

```
JSON

```
{  
  "event_id": "5db3...",  
  "event_type": "playback.heartbeat.v1",  
  "occurred_at": "2026-04-13T10:10:10Z",  
  "producer": "telemetry-service",  
  "trace_id": "abc-123",  
  "key": "user-uuid",  
  "payload": {  
    "session_id": "sess-uuid",  
    "user_id": "user-uuid",  
    "episode_id": "ep-uuid",  
    "podcast_id": "pod-uuid",  
    "creator_id": "creator-uuid",  
    "position_seconds": 152,  
    "playback_speed": 1.25,  
    "platform": "ios",  
    "device_id": "dev-uuid",  
    "country_code": "DE",  
    "network_type": "wifi",  
    "client_timestamp": "2026-04-13T10:10:08Z"  
  }  
}
```
```

### consumerها

-   Resume consumer
    
-   Analytics raw ingestion
    
-   Recommendation feature consumer
    
-   Ad measurement consumer
    
-   Fraud detection consumer
    

---

## 3.4 مثال payload برای `catalog.episode.published.v1`

```
JSON

```
{  
  "event_id": "uuid",  
  "event_type": "catalog.episode.published.v1",  
  "occurred_at": "2026-04-13T10:15:00Z",  
  "producer": "publishing-service",  
  "key": "episode_uuid",  
  "payload": {  
    "episode_id": "episode_uuid",  
    "podcast_id": "podcast_uuid",  
    "creator_id": "creator_uuid",  
    "title": "Episode title",  
    "published_at": "2026-04-13T10:15:00Z",  
    "visibility": "public",  
    "availability_type": "premium",  
    "language_code": "fa"  
  }  
}
```
```

### consumerها

-   Notification trigger
    
-   Search indexing
    
-   Discovery refresh
    
-   Recommendation candidate pipeline
    

---

## 3.5 Kafka Partition Key Strategy

### برای playback

Key = `user_id`  
چون ordering heartbeats برای هر user/session مهم است.

### برای episode catalog changes

Key = `episode_id`

### برای payouts/financial

Key = `creator_id` یا `user_id` بسته به use-case

### برای notifications

Key = `user_id`

---

## 3.6 DLQها

برای هر topic مهم:

-   `playback.heartbeat.dlq`
    
-   `billing.payment.failed.dlq`
    
-   `search.index.upsert.dlq`
    

و هر پیام DLQ باید شامل این‌ها باشد:

-   original payload
    
-   error\_message
    
-   consumer\_name
    
-   failed\_at
    
-   retry\_count
    

---

