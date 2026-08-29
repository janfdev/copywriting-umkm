# Panduan Isi Field — Asisten Copywriting UMKM Kaligawe

## Cara pakai: isi → Cetak → 3 struk muncul

### Field wajib (*)

| Field | Aturan | Contoh benar | Contoh gagal | Berhasil | Gagal |
|---|---|---|---|---|---|
| **Nama produk** | 2–60 karakter | `Keripik Singkong Original` | `A` (1 char) | Border normal, lanjut generate | Border merah + “at least 2” di bawah field |
| **Deskripsi singkat** | 20–500 karakter | `Keripik singkong 500gr, renyah, tanpa pengawet, harga 15rb, cocok untuk keluarga` | `Enak` (4 char) | Counter `142/500` abu, lanjut | Border merah + “at least 20”, submit batal |
| **Platform** | Pilih 1 | `Instagram Caption` | — | Badge di struk, format beda (IG hashtag, WA `*bold*`) | Select merah, tidak submit |
| **Nada** | Pilih 1 | `Ceria-Gen Z` | — | Badge tone, kata beda (ceria → Bestie, formal → Perkenalkan) | Tidak submit |
| **Keunggulan** | Opsional ≤80 di UI | `tanpa pengawet, 500gr` | `x`×201 char | Masuk varian (marketplace `| keunggulan |`) | Zod ≤200 tolak (400), toast Gagal |

### Helpers & states

- **Helper text:** “Maks 60”, “{len}/500 — minimal 20”, “Hasil menyesuaikan platform/nada”.
- **Loading:** 3× Skeleton struk + “Mencetak 3 struk — Groq → Gemini fallback”.
- **Error:** Inline merah + Alert `Gagal mencetak — Coba lagi` + toast. Validasi Zod dulu, baru fetch.
- **Berhasil (200):** 3× `StrukCard` (Varian 01–03, TERCETAK, badge platform/tone, Salin/Bagikan → toast “Tersalin!”) + Tabs ke `Preview HP` (IG foto, WA bubble #dcf8c6, marketplace judul). History 5 terbaru muncul.
- **Gagal koneksi (429 rate-limit 10/menit):** Alert merah + toast. Tunggu 1 menit.

### Testimoni (feedback)

- **Kirim:** Nama ≥2, quote ≥10, rating 1–5 → POST `/api/testimonials` → pending → toast “menunggu persetujuan”.
- **Tampil:** Hanya `approved` di landing grid + marquee (hanya `isMarquee=true`, pause on hover).
- **Admin:** `/admin/testimonials` approve/reject + toggle Marquee (Megaphone), `/admin/analytics` toggle Marquee per baris.

### Tips biar hasil bagus

- Deskripsi spesifik → “500gr, tanpa pengawet, harga 15rb” lebih tajam daripada “enak”.
- Coba ganti tone: Santai (Hai kak) vs Formal (Perkenalkan) vs Ceria (Bestie) vs Persuasif (Jangan lewatkan).
- Ganti platform: Instagram (hashtag) vs WhatsApp (`*bold*`) vs Marketplace (`|`) vs Poster (UPPER).

### Cek cepat berhasil/tidak

- **Berhasil:** 3 struk + badge + HP preview, history terisi, analytics `/admin/analytics` naik.
- **Gagal:** Border merah + pesan, atau Alert merah + no struk. Cek Network `POST /api/generate-copy` (400 validasi, 429 rate-limit, 500 LLM).
