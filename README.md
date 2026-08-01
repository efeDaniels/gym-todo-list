# gym-todo

Mobil-öncelikli antrenman ve beslenme takip uygulaması. Telefondan spor salonunda kullanmak için tasarlandı.

**Canlı**: [gym-todo-iota.vercel.app](https://gym-todo-iota.vercel.app)

## Özellikler

- **Bugün** — Otomatik olarak bugünün antrenmanı + tam beslenme çizelgesi + su takibi tek ekranda
- **Antrenman** — Haftalık program (Pzt Push, Sal Pull, Çar Legs A, Cum Upper, Cmt Legs B, Prş/Paz dinlenme). Set-set işaretlenir, RPE ve cue'lar mevcut.
- **Beslenme** — 7 öğün zaman çizelgesi, kalem-kalem işaretlenebilir, çiğ ölçü hatırlatmaları
- **Su takibi** — 250ml/bardak × 18 bardak = 4.5L günlük hedef
- **Offline** — Kurulumdan sonra internet olmadan çalışır (statik SPA)
- **Kalıcılık** — Tüm ilerleme `localStorage`'da, gün bazlı otomatik sıfırlanır
- **Multi-tab sync** — Aynı cihazda birden fazla sekme açıksa senkron kalır

## Teknoloji

- Vite 8 + React 19 + TypeScript 6 (strict)
- Tailwind CSS v4
- State: `useSyncExternalStore` + `localStorage`
- Router yok — state tabanlı sekme geçişi
- 227 KB JS (gzip 69 KB), 27 KB CSS (gzip 5.8 KB)

## Geliştirme

```bash
bun install
bun run dev        # http://localhost:5173
bun run build      # prod build → dist/
bun run preview    # prod'u lokal test et
```

## Deploy

Vercel'e otomatik deploy (git push → prod). Manuel deploy için:

```bash
vercel --prod
```

## Yapı

```
src/
├── App.tsx                    # Tab state + view switch
├── data/
│   ├── workouts.ts            # 5 antrenman günü + dinlenme
│   └── nutrition.ts           # 7 öğün + kurallar
├── lib/
│   ├── storage.ts             # useSyncExternalStore + persistence
│   ├── hooks.ts               # useWorkoutDayState / useNutritionState / useWater
│   └── dateKey.ts             # YYYY-MM-DD local date
└── components/
    ├── BottomNav.tsx
    ├── TopBar.tsx
    ├── TodayView.tsx
    ├── WorkoutView.tsx
    ├── WorkoutDaySection.tsx
    ├── NutritionView.tsx
    ├── ExerciseCard.tsx
    ├── MealCard.tsx
    ├── WaterTracker.tsx
    ├── DayChip.tsx
    ├── ProgressRing.tsx
    ├── ProgressBar.tsx
    └── Icon.tsx
```

## Ana Ekrana Ekleme (PWA)

**iOS Safari**: Paylaş → Ana Ekrana Ekle
**Android Chrome**: 3 nokta → Ana ekrana ekle

Tam ekran, native app gibi açılır. Manifest ve theme-color ayarlı.
