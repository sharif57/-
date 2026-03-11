# Project Overview - কুরআন অ্যাপ্লিকেশন আর্কিটেকচার

## সম্পূর্ণ প্রকল্প দৃষ্টিভঙ্গি

```
┌─────────────────────────────────────────────────────────────┐
│                    সম্পূর্ণ কুরআন অ্যাপ                      │
│                   (Complete Quran App)                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │      IslamicBackground (Canvas)        │
        │  ├─ রাতের আকাশ গ্রেডিয়েন্ট            │
        │  ├─ 150 ঝলমলে তারকা                  │
        │  ├─ চাঁদ গ্লো প্রভাব                   │
        │  ├─ 3 মসজিদ সিলুয়েট                  │
        │  └─ 5 ভাসমান লণ্ঠন                    │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │         Header Component                │
        │  ├─ লোগো / টাইটেল                      │
        │  ├─ থিম টগেল (Dark/Light)             │
        │  └─ নেভিগেশন লিঙ্ক                     │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │         Main Page Content               │
        │  ├─ হিরো সেকশন                         │
        │  ├─ সার্চ বার                          │
        │  ├─ স্ট্যাটিস্টিকস কার্ড                 │
        │  └─ সূরা লিস্ট গ্রিড                    │
        └─────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
    ┌──────────────────────┐    ┌──────────────────────┐
    │   SurahList.tsx      │    │  SurahDetail Modal   │
    │  (Grid Display)      │    │   (Enhanced View)    │
    │                      │    │                      │
    │ ├─ সূরা কার্ড        │    │ ├─ অডিও প্লেয়ার    │
    │ ├─ সার্চ ফিল্টার    │    │ ├─ আয়াহ লিস্ট     │
    │ ├─ বুকমার্ক টগেল    │    │ ├─ অনুবাদ প্যানেল   │
    │ └─ ক্লিক হ্যান্ডলার  │    │ └─ কপি বাটন        │
    └──────────────────────┘    └──────────────────────┘
                                         │
                    ┌────────────────────┼────────────────────┐
                    │                    │                    │
                    ▼                    ▼                    ▼
            ┌──────────────┐     ┌──────────────┐   ┌──────────────┐
            │ Audio Player │     │ Translation  │   │ Ayah Display │
            │              │     │   System     │   │              │
            │ ├─ Play/Pause│     │              │   │ ├─ Arabic    │
            │ ├─ Progress  │     │ ├─ Fetch     │   │ ├─ Bengali   │
            │ ├─ Volume    │     │ ├─ Display   │   │ ├─ Number    │
            │ └─ Time      │     │ └─ Toggle    │   │ └─ Highlight │
            └──────────────┘     └──────────────┘   └──────────────┘
```

## ডেটা ফ্লো

```
┌──────────────────┐
│  Al Quran Cloud  │  (বিনামূল্যে API)
│     API Server   │
└──────┬───────────┘
       │
       ├──────────────────────┬────────────────┬──────────────┐
       │                      │                │              │
       ▼                      ▼                ▼              ▼
    সূরা লিস্ট          আরবি পাঠ          বাংলা অনুবাদ     অডিও ফাইল
  (/v1/surah)      (/v1/surah/{n})   (/v1/surah/{n}/...) (CDN লিঙ্ক)
       │                      │                │              │
       └──────────────────────┼────────────────┼──────────────┘
                              │
                    ┌─────────▼─────────┐
                    │   React State     │
                    │  Management       │
                    │                   │
                    │ ├─ surahs[]       │
                    │ ├─ selectedSurah  │
                    │ ├─ currentTime    │
                    │ ├─ volume         │
                    │ ├─ bookmarks[]    │
                    │ └─ translations{} │
                    └─────────┬─────────┘
                              │
                    ┌─────────▼─────────┐
                    │  UI Components    │
                    │  (Display Layer)  │
                    │                   │
                    │ ├─ SurahList      │
                    │ ├─ AudioPlayer    │
                    │ ├─ Translation    │
                    │ ├─ Animations     │
                    │ └─ Background     │
                    └───────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │  User Interface   │
                    │  (Visual Output)  │
                    └───────────────────┘
```

## কম্পোনেন্ট হায়ারার্কি

