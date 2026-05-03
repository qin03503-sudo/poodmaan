# 11\. قوانین Frontend / Next.js

## 11.1 UI مستقیم domain logic نداشته باشد

ممنوع:

```
TypeScript

```
if (subscription.status ==='active'&&episode.availability ==='premium') {  
unlockPlayer()  
}
```
```

درست:

```
TypeScript

```
const { canPlay } =awaitplaybackApi.authorize(episodeId)
```
```

Entitlement logic باید در backend باشد.

---

## 11.2 Player state از page state جدا باشد

```
```
GlobalAudioPlayer  
Zustand player store  
Playback heartbeat hook  
MediaSession API integration  
Queue state
```
```

صفحات فقط command می‌دهند:

```
TypeScript

```
player.playEpisode(episodeId)
```
```

نه اینکه خودشان audio lifecycle را کنترل کنند.

---

## 11.3 BFF response باید UI-shaped باشد

برای home page:

ممنوع:

```
```
frontend calls:  
- catalog  
- library  
- recommendation  
- entitlement  
- playback
```
```

درست:

```
```
GET /api/v1/home
```
```

Response:

```
JSON

```
{  
  "sections": [  
    {  
      "type": "continue_listening",  
      "items": []  
    },  
    {  
      "type": "recommended",  
      "items": []  
    }  
  ]  
}
```
```

---

