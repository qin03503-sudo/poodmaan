# 🔴 5. API Design Strategy (ضعیف پوشش داده شده)

### ❗ مشکل

فقط گفته:  
Gateway → gRPC

اما:

-   Versioning
    
-   Rate limiting per user
    
-   API evolution نیست
    

### ✅ باید اضافه شود:

-   API Versioning:
    
    -   /v1 /v2
        
-   GraphQL Federation (برای BFF)
    
-   Schema registry برای protobuf
    
-   Backward compatibility strategy
    

---

