# Canva Design Prompt — Poster Panduan Captionin

> Copy-paste prompt ini ke Canva (Design → Custom size A3/Poster) atau ke AI design tool.

---

## Poster Utama — A3 (297×420mm)

### Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  [LOGO C]  Captionin              GRATS · TANPA LOGIN  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Caption jualan SIAP-PAKAI dalam 30 detik.            │
│  ─────────────────────────────────────────────          │
│  Untuk Instagram · WhatsApp · TikTok · Facebook        │
│                                                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                  │
│  │  01     │  │  02     │  │  03     │                  │
│  │  TULIS  │  │  PILIH  │  │  CETAK  │                  │
│  │         │  │         │  │         │                  │
│  │ Nama +  │  │ Platform│  │ 3 struk │                  │
│  │ Deskripsi│  │ + Nada │  │ muncul  │                  │
│  │ Keunggulan│ │         │  │ →Salin  │                  │
│  └─────────┘  └─────────┘  └─────────┘                  │
│                                                         │
│  ┌──────────────────────┐  ┌──────────────────────┐    │
│  │ CONTOH INSTAGRAM     │  │ CONTOH WHATSAPP     │    │
│  │                      │  │                      │    │
│  │ Bestie! Cobain ...   │  │ *Hai kak! Jamu ...*  │    │
│  │ #Kaligawe #UMKM      │  │ Chat WA sekarang!   │    │
│  └──────────────────────┘  └──────────────────────┘    │
│                                                         │
│  ┌──────────────────────┐  ┌──────────────────────┐    │
│  │ TIPS HASIL BAGUS    │  │   [QR DUMMY]         │    │
│  │ • Deskripsi spesifik│  │                      │    │
│  │ • Isi keunggulan   │  │  captionin.vercel    │    │
│  │ • Coba ganti nada  │  │  .app/#buat-caption   │    │
│  └──────────────────────┘  └──────────────────────┘    │
│                                                         │
│  © KKM Kaligawe · Captionin · Gratis · 10x/menit        │
└─────────────────────────────────────────────────────────┘
```

### Design Specs

| Element | Spec |
|---------|------|
| **Background** | `#F5F0E6` (parchment) |
| **Accent** | `#C45A3C` (terracotta) |
| **Text** | `#1A1A18` (ink), `#57534e` (stone) |
| **Logo** | Lingkaran `C` terracotta, putih |
| **Font** | Bold untuk heading, regular untuk body |
| **Cards** | Putih, border `#e7e5e4`, rounded 16px |
| **QR Box** | Putih, border dashed, placeholder QR |
| **Footer** | 10px, stone gray |

---

## Buku Panduan — A4 (2 halaman)

### Halaman 1: Cover + Langkah

```
┌────────────────────────────────────────┐
│  [LOGO C]  Captionin                    │
│  Panduan UMKM — Cara Pakai              │
├────────────────────────────────────────┤
│  Caption jualan SIAP-PAKAI dalam       │
│  30 detik. Gratis, tanpa login.         │
│                                         │
│  LANGKAH:                              │
│  1. Tulis nama + deskripsi + keunggulan│
│  2. Pilih platform & nada               │
│  3. Cetak → Salin → Tempel              │
│                                         │
│  PLATFORM: Instagram, WhatsApp,        │
│  TikTok, Facebook                       │
│                                         │
│  NADA: Santai, Formal, Ceria,          │
│  Persuasif                              │
└────────────────────────────────────────┘
```

### Halaman 2: Contoh + QR

```
┌────────────────────────────────────────┐
│  CONTOH HASIL:                         │
│                                         │
│  Instagram (Ceria):                     │
│  "Bestie! Cobain Keripik Singkong..."  │
│  #Kaligawe #UMKM #JajananViral          │
│                                         │
│  WhatsApp (Santai):                     │
│  "*Hai kak! Jamu Kunyit Asem...*"       │
│                                         │
│  ──────────────────────────────────     │
│                                         │
│  BUKA DI HP:                            │
│  [QR DUMMY]                            │
│  captionin.vercel.app/#buat-caption     │
│                                         │
│  © KKM Kaligawe                         │
└────────────────────────────────────────┘
```

---

## QR Placeholder

Ganti dengan QR image pointing ke:
- **URL**: `https://captionin.vercel.app/#buat-caption`
- **Size**: 100×100px (poster), 80×80px (buku)
- **Style**: Hitam-putih, border rounded

---

## Prompt untuk AI Design (jika pakai)

```
Design a poster for "Captionin" - a free caption generator for UMKMs.
- Colors: parchment #F5F0E6 background, terracotta #C45A3C accent
- Layout: 3 steps (Tulis/Pilih/Cetak), 2 example captions, QR placeholder
- Font: bold headings, clean body text
- Include: logo "C" in circle, footer with "© KKM Kaligawe"
```

---

## File Siap Pakai

- `public/panduan/poster.html` — A3 HTML (buka → Ctrl+P → Save PDF)
- `public/panduan/buku-saku.html` — A5 4-hal HTML (buka → Ctrl+P → Save PDF)
- Import HTML ke Canva via Upload → PDF → Edit di Canva