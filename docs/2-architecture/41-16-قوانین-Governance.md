# 16\. قوانین Governance

## 16.1 ADR اجباری

هر تصمیم معماری مهم باید ADR داشته باشد:

```
```
چرا Go؟  
چرا gRPC؟  
چرا Kafka؟  
چرا HTTP 206 به جای HLS؟  
چرا database-per-domain؟  
چرا APISIX/Kong/Envoy؟  
چرا PostgreSQL برای Catalog؟
```
```

---

## 16.2 RFC برای تغییرات بزرگ

هر تغییر بزرگ:

```
```
new service  
new database  
new Kafka topic  
new public API  
new payment workflow  
new data model
```
```

باید RFC داشته باشد.

ساختار RFC:

```
```
Problem  
Context  
Goals  
Non-goals  
Options  
Decision  
Trade-offs  
Migration plan  
Observability  
Security impact  
Rollback plan
```
```

---

## 16.3 CODEOWNERS

```
```
/services/billing-service/**       @monetization-team  
/services/catalog-service/**       @content-platform-team  
/contracts/proto/billing/**        @architecture @monetization-team  
/infra/**                          @platform-team  
/db/billing/**                     @monetization-team @data-platform
```
```

---

