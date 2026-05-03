# 12\. ساختار `packages/`

`packages/` برای کدهای مشترک frontend و TypeScript است، نه backend domain logic.

```
```
packages/  
├── ui/  
│   ├── src/  
│   │   ├── components/  
│   │   │   ├── button/  
│   │   │   ├── card/  
│   │   │   ├── dialog/  
│   │   │   ├── tabs/  
│   │   │   ├── menu/  
│   │   │   ├── input/  
│   │   │   └── skeleton/  
│   │   ├── tokens/  
│   │   │   ├── colors.ts  
│   │   │   ├── typography.ts  
│   │   │   ├── spacing.ts  
│   │   │   └── material3.ts  
│   │   ├── icons/  
│   │   ├── hooks/  
│   │   └── index.ts  
│   ├── package.json  
│   └── tsconfig.json  
│  
├── player-core/  
│   ├── src/  
│   │   ├── audio-engine/  
│   │   ├── queue/  
│   │   ├── media-session/  
│   │   ├── telemetry/  
│   │   ├── offline/  
│   │   └── index.ts  
│   └── package.json  
│  
├── web-api-client/  
│   ├── src/  
│   │   ├── generated/  
│   │   ├── auth.ts  
│   │   ├── catalog.ts  
│   │   ├── playback.ts  
│   │   ├── billing.ts  
│   │   └── index.ts  
│   └── package.json  
│  
├── shared-types/  
│   ├── src/  
│   │   ├── user.ts  
│   │   ├── podcast.ts  
│   │   ├── episode.ts  
│   │   ├── billing.ts  
│   │   ├── playback.ts  
│   │   └── index.ts  
│   └── package.json  
│  
├── eslint-config/  
└── ts-config/
```
```

## قانون مهم

در `packages/` نباید چیزهایی مثل `calculateEntitlement()` یا `billingPolicy()` باشد.  
Business logic باید داخل سرویس خودش بماند.

---

