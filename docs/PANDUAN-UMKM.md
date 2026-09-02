# Panduan UMKM — Captionin

> **Captionin · Asisten Caption UMKM Kaligawe** — Caption jualan siap-pakai dalam 30 detik. Gratis, tanpa login.

## Untuk siapa

Pedagang Pasar Kaligawe yang jualan lewat **Instagram / WhatsApp / TikTok / Facebook**. Foto produk sudah ada, tapi bingung bikin kata-kata jualan.

## 3 langkah pakai (30 detik)

| Langkah | Apa yang dilakukan | Contoh |
|---------|-------------------|--------|
| **1 — Tulis produk** | Nama produk (2–60 huruf) + deskripsi singkat (20–500 huruf) + keunggulan (opsional) | Nama: `Keripik Singkong Original` · Deskripsi: `Keripik singkong 500gr renyah tanpa pengawet harga 15rb cocok buat keluarga` · Keunggulan: `tanpa pengawet, 500gr` |
| **2 — Pilih platform & nada** | Platform: `Instagram / WhatsApp / TikTok / Facebook` · Nada: `Santai / Formal / Persuasif / Ceria` | `Instagram + Ceria` → hashtag + emoji · `WhatsApp + Santai` → *bold* + CTA Chat WA |
| **3 — Cetak → Salin** | Klik `Cetak 3 varian — Gratis` → 3 struk muncul → `Salin` atau `Bagikan` → tempel ke sosmed | 3 varian beda angle: manfaat / cerita / urgensi |

## Jika gagal

- **Border merah + pesan** → perbaiki field sesuai aturan (min 20 huruf deskripsi).
- **Alert merah `Terlalu sering`** → tunggu 1 menit (limit 10/menit).
- Cek tab Network `POST /api/generate-copy` untuk detail (400 validasi / 429 limit / 500 LLM).

## 2 contoh siap-tempel

**1. Instagram — Ceria**
> Input: Keripik Singkong Original / Keripik singkong 500gr renyah tanpa pengawet 15rb / tanpa pengawet, 500gr / instagram / ceria

**2. WhatsApp — Santai**
> Input: Jamu Kunyit Asem / Jamu kunyit asem segar dibuat harian tanpa pemanis buatan 250ml 8rb / tanpa pemanis, 250ml / whatsapp / santai
> Hasil: *bold* poin + CTA Chat WA

## Tips hasil bagus

- Tulis deskripsi **spesifik** (berat, bahan, harga) — jangan cuma "enak".
- Coba ganti **nada**: Santai `Hai kak` vs Formal `Perkenalkan` vs Ceria `Bestie` vs Persuasif `Jangan lewatkan`.
- Coba ganti **platform** — hasil hashtag & format beda.
- Isi **keunggulan** biar caption lebih tajam (masuk ke 3 varian).

## Buka di HP

Scan QR di poster (menuju landing `#buat-caption`). Atau ketik link yang tertulis di poster.

## Pertanyaan

- **Gratis?** Ya, gratis untuk pedagang Kaligawe. Limit 10/menit.
- **Perlu login?** Tidak.
- **Platform apa?** Instagram (5–10 hashtag), WhatsApp (*bold*), TikTok (#FYP + hook), Facebook (cerita).

---

## Untuk Canva

- Import `public/panduan/captionin-panduan.html` ke Canva via **Upload** atau copy-paste visual.
- Atau buka HTML di browser → `Ctrl+P` → `Save as PDF` (A5 / 2 halaman).
- QR belum terisi — ganti `src` QR dengan link deploy (mis. `https://captionin.vercel.app`).
