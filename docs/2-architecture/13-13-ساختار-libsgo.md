# 13\. ساختار `libs/go`

`libs/go` فقط برای primitiveهای مشترک زیرساختی است؛ نه domain logic.

```
```
libs/go/  
├── logger/  
│   ├── logger.go  
│   ├── fields.go  
│   └── middleware.go  
│  
├── config/  
│   ├── env.go  
│   ├── loader.go  
│   └── validation.go  
│  
├── errors/  
│   ├── app_error.go  
│   ├── codes.go  
│   ├── grpc_mapper.go  
│   └── http_mapper.go  
│  
├── grpc/  
│   ├── server.go  
│   ├── client.go  
│   ├── interceptors/  
│   │   ├── auth.go  
│   │   ├── logging.go  
│   │   ├── tracing.go  
│   │   ├── recovery.go  
│   │   └── timeout.go  
│   └── health.go  
│  
├── kafka/  
│   ├── producer.go  
│   ├── consumer.go  
│   ├── envelope.go  
│   ├── dlq.go  
│   ├── retry.go  
│   └── schema.go  
│  
├── postgres/  
│   ├── db.go  
│   ├── transaction.go  
│   ├── migration.go  
│   └── pagination.go  
│  
├── redis/  
│   ├── client.go  
│   ├── lock.go  
│   ├── cache.go  
│   └── rate_limit.go  
│  
├── observability/  
│   ├── metrics.go  
│   ├── tracing.go  
│   ├── logging.go  
│   └── otel.go  
│  
├── auth/  
│   ├── jwt.go  
│   ├── claims.go  
│   ├── context.go  
│   └── middleware.go  
│  
├── idempotency/  
│   ├── key.go  
│   ├── store.go  
│   └── middleware.go  
│  
└── money/  
    ├── money.go  
    └── currency.go
```
```

## قانون مهم

این‌ها مجازند:

```
```
logger  
config  
grpc utilities  
kafka utilities  
postgres transaction helper  
redis lock  
observability  
auth middleware  
idempotency helper
```
```

این‌ها ممنوع‌اند:

```
```
podcast business rules  
billing business rules  
entitlement decision logic  
recommendation ranking logic  
publishing policy
```
```

---

