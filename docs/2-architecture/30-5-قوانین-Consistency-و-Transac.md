# 5\. قوانین Consistency و Transaction

## 5.1 هر سرویس ACID فقط داخل دیتابیس خودش دارد

در microservices چیزی به نام transaction سراسری ساده نداریم.

ممنوع:

```
```
BEGIN transaction across catalog + billing + notification
```
```

درست:

```
```
Local transaction  
Outbox event  
Kafka publish  
Consumer idempotent  
Compensation if needed
```
```

---

## 5.2 Outbox Pattern اجباری برای eventهای مهم

مشکل dual-write:

```
```
1. Update DB  
2. Publish Kafka event
```
```

اگر DB update شود ولی Kafka publish شکست بخورد، سیستم inconsistent می‌شود.

راه درست:

```
```
در همان DB transaction:  
1. update business table  
2. insert into outbox_events  
  
بعد:  
outbox publisher → Kafka
```
```

ساختار:

```
SQL

```
outbox_events  
- id uuid primarykey  
- aggregate_type varchar  
- aggregate_id uuid  
- event_type varchar  
- event_version int  
- payload jsonb  
- status varchar  
- created_at timestamp  
- published_at timestampnull  
- retry_count int
```
```

---

## 5.3 Idempotency برای همه commandهای حساس

این endpointها باید idempotency key داشته باشند:

```
```
POST /billing/checkout  
POST /billing/webhooks/*  
POST /playback/sessions  
POST /media/uploads/complete  
POST /creator/podcasts/{id}/publish  
POST /admin/entitlements/grant
```
```

Header:

```
http

```
Idempotency-Key: uuid
```
```

جدول:

```
SQL

```
idempotency_keys  
-key  
- scope  
- request_hash  
- response_body  
- status  
- expires_at  
- created_at
```
```

---

## 5.4 Exactly-once را شعار نکن

در عمل، اکثر سیستم‌های event-driven را باید با این فرض طراحی کنید:

```
```
at-least-once delivery  
duplicate events ممکن است  
out-of-order events ممکن است  
consumer باید idempotent باشد
```
```

برای consumerها:

```
```
processed_events  
- event_id  
- consumer_name  
- processed_at
```
```

---

## 5.5 Strong consistency فقط جایی که واقعاً لازم است

برای این پروژه:

Strong consistency لازم است برای:

```
```
payment  
subscription state  
entitlement grant/revoke  
admin override  
creator payout ledger
```
```

Eventual consistency قابل قبول است برای:

```
```
search index  
recommendation  
analytics dashboard  
home feed  
notification  
creator dashboard freshness
```
```

---

