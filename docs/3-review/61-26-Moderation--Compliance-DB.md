# 2.6 Moderation / Compliance DB

## 2.6.1 moderation\_cases

```
SQL

```
moderation_cases  
- id  
- entity_type  
- entity_id  
- case_type (copyright, hate_speech, spam, abuse, legal_request)  
- status (open, reviewing, actioned, dismissed, escalated)  
- priority  
- opened_by  
- assigned_to  
- opened_at  
- updated_at
```
```

---

## 2.6.2 moderation\_case\_events

```
SQL

```
moderation_case_events  
- id  
- case_id  
- actor_type (system, admin, creator, reporter)  
- actor_id  
- event_type  
- payload_jsonb  
- created_at
```
```

---

## 2.6.3 user\_reports

```
SQL

```
user_reports  
- id  
- reporter_user_id  
- entity_type  
- entity_id  
- reason_code  
- description  
- created_at  
- status
```
```

---

## 2.6.4 audit\_logs

```
SQL

```
audit_logs  
- id  
- actor_type  
- actor_id  
-action  
- entity_type  
- entity_id  
- old_value_jsonb  
- new_value_jsonb  
- metadata_jsonb  
- ip_address  
- created_at
```
```

---

