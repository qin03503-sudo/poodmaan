# 14\. قوانین Platform و Kubernetes

## 14.1 GitOps اجباری برای production

CNCF در 2025 GitOps را به‌عنوان یک استاندارد عملیاتی mainstream برای Kubernetes معرفی می‌کند: Git source of truth، تغییرات از طریق PR، reconciliation مداوم با Argo CD/Flux و rollback از طریق revert commit. [CNCF](https://www.cncf.io/blog/2025/06/09/gitops-in-2025-from-old-school-updates-to-the-modern-way/?utm_source=chatgpt.com)

قانون:

```
```
هیچ kubectl دستی در production  
هیچ تغییر دستی در console  
همه چیز از Git
```
```

---

## 14.2 Environment parity

```
```
dev  
staging  
pre-prod  
prod
```
```

همه باید از یک manifest/template استفاده کنند؛ فقط values فرق کند.

---

## 14.3 Resource discipline

هر deployment باید داشته باشد:

```
YAML

```
resources:  
  requests:  
    cpu:  
    memory:  
  limits:  
    cpu:  
    memory:
```
```

بدون resource limit، production Kubernetes قابل اعتماد نیست.

---

## 14.4 Network policy پیش‌فرض deny

```
```
default deny all  
allow gateway → bff  
allow services → kafka  
allow services → own database  
allow observability collector
```
```

---

