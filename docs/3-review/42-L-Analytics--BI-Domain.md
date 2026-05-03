# L. Analytics & BI Domain

## 3.51 Event Ingestion Backbone

این لایه logical است و چند سرویس را به هم متصل می‌کند.

### اجزا

-   Telemetry producers
    
-   Webhook ingress
    
-   Kafka
    
-   DLQ
    
-   stream processors
    

---

## 3.52 Analytics Aggregation Service

### وظیفه

تجمیع eventها برای داشبوردها.

### مسئولیت‌ها

-   aggregate metrics
    
-   unique listeners
    
-   listen duration
    
-   completion rate
    
-   cohort metrics
    
-   geo/device breakdown
    

### ارتباطات

-   Kafka
    
-   ClickHouse
    
-   Creator Analytics API
    

---

## 3.53 Creator Analytics API

### وظیفه

ارائه داده‌های dashboard به Creator Studio.

### مسئولیت‌ها

-   time-series metrics
    
-   episode analytics
    
-   audience retention
    
-   revenue analytics
    
-   ad performance
    

### ارتباطات

-   OLAP store
    
-   payout metrics
    
-   BFF
    

---

## 3.54 Product Analytics Service

### وظیفه

تحلیل محصول برای تیم داخلی.

### مسئولیت‌ها

-   funnel analysis
    
-   search quality
    
-   feature adoption
    
-   retention
    
-   experiment metrics
    

---

