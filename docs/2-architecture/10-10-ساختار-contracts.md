# 10\. ساختار `contracts/`

این بخش باید **source of truth** برای APIها و eventها باشد.

```
```
contracts/  
├── proto/  
│   ├── auth/  
│   │   └── v1/  
│   │       ├── auth.proto  
│   │       ├── auth_service.proto  
│   │       ├── auth_messages.proto  
│   │       └── README.md  
│   │  
│   ├── catalog/  
│   │   └── v1/  
│   │       ├── catalog_service.proto  
│   │       ├── podcast.proto  
│   │       ├── episode.proto  
│   │       ├── creator.proto  
│   │       └── README.md  
│   │  
│   ├── media/  
│   ├── playback/  
│   ├── billing/  
│   ├── entitlement/  
│   ├── notification/  
│   ├── analytics/  
│   └── common/  
│       └── v1/  
│           ├── pagination.proto  
│           ├── money.proto  
│           ├── errors.proto  
│           ├── timestamp.proto  
│           └── identity.proto  
│  
├── openapi/  
│   ├── public/  
│   │   ├── v1.yaml  
│   │   └── README.md  
│   ├── creator/  
│   │   ├── v1.yaml  
│   │   └── README.md  
│   └── admin/  
│       ├── v1.yaml  
│       └── README.md  
│  
└── events/  
    ├── media/  
    │   ├── uploaded/  
    │   │   └── v1.schema.json  
    │   ├── processed/  
    │   │   └── v1.schema.json  
    │   └── processing-failed/  
    │       └── v1.schema.json  
    │  
    ├── catalog/  
    │   ├── episode-published/  
    │   │   └── v1.schema.json  
    │   └── episode-updated/  
    │       └── v1.schema.json  
    │  
    ├── playback/  
    │   ├── session-started/  
    │   │   └── v1.schema.json  
    │   ├── heartbeat/  
    │   │   └── v1.schema.json  
    │   └── completed/  
    │       └── v1.schema.json  
    │  
    ├── billing/  
    │   ├── payment-succeeded/  
    │   ├── payment-failed/  
    │   ├── subscription-changed/  
    │   └── entitlement-changed/  
    │  
    └── notification/  
        └── triggered/  
            └── v1.schema.json
```
```

## قوانین این بخش

-   هیچ event بدون schema وارد Kafka نشود.
    
-   هیچ gRPC بدون proto وارد سرویس نشود.
    
-   breaking change بدون version جدید ممنوع.
    
-   `common/v1` فقط شامل typeهای عمومی باشد، نه domain logic.
    

---

