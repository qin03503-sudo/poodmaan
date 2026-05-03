# D. Media & Playback Domain

## 3.15 Media Upload Service

### وظیفه

دریافت امن فایل‌ها از creator.

### مسئولیت‌ها

-   initiate upload
    
-   generate pre-signed upload URLs
    
-   multipart upload handling
    
-   upload integrity verification
    
-   malware scan trigger
    
-   publish `media.uploaded`
    

### ارتباطات

-   Creator BFF
    
-   S3/Object Storage
    
-   Kafka
    
-   Media Processing
    

---

## 3.16 Media Processing Service

### وظیفه

پردازش فایل‌های صوتی و تصویری.

### مسئولیت‌ها

-   faststart processing
    
-   metadata normalization
    
-   duration extraction
    
-   loudness analysis
    
-   waveform generation
    
-   artwork optimization
    
-   dominant color extraction
    
-   packaging for playback
    
-   transcript trigger
    

### ارتباطات

-   S3
    
-   Kafka
    
-   Catalog
    
-   AI transcription
    
-   Cover/image pipeline
    

---

## 3.17 Media Asset Registry Service

### وظیفه

ثبت و ردیابی وضعیت همه assetها.

### مسئولیت‌ها

-   raw/processed asset state
    
-   storage location metadata
    
-   checksum
    
-   transcoding/processing status
    
-   lineage tracking
    

### ارتباطات

-   Media Upload
    
-   Media Processing
    
-   Catalog
    
-   Admin tools
    

---

## 3.18 Playback Authorization Service

### وظیفه

صدور مجوز نهایی پخش.

### مسئولیت‌ها

-   entitlement check
    
-   region check
    
-   device rules
    
-   URL signing
    
-   playback token issuance
    
-   anti-abuse checks
    

### ارتباطات

-   Auth
    
-   Entitlement
    
-   Catalog
    
-   CDN signing subsystem
    
-   Redis
    

---

## 3.19 Playback Session Service

### وظیفه

مدیریت session پخش.

### مسئولیت‌ها

-   session open/close
    
-   playback\_session\_id
    
-   session metadata
    
-   active playback tracking
    
-   anti-fraud playback heuristics
    

### ارتباطات

-   Web/Mobile BFF
    
-   Telemetry
    
-   Recommendation features
    
-   Analytics
    

---

## 3.20 Telemetry / Playback Tracking Service

### وظیفه

دریافت heartbeatها و eventهای پخش.

### مسئولیت‌ها

-   play/pause/seek/complete/progress
    
-   buffering events
    
-   playback failures
    
-   heartbeat ingestion
    
-   batching / buffering
    
-   publish to Kafka
    

### ارتباطات

-   clients/BFF
    
-   Kafka
    
-   Resume Service
    
-   Analytics
    
-   Billing/Payout
    
-   Ad measurement
    

---

## 3.21 Resume / Continue Listening Service

### وظیفه

ذخیره آخرین موقعیت پخش.

### مسئولیت‌ها

-   resume position
    
-   multi-device sync
    
-   last played episode
    
-   recent queue state
    

### ارتباطات

-   Telemetry consumer
    
-   Redis
    
-   PostgreSQL
    
-   Web/Mobile BFF
    

---

## 3.22 Offline Download Service

### وظیفه

مدیریت دانلود آفلاین.

### مسئولیت‌ها

-   entitlement-aware download grant
    
-   secure package issuance
    
-   expiration policy
    
-   download revocation
    
-   offline license refresh
    

### ارتباطات

-   Auth
    
-   Entitlement
    
-   Playback Authorization
    
-   CDN / packaging layer
    

---

