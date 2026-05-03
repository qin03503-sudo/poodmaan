# 2\. ساختار دقیق `apps/`

## 2.1 اپلیکیشن اصلی کاربر: `apps/web`

این اپ همان Next.js app اصلی کاربر است؛ برای discovery، پخش، کتابخانه، billing و حساب کاربری.

```
```
apps/web/  
├── src/  
│   ├── app/  
│   │   ├── layout.tsx  
│   │   ├── page.tsx  
│   │   ├── providers.tsx  
│   │   ├── error.tsx  
│   │   ├── loading.tsx  
│   │   ├── not-found.tsx  
│   │   │  
│   │   ├── (public)/  
│   │   │   ├── about/  
│   │   │   ├── pricing/  
│   │   │   └── legal/  
│   │   │  
│   │   ├── (auth)/  
│   │   │   ├── login/  
│   │   │   ├── register/  
│   │   │   ├── forgot-password/  
│   │   │   └── callback/  
│   │   │  
│   │   ├── (main)/  
│   │   │   ├── discover/  
│   │   │   ├── podcasts/  
│   │   │   │   └── [podcastId]/  
│   │   │   ├── episodes/  
│   │   │   │   └── [episodeId]/  
│   │   │   ├── library/  
│   │   │   ├── search/  
│   │   │   ├── premium/  
│   │   │   ├── profile/  
│   │   │   └── settings/  
│   │   │  
│   │   └── api/  
│   │       ├── health/  
│   │       └── auth/  
│   │  
│   ├── features/  
│   │   ├── auth/  
│   │   ├── discover/  
│   │   ├── podcast/  
│   │   ├── episode/  
│   │   ├── playback/  
│   │   ├── library/  
│   │   ├── billing/  
│   │   ├── search/  
│   │   ├── profile/  
│   │   └── settings/  
│   │  
│   ├── components/  
│   │   ├── core/  
│   │   ├── layout/  
│   │   ├── player/  
│   │   ├── podcast/  
│   │   ├── episode/  
│   │   ├── billing/  
│   │   └── shared/  
│   │  
│   ├── store/  
│   │   ├── player.store.ts  
│   │   ├── auth.store.ts  
│   │   ├── queue.store.ts  
│   │   └── ui.store.ts  
│   │  
│   ├── hooks/  
│   │   ├── use-audio-player.ts  
│   │   ├── use-playback-heartbeat.ts  
│   │   ├── use-dynamic-color.ts  
│   │   ├── use-entitlement.ts  
│   │   └── use-feature-flag.ts  
│   │  
│   ├── lib/  
│   │   ├── api/  
│   │   ├── auth/  
│   │   ├── analytics/  
│   │   ├── config/  
│   │   ├── errors/  
│   │   ├── formatters/  
│   │   └── validators/  
│   │  
│   ├── styles/  
│   │   ├── globals.css  
│   │   ├── material-tokens.css  
│   │   └── themes.css  
│   │  
│   └── types/  
│       ├── api.ts  
│       ├── playback.ts  
│       ├── podcast.ts  
│       └── user.ts  
│  
├── public/  
├── tests/  
│   ├── unit/  
│   ├── integration/  
│   └── e2e/  
├── next.config.ts  
├── package.json  
└── tsconfig.json
```
```

## نکته مهم برای `apps/web`

پلیر اصلی باید در `app/layout.tsx` یا `providers.tsx` قرار بگیرد، نه داخل صفحات:

```
```
apps/web/src/components/player/  
├── global-audio-player.tsx  
├── player-shell.tsx  
├── player-controls.tsx  
├── progress-bar.tsx  
├── volume-control.tsx  
├── playback-queue.tsx  
├── mini-player.tsx  
└── hooks/  
    ├── use-player-events.ts  
    ├── use-media-session.ts  
    └── use-keyboard-shortcuts.ts
```
```

---

