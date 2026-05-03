# 16\. ساختار `infra/helm`

اگر بخواهید deployment سرویس‌ها template شود:

```
```
infra/helm/  
├── charts/  
│   ├── go-service/  
│   │   ├── Chart.yaml  
│   │   ├── values.yaml  
│   │   └── templates/  
│   │       ├── deployment.yaml  
│   │       ├── service.yaml  
│   │       ├── hpa.yaml  
│   │       ├── pdb.yaml  
│   │       ├── configmap.yaml  
│   │       ├── externalsecret.yaml  
│   │       └── servicemonitor.yaml  
│   │  
│   ├── nextjs-app/  
│   └── worker/  
│  
└── values/  
    ├── dev/  
    ├── staging/  
    └── prod/
```
```

---

