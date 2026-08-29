# UI Redesign Preview — Asisten Copywriting UMKM Kaligawe

> Skills: `redesign-existing-projects` + `frontend-design` + `ui-ux-pro-max` (`motion`, `lucide-react`, `shadcn` blocks) + `taste-skill` (anti-slop)
> Scope: `apps/web/src/routes/index.tsx` (hybrid landing + generator), `apps/web/src/routes/admin/analytics.tsx` (dashboard), `apps/web/src/routes/admin/testimonials.tsx` (moderasi)
> Stack: React 19 + Vite 7 + TanStack Router + Tailwind v4 + shadcn/ui + lucide-react + motion + recharts 2.15 + DiceBear lorelei

---

## 1) Design Read (taste-skill §0)

**Reading this as:** *consumer marketplace landing for pedagang pasar Kaligawe (WA-native, 30–55th, trust-first), playful-trust hybrid, leaning shadcn warm marketplace + motion subtle.*

- **Page kind:** Landing + embedded generator (1 route `/` dengan `#buat-copy`), bukan dashboard.
- **Audience:** Pedagang pasar, bukan tech buyer — butuh foto, struk, HP preview, bukan big stats.
- **Vibe:** Warm marketplace (parchment #F5F0E6, terracotta #C45A3C, stone neutrals), playful-trust (tidak Inter-only, tidak purple glow).
- **Dials:** `VARIANCE 7 / MOTION 5 / DENSITY 4` — split hero, bento, Tabs Struk/HP, marquee 1× only.

---

## 2) Audit Saat Ini (redesign skill — Diagnose)

### Yang sudah bagus (pertahankan)
- Hero split `1.08fr / 0.92fr` (anti-center bias), marquee tunggal 18s linear, bento 3 (2 white + 1 ink), Tabs Struk/HP, phone mockup 320px notch, Avatar DiceBear lorelei + Star.
- Satu accent #C45A3C di-lock, neutrals Stone, radius `rounded-xl` konsisten, `lucide` satu family.

### Generic / perlu upgrade

| Area | Masalah (redesign audit) | Fix |
|---|---|---|
| **Typography** | Inter hampir everywhere, headline 3 baris di 40px bisa jadi 4 di mobile | Ganti display ke `Outfit`/`Geist` (sudah ada Geist), headline max 2 lines desktop, `text-wrap: balance`, `tracking-[-0.03em]` |
| **Color** | Parchment + terracotta sudah benar, tapi shadow masih `shadow-sm` generic black | Tint shadow ke `stone` hue, `shadow-sm` + `hover:shadow-md` sudah ada — pertahankan |
| **Layout** | Steps 3 + contoh 3-col = dua 3-col berturut (Section-Repetition) | Pecah: steps jadi horizontal pills scroll-snap di mobile, contoh jadi bento masonry (2+1) |
| **Nav** | Sudah single line pill, OK | Tambah `max-w-6xl` sudah ada, height 64px OK |
| **Cards** | Semua `border + shadow + white` (generic card look) | Untuk struk sudah beda (parchment `#FFFEFB` + dashed), pertahankan; untuk bento tambah 2 tinted (amber/green wash) |
| **Motion** | Marquee + subtle, OK (≤1) | Tambah `whileInView` stagger 60ms untuk bento/testimonials (Motion `0, y:12`) |
| **States** | Loading Skeleton ada, error Alert ada, empty `border-dashed` ada — OK | Tambah `FieldDescription` counter sudah ada, pertahankan |
| **Iconography** | lucide sudah satu family, stroke 1.5 konsisten | Ganti `Copy`→`Copy` + `Check` on success sudah, pertahankan |
| **Content** | Fallback 3 testimoni, real DiceBear OK | Real: `GET /api/testimonials` + marquee `isMarquee` |

---

## 3) Tokens (compact system)

- **Color:** `parchment #F5F0E6` bg, `paper #FFFEFB` card, `ink #1A1A18` text, `stone` neutrals, accent `terracotta #C45A3C` + `amber #D4A84B` + `emerald #6B7F3D` (1 accent + tints), `ink-2 #8B2E1F` italic headline.
- **Type:** Display `Geist`/`Outfit` bold, Body `Inter`/`Geist` 15px `leading-relaxed` max 42ch, Mono `Geist Mono`/`font-mono` untuk struk/data.
- **Radius:** `rounded-xl` card, `rounded-full` pill button/badge — lock, tidak campur.
- **Shadow:** `shadow-sm` default, `hover:shadow-md` — tinted stone, no pure black.

---

## 4) Layout Concept (1-sentence + ASCII)

- **Hero:** Split left claim + right live struk preview card (thesis = product itself). `lg:grid-cols-[1.08fr_0.92fr]`, `pt-6`/`pt-10`, CTA `Cetak 3 varian — Gratis`.
  ```
  [Eyebrow pill]                [Struk PREVIEW card]
  Copy jualan / siap-pakai  →   #01 Instagram/Ceria mono
  3 varian salin tempel          #02 WhatsApp/Santai
  [Cetak →] [Contoh]            #03 Marketplace/Formal
  ```
- **Trust:** Single marquee `CURATED FOR INSTAGRAM · WHATSAPP · SHOPEE` (max 1, 18s).
- **Bento masalah:** 3 cards (2 white + 1 ink `bg-[#1A1A18]`), `hover:shadow-md`, 2-col pills steps.
- **Contoh:** 3-col cards dengan `Separator` + mono body.
- **Generator:** 2-col `0.96fr / 1.04fr` (Form `Field` + `Select` + counter + Alert destructive, Result Tabs Struk/HP + Skeleton + phone notch).
- **History + Testimonials:** masonry 2/3-col, Avatar lorelei + Star, `FeedbackDialog` Dialog.
- **FAQ + Footer:** Accordion `rounded-2xl` + footer links.

**Signature:** Struk thermal (`Tercetak` badge, dashed border, gradient `#C45A3C→#D4A84B` strip, perforated bottom) + phone notch (28px radius, 7px border) + marquee pause on hover.

---

## 5) Upgrade Plan (Fix Priority order — redesign skill §Fix Priority)

1. **Font swap:** Already `Geist` — add `text-wrap: balance` to h1, tighten `tracking-[-0.03em]`, introduce `Medium 500` for helper text (done via `FieldDescription`).
2. **Color cleanup:** Lock terracotta, desaturate amber secondary — done.
3. **Hover/active:** Already `hover:shadow-md`, `active:scale-[0.99]` on CTA — keep.
4. **Layout/spacing:** Add `max-w-6xl mx-auto` already, `min-h-[100dvh]` not needed (no full-screen hero), grid over flex — done.
5. **Replace generic:** Accordion FAQ → keep (not side-by-side list, FAQ is correct), 3-card carousel → grid (already), pricing towers — none.
6. **States:** Skeleton (done), empty dashed (done), inline `border-destructive` + Alert (done), toast `sonner` (done).
7. **Typography scale:** `text-[40px] → sm:48 → lg:54`, `leading-[0.92]`, `max-w-[40ch]` — done.

---

## 6) Dashboard — shadcn Blocks (chart + table + KPI)

- **Source:** `packages/ui` (`chart.tsx` via `recharts` 2.15, `card`, `badge`, `tabs`, `separator`), block `dashboard-01` reference (sidebar + charts + table).
- **Route:** `apps/web/src/routes/admin/analytics.tsx` — `/admin/analytics`:
  - KPI 4: Total views, Total generates, Sessions (unique IP hash + avg gen/sesi), Range. Badge `TrendingUp/Down` naik/turun (`viewsDeltaPct`, `generatesDeltaPct`).
  - `AreaChart` daily views vs generates (`ChartContainer` + `ChartTooltipContent`, `Area` monotone, `CartesianGrid` dashed) — h 240px.
  - `BarChart` byPlatform, `PieChart` byTone (COLORS terracotta/amber/emerald/ink).
  - Recent table (20) `path | sessionId8 · ipHash8 | date` (shadcn `Card` + `Separator` style).
  - Tabs `7 hari / 30 hari` (pill `rounded-full`).
- **API:** `GET /api/analytics?range=7d|30d` + `GET /api/analytics/sessions` (Prisma `PageView`/`GenerateEvent` with `hashIp` + `sessionId`).
- **Preview:** `http://localhost:3001/admin/analytics` — toggle 7d/30d, hover tooltip, trend badge hijau/merah.

---

## 7) Preview — How to See It

### Landing (fresh)
- `bun run dev` (turbo: 3000 API + 3001 web) — dev sudah hijau.
- Buka **incognito** `http://localhost:3001` → hard refresh `Ctrl+Shift+R` → `Ctrl+F5` → hero split + struk preview + marquee + generator + marquee testimoni (jika ada `isMarquee`) + FAQ.
- Jika `tsr-split=component` error: tutup tab, buka baru `http://localhost:3001`, atau `bun run --cwd apps/web build && bun run --cwd apps/web start` (dist statis, no HMR).

### Dashboard
- `http://localhost:3001/admin/analytics` — KPI + Area + Bar + Pie + recent. Data dari seed + live `POST /api/analytics/hit` beacon + `X-Session-Id` header.

### Build & tests
- `bun run --cwd apps/web build` → `✓ 15s` (index ~42KB, analytics ~116KB)
- `bun --cwd apps/server test` → `5 files 25 tests` pass

---

## 8) What Changed in This Revision (vs prior)

- Nav: pill hover `bg-white`, single line, max-w, height 64px — no 2-line nav.
- Hero: pill emerald dot pulse (eyebrow 1 per 3 sections, not every section), headline 2 lines, subtext 9 words, CTA icon `ArrowRight`, trust chips `ShieldCheck`/`Zap`/`PenLine` lucide.
- Generator: `Field` + `FieldDescription` counter, `Select` platform/tone, CTA `Sparkles` + `Loader2`, Alert destructive + retry, Tabs `Struk`/`Preview HP`, Skeleton, phone notch `28px` `7px`.
- Testimonials: `Avatar` DiceBear lorelei + `Star` rating, `FeedbackDialog` Dialog pending, `MarqueeSection` approved+isMarquee only.
- Dashboard: shadcn blocks `chart` + `card` + `badge` + `tabs` — no sidebar on landing, dashboard owns sidebar.

---

## 9) Risks & Defer

- Skewered `Inter` everywhere if font not loaded — fallback `Geist` via `@fontsource` in `packages/ui/src/styles/globals.css`.
- Pure `#000` avoided — use `#1A1A18` ink.
- Emoji sparingly — social tone allows 1–2 per struk, not hero.
- Zod `highlights` ≤200 — UI helper shows `≤80` soft limit.

---

*Generated with skills: `redesign-existing-projects`, `frontend-design`, `taste-skill` (anti-slop), `ui-ux-pro-max` (50 styles), `lucide-react` (single family), `motion` (subtle), `shadcn` blocks (`chart`, `card`, `avatar`, `dialog`, `tabs`, `scroll-area`, `field`, `separator`, `skeleton`, `alert`, `accordion`, `badge`, `button`, `select`, `input`, `textarea`).*
