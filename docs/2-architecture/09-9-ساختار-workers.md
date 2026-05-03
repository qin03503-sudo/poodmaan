# 9\. ساختار `workers/`

Workerها نباید با سرویس‌های اصلی قاطی شوند اگر lifecycle، scaling یا منابع متفاوت دارند.

مثلاً `workers/search-indexer`:

```
```
workers/search-indexer/  
├── cmd/  
│   └── worker/  
│       └── main.go  
│  
├── internal/  
│   ├── config/  
│   ├── consumer/  
│   │   ├── catalog_episode_changed_consumer.go  
│   │   ├── podcast_changed_consumer.go  
│   │   └── transcript_ready_consumer.go  
│   │  
│   ├── indexer/  
│   │   ├── podcast_indexer.go  
│   │   ├── episode_indexer.go  
│   │   ├── transcript_indexer.go  
│   │   └── mapper.go  
│   │  
│   ├── storage/  
│   │   ├── opensearch_client.go  
│   │   └── bulk_writer.go  
│   │  
│   ├── retry/  
│   │   ├── backoff.go  
│   │   └── dlq.go  
│   │  
│   └── observability/  
│  
├── deployments/  
├── test/  
└── go.mod
```
```

مثلاً `workers/rss-crawler`:

```
```
workers/rss-crawler/  
├── cmd/  
│   └── worker/  
│  
├── internal/  
│   ├── scheduler/  
│   ├── crawler/  
│   │   ├── fetcher.go  
│   │   ├── parser.go  
│   │   ├── normalizer.go  
│   │   └── change_detector.go  
│   │  
│   ├── application/  
│   │   ├── crawl_feed.go  
│   │   └── import_episode.go  
│   │  
│   ├── adapters/  
│   │   ├── postgres/  
│   │   ├── kafka/  
│   │   └── grpcclient/  
│   │  
│   └── observability/  
│  
└── go.mod
```
```

---

