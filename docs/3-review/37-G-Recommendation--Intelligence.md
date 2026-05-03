# G. Recommendation & Intelligence Domain

## 3.30 Recommendation Service

### وظیفه

توصیه شخصی‌سازی‌شده.

### مسئولیت‌ها

-   recommended for you
    
-   because you listened to
    
-   similar podcasts
    
-   next-best episode
    
-   personalized ranking
    

### ارتباطات

-   Feature Store
    
-   User behavior events
    
-   Catalog
    
-   User Library
    
-   BFF
    

---

## 3.31 Feature Pipeline Service

### وظیفه

تولید feature برای ML.

### مسئولیت‌ها

-   ingest events
    
-   user embeddings/features
    
-   episode/content features
    
-   creator affinity
    
-   freshness/popularity features
    

### ارتباطات

-   Kafka
    
-   ClickHouse / Data Lake
    
-   Redis / feature store
    
-   Recommendation engine
    

---

## 3.32 Model Serving / Ranking Service

### وظیفه

serving مدل‌های recommendation/ranking.

### مسئولیت‌ها

-   online inference
    
-   scoring candidates
    
-   reranking
    
-   experiment-aware ranking
    

---

## 3.33 Experimentation / A-B Testing Service

### وظیفه

مدیریت experimentها.

### مسئولیت‌ها

-   experiment definitions
    
-   user bucketing
    
-   rollout rules
    
-   metric attribution
    
-   feature exposure
    

### ارتباطات

-   BFF
    
-   Recommendation
    
-   Config/Feature Flags
    
-   Analytics
    

---

