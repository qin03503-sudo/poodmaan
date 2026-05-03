# A. Access & Aggregation Layer

## 3.1 API Gateway

### وظیفه

نقطه ورود همه درخواست‌های خارجی.

### مسئولیت‌ها

-   SSL termination
    
-   routing
    
-   authentication pre-check
    
-   rate limiting
    
-   request normalization
    
-   request/response headers
    
-   API version routing
    
-   partner API control
    
-   abuse prevention
    

### ارتباطات

-   به BFFها route می‌کند
    
-   در برخی مسیرها به Auth برای validation متصل می‌شود
    
-   با WAF و CDN در لایه edge یکپارچه است
    

### پیش‌نیازها

-   Ingress Controller
    
-   TLS cert management
    
-   rate limit store
    
-   config management
    

---

## 3.2 Web/Mobile BFF

### وظیفه

Backend-for-Frontend برای اپلیکیشن اصلی کاربر.

### مسئولیت‌ها

-   تجمیع داده Home
    
-   ساختن response مناسب UI
    
-   orchestration بین سرویس‌ها
    
-   cache-aware aggregation
    
-   partial failure handling
    
-   feature flag adaptation
    

### ارتباطات

به سرویس‌های زیر gRPC call می‌زند:

-   Auth
    
-   Catalog
    
-   User Library
    
-   Recommendation
    
-   Search
    
-   Playback / Resume
    
-   Notification preferences
    
-   Entitlement
    

### نکته

این سرویس نباید owner داده باشد؛ فقط orchestrator است.

---

## 3.3 Creator Studio BFF

### وظیفه

Backend مخصوص پنل کریتور.

### مسئولیت‌ها

-   آپلود و مدیریت رسانه
    
-   مدیریت پادکست/اپیزود
    
-   نمایش آمارها
    
-   مدیریت monetization
    
-   campaign management
    
-   transcript access
    
-   payout views
    

### ارتباطات

-   Catalog
    
-   Media Processing
    
-   Analytics API
    
-   Billing/Payout
    
-   Notification
    
-   Trust & Safety
    
-   Search index status
    

---

## 3.4 Admin BFF

### وظیفه

Backend مخصوص پنل ادمین و تیم عملیات.

### مسئولیت‌ها

-   moderation tools
    
-   entitlement override
    
-   user/account investigation
    
-   DMCA actions
    
-   refund handling
    
-   creator verification
    
-   fraud inspection
    

### ارتباطات

-   Auth
    
-   Catalog
    
-   Billing
    
-   Trust & Safety
    
-   Notification
    
-   Audit
    
-   User profile services
    

---

## 3.5 Webhook Ingress Service

### وظیفه

ورودی webhookها از سرویس‌های خارجی.

### منابع webhook

-   payment providers
    
-   email providers
    
-   push providers
    
-   moderation vendors
    
-   copyright providers
    
-   ad partners
    

### مسئولیت‌ها

-   signature validation
    
-   deduplication
    
-   retry-safe ingestion
    
-   event normalization
    
-   publish to Kafka
    

---

