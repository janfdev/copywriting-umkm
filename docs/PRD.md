# PRD — Captionin — Asisten Caption UMKM Kaligawe (Next.js)

> Brand: **Captionin** — Owner: Proker KKM Kaligawe | Status: **v1 Next.js — Done** | Stack: **Next.js 16 App Router + shadcn/ui + Prisma 7 + Groq/Gemini** | Deploy: **Vercel (1 project)** | Design: `frontend-design` taste Place

## 0. Design Read (frontend-design §0 — wajib sebelum code)

**Reading this as:** *consumer warm-marketplace landing for pedagang pasar Kaligawe (30–55th, WA-native), playful-trust, shadcn + motion subtle.*

- Page kind: Landing + embedded generator ( `/` + `#buat-caption` ), bukan dashboard.
- Audience: pedagang pasar, bukan tech buyer → butuh **foto struk + preview HP**, bukan big stats.
- Vibe: Warm marketplace — `parchment #F5F0E6` + `terracotta #C45A3C` + `Stone` neutrals. Dilarang: Inter-only, purple glow, centered dark mesh.
- Dials: `VARIANCE 7 / MOTION 5 / DENSITY 4` — split hero, bento 3, Tabs Struk/HP, marquee **1× only**.
- Anti-slop: 1 accent lock, eyebrow max 1 per 3 sections, hero max 4 elements, headline max 2 lines.

## 1. Ringkasan & Why Next.js

**Masalah deploy sekarang:** Bun monorepo `turbo` (`apps/web` Vite SPA + `apps/server` Hono) → `wrangler deploy` dari root error `workspace root detection failed`. Workers `pg` TCP butuh Hyperdrive. Vercel monorepo butuh `Root: apps/web`.

**Solusi rewrite:** 1 repo **Next.js App Router** saja:
- `app/page.tsx` (hybrid `/` + `#buat-caption`) + `app/api/generate-copy/route.ts` + `app/api/testimonials/*` + `app/api/analytics/*` + `lib/brand.ts` (single brand source)
- 1 build `next build`, 1 deploy `vercel --prod`, 1 env `DATABASE_URL/DIRECT_URL/GROQ_* /GEMINI_* /JWT_SECRET` di Vercel Dashboard. Tanpa `wrangler.toml` per-app, tanpa `turbo build ✓13s` gagal deploy.

**Tetap:** Prisma 7 Neon, Zod contracts (colocate `lib/contracts`), Groq `llama-3.3-70b` primary → Gemini `2.0-flash` fallback → stub distinct. Tanpa login.

**Tujuan KKM:** demo 1 sprint, metrik trafik `naik/turun` terlihat di `/dashboard/analytics`.

## 2. User & Goals

- Primary: Ibu/Bpk UMKM Kaligawe 30–55th, jual WA/IG/FB.
- Jobs: “Bikin caption IG/WA dari deskripsi singkat, langsung tempel.”
- Metrics: <30s input→3 struk, ≥80% di-copy, 10 UMKM ≥4/5, trafik 7d naik di dashboard.

## 3. Scope — Next.js App Router

### 3.1 Route Map

```
/               → landing + generator #buat-caption (public)
  #contoh       → 3 struk contoh
  #buat-caption    → Form kiri + Tabs Struk/HP kanan
/api/generate-copy      POST  (Zod, rate-limit 10/menit/IP, ipHash+sessionId)
/api/testimonials        GET (approved), POST (pending)
/api/testimonials/marquee GET (approved && isMarquee)
  /admin                GET (all) → auth
/api/testimonials/[id]/status PATCH
/api/testimonials/[id]/marquee PATCH
/api/analytics           GET ?range=7d|30d
/api/analytics/sessions  GET
/api/analytics/hit       POST {path,sessionId}
/dashboard/analytics        → KPI + charts 7d/30d
/dashboard/testimonials     → approve/reject + marquee toggle
/about, /privacy-policy, /terms-of-service → static
```

### 3.2 shadcn — semua komponen yang dipakai

`npx shadcn@latest init` (New York, Tailwind v4) + `add`:

`button card badge avatar tabs scroll-area alert accordion input textarea label field skeleton separator dialog select chart table toggle-group sidebar breadcrumb separator dropdown-menu drawer checkbox table` — **pakai yang perlu, bukan semua 50 sekaligus.** Khusus dashboard: `chart` (`ChartContainer` + `ChartTooltipContent`, `recharts` 2.15), `badge` trend, `tabs` 7d/30d.

