# 23\. قوانین naming برای کل repo

## سرویس‌ها

```
```
<domain>-service
```
```

مثال:

```
```
catalog-service  
billing-service  
entitlement-service
```
```

## workerها

```
```
<domain>-<job>-worker
```
```

یا در repo:

```
```
workers/search-indexer  
workers/rss-crawler  
workers/playback-consumers
```
```

## Kafka topicها

```
```
<domain>.<entity>.<event>.v<version>
```
```

مثال:

```
```
catalog.episode.published.v1  
playback.heartbeat.received.v1  
billing.subscription.changed.v1  
media.asset.processed.v1
```
```

## Redis keys

```
```
<domain>:<entity>:<id>:<attribute>
```
```

مثال:

```
```
entitlement:user:{user_id}  
resume:user:{user_id}:episode:{episode_id}  
playback:session:{session_id}  
ratelimit:user:{user_id}:minute
```
```

## migrationها

```
```
000001_create_users.up.sql  
000001_create_users.down.sql
```
```

## proto packageها

```
```
<domain>.v1
```
```

مثال:

```
proto

```
package catalog.v1;  
package playback.v1;  
package billing.v1;
```
```

---

