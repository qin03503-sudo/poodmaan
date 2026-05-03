# 6\. قوانین Kafka و Event Design

## 6.1 Event envelope استاندارد

بهتر است eventهای مهم با CloudEvents-compatible metadata طراحی شوند. CloudEvents برای metadata مشترک eventها استاندارد CNCF است و در 2024 graduated شده است. [CNCF+1](https://www.cncf.io/projects/cloudevents/?utm_source=chatgpt.com)

```
JSON

```
{  
  "id": "event-uuid",  
  "source": "catalog-service",  
  "type": "catalog.episode.published.v1",  
  "specversion": "1.0",  
  "time": "2026-04-27T12:00:00Z",  
  "datacontenttype": "application/json",  
  "traceparent": "00-...",  
  "subject": "episode/episode_uuid",  
  "data": {  
    "episode_id": "uuid",  
    "podcast_id": "uuid",  
    "creator_id": "uuid",  
    "published_at": "..."  
  }  
}
```
```

---

## 6.2 Topic naming

```
```
<domain>.<entity>.<event>.v<version>
```
```

مثال:

```
```
catalog.episode.published.v1  
media.asset.processed.v1  
playback.heartbeat.received.v1  
billing.entitlement.changed.v1  
notification.delivery.requested.v1
```
```

---

## 6.3 Partition key

```
```
playback events       → user_id یا session_id  
catalog episode       → episode_id  
billing subscription  → user_id  
payout                → creator_id  
notifications         → user_id  
search indexing       → entity_id
```
```

قانون:

```
```
هرجا ordering مهم است، partition key باید حول همان aggregate باشد.
```
```

---

## 6.4 DLQ policy

برای هر consumer حیاتی:

```
```
max retries: 3 تا 10  
backoff: exponential  
DLQ topic: <topic>.dlq  
manual replay tool: اجباری
```
```

پیام DLQ باید شامل:

```
JSON

```
{  
  "original_event": {},  
  "consumer": "search-indexer",  
  "error_code": "MAPPING_FAILED",  
  "error_message": "...",  
  "failed_at": "...",  
  "retry_count": 5  
}
```
```

---

## 6.5 Replay باید از روز اول طراحی شود

هر consumer باید بتواند replay شود.

مثلاً:

```
```
search-indexer replay from beginning  
analytics-consumer replay last 7 days  
entitlement-cache-warmer replay billing.entitlement.changed
```
```

ممنوع:

```
```
consumer code assumes event only once in lifetime
```
```

---