Usang dari Vite: `@dnd-kit`, `@faker-js/faker`, `kbar`, `recharts` (tetap via chart), `zustand` — hapus jika tidak dipakai.

### 3.3 Landing (/) — Hybrid 1 page

**Nav sticky** `F5F0E6/85 backdrop-blur`: Logo `C` terracotta + `Captionin` + `KKM` badge + nav pill `Contoh Buat Caption Tentang` + CTA `Buat Caption` `Sparkles`. Brand source `lib/brand.ts`.

**Hero split** `1.08fr / 0.92fr` (thesis = product itself):
- Eyebrow pill emerald dot pulse `Untuk pedagang Pasar Kaligawe — gratis KKM` (1 per 3 sections, bukan tiap section)
- H1 max 2 lines: `Caption jualan` / `siap-pakai` italic `#8B2E1F` / `dalam 30 detik.` `40→54px` `tracking-[-0.03em]`
- Sub 9 words: `Deskripsi singkat → 3 varian caption. Salin, tempel, jualan.`
- CTA `Buat caption sekarang →` terracotta + `Lihat contoh` outline
- Trust chips `ShieldCheck Tanpa login · Zap 10/menit · PenLine Groq + Gemini` (lucide)
- Kanan: Card `STRUK PREVIEW — 3 VARIAN` 3 mono `12.5px` #FFFEFB

**Marquee tunggal** 18s linear `CURATED FOR INSTAGRAM · WHATSAPP · SHOPEE` (max 1)

**Bento masalah** 3: `01 MASALAH` / `02 SOLUSI` (white) + `03 HASIL` (ink `#1A1A18` amber), steps pills `1/2/3`

**Contoh 3-col** + **Generator 2-col** `0.96fr/1.04fr`:
- Form: `Field` + `Input/Textarea/Select` + `FieldDescription` counter + `Alert` destructive + `Button` `Sparkles`/`Loader2`
- Result: `Tabs` Struk (3× `StrukCard` — `TERCETAK` + gradient strip + `Copy`/`Share2` toast) / Preview HP (320px `rounded-[28px]` `border-[7px]` notch, IG/WA/marketplace `ScrollArea`) + `Skeleton` + `sid:` badge + `sessionId` header

**History 5** + **Testimoni** grid `Avatar` DiceBear `lorelei` + `Star` + `FeedbackDialog` (Dialog pending) + **MarqueeSection** amber `isMarquee` + FAQ `Accordion` `rounded-2xl`

**Signature:** Struk thermal (`Tercetak` dashed, gradient strip, perforated) + phone notch + marquee pause hover.

## 4. Backend (Next.js Route Handlers)

- `app/api/generate-copy/route.ts`: `POST` Zod `productName 2–60`, `description 20–500`, `highlights? ≤200`, `platform` enum, `tone` enum, header `X-Session-Id`. `buildPrompt` platform×tone hint + `callGroq` (`api.groq.com/openai/v1/chat/completions`) → `callGemini` → `buildStubVariants` distinct. `hono-rate-limiter` → `next-rate-limit` atau Upstash. `trackGenerate` + `hashIp` sha256 slice16.
- `app/api/testimonials/*`: `listApproved`, `listMarquee`, `create` pending, `updateStatus`/`updateMarquee`
- `app/api/analytics/*`: `getAnalytics` dailyBuckets + groupCount + deltaPct, `getSessions`
- `lib/db.ts`: `PrismaClient` singleton (globalThis), `adapter?` jika Neon HTTP, bukan `pg Pool` TCP untuk Vercel. `lib/env.ts` Zod `DATABASE_URL/DIRECT_URL/GROQ_* /GEMINI_* /JWT_SECRET/CORS_ORIGIN`.
- Tidak butuh `wrangler.toml` (Vercel).

## 5. Data Model (sama, Prisma 7)

`User`, `Testimonial(isMarquee)`, `PageView`, `GenerateEvent` — `bunx prisma generate` (ganti `runtime bun` → `runtime nodejs` atau hapus untuk Vercel).

## 6. Env — Vercel Dashboard

Project → Settings → Environment Variables (Production):

