# 7\. قوانین API Design

## 7.1 Public API، Internal API و Event API را جدا کن

```
```
Public API     → REST/JSON via BFF  
Internal API   → gRPC/Protobuf  
Event API      → Kafka + schema  
Admin API      → REST/JSON with stronger auth/audit  
Creator API    → REST/JSON via Creator BFF
```
```

---

## 7.2 Clientها مستقیم به domain service وصل نشوند

درست:

```
```
Web/Mobile  
  ↓  
API Gateway  
  ↓  
Web/Mobile BFF  
  ↓  
gRPC services
```
```

ممنوع:

```
```
Web → catalog-service  
Web → billing-service  
Web → entitlement-service
```
```

---

## 7.3 API Gateway سریع و مدرن

برای این پروژه، پیشنهاد من:

```
```
Cloudflare / AWS CloudFront / WAF  
        ↓  
Envoy Gateway یا APISIX  
        ↓  
BFF services  
        ↓  
gRPC internal services
```
```

اگر تمرکز اصلی شما Kubernetes-native، استانداردسازی routeها، portability و آینده‌پذیری است:

```
```
Envoy Gateway + Kubernetes Gateway API
```
```

چون Gateway API در Kubernetes مدل role-oriented دارد و نسبت به Ingress استانداردتر و expressiveتر است؛ نسخه v1.5 در مارس 2026 چند قابلیت مهم مثل TLSRoute، CORS filter، ListenerSet و client certificate validation را به Standard/Stable برده است. [Kubernetes+1](https://kubernetes.io/blog/2026/04/21/gateway-api-v1-5/?utm_source=chatgpt.com)

اگر تمرکز شما سرعت راه‌اندازی، plugin آماده، rate limit، auth plugin، gRPC-web و HTTP-to-gRPC transcoding است:

```
```
Apache APISIX
```
```

APISIX pluginهای gRPC Web و gRPC Transcode دارد و برای تبدیل HTTP به gRPC و proxy کردن gRPC-web مناسب است. [Apache APISIX+1](https://apisix.apache.org/docs/apisix/3.13/plugins/grpc-web/?utm_source=chatgpt.com)

پیشنهاد عملی من:

```
```
Phase 1:  
APISIX یا Kong برای سرعت اجرا  
  
Phase 2:  
استانداردسازی روی Kubernetes Gateway API  
  
Phase 3:  
Envoy Gateway / managed Gateway برای production maturity
```
```

اما Gateway نباید business logic داشته باشد. فقط:

```
```
routing  
TLS  
rate limit  
auth pre-check  
headers  
CORS  
WAF integration  
request size limit  
observability
```
```

---

## 7.4 Error format استاندارد

همه public APIها:

```
JSON

```
{  
  "error": {  
    "code": "ENTITLEMENT_REQUIRED",  
    "message": "You do not have access to this episode.",  
    "request_id": "req_123",  
    "details": {}  
  }  
}
```
```

gRPC:

```
proto

```
message ErrorDetail {  
  string code = 1;  
  string message = 2;  
  map<string, string> metadata = 3;  
}
```
```

---

## 7.5 Pagination استاندارد

ممنوع:

```
```
?page=1&limit=100000
```
```

درست:

```
```
cursor-based pagination
```
```

```
http

```
GET /api/v1/podcasts/{id}/episodes?cursor=abc&limit=30
```
```

Response:

```
JSON

```
{  
  "items": [],  
  "next_cursor": "xyz",  
  "has_more": true  
}
```
```

---

