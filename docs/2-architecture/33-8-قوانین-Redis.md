# 8\. قوانین Redis

## 8.1 Redis دیتابیس اصلی نیست

Redis برای این پروژه:

```
```
cache  
rate limit  
session acceleration  
entitlement hot path  
resume hot path  
recommendation hot lists  
distributed lock محدود
```
```

نباید Source of Truth باشد.

---

## 8.2 Cache stampede را کنترل کن

برای cacheهای داغ:

```
```
TTL jitter  
request coalescing  
singleflight در Go  
background refresh  
stale-while-revalidate
```
```

مثلاً:

```
```
entitlement:user:{user_id}  
TTL = 5m + random(0..60s)
```
```

---

## 8.3 Cache invalidation event-driven باشد

مثلاً وقتی entitlement تغییر کرد:

```
```
billing.entitlement.changed.v1  
        ↓  
entitlement-cache-consumer  
        ↓  
delete/update entitlement:user:{user_id}
```
```

ممنوع:

```
```
فقط TTL بلند و امید به درست شدن خودکار
```
```

---