`DATABASE_URL`, `DIRECT_URL`, `JWT_SECRET` (32+ hex), `GROQ_API_KEY`, `GROQ_MODEL=llama-3.3-70b-versatile`, `GEMINI_API_KEY`, `GEMINI_MODEL=gemini-2.0-flash` — build `next build` baca `process.env`.

Lokal: `.env` + `.env.local` (gitignored) → `bunx prisma db:push && bunx prisma db:seed`.

## 7. Preview Landing (ASCII + tokens)

**Tokens:** `parchment #F5F0E6` bg, `paper #FFFEFB` card, `ink #1A1A18`, `stone` neutrals, `terracotta #C45A3C` lock + `amber #D4A84B` + `emerald #6B7F3D`. Type `Geist/Outfit` display + `Inter` body + `Geist Mono` struk. Radius `rounded-xl` + pill `rounded-full`. Shadow tinted stone.

```
[Nav: C Captionin KKM | Contoh Buat Caption Tentang | Buat Caption]
[Hero split]
 Eyebrow pill emerald dot
 Caption jualan / siap-pakai italic / dalam 30 detik.
 Deskripsi singkat → 3 varian. Salin, tempel, jualan.
 [Cetak →] [Contoh]  |  [Card Struk Preview 3 varian mono]
 Trust chips: ✓ Tanpa login · 10/menit · Groq+Gemini
[Marquee: CURATED FOR INSTAGRAM · WHATSAPP · SHOPEE]
[Bento: 01 MASALAH | 02 SOLUSI | 03 HASIL ink]
[Steps pills: 1 Isi produk | 2 Pilih platform | 3 Generate]
[Contoh 3-col struk]
[Generator 2-col]
 Field: Nama* | Deskripsi* {len}/500 | Keunggulan | Platform* | Nada* | Cetak — Gratis
 → Tabs: [Struk | Preview HP] + Skeleton + sid badge
[History 5] [Testimoni 3-col Avatar+Star + Dialog Beri testimoni] [Marquee amber isMarquee] [FAQ Accordion]
```

Hero **thesis** = live struk preview, bukan big number. Max 1 accent, 4 elements hero, eyebrow 1/3, marquee 1×, motion subtle `whileInView` 60ms stagger.

## 8. Migrasi — Langkah konkret

1. `npx create-next-app@latest asisten-copy-next --typescript --tailwind --app --eslint`
2. `npx shadcn@latest init` + `add button card badge avatar tabs scroll-area alert accordion input textarea label field skeleton separator dialog select chart table sidebar`
3. Copy `packages/db` → `prisma/` + `lib/db.ts` (singleton), `packages/contracts` → `lib/contracts/*`, `hooks/use-*` → `hooks/*`, `components` shadcn tetap.
4. Pindah `apps/web/src/routes/index.tsx` ( гибрид ) → `app/page.tsx` (hapus `createFileRoute`, jadi `export default function Page()` + `"use client"` untuk generator leaf). `apps/server/src/routes/*` → `app/api/*/route.ts`.
5. Env `next.config.ts` `turbopack`, `next/font` `Geist`, `motion/react`.
6. `bunx prisma generate && next build` → `vercel --prod` (Root: repo, Build: `next build`, Output: `.next`).

**Estimasi:** 1–2 hari solo (copy-paste logika, ganti `fetch` base `VITE_SERVER_URL` → `/api/*` relative, test 25).

## 9. Acceptance

- [x] `/` hybrid + hero split + generator Tabs Struk/HP + marquee + sid + history + testimoni + marquee + FAQ
- [x] `POST /api/generate-copy` 400/429/200, tone×platform distinct, no prompt leak
- [x] `/dashboard/analytics` Area/Bar/Pie + KPI TrendUp/Down 7d/30d + sessions + ipHash
- [x] `/dashboard/testimonials` approve/reject + marquee toggle
- [x] `next build` ✓ (18/18) + `vitest 23+` + brand `Captionin` + SoC landing (history/testimonials/faq/generator-form/preview)

## 10. Non-Goals

Login cross-device, upload gambar, payment — post-MVP.

---
*Skills: `frontend-design` (taste Place) + `redesign-existing-projects` (audit) + `ui-ux-pro-max` + `taste-skill` (anti-slop) + `shadcn` + `lucide` + `motion` + `recharts`.*
