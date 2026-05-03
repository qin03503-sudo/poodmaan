# 2.1 Identity DB

## 2.1.1 users

اطلاعات پایه کاربر

```
SQL

```
users  
- id (uuid, pk)  
- email (varchar, unique, nullable)  
- phone (varchar, nullable)  
- password_hash (varchar, nullable)  
- status (enum: active, suspended, deleted, pending_verification)  
- email_verified_at (timestamp, nullable)  
- phone_verified_at (timestamp, nullable)  
- locale (varchar)  
- country_code (varchar)  
- timezone (varchar)  
- created_at  
- updated_at  
- deleted_at (nullable)
```
```

### توضیح

-   Source of Truth برای user identity
    
-   اگر social login باشد، ممکن است password\_hash خالی باشد
    

---

## 2.1.2 user\_profiles

پروفایل عمومی/شخصی

```
SQL

```
user_profiles  
- user_id (uuid, pk, fk -> users.id)  
- display_name  
- avatar_asset_id  
- bio  
- preferred_language  
- playback_speed_default (numeric)  
- explicit_content_allowed (bool)  
- marketing_opt_in (bool)  
- created_at  
- updated_at
```
```

---

## 2.1.3 user\_oauth\_accounts

اکانت‌های OAuth متصل

```
SQL

```
user_oauth_accounts  
- id (uuid, pk)  
- user_id (uuid, fk)  
- provider (enum: google, apple, facebook)  
- provider_user_id  
- email  
- linked_at  
- last_login_at
```
```

---

## 2.1.4 sessions

مدیریت sessionها

```
SQL

```
sessions  
- id (uuid, pk)  
- user_id (uuid, fk)  
- refresh_token_hash  
- device_id (uuid, nullable)  
- ip_address  
- user_agent  
- expires_at  
- revoked_at  
- created_at  
- last_seen_at
```
```

### نکته

Access token بهتر است stateless JWT باشد، اما refresh/session حتماً باید persistence داشته باشد.

---

## 2.1.5 devices

ثبت دستگاه‌ها

```
SQL

```
devices  
- id (uuid, pk)  
- user_id (uuid, fk)  
- platform (enum: ios, android, web, desktop)  
- app_version  
- os_version  
- push_token  
- last_seen_at  
- created_at
```
```

---

## 2.1.6 roles

```
SQL

```
roles  
- id  
- code (unique)  
- name  
- created_at
```
```

## 2.1.7 permissions

```
SQL

```
permissions  
- id  
- code (unique)  
- name
```
```

## 2.1.8 role\_permissions

```
SQL

```
role_permissions  
- role_id  
- permission_id
```
```

## 2.1.9 user\_roles

```
SQL

```
user_roles  
- user_id  
- role_id  
- assigned_by  
- assigned_at
```
```

---

