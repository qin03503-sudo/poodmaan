# 17\. ساختار `deploy/`

```
```
deploy/  
├── docker/  
│   ├── go-service.Dockerfile  
│   ├── go-worker.Dockerfile  
│   ├── nextjs.Dockerfile  
│   └── nginx.Dockerfile  
│  
├── compose/  
│   ├── docker-compose.local.yml  
│   ├── docker-compose.observability.yml  
│   ├── docker-compose.kafka.yml  
│   └── docker-compose.db.yml  
│  
└── argocd/  
    ├── projects/  
    │   ├── apps.yaml  
    │   ├── services.yaml  
    │   ├── platform.yaml  
    │   └── observability.yaml  
    │  
    ├── applications/  
    │   ├── dev/  
    │   ├── staging/  
    │   └── prod/  
    │  
    └── app-of-apps.yaml
```
```

---

