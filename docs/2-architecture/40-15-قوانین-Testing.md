# 15\. قوانین Testing

## 15.1 Test pyramid برای این پروژه

```
```
Unit tests  
Integration tests  
Contract tests  
Component tests  
E2E tests  
Load tests  
Chaos tests  
Security tests
```
```

---

## 15.2 Contract tests حیاتی‌اند

برای gRPC:

```
```
proto breaking check  
consumer contract tests  
backward compatibility
```
```

برای events:

```
```
schema validation  
consumer compatibility  
sample payload tests
```
```

برای REST:

```
```
OpenAPI validation  
generated client tests
```
```

---

## 15.3 Load testهای اولیه

از همان اول برای این مسیرها k6 بنویسید:

```
```
POST /api/v1/playback/authorize  
POST /api/v1/playback/heartbeat  
GET /api/v1/home  
GET /api/v1/search  
POST /creator-api/v1/uploads
```
```

---

