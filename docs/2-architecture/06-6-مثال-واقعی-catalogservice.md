# 6\. مثال واقعی: `catalog-service`

```
```
services/catalog-service/  
├── cmd/  
│   └── server/  
│       └── main.go  
│  
├── internal/  
│   ├── bootstrap/  
│   │   ├── app.go  
│   │   ├── dependencies.go  
│   │   ├── grpc_server.go  
│   │   ├── kafka_publishers.go  
│   │   └── shutdown.go  
│   │  
│   ├── domain/  
│   │   ├── entity/  
│   │   │   ├── podcast.go  
│   │   │   ├── episode.go  
│   │   │   ├── creator.go  
│   │   │   ├── season.go  
│   │   │   └── category.go  
│   │   │  
│   │   ├── valueobject/  
│   │   │   ├── podcast_status.go  
│   │   │   ├── episode_status.go  
│   │   │   ├── slug.go  
│   │   │   ├── language_code.go  
│   │   │   └── availability_type.go  
│   │   │  
│   │   ├── event/  
│   │   │   ├── podcast_created.go  
│   │   │   ├── podcast_updated.go  
│   │   │   ├── episode_created.go  
│   │   │   ├── episode_published.go  
│   │   │   └── episode_unpublished.go  
│   │   │  
│   │   ├── policy/  
│   │   │   ├── publishing_policy.go  
│   │   │   └── visibility_policy.go  
│   │   │  
│   │   └── error/  
│   │       ├── errors.go  
│   │       └── codes.go  
│   │  
│   ├── application/  
│   │   ├── command/  
│   │   │   ├── create_podcast.go  
│   │   │   ├── update_podcast.go  
│   │   │   ├── create_episode.go  
│   │   │   ├── update_episode.go  
│   │   │   ├── publish_episode.go  
│   │   │   └── unpublish_episode.go  
│   │   │  
│   │   ├── query/  
│   │   │   ├── get_podcast.go  
│   │   │   ├── list_podcast_episodes.go  
│   │   │   ├── get_episode.go  
│   │   │   └── list_categories.go  
│   │   │  
│   │   ├── handler/  
│   │   │   ├── podcast_command_handler.go  
│   │   │   ├── episode_command_handler.go  
│   │   │   └── catalog_query_handler.go  
│   │   │  
│   │   └── dto/  
│   │       ├── podcast_dto.go  
│   │       └── episode_dto.go  
│   │  
│   ├── ports/  
│   │   ├── inbound/  
│   │   │   └── catalog_service.go  
│   │   └── outbound/  
│   │       ├── podcast_repository.go  
│   │       ├── episode_repository.go  
│   │       ├── event_publisher.go  
│   │       └── media_asset_client.go  
│   │  
│   ├── adapters/  
│   │   ├── inbound/  
│   │   │   ├── grpc/  
│   │   │   │   ├── catalog_grpc_handler.go  
│   │   │   │   └── mapper.go  
│   │   │   └── kafka/  
│   │   │       └── media_processed_consumer.go  
│   │   │  
│   │   └── outbound/  
│   │       ├── postgres/  
│   │       │   ├── podcast_repository.go  
│   │       │   ├── episode_repository.go  
│   │       │   ├── models.go  
│   │       │   └── tx.go  
│   │       │  
│   │       ├── kafka/  
│   │       │   ├── catalog_event_publisher.go  
│   │       │   └── topics.go  
│   │       │  
│   │       └── grpcclient/  
│   │           ├── media_client.go  
│   │           └── creator_client.go  
│   │  
│   └── observability/  
│       ├── metrics.go  
│       └── tracing.go  
│  
├── migrations/  
├── test/  
├── deployments/  
├── go.mod  
└── README.md
```
```

این ساختار باعث می‌شود Catalog بعداً بدون شکستن بقیه سیستم بتواند بزرگ شود.

---

