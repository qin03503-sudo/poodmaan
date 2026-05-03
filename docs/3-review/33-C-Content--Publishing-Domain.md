# C. Content & Publishing Domain

## 3.10 Catalog Service

### وظیفه

Source of Truth برای متادیتای پادکست و اپیزود.

### مسئولیت‌ها

-   podcast CRUD
    
-   episode CRUD
    
-   seasons
    
-   categories/tags
    
-   language
    
-   availability rules
    
-   publishing metadata
    
-   creator ownership
    

### ارتباطات

-   Creator BFF
    
-   Search via CDC/Kafka
    
-   Recommendation
    
-   Notification triggers
    
-   Media metadata linkage
    

### دیتابیس

PostgreSQL

---

## 3.11 Creator / Channel Service

### وظیفه

مدیریت موجودیت creator/channel.

### مسئولیت‌ها

-   creator profiles
    
-   verification status
    
-   payout linkage
    
-   branding data
    
-   channel-level settings
    

### ارتباطات

-   Catalog
    
-   Billing
    
-   Analytics
    
-   Trust & Safety
    

---

## 3.12 Publishing Workflow Service

### وظیفه

مدیریت فرآیند انتشار.

### مسئولیت‌ها

-   draft
    
-   scheduled publish
    
-   unpublish
    
-   embargo
    
-   visibility windows
    
-   region restrictions
    
-   moderation gate checks
    

### ارتباطات

-   Catalog
    
-   Media
    
-   Trust & Safety
    
-   Notification
    
-   Search reindex events
    

---

## 3.13 RSS Aggregator & Ingestion Service

### وظیفه

وارد کردن پادکست‌ها از RSS خارجی.

### مسئولیت‌ها

-   periodic crawling
    
-   feed parsing
    
-   change detection
    
-   new episode detection
    
-   import normalization
    
-   mapping external content to internal catalog
    

### ارتباطات

-   Catalog
    
-   Media Processing
    
-   Kafka
    
-   Search update events
    

---

## 3.14 Bulk Import / Migration Service

### وظیفه

مهاجرت creatorها از پلتفرم‌های دیگر.

### مسئولیت‌ها

-   import via RSS
    
-   bulk metadata import
    
-   asset mapping
    
-   error reporting
    
-   retryable long-running jobs
    

### ارتباطات

-   Export/Batch framework
    
-   Catalog
    
-   Media
    
-   Notifications
    

---