```
App (page.tsx)
│
├─ IslamicBackground
│  └─ Canvas Animation
│     ├─ Stars (150)
│     ├─ Moon (1)
│     ├─ Mosques (3)
│     └─ Lanterns (5)
│
├─ Header
│  ├─ Logo/Title
│  ├─ Theme Toggle
│  └─ Navigation
│
├─ Main Content
│  ├─ Hero Section
│  │  ├─ Title
│  │  └─ Subtitle
│  │
│  ├─ Search Bar
│  │  └─ Real-time Filter
│  │
│  ├─ Stats Cards (3)
│  │  ├─ Total Surahs
│  │  ├─ Bookmarks Count
│  │  └─ Total Ayahs
│  │
│  └─ SurahList Grid
│     └─ Surah Cards (114)
│        ├─ Name
│        ├─ English Name
│        ├─ Ayah Count
│        └─ Bookmark Button
│
├─ SurahDetailEnhanced (Modal)
│  │
│  ├─ Header
│  │  ├─ Back Button
│  │  ├─ Surah Name
│  │  └─ Bookmark Toggle
│  │
│  ├─ Audio Player
│  │  ├─ Play/Pause Button
│  │  ├─ Progress Slider
│  │  │  ├─ Current Time
│  │  │  └─ Duration
│  │  ├─ Volume Control
│  │  │  ├─ Slider
│  │  │  └─ Percentage
│  │  └─ Translation Toggle
│  │
│  ├─ Surah Info Cards (3)
│  │  ├─ Total Ayahs
│  │  ├─ Revelation Type
│  │  └─ Surah Number
│  │
│  └─ Ayahs List
│     └─ Ayah Item (Multiple)
│        ├─ Arabic Text
│        ├─ Bengali Translation (conditional)
│        └─ Copy Button
│
└─ Footer
   ├─ Features List
   ├─ API Credits
   └─ Information
```

## অডিও পাইপলাইন

```
┌────────────────────────────────────┐
│   Audio Initialization             │
│  (SurahDetailEnhanced)             │
└────────────┬───────────────────────┘
             │
             ▼
┌────────────────────────────────────┐
│  Set Audio URL                     │
│  CDN: islamic.network/audio/...   │
└────────────┬───────────────────────┘
             │
             ▼
┌────────────────────────────────────┐
│  HTML5 Audio Element               │
│  <audio ref={audioRef} src={url}/> │
└────────────┬───────────────────────┘
             │
             ├─────────────────────┐
             │                     │
             ▼                     ▼
    ┌──────────────────┐   ┌──────────────┐
    │ Play Button      │   │ Volume       │
    │ Click Handler    │   │ Slider       │
    │                  │   │              │
    │ togglePlayPause()│   │ audioRef.    │
    │ ├─ pause()      │   │ volume =     │
    │ └─ play()       │   │ value/100    │
    └────────┬─────────┘   └──────┬───────┘
             │                     │
             └──────────┬──────────┘
                        │
                        ▼
             ┌────────────────────┐
             │  Audio Events      │
             │                    │
             │ ├─ timeupdate      │
             │ ├─ loadedmetadata  │
             │ ├─ ended           │
             │ └─ error           │
             └────────┬───────────┘
                      │
    ┌─────────────────┼─────────────────┐
    │                 │                 │
    ▼                 ▼                 ▼
┌────────┐       ┌────────┐        ┌────────┐
│Current │       │Duration│        │Playing │
│Time    │       │Display │        │State   │
│Update  │       │Update  │        │Update  │
└────┬───┘       └────┬───┘        └────┬───┘
     │                │                 │
     └────────────────┼─────────────────┘
                      │
                      ▼
          ┌──────────────────────┐
          │ Progress Bar Update  │
          │ Slider Sync          │
          │ Time Display         │
          └──────────────────────┘
```

## স্টেট ম্যানেজমেন্ট

### হোম পেজ স্টেট (page.tsx)
```typescript
surahs: Surah[]               // সব 114 সূরা
loading: boolean              // লোডিং স্থিতি
selectedSurah: number | null  // নির্বাচিত সূরা নম্বর
searchQuery: string           // সার্চ ইনপুট
bookmarks: number[]           // বুকমার্ক করা সূরা নম্বর
```

### বিস্তারিত পৃষ্ঠা স্টেট (SurahDetailEnhanced.tsx)
```typescript
surahInfo: SurahInfo | null   // সূরার তথ্য
ayahs: Ayah[]                 // সব আয়াত
banglaText: { [key: number]: string }  // বাংলা অনুবাদ
loading: boolean              // লোডিং অবস্থা
isPlaying: boolean            // অডিও চলছে কিনা
currentTime: number           // বর্তমান অডিও সময়
duration: number              // মোট অডিও সময়
volume: number                // ভলিউম 0-100
showTranslate: boolean        // অনুবাদ দেখান কিনা
```

## স্টাইলিং স্ট্র্যাটেজি

```
globals.css
├─ Tailwind CSS imports
├─ Color variables (OKLCH)
├─ Dark mode overrides
├─ Custom animations
│  ├─ fade-in
│  ├─ slide-in-right
│  ├─ glow-pulse
│  └─ shimmer
├─ Utility classes
│  ├─ glass-effect
│  ├─ card-hover
│  └─ highlight-translation
└─ Keyframe definitions

Component CSS
├─ Tailwind classes
├─ Dark: prefix for dark mode
├─ Responsive: sm:, md:, lg:, xl:
└─ Interactive: hover:, focus:, active:
```

## API এন্ডপয়েন্ট মানচিত্র

