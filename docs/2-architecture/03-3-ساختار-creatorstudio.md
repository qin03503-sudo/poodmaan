# 3\. ساختار `creator-studio`

این پنل برای creatorهاست؛ باید از اپ کاربر جدا باشد چون authorization، APIها، navigation و use-caseهایش متفاوت‌اند.

```
```
apps/creator-studio/  
├── src/  
│   ├── app/  
│   │   ├── layout.tsx  
│   │   ├── page.tsx  
│   │   ├── (auth)/  
│   │   │   ├── login/  
│   │   │   └── callback/  
│   │   └── (studio)/  
│   │       ├── dashboard/  
│   │       ├── podcasts/  
│   │       │   ├── page.tsx  
│   │       │   └── [podcastId]/  
│   │       │       ├── overview/  
│   │       │       ├── episodes/  
│   │       │       ├── analytics/  
│   │       │       ├── monetization/  
│   │       │       └── settings/  
│   │       ├── uploads/  
│   │       ├── analytics/  
│   │       ├── payouts/  
│   │       ├── campaigns/  
│   │       └── settings/  
│   │  
│   ├── features/  
│   │   ├── creator-auth/  
│   │   ├── podcast-management/  
│   │   ├── episode-editor/  
│   │   ├── media-upload/  
│   │   ├── analytics-dashboard/  
│   │   ├── monetization/  
│   │   ├── payouts/  
│   │   └── campaign-management/  
│   │  
│   ├── components/  
│   │   ├── layout/  
│   │   ├── upload/  
│   │   ├── charts/  
│   │   ├── forms/  
│   │   ├── tables/  
│   │   └── shared/  
│   │  
│   ├── lib/  
│   │   ├── api/  
│   │   ├── upload/  
│   │   ├── charts/  
│   │   ├── auth/  
│   │   └── validators/  
│   │  
│   └── types/  
│  
├── tests/  
├── package.json  
└── tsconfig.json
```
```

---

