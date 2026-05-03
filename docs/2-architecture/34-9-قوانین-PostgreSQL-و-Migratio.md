# 9\. قوانین PostgreSQL و Migration

## 9.1 Migration بدون downtime

قانون Expand/Contract:

```
```
1. Add nullable column  
2. Deploy code writing both old/new  
3. Backfill  
4. Switch reads  
5. Stop writing old  
6. Drop old column later
```
```

ممنوع:

```
SQL

```
ALTERTABLE episodes DROPCOLUMN old_field;
```
```

در همان release که کد قبلی هنوز ممکن است اجرا شود.

---

## 9.2 جدول‌های حجیم partition شوند

این‌ها partition لازم دارند:

```
```
playback events  
audit logs  
webhook events  
outbox events  
processed_events  
analytics raw ingestion
```
```

---

## 9.3 Connection pool اجباری

برای Go services:

```
```
max_open_conns  
max_idle_conns  
conn_max_lifetime  
statement timeout
```
```

در Kubernetes، بدون pool discipline، خیلی سریع PostgreSQL را خفه می‌کنید.

---

