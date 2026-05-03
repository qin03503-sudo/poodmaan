# 7\. مثال واقعی: `playback-telemetry-service`

این سرویس write-heavy است و نباید مستقیم روی PostgreSQL فشار بگذارد.

```
```
services/playback-telemetry-service/  
├── cmd/  
│   ├── server/  
│   │   └── main.go  
│   └── worker/  
│       └── main.go  
│  
├── internal/  
│   ├── domain/  
│   │   ├── entity/  
│   │   │   ├── playback_event.go  
│   │   │   ├── playback_session.go  
│   │   │   └── heartbeat.go  
│   │   │  
│   │   ├── valueobject/  
│   │   │   ├── playback_event_type.go  
│   │   │   ├── platform.go  
│   │   │   └── network_type.go  
│   │   │  
│   │   └── policy/  
│   │       ├── heartbeat_validation_policy.go  
│   │       └── deduplication_policy.go  
│   │  
│   ├── application/  
│   │   ├── command/  
│   │   │   ├── ingest_heartbeat.go  
│   │   │   ├── start_session.go  
│   │   │   ├── end_session.go  
│   │   │   └── report_playback_failure.go  
│   │   │  
│   │   ├── handler/  
│   │   │   ├── ingest_heartbeat_handler.go  
│   │   │   └── session_handler.go  
│   │   │  
│   │   └── dto/  
│   │       ├── heartbeat_request.go  
│   │       └── playback_event_dto.go  
│   │  
│   ├── ports/  
│   │   └── outbound/  
│   │       ├── event_publisher.go  
│   │       ├── redis_session_store.go  
│   │       └── idempotency_store.go  
│   │  
│   ├── adapters/  
│   │   ├── inbound/  
│   │   │   ├── grpc/  
│   │   │   └── http/  
│   │   │  
│   │   └── outbound/  
│   │       ├── kafka/  
│   │       │   ├── playback_event_publisher.go  
│   │       │   └── topics.go  
│   │       └── redis/  
│   │           ├── session_store.go  
│   │           └── dedup_store.go  
│   │  
│   └── observability/  
│  
├── test/  
├── deployments/  
└── go.mod
```
```

---

