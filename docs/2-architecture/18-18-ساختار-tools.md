# 18\. ساختار `tools/`

```
```
tools/  
├── codegen/  
│   ├── generate-openapi-client.sh  
│   ├── generate-proto.sh  
│   ├── generate-event-types.sh  
│   └── generate-mocks.sh  
│  
├── proto-gen/  
│   ├── go/  
│   ├── ts/  
│   └── buf.gen.yaml  
│  
├── event-schema-validator/  
│   ├── main.go  
│   ├── validator/  
│   └── README.md  
│  
├── migration-runner/  
│   ├── main.go  
│   ├── config/  
│   └── README.md  
│  
├── load-test/  
│   ├── k6/  
│   │   ├── playback-authorize.js  
│   │   ├── telemetry-ingest.js  
│   │   ├── search.js  
│   │   └── home-feed.js  
│   └── scenarios/  
│  
└── scripts/  
    ├── bootstrap-local.sh  
    ├── reset-local-db.sh  
    ├── seed-local-data.sh  
    ├── check-breaking-proto.sh  
    └── check-event-schemas.sh
```
```

---

