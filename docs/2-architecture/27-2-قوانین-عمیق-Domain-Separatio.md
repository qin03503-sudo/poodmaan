# 2\. قوانین عمیق Domain Separation

## 2.1 هر domain مالک مدل ذهنی خودش است

مثلاً مفهوم `User` در همه‌جا یکسان نیست.

در `Identity`:

```
```
User = موجودیت احراز هویت، session، login، security status
```
```

در `Billing`:

```
```
User = payer / subscriber / customer
```
```

در `Analytics`:

```
```
User = listener_id / anonymous_id / cohort member
```
```

در `Recommendation`:

```
```
User = feature vector / behavior profile
```
```

پس نباید یک `User` global model در `libs/go` بسازید و همه سرویس‌ها همان را import کنند.

### قانون

```
```
هر سرویس مدل domain خودش را دارد.  
اشتراک فقط از طریق contract انجام می‌شود، نه shared domain model.
```
```

مجاز:

```
Go

```
billing.UserID  
identity.UserID  
analytics.ListenerID
```
```

ممنوع:

```
Go

```
shared.User struct {  
ID  
Email  
Profile  
Subscription  
Roles  
}
```
```

---

## 2.2 هر سرویس فقط دیتابیس خودش را می‌خواند

اشتباه خطرناک:

```
```
playback-auth-service → SELECT * FROM billing.entitlements
```
```

درست:

```
```
playback-auth-service → gRPC → entitlement-service
```
```

یا در مسیرهای read-heavy:

```
```
billing.entitlement.changed.v1  
        ↓  
playback-auth-service local read model / Redis cache
```
```

### قانون

```
```
هیچ سرویس production نباید مستقیماً به دیتابیس سرویس دیگر وصل شود.  
حتی اگر از نظر فنی راحت‌تر باشد.
```
```

---

## 2.3 مرز domain را با workflow مشخص کن، نه با noun

مثلاً `Episode` فقط یک noun است. اما این workflowها دامنه را مشخص می‌کنند:

```
```
Create Episode Draft       → Catalog / Publishing  
Upload Audio               → Media Upload  
Process Audio              → Media Processing  
Publish Episode            → Publishing Workflow  
Search Episode             → Search  
Play Episode               → Playback Authorization  
Track Listening            → Telemetry  
Calculate Creator Payout   → Billing / Payout
```
```

پس `Episode` در چند domain حضور دارد، اما **مالک اصلی metadata** فقط `Catalog` است.

---

## 2.4 Anti-Corruption Layer اجباری است

اگر سرویسی با provider خارجی حرف می‌زند، مدل خارجی نباید وارد domain شود.

مثلاً در Billing:

ممنوع:

```
Go

```
funcActivateSubscription(stripeSubstripe.Subscription) error
```
```

درست:

```
Go

```
typePaymentProviderSubscriptionstruct {  
    ProviderSubscriptionID string  
    Status                 ProviderSubscriptionStatus  
    CurrentPeriodEnd       time.Time  
}
```
```

سپس:

```
```
Stripe Adapter → maps Stripe object → Billing domain object
```
```

این قانون برای این بخش‌ها حیاتی است:

```
```
Stripe / PayPal / Apple IAP / Google Play  
CloudFront / S3  
OpenSearch  
FCM / APNs / SES  
AI transcription providers  
Copyright vendors  
Ad networks
```
```

---

