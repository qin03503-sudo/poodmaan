# 6) فاز بعدی واقعی: POC و Validation

بعد از معماری، نباید مستقیم بروی سراغ build همه‌چیز.  
باید چند **Proof of Concept** و **Spike** اجرا کنی.

### POCهای مهم برای این سیستم

1.  **Playback POC**
    
    -   Faststart + signed URL + HTTP 206
        
    -   latency واقعی
        
    -   behavior on poor network
        
2.  **Telemetry POC**
    
    -   heartbeat ingestion throughput
        
    -   batching
        
    -   Kafka lag behavior
        
3.  **Entitlement POC**
    
    -   Redis + Billing sync
        
    -   worst-case latency
        
4.  **Search POC**
    
    -   transcript search
        
    -   indexing delay
        
    -   typo tolerance
        
5.  **Media Processing POC**
    
    -   upload to processing lifecycle
        
    -   failure recovery
        
6.  **Billing correctness POC**
    
    -   idempotency
        
    -   webhook replay
        
    -   ledger consistency
        
7.  **Analytics POC**
    
    -   raw event → ClickHouse → dashboard freshness
        
8.  **Gateway benchmark**
    
    -   Kong vs APISIX vs Envoy ingress
        

### خروجی‌های لازم

-   POC report
    
-   benchmark numbers
    
-   final recommendation
    
-   architecture adjustments
    

---

