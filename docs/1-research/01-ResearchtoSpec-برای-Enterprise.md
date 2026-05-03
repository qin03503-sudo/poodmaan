# Research-to-Spec برای Enterprise Podcast Streaming Platform

این خروجی در سطح **تحقیق محصول، معماری UX، نیازمندی طراحی، الگوهای تعاملی و ورودی قابل تبدیل به Figma / backlog / spec** نوشته شده است؛ یعنی تصمیم‌های نهایی UI، visual style و layout قطعی نشده‌اند. مبنای تحلیل، مستندات رسمی محصولات audio/creator/dashboard، الگوهای NN/g و Baymard، Material Design 3، Apple HIG و WCAG/W3C است. برای مثال، Apple Podcasts روی mini player، full-screen player، transcript همگام با پخش، chapters و shareable transcript interactions تأکید دارد؛ Spotify Podcasts روی discovery، save/download، transcript، chapters و creator analytics؛ Pocket Casts و Overcast روی کنترل‌های power-listening مثل speed، trim silence، sleep timer و smart playlists. [Overcast+6Apple Support+6Spotify+6](https://support.apple.com/en-tm/118668)

---

## 1\. Product Understanding

### ماهیت UX محصول

این محصول یک **multi-sided audio platform** است، نه فقط یک player. از دید UX، هم‌زمان باید مثل یک اپ پخش موسیقی/پادکست سریع باشد، مثل یک CMS/Creator Studio قابل اعتماد باشد، مثل یک subscription product شفاف باشد، مثل یک dashboard تحلیلی actionable باشد و مثل یک internal ops console امن و audit-friendly عمل کند.

| دسته محصول | هدف اصلی کاربر | حساسیت‌های UX | ریسک‌های طراحی | معیار موفقیت تجربه |
| --- | --- | --- | --- | --- |
| **Consumer audio streaming product** | کشف، پخش، ادامه‌دادن، ذخیره‌کردن و گوش‌دادن بدون اصطکاک | سرعت اولین پخش، پایداری player، resume، کنترل‌های ساده، offline | player شلوغ، قطع‌شدن audio هنگام navigation، hidden controls، buffering مبهم | Time to First Play، playback error rate، resume success، completion |
| **Creator platform** | ساخت، آپلود، انتشار، رشد مخاطب، درآمدزایی | publish flow شفاف، پردازش media، validation، analytics قابل فهم | CMS بیش‌ازحد پیچیده، status مبهم، خطاهای upload، ترس از انتشار اشتباه | onboarding completion، first episode published، upload success، publish success |
| **Subscription / monetization product** | فهم ارزش premium، پرداخت امن، مدیریت plan و entitlement | trust، قیمت‌گذاری واضح، paywall غیرتهاجمی، checkout کوتاه | paywall آزاردهنده، هزینه‌های پنهان، entitlement نامفهوم، refund دشوار | conversion، checkout completion، refund/contact rate، churn |
| **Discovery / search product** | پیدا کردن محتوای مناسب در زمان کم | search relevance، rails شخصی‌سازی‌شده، category browsing، filters | توصیه‌های تکراری، search بدون intent، overload محتوا | search success، play-after-search، follow-after-discovery |
| **Analytics dashboard product** | فهم عملکرد و تصمیم‌گیری | خلاصه actionable، trend، comparison، breakdown، explainability | نمودارهای زیاد اما بی‌معنا، vanity metrics، latency نامشخص | analytics engagement، action taken after insight، return rate |
| **Admin / internal operations product** | بررسی، رسیدگی، override، moderation، support | سرعت، دقت، audit، RBAC، destructive action safety | تصمیم اشتباه، دسترسی بیش از حد، نبود audit trail، context switching زیاد | case resolution time، override error rate، moderation accuracy |

**تصمیم کلیدی:** Consumer app باید **emotionally lightweight** باشد؛ Creator Studio باید **confidence-building** باشد؛ Admin Console باید **fast but constrained** باشد.

---

## 2\. User Segments & Personas

| Segment | هدف‌ها | نیازها | Pain points | رفتارهای احتمالی | صفحات لازم | Flowهای اصلی | متریک UX |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Listener / Free User** | کشف و پخش رایگان | search، player، library پایه | تبلیغ زیاد، paywall مبهم، signup اجباری | جستجو، sample، follow | Public podcast، Home، Search، Episode، Player | discover → play → save/follow | first play، follow rate |
| **Premium Listener** | گوش‌دادن بدون محدودیت یا به محتوای premium | entitlement واضح، billing، download | نمی‌داند چرا episode قفل است؛ مدیریت plan سخت | پرداخت، دانلود، ادامه بین دستگاه‌ها | Billing، Subscription، Downloads | premium lock → subscribe → play | conversion، churn، failed payment recovery |
| **Power Listener** | کنترل کامل تجربه شنیدن | queue، playlist، speed، chapters، transcript، shortcuts | player ساده بیش‌ازحد، نبود automation | playlist، speed per podcast، sleep timer | Queue، Playlists، History، Full Player | manage queue، create playlist، clip/share | repeat usage، playlist creation |
| **Podcast Creator** | ساخت، انتشار، رشد و درآمد | onboarding، upload، analytics، monetization | پیچیدگی RSS/media، خطاهای processing، analytics نامفهوم | publish، edit، check stats | Creator Dashboard، Episode Upload، Analytics، Payouts | create podcast → upload → publish → analyze | first episode published |
| **Creator Team Member** | همکاری در تولید | roles، approval، draft، comments | تغییر ناخواسته، نبود permissions | ویرایش draft، review analytics | Team، Episode Editor، Settings | collaborate → approve → publish | role error rate، draft completion |
| **Advertiser / Campaign Manager** | ساخت campaign و سنجش performance | targeting، budget، reporting | attribution مبهم، fraud concerns | کمپین کوتاه‌مدت، report export | Campaigns، Ads، Revenue | create campaign → monitor | ROAS proxy، campaign completion |
| **Admin / Moderator** | بررسی محتوا و گزارش‌ها | queues، evidence، policy، decision | context کم، overload، تصمیم‌های برگشت‌ناپذیر | triage، escalate، remove/approve | Moderation Queue، Case Detail، Reports | review report → decide → audit | resolution time، appeal rate |
| **Support Agent** | حل مشکل کاربر/پرداخت | user search، entitlement، refund، notes | ابزار پراکنده، اطلاعات ناقص | جستجوی کاربر، override، refund | User Detail، Billing Support، Notes | investigate → resolve | handle time، CSAT |
| **Finance / Ops User** | payout، invoice، refund، reconciliation | tables، export، audit، status | ambiguity در payout status | review payout، export CSV | Payouts، Refund Review، Audit Logs | review → approve/export | payout issue rate |
| **Anonymous Visitor** | preview قبل از signup | public pages، playable preview | signup wall زودهنگام | landing → public episode → signup | Landing، Public Podcast/Episode، Pricing | preview → register | signup conversion |
| **Returning User** | ادامه سریع | resume، history، personalized home | پیدا نکردن last played | بازکردن app و ادامه پخش | Home، Mini Player، History | open → resume | resume success |
| **Mobile-first User** | گوش‌دادن در حرکت | thumb-friendly controls، offline، gestures | کنترل‌های کوچک، battery/data concern | commute، lock-screen، download | Mobile Home، Player، Downloads | download → offline play | mobile retention |

---

## 3\. Jobs To Be Done

### Discovery jobs

| User | JTBD |
| --- | --- |
| Anonymous / Free Listener | When I hear about a podcast, I want to preview it without commitment, so I can decide whether it is worth following. |
| Returning Listener | When I open the app, I want relevant recommendations and my unfinished episodes surfaced first, so I can start listening quickly. |
| Power Listener | When I search by topic, guest, host or phrase, I want precise podcast/episode/transcript results, so I can find niche content. |

### Playback jobs

| User | JTBD |
| --- | --- |
| Listener | When I tap play, I want audio to start immediately and keep playing across pages, so I can trust the product. |
| Mobile-first User | When I am commuting, I want large, reliable controls and offline access, so I can listen without looking at the screen. |
| Power Listener | When an episode is long, I want chapters, transcript, speed and queue controls, so I can control my listening time. |

### Library jobs

| User | JTBD |
| --- | --- |
| Listener | When I like a show, I want to follow it and receive new episodes, so I do not have to search again. |
| Power Listener | When I save episodes for later, I want playlists and filters, so I can organize listening by mood/topic/context. |

### Subscription jobs

| User | JTBD |
| --- | --- |
| Premium prospect | When I hit a premium lock, I want to understand exactly what I get and what I pay, so I can subscribe confidently. |
| Subscriber | When payment fails, I want clear recovery steps, so I do not unexpectedly lose access. |

### Creator publishing jobs

| User | JTBD |
| --- | --- |
| Creator | When I publish an episode, I want upload, metadata, checks, schedule and monetization in one guided flow, so I avoid mistakes. |
| Creator Team Member | When I collaborate on an episode, I want permissions and review states, so I can contribute without accidentally publishing. |

### Creator analytics jobs

| User | JTBD |
| --- | --- |
| Creator | When I check analytics, I want to know what changed and why, so I can improve content and promotion. |
| Creator | When revenue changes, I want breakdown by subscription, ads, memberships and refunds, so I can trust payouts. |

### Admin moderation jobs

| User | JTBD |
| --- | --- |
| Moderator | When content is reported, I want policy, evidence, history and risk signals in one view, so I can decide accurately. |
| Trust & Safety Lead | When queues grow, I want prioritization and SLA visibility, so I can allocate work. |

### Support jobs

| User | JTBD |
| --- | --- |
| Support Agent | When a user reports access or payment issues, I want user, billing, entitlement and playback history, so I can solve it fast. |

### Monetization jobs

| User | JTBD |
| --- | --- |
| Creator | When I enable monetization, I want clear eligibility, pricing and payout rules, so I understand risk and upside. |
| Finance/Ops | When reviewing payout/refund, I want audit and status history, so decisions are traceable. |

---

## 4\. Competitive Benchmark

| محصول | چه چیزی در UX خوب است؟ | قابل الهام | نباید کپی شود | مناسب برای پروژه | نامناسب / ریسک |
| --- | --- | --- | --- | --- | --- |
| **Spotify** | discovery قوی، save/download، personalized recommendations، persistent audio mental model | Home شخصی‌سازی‌شده، Continue Listening، podcast save/download | شلوغی media mix و تبلیغات مبهم برای premium users؛ Spotify تصریح می‌کند برخی podcastها حتی برای Premium می‌توانند ads/sponsorship داشته باشند. [Spotify](https://support.spotify.com/ws/article/podcasts-and-shows/) | content rails، save/follow، download، transcript/chapter integration | مخلوط‌کردن بیش‌ازحد music/podcast/video برای محصول podcast-first |
| **Apple Podcasts** | mini player پایین صفحه، full player، transcript sync، search inside transcript، chapters، share transcript | transcript-first UX و player ساده | وابستگی زیاد به Apple ecosystem | full player با transcript/chapters، public podcast pages | محدود کردن قابلیت‌ها به native-only |
| **YouTube Music** | Explore، library، category search، episode download | Explore tab و library mental model | podcast قابلیت‌های خاص مثل full-show smart download محدود دارد؛ مستندات می‌گویند full show و Smart Downloads فعلاً برای podcasts در دسترس نیست. [Google Help+1](https://support.google.com/youtubemusic/answer/6313535?co=GENIE.Platform%3DDesktop&hl=en-en) | Explore/Search/Library separation | video/music-first clutter |
| **Pocket Casts** | speed، trim silence، volume boost، sleep timer، chapter controls | power-listener controls، per-podcast settings | پنهان‌شدن برخی actionها در More برای کاربر تازه‌کار | advanced controls پشت progressive disclosure | شلوغ کردن default player |
| **Overcast** | Smart Speed و Voice Boost با تمرکز روی listening efficiency | “listen smarter” capabilities | کمبود creator/admin surfaces | premium listening controls | برای enterprise creator platform کافی نیست |
| **Castbox** | تنوع controls: speed، sleep timer، playlists، continuous play، download/offline، community | broad feature inventory | feature overload و پیچیدگی IA | benchmark برای long-tail features | کپی‌کردن همه قابلیت‌ها در MVP |
| **Spotify for Podcasters / Spotify for Creators** | upload/manage، analytics، monetization، engagement، clips/comments، customization | Creator Dashboard و growth tooling | وابستگی زیاد به Spotify ecosystem | creator onboarding، analytics، monetization | پیچیدگی video/audio mix در فاز اول |
| **YouTube Studio** | publish wizard با Details/Checks/Visibility، analytics tabs، copyright checks | publish checklist، processing status، policy checks | مناسب ویدئو است؛ audio-only UX نباید ویدئو-محور شود | upload → checks → visibility pattern | فرم‌های طولانی بدون progressive disclosure |
| **Substack** | publishing flow واحد برای text/audio/video، paid/free posts، private feeds، transcript | creator publishing ساده و membership-first | newsletter mental model برای همه creators مناسب نیست | episode post model، paywall/free preview | تبدیل podcast به صرفاً newsletter |
| **Patreon** | membership analytics، paid/free members، tiers، payout status | creator membership، tiers ساده، payout transparency | پیچیدگی benefit management | creator memberships و revenue dashboard | tier overload و benefit debt |
| **Audible** | subscription trial، offline listening، cross-device consumption | subscription trust، offline messaging | audiobook store mental model با podcast فرق دارد | trial copy، listen everywhere | purchase-heavy UX برای podcast discovery |
| **Netflix** | personalized rows بر اساس history، similarity، metadata، time/device/language؛ Netflix می‌گوید از age/gender demographics برای recommendations استفاده نمی‌کند. [Netflix Help Center](https://help.netflix.com/en/node/100639) | content rails، “because you listened” | endless rows بدون search intent | Home recommendation architecture | auto-play visuals برای audio app |
| **Linear** | command menu، keyboard shortcuts، consistent actions، bulk actions، search workspace | power-user/admin speed | shortcuts-only UX | Admin Console command palette و bulk moderation | shortcut discoverability پایین |
| **Stripe Dashboard** | customer/billing/payment/subscription/invoice visibility، customer portal | billing/admin clarity، audit-like details | payment jargon برای listener app | Account & Billing، support tools | exposing internal finance complexity to users |
| **Vercel Dashboard** | sidebar، project context، logs/analytics/deployments، environment/settings separation | creator/admin SaaS navigation | dev-tool density برای creators ساده نیست | resource/context switcher | too technical dashboard language |
| **Notion** | keyboard shortcuts، blocks، collaboration، lock page/database | editor flexibility، collaboration safety | blank-canvas ambiguity | Creator draft/editor collaboration | over-flexible CMS بدون guardrails |

الگوی مشترک موفق: **یک تجربه ساده برای شروع + امکانات عمیق پشت progressive disclosure**. این دقیقاً همان تفکیکی است که برای Listener، Creator و Admin باید جداگانه اجرا شود.

---

## 5\. Information Architecture

### A. Public / Marketing Area

| Section | Nested sections | Priority | Access | Goal | Navigation |
| --- | --- | --- | --- | --- | --- |
| Landing | value prop، featured podcasts، creator CTA، app download | P0 | Public | اعتماد و conversion | Primary |
| Pricing | listener plans، creator fees، membership explanation | P0 | Public | تصمیم خرید | Primary |
| Creator Landing | tools، monetization، analytics، distribution | P1 | Public | جذب creator | Primary |
| Public Podcast Page | episodes، about، follow/play CTA | P0 | Public/Logged-in | preview و SEO | Primary via search/public |
| Public Episode Page | player preview، transcript excerpt، share | P0 | Public/Logged-in | play/share | Primary via links |
| Legal | Terms، Privacy، Copyright، Community Guidelines | P0/P1 | Public | trust/compliance | Footer/Secondary |
| Download App | iOS/Android/Web | P1 | Public | install | Primary/Secondary |

### B. Listener Web App

| Section | Nested | Priority | Access | Goal | Navigation |
| --- | --- | --- | --- | --- | --- |
| Home | continue listening، recommendations، new episodes | P0 | Logged-in | resume/discover | Primary |
| Search | search input، results، filters | P0 | Public/Logged-in | find | Primary/top |
| Discover | categories، trending، editorial | P0 | Public/Logged-in | browse | Primary |
| Library | followed، saved، history، playlists، downloads | P0 | Logged-in | personal collection | Primary |
| Player | mini/full/queue/transcript | P0 | Public/Logged-in | playback | Persistent |
| Account | profile، settings، billing، subscription | P0/P1 | Logged-in | manage identity/payment | Avatar/Secondary |
| Notifications | new episodes، creator updates، billing | P1 | Logged-in | engagement | Secondary/bell |

### C. Mobile App

| Section | Nested | Priority | Access | Goal | Navigation |
| --- | --- | --- | --- | --- | --- |
| Home | resume، personalized rows | P0 | Logged-in | one-tap play | Bottom tab |
| Discover | category/trending/editorial | P0 | All | browse | Bottom tab |
| Search | keyword، filters، recent | P0 | All | find | Bottom tab |
| Library | followed، saved، history، playlists، downloads | P0 | Logged-in | manage listening | Bottom tab |
| Player | mini above tab، full-screen sheet | P0 | All | control audio | Persistent |
| Profile/Settings | account، billing، notifications | P1 | Logged-in | manage | Header/avatar |

### D. Creator Studio

| Section | Nested | Priority | Access | Goal | Navigation |
| --- | --- | --- | --- | --- | --- |
| Dashboard | overview، recent episodes، alerts، checklist | P0 | Creator | command center | Sidebar |
| Podcasts | list، overview، settings | P0 | Creator/team | manage shows | Sidebar |
| Episodes | list، editor، upload، schedule، processing | P0 | Creator/team | publish | Sidebar |
| Analytics | overview، episode، audience، retention، sources | P0/P1 | Creator/team | improve content | Sidebar |
| Monetization | subscriptions، memberships، ads، pricing | P1 | Eligible creator | earn | Sidebar |
| Revenue/Payouts | balance، payout history، tax/export | P1 | Creator/admin/finance | trust | Sidebar |
| Team | roles، invitations، permissions | P1 | Owner/admin | collaboration | Sidebar/Settings |
| Settings | creator profile، brand، integrations، RSS | P1 | Owner/admin | configuration | Secondary |

### E. Admin Console

| Section | Nested | Priority | Access | Goal | Navigation |
| --- | --- | --- | --- | --- | --- |
| Global Search | users، creators، podcasts، episodes، payments، cases | P0 | Role-based | investigation | Top persistent |
| Dashboard | SLA، queues، alerts | P0 | Admin | overview | Sidebar |
| Moderation | queue، case detail، reports، copyright | P0 | Moderator | review | Sidebar |
| Users | user search/detail، entitlements، history | P0 | Support/admin | support | Sidebar |
| Creators | creator detail، podcast status، payout flags | P1 | Ops/admin | review | Sidebar |
| Billing Support | refunds، overrides، failed payments | P0/P1 | Support/Finance | resolve | Sidebar |
| Audit Logs | actor/action/object/time/reason | P0 | Admin/Compliance | traceability | Sidebar |
| System | health، flags، incidents | P2 | Internal ops | reliability | Sidebar |

### F. Account & Billing Area

| Section | Nested | Priority | Access | Goal | Navigation |
| --- | --- | --- | --- | --- | --- |
| Subscription | plan، renewal، cancel، change | P0 | Logged-in | manage plan | Account |
| Payment Methods | cards/wallets، invoices | P0 | Logged-in | payment trust | Account |
| Entitlements | premium، memberships، purchases | P1 | Logged-in | understand access | Account |
| Receipts/Invoices | download، tax details | P1 | Logged-in | records | Account |
| Security | password، OAuth، sessions، MFA | P1 | Logged-in | account safety | Settings |

### G. Help / Support / Legal Area

| Section | Nested | Priority | Access | Goal | Navigation |
| --- | --- | --- | --- | --- | --- |
| Help Center | listener، creator، billing، playback | P1 | All | self-service | Footer/Account |
| Contact Support | ticket، chat، issue category | P1 | Logged-in/Public | resolve | Help |
| Copyright | claim، counter notice، policy | P0/P1 | All | compliance | Footer/Admin |
| Community Guidelines | content rules | P0 | All | safety | Footer/Public |
| Status Page | incidents، CDN/audio availability | P1 | All/Internal | transparency | Help |

---

## 6\. Sitemap Research Output

### State shorthand برای همه صفحات

برای جلوگیری از over-design، stateها باید در قالب الگوی مشترک تعریف شوند:

-   **Empty:** توضیح ساده + primary next action + نمونه محتوای قابل انتظار.
    
-   **Loading:** skeleton متناسب با layout؛ برای player باید status دقیق‌تر از skeleton باشد: loading / buffering / reconnecting.
    
-   **Error:** مشکل + دلیل قابل فهم + recovery action + report/log.
    
-   **A11y:** heading درست، focus order، labels، keyboard، contrast، target size، screen reader state.
    

### A. Public Pages

| صفحه | هدف / کاربر | Primary / Secondary actions | داده‌ها و componentها | ریسک UX / states / accessibility |
| --- | --- | --- | --- | --- |
| Landing | معرفی محصول برای visitor/listener/creator | Start listening / Start creating، Pricing، Download | Hero، value cards، featured podcasts، CTA، FAQ | اغراق در promise؛ loading rails؛ CTA واضح؛ headings قابل اسکن |
| Pricing | توضیح plans | Choose plan، Compare، FAQ | Plan cards، comparison table، trust badges | قیمت مبهم؛ error payment link؛ table responsive |
| About | اعتماد و brand | Learn more، Contact | Story، team/mission | متن زیاد؛ contrast و readability |
| Terms | compliance | Read/search | Legal text، TOC | متن طولانی؛ anchor nav، search |
| Privacy | trust | Manage privacy، read policy | Policy sections | jargon؛ plain-language summary |
| Creator landing | جذب creator | Start creator onboarding | Feature blocks، testimonials، monetization | وعده درآمد غیرواقعی؛ CTA role-aware |
| Download app | install | iOS/Android/Web | Store badges، QR، device detection | platform mismatch؛ accessible QR alt |
| Public podcast page | preview show | Play latest، Follow، Subscribe | Podcast header، episode list، rating/category، public player | auth wall زودهنگام؛ empty episode list؛ player keyboard |
| Public episode page | preview/share episode | Play، Share، Sign up | Episode header، player، transcript excerpt، related | premium ambiguity؛ transcript semantics |

### B. Auth Pages

| صفحه | هدف / کاربر | Primary / Secondary actions | داده‌ها و componentها | ریسک UX / states / accessibility |
| --- | --- | --- | --- | --- |
| Login | ورود سریع | Continue، OAuth، Forgot password | Email/password، OAuth buttons | خطای امنیتی مبهم؛ password manager support |
| Register | ساخت حساب | Create account، OAuth | Form، consent، plan context | فرم طولانی؛ validation inline |
| Forgot password | بازیابی | Send reset link | Email input | enumeration risk؛ پیام امن |
| Reset password | رمز جدید | Save password | Password rules، strength hint | rules زیاد؛ screen reader hints |
| OAuth callback | برگشت از provider | Auto continue | Loading state، error fallback | blank screen؛ retry/change provider |
| Email verification | تایید ایمیل | Verify، Resend | Token status | expired token؛ clear recovery |
| Account recovery | دسترسی مجدد | Verify identity | Stepper، support fallback | friction/security balance |

### C. Listener App Pages

| صفحه | هدف / کاربر | Primary / Secondary actions | داده‌ها و componentها | ریسک UX / states / accessibility |
| --- | --- | --- | --- | --- |
| Home | resume/discover | Play/resume، open rail | Continue row، recommendations، new episodes | rails زیاد؛ skeleton rows؛ personalized explanation |
| Discover | browse | Open category، play trending | Hero carousel، category grid، rails | carousel overload؛ keyboard carousel controls |
| Search | query entry | Search، clear، recent | Search input، recent searches | debounce بد؛ focus management |
| Search results | انتخاب نتیجه | Play/follow/filter | Result tabs، filters، result items | relevance بد؛ empty results helpful |
| Category page | browse topic | Play/follow | Category header، rails، filters | category dead-end؛ pagination/loading |
| Podcast detail | تصمیم follow/listen | Follow، play latest، subscribe | Show header، episode list، about، rating | CTA overload؛ episode sorting |
| Episode detail | تصمیم play/save/share | Play، save، share | Episode metadata، player entry، transcript/chapters | long metadata؛ premium clarity |
| Full player | کنترل کامل | Play/pause، seek، queue، transcript | Artwork، progress، controls، tabs | hidden controls؛ screen reader states |
| Mini player state | کنترل persistent | Play/pause، expand | Artwork، title، progress، status | tap target کوچک؛ accessible name |
| Queue | مدیریت آینده پخش | Reorder، remove، play next | Queue list، drag handle، menu | drag-only؛ keyboard reorder |
| Library | personal hub | Continue، filter | Tabs/sections | empty onboarding؛ saved/followed distinction |
| Followed podcasts | shows | Open/play latest | Podcast list، sort/filter | list طولانی؛ accessible sorting |
| Saved episodes | later | Play، remove | Episode list، filter | save meaning مبهم |
| History | resume/revisit | Resume، clear item | Chronological list | privacy concern؛ clear confirmation |
| Playlists | organize | Create playlist | Playlist list، empty state | playlist complexity |
| Playlist detail | listen collection | Play all، reorder | Episode list، playlist header | reorder accessibility |
| Downloads / Offline | offline listening | Download/remove | Download list، storage indicator | storage/data ambiguity |
| Notifications | engagement | Open، mark read | Notification list، preferences | spam؛ digest controls |
| Profile | identity | Edit، view plan | Avatar، stats، account links | over-personalization |
| Settings | preferences | Save | Toggles، select، sections | too many toggles؛ search settings |
| Billing | payment overview | Manage plan/payment | Plan card، invoices | trust؛ clear renewal date |
| Subscription management | change/cancel | Upgrade/change/cancel | Plan comparison، cancellation flow | dark patterns؛ clear confirmation |
| Payment methods | cards/wallets | Add/remove default | Payment method list | PCI trust؛ remove confirmation |

### D. Creator Studio Pages

| صفحه | هدف / کاربر | Primary / Secondary actions | داده‌ها و componentها | ریسک UX / states / accessibility |
| --- | --- | --- | --- | --- |
| Creator onboarding | فعال‌سازی creator | Create/import podcast | Stepper، eligibility، profile، RSS/import | step fatigue؛ save progress |
| Creator dashboard | overview | Upload episode، view alerts | KPI cards، checklist، recent activity | vanity metrics؛ actionable alerts |
| Podcast list | مدیریت shows | Create/import/select | Podcast cards/table | multi-show confusion |
| Podcast overview | show command center | New episode، edit settings | Summary، latest episodes، alerts | buried issues |
| Podcast settings | تنظیمات show | Save | Forms، artwork، RSS، categories | destructive RSS changes |
| Episode list | مدیریت اپیزودها | New episode، filter | Table/list، status badges | status ambiguity |
| Episode editor | edit metadata/content | Save draft، publish | Form sections، preview، checklist | long form؛ autosave |
| Episode upload | فایل صوتی/کاور | Upload، replace | Dropzone، validation، progress | upload failure anxiety |
| Episode publish/schedule | انتشار | Publish/schedule | Visibility، date/time، checklist | accidental publish |
| Media processing status | فهم پردازش | Wait، retry، replace file | Status timeline، logs summary | opaque processing |
| Transcript editor | اصلاح transcript | Save، upload VTT/SRT | Transcript timeline، search، timestamps | sync errors |
| Chapters editor | ساخت chapters | Add/edit/reorder | Chapter list، timeline markers | timestamps conflict |
| Analytics overview | عملکرد کلی | Change range، export | KPI cards، charts، insights | data latency unclear |
| Episode analytics | performance episode | Compare، export | Retention، plays، sources | over-charting |
| Audience analytics | شناخت مخاطب | Segment، compare | Geo/device/player/platform | privacy constraints |
| Revenue analytics | درآمد | View breakdown، export | Revenue cards، trend، table | gross/net confusion |
| Monetization settings | فعال‌سازی درآمد | Enable/configure | Eligibility، pricing، tiers | compliance/KYC gaps |
| Payouts | دریافت پول | Add payout method، export | Balance، payout table، statuses | failed payout panic |
| Campaigns / Ads | مدیریت ads | Create campaign، view report | Campaign cards، targeting، budget | ad complexity |
| Team members | همکاری | Invite، assign role | Members table، roles | permission mistakes |
| Creator profile settings | public identity | Save profile | Avatar، bio، links، branding | inconsistent public/private identity |

### E. Admin Console Pages

| صفحه | هدف / کاربر | Primary / Secondary actions | داده‌ها و componentها | ریسک UX / states / accessibility |
| --- | --- | --- | --- | --- |
| Admin dashboard | وضعیت عملیات | Open queue، inspect alert | SLA cards، queue counts، incidents | false urgency |
| User search | یافتن کاربر | Search user | Global search، filters | privacy exposure |
| User detail | investigation | View history، support action | Profile، entitlements، payments، playback logs | information overload |
| Creator detail | creator investigation | Review، restrict، contact | Creator profile، shows، payout flags | role confusion |
| Podcast review | بررسی show | Approve/reject/escalate | Metadata، evidence، policy | inconsistent moderation |
| Episode review | بررسی episode | Approve/reject/remove | Player، transcript، reports | audio evidence hard to review |
| Moderation queue | triage | Assign/open case | Queue table، priority، SLA | queue overwhelm |
| Moderation case detail | decision | Decide، escalate، note | Evidence viewer، policy، history | destructive action risk |
| Reports | user reports | Filter/assign | Report table، grouping | duplicates |
| Copyright cases | rights handling | Review claim، request info | Claim details، files، timeline | legal sensitivity |
| Billing support | payment issue | Resolve/refund/escalate | Customer billing panel | wrong refund |
| Entitlement override | temporary/manual access | Grant/revoke | Reason form، duration، approval | abuse risk |
| Refund review | refund decision | Approve/deny | Payment history، policy، notes | irreversible finance action |
| Audit logs | trace actions | Search/export | Log table، actor/action/object | unreadable logs |
| System health | reliability | Inspect incident | Status cards، CDN/audio metrics | noisy alerts |
| Feature flags | controlled rollout | Enable/disable | Flag table، targeting، history | accidental global rollout |
| Support tools | operational utilities | Run safe action | Tool cards، confirmation | unsafe tools |

---

## 7\. Core User Flows

| Flow | Trigger | Steps | Success / Failure | Friction points | Simplification | Screens / Components |
| --- | --- | --- | --- | --- | --- | --- |
| Anonymous visitor discovers podcast | Link/search/landing | Public page → preview → follow/signup | Played preview / blocked by unavailable content | signup wall | allow preview before auth | Public podcast، player، signup CTA |
| User signs up | CTA/paywall/save | Register → verify → onboarding light | Account ready / email/OAuth fail | long form | OAuth + deferred preferences | Auth forms، verification |
| User searches podcast | Search tab | Type → results → filters → open/play | Relevant result / no result | poor ranking | recent searches + category fallback | Search input، results |
| User plays free episode | Tap play | load → play → mini player persists | audio plays / buffering error | slow start | prefetch metadata/CDN status | Player controls، status |
| User tries premium episode | Tap locked episode | lock explain → plan → checkout | entitlement granted / payment fail | unclear benefit | contextual paywall | Lock badge، plan card، checkout |
| User subscribes | Paywall/pricing | choose plan → payment → confirmation | access / failed payment | too many steps | 1–2 step checkout | Plan cards، payment form |
| User resumes playback | Open app | Home/mini player → resume | same progress / sync conflict | lost progress | last-played first | Continue row، player |
| User saves episode | Episode/list/player | save → library update | saved / auth required | save vs download confusion | clear labels | Save button، toast |
| User follows podcast | Podcast page | follow → notifications optional | followed / auth required | notification overload | follow first، notification later | Follow button |
| User creates playlist | Library | create → name → add episodes | playlist / empty | too many fields | create with name only | Modal، episode picker |
| User shares clip/snippet | Player/transcript | select range/text → preview → share | link copied / rights block | clip editing complexity | default suggested range | Clip selector، share sheet |
| Creator onboarding | Creator CTA | account → profile → create/import podcast → verify | studio ready / incomplete | too many compliance steps | save progress + checklist | Stepper، checklist |
| Creator creates podcast | Studio | new podcast → metadata/artwork/category → save | show created / validation fail | RSS/category jargon | templates/defaults | Podcast form |
| Creator uploads episode | New episode | choose file → validate → upload → draft | file uploaded / fail | upload anxiety | visible progress/retry | Dropzone، progress |
| Creator waits processing | Upload complete | processing status → notify → ready | ready / failed | opaque wait | status timeline | Processing card |
| Creator publishes episode | Draft ready | metadata → checks → visibility → publish/schedule | live/scheduled / blocked | accidental publish | final review screen | Publish checklist |
| Creator checks analytics | Dashboard | select range → inspect insight → drilldown | insight / no data | vanity metrics | recommended next action | KPI/charts |
| Creator configures monetization | Monetization | eligibility → pricing/tier → payout/KYC → enable | active / blocked | legal/finance complexity | staged setup | Eligibility، forms |
| Creator receives payout | Revenue | payout status → method → export | paid / failed payout | status jargon | human-readable statuses | Payout table |
| Admin reviews reported content | Queue | open case → evidence → policy → decision | resolved / escalated | missing context | unified case view | Queue، evidence، decision panel |
| Admin handles copyright case | Claim | review claim → request info → action → audit | resolved / disputed | legal risk | structured timeline | Copyright case |
| Support grants entitlement override | User issue | search user → verify → override with reason/duration | access restored / approval required | abuse | approvals + expiry | User detail، override modal |
| Billing refund flow | Support/finance | open payment → policy → confirm → refund → audit | refund / denied | irreversible action | two-step confirmation | Refund review، audit |

---

## 8\. Navigation Strategy

### A. Listener Web

| موضوع | Best practice / trade-off | پیشنهاد |
| --- | --- | --- |
| Top navigation یا sidebar | Top nav برای public/marketing خوب است؛ app داخلی با library/search/player بهتر است از sidebar یا rail استفاده کند. | برای logged-in web: **left sidebar + top search + bottom persistent player**. |
| Bottom player | برای audio product، پخش نباید هنگام تغییر صفحه قطع شود. Apple و Spotify mental model پخش persistent را تقویت کرده‌اند. | player پایین صفحه، تمام‌عرض، با mini/full expansion. |
| Search placement | search باید همیشه در دسترس باشد چون discovery اصلی است. | top search در desktop؛ keyboard shortcut `/` یا `Cmd/Ctrl+K` برای power users. |
| Library/account | library primary؛ account secondary. | Library در sidebar، Account در avatar menu. |
| Mini player | همیشه دیده شود مگر در public legal/auth pages. | bottom dock با title، artwork، play/pause، progress، device/status. |

### B. Mobile App

Apple HIG tab bar را برای top-level sections و حفظ state هر tab مناسب می‌داند؛ Material نیز navigation bar را برای compact/mobile views پیشنهاد می‌کند. [Apple Developer+1](https://developer.apple.com/design/human-interface-guidelines/tab-bars/)

| موضوع | پیشنهاد |
| --- | --- |
| Bottom tabs | 4 tab اصلی: **Home، Discover، Search، Library**. Profile/Settings در header/avatar. |
| Full-screen player | mini player بالای tab bar؛ tap یا swipe up برای full player؛ swipe down برای collapse. |
| Gestures | مکمل، نه تنها راه. همه actions باید با button هم انجام شوند. |
| Offline/download | داخل Library و Episode/Player؛ download status در mini/full player. |
| Account/settings | avatar یا gear در Home/Library؛ نه tab مستقل در MVP. |

### C. Creator Studio

| موضوع | Trade-off | پیشنهاد |
| --- | --- | --- |
| Sidebar یا top nav | Creator Studio بخش‌های زیاد دارد؛ top nav زود شلوغ می‌شود. | **Desktop-first sidebar** با groups: Dashboard، Podcasts، Episodes، Analytics، Monetization، Payouts، Team، Settings. |
| Podcast context switcher | برای creators چند show ضروری است. | context switcher بالای sidebar. |
| Analytics/episodes | باید از هم جدا ولی مرتبط باشند. | Episode list → episode detail → analytics tab. |
| Upload/publish wizard یا form | wizard برای کاهش اضطراب publish؛ form برای edits. | **Wizard برای upload/publish؛ form-based editor برای metadata بعدی.** |

### D. Admin Console

| موضوع | پیشنهاد |
| --- | --- |
| Sidebar information-dense | لازم است، اما با role-based visibility. |
| Global search | P0؛ search روی user، creator، podcast، episode، payment، case. Linear نشان می‌دهد command/search برای workspace-heavy tools سرعت را بالا می‌برد. [Linear](https://linear.app/docs/search) |
| Moderation queues | queue-first IA با priority، SLA، assignment. |
| Audit visibility | هر action حساس باید reason، actor، timestamp و object داشته باشد. |
| Role-based navigation | hidden + disabled states؛ عدم نمایش ابزار غیرمجاز برای کاهش خطا. |

---

## 9\. Playback UX Research

### Player component requirements

| Area | Requirement |
| --- | --- |
| **Mini player** | artwork کوچک، episode title، podcast name، play/pause، compact progress، buffering/offline/premium state، expand affordance. در web می‌تواند save/queue/device هم داشته باشد؛ در mobile فقط actionهای ضروری. |
| **Full player** | artwork، title، show، timestamps، progress scrubber، 15/30s seek، play/pause، speed، chapters، transcript، queue، sleep timer، download، save، share/clip، device/output. |
| **Persistent web player** | پایین صفحه، خارج از page content، state machine مستقل: idle/loading/playing/paused/buffering/error/offline/locked. |
| **Mobile gestures** | tap mini → full؛ swipe up/down؛ scrub; اما actions حیاتی نباید فقط gesture باشند. |
| **Episode progress** | درصد/زمان باقی‌مانده، resume marker، played state، chapter markers؛ در listها progress bar subtle. |
| **Chapters** | chapter markers روی progress bar، list با timestamp، jump action، current chapter highlight. Spotify و Pocket Casts هر دو chapters را برای navigation داخل episode پشتیبانی می‌کنند. [Spotify+1](https://support.spotify.com/us/creators/article/episode-chapters/) |
| **Transcript sync** | transcript tab با current line highlight، tap text → seek، search داخل transcript، share selected text، fallback “transcript unavailable”. Apple Podcasts و Substack هر دو transcript همگام و jump-by-text را پشتیبانی می‌کنند. [Apple Support+1](https://support.apple.com/en-tm/118668) |
| **Queue** | current/up next، reorder، remove، play next، clear queue، save queue as playlist. Drag باید keyboard alternative داشته باشد. |
| **Playback speed** | در full player و quick menu؛ speedهای رایج 0.75x، 1x، 1.25x، 1.5x، 2x؛ برای power users custom. Pocket Casts speed و per-podcast effects دارد. [Pocket Casts Support](https://support.pocketcasts.com/knowledge-base/playback-effects/) |
| **Sleep timer** | لازم است، مخصوصاً mobile. گزینه‌ها: 15m، 30m، 1h، end of episode، end of chapter، custom. Pocket Casts این pattern را دارد. [Pocket Casts Support](https://support.pocketcasts.com/knowledge-base/sleep-timer/) |
| **Download/offline** | در episode card، detail، full player و Library/Downloads؛ باید storage/data/Wi-Fi-only status روشن باشد. |
| **Share clip/snippet** | ابتدا MVP: share episode link + timestamp. سپس clip selector با waveform/transcript selection. |
| **Premium lock** | در episode card و player: lock badge + value explanation + CTA؛ اگر preview مجاز است، “Preview 2 min”. |
| **Buffering/loading/error** | loading کوتاه با spinner کوچک؛ buffering با “Reconnecting…”؛ error با Retry، Download if available، Report issue. |
| **Connection loss** | اگر downloaded: auto switch to offline. اگر stream: preserve position، retry exponential، show offline banner. |
| **Accessibility** | همه controls button واقعی با accessible name و state؛ progress slider keyboard-operated؛ transcript semantic; no audio-only critical feedback. W3C برای audio-only prerecorded transcript را در Level A ضروری می‌داند و media player باید بدون mouse و با screen reader قابل استفاده باشد. [W3C+1](https://www.w3.org/WAI/media/av/transcripts/) |
| **Keyboard shortcuts web** | Space play/pause، ←/→ seek، Shift+←/→ chapter، M mute، ↑/↓ volume، F full player، Q queue، T transcript، S save، ? shortcuts. در input fields غیرفعال شود. |

### تصمیم UX پیشنهادی

-   Default player باید **مینیمال** باشد.
    
-   Full player باید **لایه دوم قدرت** باشد.
    
-   Advanced controls مانند speed، sleep timer، transcript، chapters، queue باید در full player یا bottom sheet باشند.
    
-   transcript و chapters نباید feature تزئینی باشند؛ باید به **navigation، accessibility و shareability** کمک کنند.
    

---

## 10\. Component Inventory

### A. Foundation Components

| Component | کاربرد / جاها | Variants / states | Accessibility | Reuse |
| --- | --- | --- | --- | --- |
| Button | CTA، forms، dialogs | primary، secondary، ghost، destructive، loading، disabled | focus visible، loading announced، target مناسب | Shared |
| Icon button | player، cards، tables | default، selected، danger، compact | aria-label اجباری | Shared |
| Input | auth، search، creator forms | text، password، number، URL | label، error، hint، autocomplete | Shared |
| Search input | app/admin/creator | global، local، recent، autocomplete | keyboard focus، clear button | Shared |
| Select | filters/settings | single/multi، searchable | label و keyboard | Shared |
| Tabs | player، analytics، settings | underline، pill، segmented | role tablist | Shared |
| Modal/Dialog | confirm، paywall، override | standard، destructive، blocking | focus trap، escape behavior | Shared |
| Drawer/Sheet | mobile player، filters، queue | bottom sheet، side drawer | focus management | Shared |
| Toast | save، copied، background action | success/error/undo | non-blocking، screen reader live region | Shared |
| Tooltip | admin/analytics hints | hover/focus | not sole info path | Shared |
| Menu/Dropdown | card actions، account | context menu، command menu | keyboard navigation | Shared |
| Skeleton | lists/cards/charts | rail، table، card، chart | avoid motion shimmer or reduce | Shared |
| Badge | premium/status/category | lock، status، count | color + text | Shared |
| Avatar | account/team/creator | user، creator، placeholder | alt/initials | Shared |
| Card | podcast/episode/metric | compact، rich، interactive | semantic action area | Shared |
| Empty state | all | onboarding، no data، success-empty | useful CTA | Shared |
| Error state | all | inline، page، player، form | clear recovery | Shared |
| Loading state | all | skeleton، progress، spinner | status announcements | Shared |

### B. Audio/Product Components

| Component | کاربرد | Variants / states | Dependencies | Reuse |
| --- | --- | --- | --- | --- |
| Mini player | persistent playback | playing/paused/buffering/error/locked | playback service | Domain-specific |
| Full player | complete controls | transcript/chapters/queue tabs | audio engine، entitlement | Domain-specific |
| Player controls | play، seek، speed | disabled/loading/offline | media state | Domain-specific |
| Progress bar | playback progress | chapter markers، buffered، locked preview | time data | Domain-specific |
| Queue panel | upcoming episodes | reorder/remove/save | queue service | Domain-specific |
| Episode card | lists/search/library | free/premium/saved/downloaded/played | episode metadata | Domain-specific |
| Podcast card | discovery/library | followed/unfollowed/creator verified | podcast metadata | Domain-specific |
| Chapter list | navigation | current، locked، editable in creator | chapters data | Audio/Creator |
| Transcript viewer | reading/search/share | synced، static، unavailable | transcript timing | Audio/Creator |
| Playback speed selector | speed control | common/custom/per-podcast | preferences | Audio |
| Download button | offline | queued/downloading/downloaded/error | storage/network | Audio |
| Save button | library | saved/unsaved/auth-required | account | Audio |
| Follow button | show relationship | following/unfollow/auth-required | podcast/user | Audio |
| Share button | link/timestamp/clip | native share/copy/embed | sharing service | Shared+Audio |
| Clip selector | snippet creation | transcript/waveform range | waveform، rights | Advanced |
| Premium lock badge | monetization | locked/preview/owned | entitlement | Monetization |
| Audio waveform | clip/edit/processing | static/interactive/loading | waveform generation | Audio/Creator |

### C. Discovery Components

| Component | کاربرد | Variants | States | Reuse |
| --- | --- | --- | --- | --- |
| Hero carousel | featured/editorial | auto/manual، static fallback | loading، empty | Discovery |
| Content rail | Home/Discover | podcast، episode، creator، category | skeleton، pagination | Shared discovery |
| Category grid | browse | icon/text، editorial | empty | Discovery |
| Trending list | popularity | ranked، region/time | stale data warning | Discovery |
| Search result item | search | podcast/episode/creator/transcript | no result | Shared |
| Filter chips | search/category | selected/removable | overflow | Shared |
| Recommendation row | personalization | reason label | explainability | Discovery |
| Continue listening row | resume | episode/podcast/playlist | no history | Discovery+Playback |

### D. Creator Components

| Component | کاربرد | Variants / states | Accessibility | Reuse |
| --- | --- | --- | --- | --- |
| Upload dropzone | audio/artwork | drag/drop، picker، mobile picker | keyboard upload | Creator |
| Media processing status | transcode/checks | queued/processing/ready/failed | live updates | Creator |
| Episode editor form | metadata | draft/published/scheduled | field errors | Creator |
| Podcast settings form | show config | public/RSS/monetization | grouped sections | Creator |
| Publish checklist | readiness | complete/warning/blocking | status text | Creator |
| Schedule picker | publish time | timezone-aware | keyboard date/time | Shared |
| Analytics chart card | trends | line/bar/table | chart alt summary | Creator/Admin |
| Metric card | KPIs | delta/goal/warning | text explanation | Shared dashboard |
| Revenue card | monetization | gross/net/pending | transparent terms | Creator |
| Payout table | finance | statuses/export | sortable | Creator/Admin |
| Campaign card | ads | draft/live/paused | status visible | Monetization |

### E. Admin Components

| Component | کاربرد | Variants / states | Safety | Reuse |
| --- | --- | --- | --- | --- |
| Data table | users/cases/payments/logs | dense/comfortable، selectable | keyboard/table semantics | Admin/Creator |
| Case queue item | moderation | priority/SLA/assigned | clear status | Admin |
| Audit log row | traceability | actor/action/object | immutable display | Admin |
| User detail panel | support | profile/billing/playback | PII visibility rules | Admin |
| Moderation decision panel | approve/remove/escalate | reason required | confirmation/audit | Admin |
| Evidence viewer | audio/transcript/images/reports | synced player + evidence | evidence integrity | Admin |
| Status badge | case/payment/system | color+text | no color-only | Shared |
| Risk score indicator | triage | low/medium/high | explain factors | Admin |
| Internal notes panel | collaboration | note/history/mention | immutable or versioned | Admin |

---

## 11\. Design System Direction

### آیا Material Design 3 مناسب است؟

**بله، به‌عنوان foundation برای web/mobile responsive و tokenization مناسب است؛ اما player و brand/audio experience باید custom باشد.** Material 3 یک سیستم adaptable با components، tooling و color roles ارائه می‌کند و color system آن role-based و قابل پیاده‌سازی در tokens است. [Material Design+1](https://m3.material.io/)

| بخش | استفاده از M3 | Customization |
| --- | --- | --- |
| Buttons، inputs، dialogs، sheets، navigation، cards | مناسب | brand styling، density variants |
| Color roles و design tokens | بسیار مناسب | podcast artwork dynamic accents با محدودیت contrast |
| Data tables/admin | نیازمند extension | density، column controls، audit patterns |
| Audio player | foundation فقط | custom controls، waveform، transcript، queue |
| Mobile gestures/player | بهتر است Apple-like mental model هم لحاظ شود | native media behavior، lock screen، background controls |

Apple HIG توصیه می‌کند برای audio، سیستم‌عامل و controls استاندارد media در foreground/background محترم شمرده شوند و controls صوتی برای کارهای غیرصوتی repurpose نشوند. [Apple Developer](https://developer.apple.com/design/human-interface-guidelines/playing-audio)

### Token categories

| Token group | نمونه‌ها |
| --- | --- |
| Color | surface، background، primary، secondary، accent، success، warning، danger، premium، lock، focus |
| Typography | display، title، body، label، mono/data، transcript |
| Spacing | 2/4/8 scale، page gutters، card gaps |
| Radius | xs/s/m/l/full |
| Elevation | player dock، sheets، modals، sticky headers |
| Motion | duration، easing، enter/exit، player expand |
| Layout | breakpoints، max widths، sidebar widths، player heights |
| Component | button height، card padding، table density |
| State | hover، active، selected، disabled، loading، error |
| Data viz | chart palette، grid، tooltip، threshold colors |
| Audio | progress height، scrubber size، waveform density |

### Theme strategy

| موضوع | پیشنهاد |
| --- | --- |
| Dark mode default؟ | برای consumer audio app، dark-first یا system default مناسب است؛ اما Creator/Admin باید light و dark هر دو داشته باشند. |
| Dynamic color | فقط به‌صورت **accent محدود** بر اساس podcast artwork؛ نه برای text/background اصلی مگر contrast تضمین شود. Material dynamic color از content/user-generated color پشتیبانی می‌کند، اما accessibility باید کنترل شود. [Material Design](https://m3.material.io/styles/color/dynamic) |
| Typography | خوانایی طولانی: body واضح، line-height مناسب، transcript با highlighting بدون شلوغی. |
| Density | Consumer: comfortable. Creator: medium. Admin: dense but readable. |
| Motion | player expand/collapse، save feedback، upload progress؛ نه decorative-heavy. برای reduced motion، fades ساده و حذف parallax/shape morphing. [Material Design](https://m3.material.io/styles/motion/transitions/applying-transitions) |
| Brand personality | سریع، مطمئن، آرام، حرفه‌ای؛ نه کودکانه، نه enterprise خشک. |

### Design principles

1.  **Play is sacred:** هیچ navigation نباید playback را بشکند.
    
2.  **Start simple, reveal power:** default ساده، کنترل‌های حرفه‌ای پشت لایه دوم.
    
3.  **Trust before monetization:** paywall و billing باید شفاف باشند.
    
4.  **Creators need confidence:** هر publish action باید قابل فهم، قابل بازبینی و قابل برگشت در حد امکان باشد.
    
5.  **Admin speed with safety:** سریع، اما با audit، reason و confirmation.
    
6.  **Accessible by default:** keyboard، screen reader، contrast، transcripts، reduced motion.
    

---

## 12\. UX Simplification Strategy

| Feature / Area | Complexity risk | Simplification approach | Recommended pattern | Anti-pattern |
| --- | --- | --- | --- | --- |
| Home discovery | rails بی‌پایان | 5–7 rail با priority و reason | Continue first، then recommendations | Netflix-style endless rows بدون intent |
| Player controls | شلوغی | mini ساده، full قدرتمند | progressive disclosure | گذاشتن همه controls در mini player |
| Transcript/chapters | feature clutter | tabs در full player | Transcript / Chapters tabs | نمایش هم‌زمان همه چیز |
| Library | confusion save/follow/download | taxonomy واضح | Followed، Saved، Downloads، History | یک لیست مخلوط |
| Search filters | overload | filters بعد از query | chips + advanced drawer | نمایش فیلترهای زیاد قبل از search |
| Subscription | checkout friction | plan clear + 1–2 steps | plan → payment → confirmation | hidden fees، forced account early |
| Creator onboarding | طولانی | checklist + save progress | staged onboarding | wizard 12 مرحله‌ای |
| Episode upload | anxiety | progress + validation + retry | upload card/status timeline | blank wait screen |
| Publish flow | accidental publish | review screen + schedule | publish checklist | publish button نزدیک destructive actions |
| Analytics | vanity metrics | insight cards + drilldown | KPI → explanation → action | dashboard پر از نمودار |
| Monetization | compliance complexity | eligibility first | gated setup | نمایش همه options برای همه creators |
| Admin queue | overload | priority/SLA/filter presets | queue triage | table بدون prioritization |
| Entitlement override | abuse | duration/reason/approval | constrained modal | free-text unlimited override |
| Refund | irreversible | policy summary + confirmation | two-step confirm | one-click destructive action |
| Settings | too many toggles | grouped + search | defaults + advanced | huge settings page |

---

## 13\. Accessibility & Inclusive Design

WCAG 2.2 یک Recommendation رسمی W3C است و معیارهای جدیدی مثل Focus Not Obscured، Dragging Movements، Target Size، Consistent Help، Redundant Entry و Accessible Authentication اضافه کرده است. [W3C](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)

### Global checklist

| Area | Checklist |
| --- | --- |
| Keyboard navigation | همه interactive elements با Tab/Shift+Tab؛ shortcutها discoverable؛ drag actions alternative keyboard داشته باشند. |
| Screen reader | buttons با label و state؛ player state مثل “playing/paused/buffering” اعلام شود؛ toastها live region. |
| Focus states | visible، contrast کافی، focus در modal/sheet trap و پس از close به trigger برگردد. |
| Contrast | متن و controls مطابق WCAG؛ color-only status ممنوع. |
| Touch targets | حداقل WCAG 2.2 target size؛ در mobile ideally بزرگ‌تر و thumb-friendly. |
| Reduced motion | حذف parallax، shimmer شدید، auto animations؛ player expand با fade ساده. |
| Error messaging | خطا کنار field، توضیح مشکل و راه اصلاح؛ NN/g روی تشخیص و recovery واضح در error تأکید دارد. [Nielsen Norman Group](https://www.nngroup.com/articles/error-message-guidelines/) |
| Forms | label واقعی، hint، autocomplete، validation inline، no redundant entry. |
| Media | transcript برای audio-only، controls بدون mouse، captions برای video احتمالی. W3C برای media players دسترسی بدون mouse و با screen reader را ضروری می‌داند. [W3C+1](https://www.w3.org/WAI/media/av/transcripts/) |
| Charts | summary متنی، table fallback، توضیح metric، keyboard tooltip alternative. |
| Admin density | dense mode اختیاری؛ row height و focus ring حفظ شود. |

### Product-area checklist

| Product area | نکات accessibility |
| --- | --- |
| Listener app | mini player accessible name؛ full player headings؛ transcript search؛ progress slider keyboard. |
| Creator Studio | upload dropzone keyboard؛ processing status live؛ editor fields labelled؛ publish checklist semantic. |
| Admin Console | tables با header associations؛ bulk actions accessible؛ evidence player keyboard؛ confirmation dialogs focus-safe. |
| Monetization | plan comparison table readable؛ price/renewal واضح؛ checkout compatible با password managers/payment autofill. |
| Offline/error states | پیام‌ها بدون وابستگی به رنگ؛ recovery action واضح. |

---

## 14\. Responsive & Cross-Platform Strategy

Material layout بر اساس window size، adaptive panes و fixed/flexible regions فکر می‌کند؛ این برای ترکیب listener app، dashboard و admin مناسب است. [Material Design](https://m3.material.io/foundations/layout/understanding-layout/overview)

### Suggested breakpoints

| Class | Width | Usage |
| --- | --- | --- |
| Compact | <600px | mobile web/native |
| Medium | 600–839px | large phones/small tablets |
| Expanded | 840–1199px | tablet/desktop small |
| Large | 1200–1599px | desktop web/studio |
| XL | ≥1600px | admin/studio power layouts |

### Platform strategy

| Platform | Strategy |
| --- | --- |
| Desktop web listener | sidebar + top search + bottom player؛ rails grid؛ full player modal/page overlay. |
| Tablet | navigation rail؛ split view برای player/transcript در landscape. |
| Mobile web | bottom nav؛ mini player؛ limited creator/admin support. |
| Native mobile | best playback/offline/lock-screen/background support؛ gestures؛ downloads. |
| Creator Studio | desktop-first؛ mobile فقط monitoring/light edits؛ upload preferably responsive but not primary. |
| Admin Console | desktop-first؛ mobile فقط emergency read-only یا approval محدود. |

### Component adaptation

| Component | Mobile | Desktop |
| --- | --- | --- |
| Player | mini above tab، full-screen sheet | bottom dock، optional side queue |
| Tables | cards/list، key fields only | full table، columns، filters، bulk actions |
| Charts | single metric + simple trend | dashboard grid، compare، export |
| Forms | one column، stepper | two-column where useful، sticky preview/checklist |
| Navigation | bottom tabs | sidebar/rail + top search |
| Transcript | full-screen tab | side panel or full player tab |

---

## 15\. Monetization & Paywall UX

Baymard نشان می‌دهد checkout در بسیاری از desktop/mobile/app experiences هنوز mediocre یا worse است و این مستقیماً به abandonment منجر می‌شود؛ همچنین نبود payment option محبوب می‌تواند باعث ترک checkout شود. [Baymard Institute+1](https://baymard.com/blog/current-state-of-checkout-ux) Stripe Customer Portal هم الگوهای مهمی مثل مدیریت billing، payment methods، subscriptions، cancellation، invoices و cancellation reasons را پوشش می‌دهد. [Stripe Docs](https://docs.stripe.com/customer-management)

### Recommended paywall patterns

| Scenario | Pattern |
| --- | --- |
| Premium episode lock | lock badge روی card + توضیح کوتاه + preview اگر مجاز + CTA “Unlock with Premium”. |
| Creator membership content | badge متفاوت: “Member-only” نه “Platform Premium”. |
| One-time purchase | قیمت و ownership واضح؛ “Buy episode/season” جدا از subscription. |
| Ads/free model | قبل از play نباید entitlement را مبهم کند؛ sponsorship disclosure لازم است. |
| Trial | مدت، renewal date، cancel terms واضح. |
| Expired/failed payment | grace state: “Update payment to keep access”؛ دسترسی فعلی و تاریخ قطع روشن. |
| Plan comparison | 3–4 ستون حداکثر؛ feature groups؛ price monthly/yearly toggle. |
| Checkout | 1–2 مرحله: plan review → payment → confirmation؛ guest-like fast path برای public purchase با account creation minimal. |
| Cancellation | transparent؛ reason capture؛ downgrade options؛ no dark patterns. |

### Platform Premium vs Creator Membership

| نوع | مالک ارزش | entitlement | UX label |
| --- | --- | --- | --- |
| Platform Premium | پلتفرم | ads/offline/exclusive platform content | Premium |
| Creator Membership | creator خاص | member-only episodes/perks | Member-only |
| One-time Purchase | episode/season | owned content | Purchased |
| Ads | advertiser/platform/creator | free access با ads | Sponsored/Ad-supported |

### Anti-patterns

-   paywall قبل از اینکه کاربر ارزش محتوا را ببیند.
    
-   پنهان کردن renewal date.
    
-   ترکیب‌کردن platform premium و creator membership بدون label.
    
-   checkout چندمرحله‌ای با account form طولانی.
    
-   cancel flow با guilt copy یا hidden button.
    

### Required pages/components

| Required | Components |
| --- | --- |
| Pricing، Subscription management، Checkout، Payment methods، Receipts، Failed payment، Cancel/Change plan | Plan card، comparison table، lock badge، entitlement banner، payment form، invoice row، cancellation dialog |

### Checkout UX checklist

-   قیمت نهایی، renewal، tax/fees واضح.
    
-   payment methods محبوب و local.
    
-   inline validation.
    
-   secure/trust copy.
    
-   recoverable failed payment.
    
-   confirmation با entitlement summary.
    
-   accessible form labels و error messages.
    

---

## 16\. Creator Studio UX

Spotify for Creators روی upload، distribute، engagement، analytics، monetization، customization و clips/comments تأکید دارد. [Spotify for Creators](https://creators.spotify.com/) YouTube Studio در publish flow از مراحل Details، Checks و Visibility استفاده می‌کند و copyright checks را در background اجرا می‌کند؛ این برای podcast publishing قابل الهام است. [Google Help](https://support.google.com/youtubecreatorstudio/answer/57407?hl=en&ref_topic=6323801)

### Creator onboarding

| Step | Requirement |
| --- | --- |
| Account/role | listener account را به creator profile تبدیل کند؛ role مشخص. |
| Create or import podcast | new show یا RSS import. |
| Show metadata | title، description، category، language، explicit، artwork. |
| Verification | email/domain/RSS ownership if import. |
| Distribution settings | public/private، RSS، platforms. |
| Monetization eligibility | فقط summary؛ full setup بعداً. |
| Checklist | “Your podcast is ready when…” |

### Episode creation / upload flow

| Stage | UX requirement |
| --- | --- |
| Start | New episode button همیشه واضح. |
| Upload | drag/drop، file picker، supported format، size/connection note. Spotify audio publishing از MP3/M4A/WAV و no file-size limit با caveat پردازش طولانی‌تر پشتیبانی می‌کند. [Spotify](https://support.spotify.com/us/creators/article/publishing-audio-episodes/) |
| Validation | file type، duration، audio playable، artwork dimensions. |
| Metadata | title، description، season/episode، explicit، category/tags. |
| Transcript | auto-generate، upload VTT/SRT/TXT، edit after processing. |
| Chapters | auto/manual، timestamp validation. |
| Monetization | free/premium/member-only، preview duration. |
| Checks | copyright/policy/metadata completeness. |
| Visibility | draft، scheduled، published. |
| Confirmation | public URL، share، view analytics pending. |

### Media processing status

| State | UI |
| --- | --- |
| Queued | “در صف پردازش” + expected next step، نه fake progress. |
| Uploading | درصد واقعی، speed، retry. |
| Processing | timeline: uploaded → transcoding → waveform → transcript → checks. |
| Ready | publish CTA. |
| Failed | reason، retry، replace file، contact support، diagnostic ID. |

### Analytics UX

Spotify creator analytics شامل plays، impressions، consumption hours، streams/downloads، followers و monetization analytics است؛ Apple subscription analytics نیز conversion، retention، grace/billing retry، refunds و proceeds را نشان می‌دهد. [Spotify+1](https://support.spotify.com/to/creators/article/understanding-engagement-metrics-on-spotify/)

| Dashboard | Actionable pattern |
| --- | --- |
| Overview | “What changed?” cards، top episodes، alerts. |
| Episode analytics | retention curve، drop-off moments، chapter performance. |
| Audience | country، device، app/player، new vs returning. |
| Revenue | gross/net، platform fee، creator membership، refunds، pending payout. |
| Export | CSV برای finance/creator teams. |

### Revenue / payout

Patreon payout dashboard وضعیت‌هایی مثل initiated، successful، failed، reversed و complete را توضیح می‌دهد؛ حذف progress bar مبهم نیز نشان می‌دهد finance UX باید status دقیق، نه انیمیشن مبهم، داشته باشد. [Patreon Help Center](https://support.patreon.com/hc/en-us/articles/360058429051-Payout-Dashboard)

| Requirement | Detail |
| --- | --- |
| Balance clarity | available، pending، held، paid. |
| Payout status | human-readable + reason. |
| Tax/KYC | gated checklist. |
| Export | CSV، invoices، tax documents. |
| Failed payout | fix method، retry date، support. |

### Transcript و chapters editor

Substack transcript feature روی auto transcript، editing، VTT/SRT/TXT upload و paywalled transcript برای paid episode تمرکز دارد. [Substack Support](https://support.substack.com/hc/en-us/articles/18363324028564-How-can-I-generate-a-transcript-of-an-audio-post-on-Substack)

| Editor | UX |
| --- | --- |
| Transcript | timeline-linked text، search، timestamp correction، upload/download، speaker labels optional. |
| Chapters | add timestamp/title، reorder، validation min duration، preview in player. |
| Clips | از transcript یا waveform؛ در MVP بهتر است به timestamp share محدود شود. |

### Campaign / ads management

برای کنترل پیچیدگی:

-   فاز اول: revenue reporting و sponsor-read metadata.
    
-   فاز بعد: campaign setup، inventory، targeting، budget، pacing.
    
-   advanced ads را از creator publishing جدا نگه دارید.
    

### Risk areas

| Risk | Mitigation |
| --- | --- |
| Publish mistake | review screen + scheduled default option. |
| Processing uncertainty | status timeline + notifications. |
| Monetization confusion | eligibility first، terms simple. |
| Analytics distrust | data latency label، definitions. |
| Team permissions | role templates، owner-only destructive settings. |

---

## 17\. Admin Console UX

### Information architecture

Admin Console باید task-first باشد:

1.  **Global search**
    
2.  **Queues**
    
3.  **Case detail**
    
4.  **User/creator investigation**
    
5.  **Billing/support actions**
    
6.  **Audit logs**
    
7.  **System health/tools**
    

NN/g برای data tables تأکید می‌کند که tables باید find/filter، compare، view/edit/add rows و actions را پشتیبانی کنند؛ این دقیقاً برای admin، moderation و billing operations حیاتی است. [Nielsen Norman Group](https://www.nngroup.com/articles/data-tables/)

### Core admin flows

| Flow | Requirement |
| --- | --- |
| User investigation | search → user detail → account/billing/entitlement/playback/cases → notes/action. |
| Moderation queue | prioritized queue → evidence → policy → decision → audit. |
| Copyright case | claim intake → evidence/timeline → request info → restrict/remove/restore → audit. |
| Entitlement override | verify identity → reason → duration → approval if high-risk → apply → audit. |
| Refund | payment selection → policy summary → amount → confirmation → audit. |

### Case detail requirements

| Area | Data |
| --- | --- |
| Object | podcast/episode/user/creator/payment IDs |
| Evidence | reported content، transcript، timestamps، screenshots/files، report text |
| Policy | matching policy، previous decisions، severity |
| History | prior reports، strikes، appeals |
| Decision | approve/remove/restrict/escalate/refund/override |
| Notes | internal notes، mentions، handoff |
| Audit | actor، timestamp، reason، before/after |

### Permission-based UI rules

| Rule | UX behavior |
| --- | --- |
| No permission | hide sensitive tools or show read-only with reason. |
| Partial permission | action disabled with “Requires Finance Admin”. |
| Destructive permission | confirmation + reason required. |
| High-risk action | second approval or cooldown. |
| PII | masked by default; reveal with reason logged. |

### Safety UX rules

-   destructive actions separated visually.
    
-   no bulk destructive action without preview count.
    
-   reason required for override/refund/removal.
    
-   immutable audit trail.
    
-   undo window where legally/technically possible.
    
-   policy link near moderation decision.
    
-   high-risk queue items require escalation.
    

---

## 18\. Empty, Loading, Error, Offline States

NN/g می‌گوید empty states باید system status را communicate کنند، learnability را بالا ببرند و مسیر task بعدی را نشان دهند. [Nielsen Norman Group](https://www.nngroup.com/articles/empty-state-interface-design/)

| State | Message tone | Primary action | Secondary action | Visual treatment | Recovery path | Log/report |
| --- | --- | --- | --- | --- | --- | --- |
| Empty library | encouraging | Discover podcasts | Import/follow | illustration subtle | go Discover | no |
| Empty search result | helpful | Edit search | Browse categories | query echo + suggestions | spell/category fallback | search analytics |
| No internet | calm | Retry | View downloads | offline banner | auto reconnect | yes if playback affected |
| Playback failed | direct | Retry | Download/report | player error card | alternative stream/CDN | yes |
| Premium required | clear/value | View plan | Play preview | lock badge/paywall card | subscribe or back | conversion event |
| Upload failed | reassuring | Retry upload | Replace file/support | progress card error | resume/retry | yes |
| Processing failed | diagnostic | View reason/retry | Contact support | timeline failed step | replace file | yes |
| Analytics no data | educational | Publish/share episode | Change date range | empty chart + explanation | wait for data | no |
| Payment failed | urgent but calm | Update payment | Try another method | billing banner | retry payment | yes |
| Permission denied | neutral | Request access | Back | lock/role message | owner/admin request | yes |
| Admin no access | formal | Request role | Go dashboard | read-only explanation | RBAC request | yes |
| Moderation queue empty | positive | View resolved | Change filters | success-empty | none | no |
| Server degraded | transparent | Check status | Retry | status banner | incident updates | yes |
| CDN/audio unavailable | precise | Retry | Download/use backup | player service error | fallback CDN | yes |

---

## 19\. Microcopy & Tone

### Voice principles

| Area | Tone |
| --- | --- |
| Listener app | ساده، گرم، کوتاه، action-oriented |
| Creator Studio | اطمینان‌بخش، دقیق، آموزشی بدون patronizing |
| Admin Console | رسمی، دقیق، policy-aware، بدون شوخی |
| Monetization | شفاف، trust-building، بدون pressure |
| Errors | human، specific، recoverable |

### Do / Don’t examples

| Context | Do | Don’t |
| --- | --- | --- |
| Playback error | «پخش متوقف شد. دوباره تلاش کنید یا اگر اپیزود دانلود شده، آفلاین گوش دهید.» | «خطای 504» |
| Premium lock | «این اپیزود برای اعضای Premium است. می‌توانید ۲ دقیقه اول را پیش‌نمایش کنید.» | «برای ادامه پول بدهید.» |
| Upload processing | «فایل آپلود شد. در حال ساخت نسخه‌های پخش و waveform هستیم.» | «Processing…» |
| Processing failed | «فایل قابل پخش نبود. یک فایل MP3، M4A یا WAV دیگر بارگذاری کنید.» | «Upload failed.» |
| Refund confirmation | «این refund قابل برگشت نیست و در audit log ثبت می‌شود.» | «مطمئنی؟» |
| Empty analytics | «هنوز داده کافی نداریم. معمولاً بعد از اولین پخش‌ها نمودارها فعال می‌شوند.» | «No data.» |

### Copy patterns

| Pattern | ساختار |
| --- | --- |
| Error | What happened → why if known → what to do |
| Paywall | Value → access condition → CTA → terms |
| Empty | State → benefit → next action |
| Admin destructive | Consequence → object count → reason → confirm |
| Processing | Current step → next step → notification expectation |

### Terminology glossary

| Term | پیشنهاد |
| --- | --- |
| Follow | دنبال‌کردن پادکست |
| Save | ذخیره برای بعد |
| Download | دانلود برای گوش‌دادن آفلاین |
| Queue | صف پخش |
| Premium | اشتراک پلتفرم |
| Membership | عضویت creator |
| Entitlement | دسترسی / حق دسترسی |
| Payout | تسویه / پرداخت به creator |
| Processing | پردازش رسانه |
| Case | پرونده |
| Override | تغییر دستی دسترسی |

---

## 20\. Metrics & UX Success Measurement

### Listener metrics

| Metric | Definition | Why matters | How measure | UX decisions |
| --- | --- | --- | --- | --- |
| Activation | user plays/follows/saves within first session | ارزش اولیه | event funnel | onboarding، home |
| First play | first successful playback | core value | tap play → audio start | player latency |
| Search success | query leading to play/follow/save | discovery quality | search → action | ranking/filters |
| Play completion | episode completion or meaningful progress | engagement | progress events | player/resume |
| Save/follow rate | save/follow per episode/podcast view | library value | CTA events | card/detail CTA |
| Subscription conversion | paywall/pricing → paid | monetization | funnel | paywall/checkout |
| Retention | return usage D1/D7/D30 | habit | cohorts | notifications/home |

### Playback metrics

| Metric | Definition | Why | Measure | UI impact |
| --- | --- | --- | --- | --- |
| Time to First Play | play tap to audible audio | perceived speed | client media telemetry | loading/player infra |
| Playback error rate | failed starts/sessions | trust | error events | fallback/retry |
| Buffering incidents | buffer count/time per session | quality | media telemetry | CDN/offline |
| Resume success | last position restored | continuity | resume event accuracy | sync UX |
| Player interaction rate | use speed/chapters/transcript/queue | feature value | control events | progressive disclosure |

### Creator metrics

| Metric | Definition | Why | Measure | UI impact |
| --- | --- | --- | --- | --- |
| Onboarding completion | start → studio ready | creator activation | funnel | stepper/checklist |
| First episode published | creator publishes first episode | value creation | publish event | upload/publish flow |
| Upload success | upload attempts → valid file | reliability | upload telemetry | validation/retry |
| Publish success | draft ready → live/scheduled | confidence | checklist/funnel | review screen |
| Analytics engagement | creator views/drills insights | usefulness | dashboard events | insight design |
| Monetization activation | eligible creator enables revenue | business | setup funnel | eligibility UX |

### Admin metrics

| Metric | Definition | Why | Measure | UI impact |
| --- | --- | --- | --- | --- |
| Case resolution time | open → resolved | ops efficiency | case timestamps | queue/case UX |
| Moderation accuracy | upheld decisions / appeals | safety | QA/appeals | evidence/policy UX |
| Support handling time | ticket/user issue duration | cost/CSAT | support logs | user detail/search |
| Override error rate | incorrect/expired/manual access mistakes | risk | audits/reversals | confirmation/RBAC |

---

## 21\. Product Roadmap From UX Perspective

### A. First usable version

| لازم | جزئیات |
| --- | --- |
| Pages | Landing، Public Podcast/Episode، Login/Register، Home، Search، Podcast detail، Episode detail، Mini/Full Player، Library basic، Creator onboarding، Episode upload/publish، Admin moderation queue/case basic |
| Components | Button/Input/Card، Episode/Podcast card، Mini/Full player، Search result، Upload dropzone، Processing status، Data table، Modal |
| Flows | discover، play، follow/save، signup، creator upload/publish، admin review |
| Deferred | playlists advanced، clips، ads campaigns، detailed payouts، feature flags، advanced analytics |
| UX risks | playback reliability، upload failure، paywall clarity |
| Research gaps | target markets، licensing/offline rules، creator payout provider |

### B. Strong MVP / Beta

| لازم | جزئیات |
| --- | --- |
| Pages | Billing، Subscription management، Downloads، Playlists، Transcript/Chapters، Creator analytics، Monetization settings، Payouts، User detail، Billing support |
| Components | Paywall، Plan cards، Transcript viewer، Chapter list، Queue panel، Analytics chart cards، Payout table، Entitlement override |
| Flows | subscribe، resume cross-device، download/offline، creator analytics، monetization setup، refund/override |
| Deferred | dynamic ads، full campaign manager، advanced personalization، public API |
| UX risks | monetization taxonomy، analytics trust، RBAC |
| Research gaps | subscription packaging، creator membership model، privacy/compliance per region |

### C. Full enterprise product

| لازم | جزئیات |
| --- | --- |
| Pages | Campaigns/Ads، Advanced Admin، Audit logs، System health، Feature flags، Copyright workflows، Creator teams، Revenue analytics، Support tools |
| Components | Evidence viewer، Risk score، Command palette، Bulk actions، Advanced data tables، Feature flag controls |
| Flows | copyright case، campaign lifecycle، team approvals، audit exports، system incidents |
| Deferred/Optional | AI recommendations، AI transcript cleanup، auto clip suggestions، dynamic artwork themes |
| UX risks | admin complexity، compliance، false positives in moderation |
| Research gaps | trust & safety policy، local tax/KYC، ads inventory/liability |

---

## 22\. Final Deliverables

### 1\. Executive summary

این محصول باید با سه UX mode طراحی شود:

1.  **Listener mode:** سریع، ساده، persistent، mobile-first.
    
2.  **Creator mode:** structured، confidence-building، workflow-based.
    
3.  **Admin mode:** dense، searchable، safe، audited.
    

بزرگ‌ترین ریسک طراحی این است که یک design system واحد، همه domainها را یکسان ببیند. foundation مشترک لازم است، اما density، navigation، copy، permission و component behavior باید برای هر domain متفاوت شود.

### 2\. Product design principles

| Principle | Meaning |
| --- | --- |
| Playback continuity | audio مستقل از page navigation |
| Progressive power | default ساده، advanced controls قابل کشف |
| Trust in money | subscription/revenue/payout کاملاً شفاف |
| Publish confidence | هیچ creator نباید ناخواسته منتشر کند |
| Operational safety | admin actions traceable و constrained |
| Accessibility as core | transcript، keyboard، contrast، screen reader از ابتدا |

### 3\. User segments and JTBD

در بخش‌های 2 و 3 تعریف شد؛ برای wireframing باید به سه archetype اصلی تبدیل شود:

-   **Casual Listener**
    
-   **Professional Creator**
    
-   **Internal Operator**
    

### 4\. Competitive benchmark table

در بخش 4 ارائه شد. الگوی ترکیبی پیشنهادی:

-   Spotify/Apple برای listener IA و player.
    
-   Pocket Casts/Overcast برای power controls.
    
-   YouTube Studio/Spotify for Creators/Substack برای publishing.
    
-   Patreon/Stripe برای monetization و payout.
    
-   Linear/Vercel/Stripe برای admin/dashboard speed.
    
-   NN/g/Baymard/WCAG/M3/HIG برای design quality و accessibility.
    

### 5\. Full sitemap

در بخش‌های 5 و 6 ارائه شد.

### 6\. Full page inventory

در بخش 6 ارائه شد؛ مرحله بعد باید هر صفحه به **Page Spec Template** تبدیل شود:

| Field | Required |
| --- | --- |
| Page goal | yes |
| Entry points | yes |
| Primary action | yes |
| Data contract | yes |
| Components | yes |
| States | empty/loading/error/offline |
| Permissions | where relevant |
| Analytics events | yes |
| Accessibility notes | yes |

### 7\. Full component inventory

در بخش 10 ارائه شد؛ باید به Figma library با سه سطح تبدیل شود:

1.  Foundations
    
2.  Shared product components
    
3.  Domain-specific components
    

### 8\. Navigation recommendation

-   Listener web: sidebar + top search + bottom player.
    
-   Mobile: 4 bottom tabs + mini player + full-screen player.
    
-   Creator: desktop-first sidebar + podcast switcher.
    
-   Admin: sidebar + global search + queue-first IA.
    

### 9\. Playback UX recommendation

-   mini player همیشه ساده.
    
-   full player محل advanced controls.
    
-   transcript/chapters جزء navigation و accessibility هستند، نه nice-to-have.
    
-   offline/download و connection loss باید first-class state باشند.
    
-   web shortcuts برای power users لازم است.
    

### 10\. Creator Studio UX recommendation

-   onboarding مرحله‌ای با checklist.
    
-   upload/publish wizard.
    
-   editor form برای اصلاحات بعدی.
    
-   processing timeline شفاف.
    
-   analytics با insight و action، نه فقط نمودار.
    
-   monetization gated by eligibility.
    
-   payout status انسانی و قابل export.
    

### 11\. Admin Console UX recommendation

-   global search P0.
    
-   queue/case/evidence/policy/audit در یک mental model.
    
-   destructive actions با reason، confirmation و audit.
    
-   RBAC روی navigation و controls اثر مستقیم داشته باشد.
    
-   tables باید filter، sort، bulk، export و keyboard داشته باشند.
    

### 12\. Monetization UX recommendation

-   premium، membership و purchase را کاملاً جدا label کنید.
    
-   paywall context-aware و غیرتهاجمی.
    
-   checkout 1–2 step.
    
-   billing self-service.
    
-   failed payment با recovery واضح.
    
-   cancellation شفاف و بدون dark pattern.
    

### 13\. Design system direction

-   M3 برای foundation و tokenization مناسب است.
    
-   audio player، waveform، transcript و premium states custom.
    
-   dark-first برای listener قابل دفاع است؛ Creator/Admin باید system/light/dark داشته باشند.
    
-   dynamic artwork color فقط accent و با contrast guardrails.
    
-   density profiles: consumer comfortable، creator medium، admin dense.
    

### 14\. Accessibility checklist

در بخش 13 ارائه شد؛ P0های غیرقابل مذاکره:

-   keyboard player.
    
-   transcript برای audio-only.
    
-   focus visible.
    
-   icon buttons با aria-label.
    
-   chart summaries.
    
-   drag alternatives.
    
-   reduced motion.
    
-   color + text برای status.
    

### 15\. Responsive strategy

در بخش 14 ارائه شد؛ تصمیم کلیدی:

-   Listener: mobile-first.
    
-   Creator/Admin: desktop-first, responsive monitoring.
    
-   Player: persistent و adaptive.
    
-   Tables: desktop table، mobile cards.
    
-   Forms: mobile single-column، desktop grouped.
    

### 16\. Empty/loading/error/offline state inventory

در بخش 18 ارائه شد؛ باید از ابتدا در design system componentized شود، نه بعداً.

### 17\. UX metrics

در بخش 20 ارائه شد؛ instrumentation باید قبل از beta تعریف شود.

### 18\. Product design roadmap

در بخش 21 ارائه شد.

### 19\. Open questions for next research phase

| Topic | Research gap |
| --- | --- |
| Business model | platform premium vs creator membership vs ads دقیقاً چه اولویتی دارد؟ |
| Markets | زبان‌ها، کشورها، payment methods، tax/KYC، copyright rules کدام‌اند؟ |
| Content policy | moderation policy، appeal flow، copyright escalation تعریف شده؟ |
| Offline rights | آیا همه premium/member content قابل دانلود است؟ |
| Video podcasts | در scope است یا audio-only؟ |
| Cross-device playback | real-time device handoff مثل Spotify Connect لازم است یا فقط progress sync؟ |
| Creator roles | owner/editor/analyst/finance/support چه permissionهایی دارند؟ |
| Ads | dynamic ads، host-read sponsorship یا campaign manager کامل؟ |
| Transcripts | auto-transcription built-in یا third-party؟ چه زبان‌هایی؟ |
| Enterprise support | SLA، incident/status page و admin audit retention چقدر است؟ |

### 20\. Recommended next steps for wireframing

1.  ساخت **IA map** جدا برای Listener، Creator، Admin.
    
2.  تعریف **Page Spec Template** و تکمیل P0 pages.
    
3.  wireframe low-fi برای: Home/Search/Podcast/Episode/Player، Creator Upload/Publish، Admin Queue/Case.
    
4.  طراحی component architecture: player، cards، forms، tables، states.
    
5.  user testing سریع روی سه task: first play، publish episode، resolve moderation case.
    
6.  تعریف analytics event taxonomy برای P0 flows.
    

---

