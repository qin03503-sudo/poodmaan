# 6.1 معماری پیشنهادی Gateway

```
```
Client  
  ↓  
CDN / WAF  
  ↓  
Public Load Balancer  
  ↓  
Kong Gateway  
  ↓  
BFF Services  
  ↓  
gRPC Internal Services  
  ↓  
Istio Service Mesh
```
```

---

## 6.2 چه چیزهایی در Gateway باشد و چه چیزهایی نباشد

### در Gateway باشد:

-   JWT verification
    
-   request id injection
    
-   rate limiting
    
-   basic request validation
    
-   route mapping
    
-   API key validation for partners
    
-   bot / abuse protection
    
-   metrics
    

### در Gateway نباشد:

-   business logic
    
-   entitlement logic پیچیده
    
-   aggregation logic
    
-   heavy transformation
    
-   orchestration
    

---

## 6.3 Route grouping در Gateway

```
```
/api/v1/auth/*  
/api/v1/me/*  
/api/v1/home/*  
/api/v1/search/*  
/api/v1/playback/*  
/api/v1/billing/*  
/api/v1/creator/*  
/api/v1/admin/*  
/webhooks/*
```
```

هر دسته باید:

-   policy جدا
    
-   timeout جدا
    
-   rate limit جدا
    
-   auth mode جدا  
    داشته باشد.
    

---

