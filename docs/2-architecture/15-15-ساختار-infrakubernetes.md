# 15\. ساختار `infra/kubernetes`

```
```
infra/kubernetes/  
├── base/  
│   ├── namespaces/  
│   │   ├── apps.yaml  
│   │   ├── data.yaml  
│   │   ├── platform.yaml  
│   │   └── observability.yaml  
│   │  
│   ├── network-policies/  
│   │   ├── default-deny.yaml  
│   │   ├── allow-gateway-to-bff.yaml  
│   │   ├── allow-services-to-kafka.yaml  
│   │   └── allow-services-to-postgres.yaml  
│   │  
│   ├── service-accounts/  
│   ├── pod-security/  
│   ├── resource-quotas/  
│   └── kustomization.yaml  
│  
├── apps/  
│   ├── web/  
│   ├── creator-studio/  
│   ├── admin-console/  
│   └── mobile-api/  
│  
├── services/  
│   ├── auth-service/  
│   ├── catalog-service/  
│   ├── media-processing-service/  
│   ├── playback-telemetry-service/  
│   ├── billing-service/  
│   └── ...  
│  
├── workers/  
│   ├── rss-crawler/  
│   ├── search-indexer/  
│   └── playback-consumers/  
│  
├── operators/  
│   ├── cert-manager/  
│   ├── external-secrets/  
│   ├── ingress-controller/  
│   ├── prometheus-operator/  
│   ├── strimzi-kafka/  
│   ├── postgres-operator/  
│   ├── redis-operator/  
│   ├── argocd/  
│   ├── keda/  
│   ├── kyverno/  
│   └── service-mesh/  
│  
└── overlays/  
    ├── dev/  
    ├── staging/  
    └── prod/
```
```

## برای هر سرویس Kubernetes

```
```
infra/kubernetes/services/catalog-service/  
├── deployment.yaml  
├── service.yaml  
├── hpa.yaml  
├── pdb.yaml  
├── serviceaccount.yaml  
├── configmap.yaml  
├── externalsecret.yaml  
├── servicemonitor.yaml  
├── virtualservice.yaml  
├── destinationrule.yaml  
└── kustomization.yaml
```
```

---