```
Al Quran Cloud API (https://api.alquran.cloud)

GET /v1/surah
└─ সব সূরা সম্পূর্ণ মেটাডেটা সহ
   ├─ number
   ├─ name (আরবি)
   ├─ englishName
   ├─ numberOfAyahs
   └─ revelationType

GET /v1/surah/{number}
└─ নির্দিষ্ট সূরা আরবি পাঠ সহ
   └─ ayahs[]
      ├─ number
      ├─ text
      └─ numberInSurah

GET /v1/surah/{number}/bn.bengali
└─ নির্দিষ্ট সূরা বাংলা অনুবাদ সহ
   └─ ayahs[]
      ├─ number
      ├─ text
      └─ numberInSurah

Audio CDN (https://cdn.islamic.network)

GET /quran/audio/128/{reciter}/{surah}.mp3
└─ সূরার অডিও রেসিটেশন
   └─ abdul_basit_murattal (ডিফল্ট)
```

## পারফরম্যান্স অপটিমাইজেশন

```
Load Time Optimization
│
├─ Code Splitting
│  ├─ Dynamic imports
│  └─ Lazy loading
│
├─ Image Optimization
│  ├─ Canvas instead of images
│  └─ No image assets
│
├─ CSS Optimization
│  ├─ Tailwind JIT
│  └─ Minification
│
└─ JavaScript Optimization
   ├─ Tree shaking
   └─ Minification

Runtime Optimization
│
├─ Canvas Animation
│  ├─ requestAnimationFrame
│  ├─ Efficient redraw
│  └─ Clean up listeners
│
├─ Event Handling
│  ├─ Debounced search
│  ├─ Event delegation
│  └─ Listener cleanup
│
└─ State Management
   ├─ Minimal re-renders
   ├─ Memoization
   └─ Efficient updates
```

## ফোল্ডার স্ট্রাকচার বিস্তৃত

```
project/
│
├── app/
│   ├── page.tsx                 # হোম পেজ (114 সূরা লিস্ট)
│   ├── layout.tsx               # রুট লেআউট (ফন্ট, মেটাডেটা)
│   ├── globals.css              # গ্লোবাল স্টাইল (অ্যানিমেশন, রঙ)
│   └── favicon.ico              # সাইট আইকন
│
├── components/
│   ├── IslamicBackground.tsx    # ক্যানভাস অ্যানিমেশন (রাত, চাঁদ, মসজিদ)
│   ├── SurahDetailEnhanced.tsx   # বিস্তারিত পৃষ্ঠা + অডিও প্লেয়ার
│   ├── SurahList.tsx            # সূরা গ্রিড প্রদর্শন
│   ├── Header.tsx               # শীর্ষ নেভিগেশন বার
│   ├── Footer.tsx               # ফুটার তথ্য
│   ├── theme-provider.tsx       # থিম সংদর্শক
│   │
│   └── ui/                      # shadcn/ui কম্পোনেন্ট
│       ├── button.tsx           # বোতাম
│       ├── card.tsx             # কার্ড
│       ├── input.tsx            # ইনপুট ফিল্ড
│       ├── slider.tsx           # অডিও/ভলিউম স্লাইডার
│       ├── accordion.tsx
│       ├── badge.tsx
│       ├── scroll-area.tsx
│       └── ... (45+ কম্পোনেন্ট)
│
├── lib/
│   ├── quran-utils.ts           # সহায়ক ফাংশন
│   ├── utils.ts                 # cn() ক্লাস সংমিশ্রণ
│   └── hooks/                   # কাস্টম হুক
│
├── public/
│   └── icons/                   # সাইট আইকন
│
└── Documentation/
    ├── README.md                # সম্পূর্ণ গাইড
    ├── IMPLEMENTATION.md        # বাস্তবায়ন বিস্তারিত
    ├── QUICK_REFERENCE.md       # দ্রুত রেফারেন্স
    ├── COMPLETE_SUMMARY.md      # চূড়ান্ত সারসংক্ষেপ
    ├── PROJECT_OVERVIEW.md      # এই ফাইল
    └── FEATURES.md              # বৈশিষ্ট্য চেকলিস্ট
```

## ডিপ্লয়মেন্ট আর্কিটেকচার

```
                    ┌─────────────────┐
                    │  Source Code    │
                    │   (GitHub)      │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Vercel Deploy  │
                    │   (CI/CD)       │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
         ▼                   ▼                   ▼
    ┌─────────┐         ┌─────────┐        ┌──────────┐
    │ Build   │         │ Test    │        │ Optimize │
    │ Next.js │         │ Assets  │        │ Bundle   │
    └────┬────┘         └─────────┘        └────┬─────┘
         │                   │                  │
         └───────────────────┼──────────────────┘
                             │
                    ┌────────▼────────┐
                    │  Edge Network   │
                    │   (CDN)         │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
         ▼                   ▼                   ▼
    ┌─────────┐         ┌─────────┐        ┌──────────┐
    │ User    │         │ Cached  │        │ Dynamic  │
    │ Browser │         │ Assets  │        │ Routes   │
    └─────────┘         └─────────┘        └──────────┘
```

---

এটি সম্পূর্ণ প্রকল্প আর্কিটেকচার ওভারভিউ। সবকিছু সংযুক্ত এবং কাজ করছে!
