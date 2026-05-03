# 4\. ساختار `admin-console`

پنل ادمین داخلی باید جدا باشد، چون امنیت، roleها و audit آن حساس است.

```
```
apps/admin-console/  
├── src/  
│   ├── app/  
│   │   ├── layout.tsx  
│   │   ├── (admin)/  
│   │   │   ├── dashboard/  
│   │   │   ├── users/  
│   │   │   ├── creators/  
│   │   │   ├── podcasts/  
│   │   │   ├── episodes/  
│   │   │   ├── moderation/  
│   │   │   ├── billing/  
│   │   │   ├── entitlements/  
│   │   │   ├── reports/  
│   │   │   ├── audit-logs/  
│   │   │   └── system-health/  
│   │   └── (auth)/  
│   │  
│   ├── features/  
│   │   ├── user-investigation/  
│   │   ├── content-moderation/  
│   │   ├── entitlement-override/  
│   │   ├── refund-review/  
│   │   ├── creator-verification/  
│   │   ├── abuse-response/  
│   │   └── audit-log-viewer/  
│   │  
│   ├── components/  
│   ├── lib/  
│   └── types/  
│  
├── tests/  
├── package.json  
└── tsconfig.json
```
```

---

