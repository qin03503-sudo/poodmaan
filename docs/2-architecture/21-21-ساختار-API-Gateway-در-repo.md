# 21\. ساختار API Gateway در repo

اگر از Kong یا APISIX استفاده کنید، config آن باید در monorepo version شود.

```
```
infra/gateway/  
├── kong/  
│   ├── base/  
│   │   ├── services.yaml  
│   │   ├── routes.yaml  
│   │   ├── plugins.yaml  
│   │   ├── consumers.yaml  
│   │   └── upstreams.yaml  
│   │  
│   ├── overlays/  
│   │   ├── dev/  
│   │   ├── staging/  
│   │   └── prod/  
│   │  
│   └── README.md  
│  
└── policies/  
    ├── rate-limits.yaml  
    ├── auth-rules.yaml  
    ├── cors.yaml  
    ├── ip-blocklist.yaml  
    └── bot-protection.yaml
```
```

بهترین حالت برای پروژه شما:

```
```
CDN/WAF  
  ↓  
Kong یا APISIX  
  ↓  
BFFها  
  ↓  
gRPC internal services
```
```

یعنی Gateway نباید مستقیماً همه سرویس‌های داخلی را به کلاینت expose کند. Gateway فقط مسیرهای بیرونی را به BFFها بدهد.

---

