# 3\. قوانین طراحی Microservice

## 3.1 هر سرویس باید این پنج چیز را داشته باشد

هر سرویس production-grade باید حداقل این‌ها را داشته باشد:

```
```
1. Owner مشخص  
2. API contract رسمی  
3. Database/schema ownership  
4. Observability dashboard  
5. Runbook
```
```

اگر سرویسی این‌ها را ندارد، هنوز production-ready نیست.

---

## 3.2 Service Maturity Levels تعریف کن

برای جلوگیری از آشوب، هر سرویس یک سطح بلوغ داشته باشد.

```
```
Level 0: Prototype  
- بدون SLA  
- فقط local/dev  
  
Level 1: Internal Alpha  
- API اولیه  
- تست unit  
- logging پایه  
  
Level 2: Production Candidate  
- migration رسمی  
- healthcheck  
- metrics  
- tracing  
- contract tests  
- CI/CD  
  
Level 3: Production  
- SLO  
- alert  
- runbook  
- load test  
- rollback  
- security scan  
  
Level 4: Critical Production  
- HA  
- chaos test  
- DR plan  
- audit log  
- on-call ownership
```
```

برای این پروژه، این سرویس‌ها باید نهایتاً Level 4 باشند:

```
```
auth-service  
entitlement-service  
playback-auth-service  
billing-service  
catalog-service  
media-processing-service  
playback-telemetry-service
```
```

---

## 3.3 سرویس‌های sync و async را قاطی نکن

یک سرویس می‌تواند هم API داشته باشد هم consumer، اما entrypointها باید جدا باشند.

درست:

```
```
services/catalog-service/  
├── cmd/server/main.go  
└── cmd/worker/main.go
```
```

یا اگر workload خیلی متفاوت است:

```
```
services/catalog-service/  
workers/catalog-indexer/
```
```

قانون:

```
```
APIهای low-latency و consumerهای batch-heavy را در یک deployment نگذارید.
```
```

چون scaling، memory، retry و failure mode متفاوت دارند.

---

## 3.4 Microservice بدون autonomous deploy بی‌معنی است

اگر برای deploy یک سرویس مجبورید ۵ سرویس دیگر را هم deploy کنید، microservice واقعی ندارید.

پس باید رعایت شود:

```
```
Backward compatible API  
Backward compatible events  
Database migration بدون downtime  
Feature flags  
Consumer tolerance نسبت به fieldهای جدید
```
```

---

