# 13\. قوانین Observability

## 13.1 OpenTelemetry از روز اول

OpenTelemetry یک framework متن‌باز و vendor-neutral برای traces، metrics و logs است و اجازه می‌دهد یک بار instrumentation انجام دهید و بعد به backendهای مختلف export کنید. [OpenTelemetry+1](https://opentelemetry.io/?utm_source=chatgpt.com)

هر request باید این metadata را داشته باشد:

```
```
request_id  
trace_id  
user_id if available  
service_name  
route  
status_code  
latency  
error_code
```
```

---

## 13.2 Golden Signals

برای هر سرویس:

```
```
Latency  
Traffic  
Errors  
Saturation
```
```

برای Kafka consumer:

```
```
consumer lag  
processing rate  
error rate  
DLQ rate  
replay count
```
```

برای Redis:

```
```
hit ratio  
evictions  
latency  
memory usage  
connection count
```
```

برای Postgres:

```
```
slow queries  
locks  
connections  
replication lag  
dead tuples  
partition growth
```
```

---

## 13.3 SLO نه فقط uptime

مثلاً:

```
```
Playback authorization P95 < 80ms  
Search P95 < 150ms  
Telemetry ingestion availability > 99.99%  
Billing webhook processing P99 < 5s  
Creator dashboard freshness < 5min
```
```

DORA تاکید می‌کند که performance فقط delivery speed نیست؛ reliability و ability to keep promises هم باید با SLO و operational performance سنجیده شود. [Dora](https://dora.dev/research/2024/dora-report/?utm_source=chatgpt.com)

---

