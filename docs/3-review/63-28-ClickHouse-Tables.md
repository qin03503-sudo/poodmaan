# 2.8 ClickHouse Tables

ClickHouse برای analytics eventها و aggregationها.

## raw\_playback\_events

```
SQL

```
raw_playback_events  
- event_time DateTime  
- event_date Date  
- user_id UUID  
- episode_id UUID  
- podcast_id UUID  
- creator_id UUID  
- session_id UUID  
- event_type String  
- position_seconds UInt32  
- app_platform String  
- country_code String  
- device_type String  
- network_type String  
- experiment_bucket String  
- ingestion_time DateTime
```
```

Partition:

-   by month on event\_date
    

Order by:

-   (event\_date, episode\_id, user\_id, session\_id)
    

---

## episode\_daily\_metrics

```
SQL

```
episode_daily_metrics  
- event_date Date  
- episode_id UUID  
- podcast_id UUID  
- creator_id UUID  
- unique_listeners UInt64  
- total_plays UInt64  
- completions UInt64  
- listened_seconds UInt64  
- avg_completion_rate Float64
```
```

---

## creator\_daily\_metrics

```
SQL

```
creator_daily_metrics  
- event_date Date  
- creator_id UUID  
- total_listeners UInt64  
- total_streams UInt64  
- listened_seconds UInt64  
- revenue_estimate Float64
```
```

---

