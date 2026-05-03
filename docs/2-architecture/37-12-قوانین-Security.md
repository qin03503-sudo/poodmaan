# 12\. قوانین Security

## 12.1 Zero Trust داخلی

فرض نکنید چون سرویس داخل cluster است امن است.

لازم:

```
```
mTLS بین سرویس‌ها  
service account جدا  
network policy  
least privilege IAM  
secret rotation  
audit logs
```
```

---

## 12.2 Secure SDLC

NIST SSDF روی این اصل تاکید دارد که امنیت باید داخل چرخه توسعه ادغام شود، نه اینکه بعد از release اضافه شود؛ هدف آن کاهش vulnerability، کاهش impact و جلوگیری از تکرار ریشه‌ای مشکلات امنیتی است. [NIST Computer Security Resource Center+1](https://csrc.nist.gov/pubs/sp/800/218/final?utm_source=chatgpt.com)

برای این پروژه:

```
```
SAST  
dependency scanning  
container image scanning  
secret scanning  
SBOM  
license scanning  
IaC scanning  
threat modeling  
security review برای سرویس‌های critical
```
```

---

## 12.3 Audit اجباری برای operationهای حساس

Audit شود:

```
```
admin login  
manual entitlement grant/revoke  
refund  
creator payout change  
content takedown  
user suspension  
role change  
billing override
```
```

---

