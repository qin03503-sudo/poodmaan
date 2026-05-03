# B. Identity, Access & User Domain

## 3.6 Auth & Identity Service

### وظیفه

مدیریت هویت و نشست.

### مسئولیت‌ها

-   signup/login
    
-   OAuth with Google/Apple
    
-   JWT issuance
    
-   refresh/session management
    
-   token revocation
    
-   device/session tracking
    
-   account security policies
    

### ارتباطات

-   User Profile Service
    
-   RBAC / Permission Service
    
-   Entitlement Service
    
-   Redis for session/cache
    
-   BFF / Gateway
    

---

## 3.7 User Profile Service

### وظیفه

مدیریت پروفایل پایه کاربر.

### مسئولیت‌ها

-   profile data
    
-   avatar
    
-   locale
    
-   preferences
    
-   playback preferences
    
-   privacy settings
    

### ارتباطات

-   Auth
    
-   Notification Preferences
    
-   User Library
    
-   Recommendation feature extraction
    

---

## 3.8 Access Control / RBAC Service

### وظیفه

مدیریت نقش‌ها و مجوزها.

### مسئولیت‌ها

-   system roles
    
-   admin roles
    
-   creator roles
    
-   permission policies
    
-   fine-grained access checks
    

### ارتباطات

-   Admin BFF
    
-   Creator BFF
    
-   Auth
    

---

## 3.9 Device & Session Service

### وظیفه

مدیریت دستگاه‌ها و نشست‌های فعال.

### مسئولیت‌ها

-   device registration
    
-   session inventory
    
-   logout from all devices
    
-   suspicious session detection
    
-   playback continuity metadata
    

---

