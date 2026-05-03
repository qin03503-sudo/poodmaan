# 4) طراحی Redis

Redis در این سیستم فقط cache ساده نیست؛ یک **Realtime acceleration layer** است.

---

## 4.1 Entitlements Cache

### key

```
```
entitlement:user:{user_id}
```
```

### type

Hash

### value example

```
```
platform_premium = true  
platform_premium_expires_at = 1715000000  
creator:{creator_id} = active  
podcast:{podcast_id} = active  
episode:{episode_id} = active
```
```

### TTL

-   5 تا 30 دقیقه
    
-   با invalidation بر اساس eventهای billing
    

### use-case

-   playback authorization
    
-   UI rendering
    
-   showing locked/unlocked badges
    

---

## 4.2 Resume Position Cache

### key

```
```
resume:user:{user_id}:episode:{episode_id}
```
```

### type

String یا Hash

### value

```
JSON

```
{  
  "position_seconds": 542,  
  "updated_at": 1715000000,  
  "session_id": "uuid"  
}
```
```

### TTL

-   30 تا 90 روز
    
-   سپس persist در DB باقی می‌ماند
    

### use-case

-   continue listening
    
-   cross-device resume
    

---

## 4.3 Home Feed Cache

### key

```
```
homefeed:user:{user_id}:v{feed_version}
```
```

### type

JSON blob یا List

### value

لیست sectionها و entity ids

### TTL

-   1 تا 5 دقیقه برای personalized
    
-   10 تا 30 دقیقه برای نیمه‌ثابت
    

---

## 4.4 Recommendation Cache

### key

```
```
reco:user:{user_id}:slot:{slot_name}
```
```

### type

Sorted Set یا List

### value

episode\_id / podcast\_id

### TTL

-   1 تا 24 ساعت بسته به نوع recommendation
    

---

## 4.5 Playback Session State

### key

```
```
playback:session:{session_id}
```
```

### type

Hash

### fields

-   user\_id
    
-   episode\_id
    
-   started\_at
    
-   last\_position
    
-   last\_heartbeat\_at
    
-   platform
    
-   network\_type
    

### TTL

-   2 تا 12 ساعت
    

---

## 4.6 Rate Limiting

### key

```
```
ratelimit:{scope}:{identifier}:{window}
```
```

مثلاً:

```
```
ratelimit:user:123:minute  
ratelimit:ip:1.2.3.4:minute
```
```

### type

Counter

### TTL

متناسب با window

---

## 4.7 Notification Dedup Cache

### key

```
```
notif:dedup:{user_id}:{template}:{entity_id}
```
```

### TTL

مثلاً 24 ساعت

---

## 4.8 Search Suggestion Hot Cache

### key

```
```
search:suggest:{locale}:{query_prefix}
```
```

### type

List / JSON

### TTL

1 تا 10 دقیقه

---

## 4.9 Distributed Lock Keys

برای workflowها:

```
```
lock:payout:{creator_id}:{period}  
lock:publish:{episode_id}  
lock:reindex:{entity_type}:{entity_id}
```
```

TTL کوتاه + renewal

---

## 4.10 Feature Flags Snapshot Cache

### key

```
```
flags:user:{user_id}  
flags:global
```
```

---

