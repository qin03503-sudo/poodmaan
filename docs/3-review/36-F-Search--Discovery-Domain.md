# F. Search & Discovery Domain

## 3.27 Search API Service

### وظیفه

API جستجو برای کلاینت.

### مسئولیت‌ها

-   keyword search
    
-   fuzzy search
    
-   transcript search
    
-   faceted filtering
    
-   autocomplete
    
-   ranking orchestration
    

### ارتباطات

-   Elasticsearch/OpenSearch/Typesense
    
-   Query analytics
    
-   Catalog consistency checks
    
-   BFF
    

---

## 3.28 Search Indexing Pipeline

### وظیفه

ایندکس‌سازی تغییرات.

### اجزا

-   Debezium
    
-   Kafka Connect
    
-   Indexer workers
    

### مسئولیت‌ها

-   CDC from Postgres
    
-   schema transformation
    
-   index update
    
-   reindex workflows
    
-   backfill support
    

---

## 3.29 Discovery Service

### وظیفه

ردیف‌ها و بخش‌های غیرشخصی یا نیمه‌شخصی.

### مسئولیت‌ها

-   trending
    
-   editorial picks
    
-   popular by category
    
-   new releases
    
-   region/language discovery
    

### ارتباطات

-   Analytics
    
-   Catalog
    
-   Recommendation
    
-   Search signals
    

---

