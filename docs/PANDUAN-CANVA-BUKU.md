# Canva Prompt per Halaman — Buku Panduan Captionin

> ⚠️ **Versi baru (v2, disarankan):** `public/panduan/buku-panduan.html` — 10 halaman + cover + daftar isi, mengikuti struktur panduan teman (definisi → komponen → rumus → contoh → panduan tool bernomor). Buka di browser → Ctrl+P → Save as PDF.
>
> Di bawah ini prompt Canva mentah (v1, 7 hal) — tetap bisa dipakai jika mau desain manual.

> Buat 7 halaman A5 (cover hal 1 buat sendiri, isi hal 2–7 di bawah). Cetak A5 lipat atau A4 bolak-balik.

---

## Halaman 2 — Langkah Pakai

```
LAYOUT:
- Judul: "3 LANGKAH PAKAI" (bold, 24px, terracotta #C45A3C)
- 3 kolom sama besar, cards putih rounded 16px

KOLOM 1 — TULIS:
- Icon: 📝 atau pena
- Judul: "1. Tulis Produk"
- Isi:
  • Nama produk (2–60 huruf)
  • Deskripsi singkat (20–500 huruf)
  • Keunggulan opsional (≤200 huruf)
- Contoh: "Keripik Singkong Original"

KOLOM 2 — PILIH:
- Icon: 🎯 atau checklist
- Judul: "2. Pilih"
- Isi:
  • Platform: Instagram, WhatsApp, TikTok, Facebook
  • Nada: Santai, Formal, Ceria, Persuasif
- Contoh: "Instagram + Ceria"

KOLOM 3 — CETAK:
- Icon: 🖨️ atau printer
- Judul: "3. Cetak"
- Isi:
  • Klik "Cetak 3 Varian — Gratis"
  • 3 struk muncul
  • Salin → Tempel ke sosmed

WARNA: background #F5F0E6, cards putih, text #1A1A18
```

---

## Halaman 3 — Contoh Hasil

```
LAYOUT:
- Judul: "CONTOH HASIL" (bold, 24px, terracotta)
- 2 box contoh (kiri/kanan), background #FFFEFB, border dashed

BOX 1 — INSTAGRAM:
- Label: "Instagram · Ceria" (badge style)
- Isi caption:
  "Bestie! Cobain Keripik Singkong Original — Keripik singkong 500gr renyah tanpa pengawet ✨ tanpa pengawet, 500gr. Cocok buat harian! 📦

#Kaligawe #UMKM #JajananViral #FYP"
- Footer: "5–10 hashtag · 1–2 emoji"

BOX 2 — WHATSAPP:
- Label: "WhatsApp · Santai"
- Isi caption:
  "*Hai kak! Jamu Kunyit Asem segar tanpa pemanis buatan — siap kirim Kaligawe! Chat WA sekarang ya kak!*"
- Footer: "*bold* poin · CTA Chat WA"

WARNA: background #F5F0E6, box #FFFEFB, text #1A1A18
```

---

## Halaman 4 — QR + Tips

```
LAYOUT:
- Split: kiri tips, kanan QR

KIRI — TIPS HASIL BAGUS:
- Judul: "TIPS" (bold, terracotta)
- List:
  1. Tulis deskripsi SPESIFIK (berat, bahan, harga) — jangan cuma "enak"
  2. Isi KEUNGGULAN biar masuk ke 3 varian
  3. Coba ganti NADA & PLATFORM — hasil beda angle
  4. Gagal? Border merah = perbaiki field · Terlalu sering = tunggu 1 menit

KANAN — QR BUKA DI HP:
- Judul: "BUKA DI HP" (bold)
- QR code (120×120px) → https://captionin.vercel.app/#buat-caption
- Link text: captionin.vercel.app/#buat-caption
- Label: "GRATIS · TANPA LOGIN · 10x/menit"

FOOTER (bawah):
- "© KKM Kaligawe · Captionin"
- "Limit 10 permintaan per menit"

WARNA: tips box putih, QR box #FFFEFB dashed
```

---

## Halaman 5 — Cara Isi Field (Benar / Gagal)

```
LAYOUT:
- Judul: "CARA ISI FIELD" (bold, 24px, terracotta #C45A3C)
- Tabel 3 kolom: Field | Benar ✅ | Gagal ❌ — 4 baris, cards putih

BARIS 1 — NAMA PRODUK:
- Benar: "Keripik Singkong Original" (2–60 huruf)
- Gagal: "A" — terlalu pendek, border merah

BARIS 2 — DESKRIPSI:
- Benar: "Keripik singkong 500gr renyah tanpa pengawet 15rb" (20–500 huruf)
- Gagal: "Enak" — minimal 20 huruf, submit batal

BARIS 3 — KEUNGGULAN (opsional):
- Benar: "tanpa pengawet, 500gr" (≤200 huruf, masuk ke 3 varian)
- Gagal: 200+ huruf — ditolak, toast merah

BARIS 4 — PLATFORM & NADA:
- Benar: Instagram / WhatsApp / TikTok / Facebook + Santai / Formal / Ceria / Persuasif
- Catatan: tiap platform format beda (IG hashtag, WA *bold*, TikTok #FYP, FB cerita)

FOOTER KECIL:
- "Helper: Maks 60 · {len}/500 — minimal 20 · Loading: 3 struk skeleton"

WARNA: background #F5F0E6, header tabel #1A1A18 teks putih, baris putih
```

---

## Halaman 6 — Jika Gagal + FAQ

```
LAYOUT:
- Split atas: troubleshooting (kiri) + error code (kanan)
- Bawah: FAQ 3 item accordion-style

KIRI — JIKA GAGAL:
- Judul: "JIKA GAGAL" (bold, terracotta)
- List dengan icon ⚠️:
  1. Border merah + pesan → perbaiki field sesuai aturan
  2. "Terlalu sering" → tunggu 1 menit (limit 10/menit)
  3. Tidak ada struk → cek koneksi internet, coba lagi

KANAN — KODE ERROR:
- Judul: "ARTI KODE" (bold)
- Box mono #FFFEFB dashed:
  • 400 = validasi (field kurang)
  • 429 = limit (tunggu 1 menit)
  • 500 = server/AI sibuk (coba lagi)

BAWAH — FAQ:
- Judul: "SERING DITANYA" (bold, terracotta)
- Q1: "Gratis?" → A: "Ya, gratis untuk pedagang Kaligawe."
- Q2: "Perlu login?" → A: "Tidak. Langsung pakai."
- Q3: "Hasil bisa diedit?" → A: "Bisa. Salin lalu ubah sesukamu sebelum posting."

WARNA: background #F5F0E6, error box merah muda #FEF2F2 border merah, FAQ putih
```

---

## Halaman 7 — Penutup + QR Besar

```
LAYOUT:
- Tengah: QR besar + ajakan + testimoni mini + footer

ATAS — AJAKAN:
- Judul: "COBA SEKARANG" (bold, 28px, terracotta)
- Sub: "Deskripsi singkat → 3 varian caption. Salin, tempel, jualan."

TENGAH — QR BESAR:
- QR code (160×160px) → https://captionin.vercel.app/#buat-caption
- Link text mono: captionin.vercel.app/#buat-caption
- Badge: "GRATIS · TANPA LOGIN · 10x/menit"

BAWAH — TESTIMONI MINI (2 kolom):
- "Caption-nya langsung laris di WA!" — Bu Siti ⭐⭐⭐⭐⭐
- "Biasa bingung caption IG, sekarang 30 detik jadi." — Pak Joko ⭐⭐⭐⭐⭐

FOOTER:
- "© KKM Kaligawe · Captionin — Asisten Caption UMKM"
- "KKM Kaligawe 2026 · Pasar Kaligawe"

WARNA: background #1A1A18 (ink, halaman penutup gelap), teks putih, QR box putih rounded
```

---

## Cara Pakai di Canva

1. **Buat design baru** → Custom size A5 (148×210mm) atau A4
2. **Copy-paste** elemen di atas per halaman
3. **Atur warna**: 
   - Background: `#F5F0E6` (parchment)
   - Accent: `#C45A3C` (terracotta)
   - Text: `#1A1A18` (ink)
4. **Export** → PDF → cetak

---

## File Siap Pakai (HTML → Canva)

Buka `public/panduan/buku-saku.html` di browser → Ctrl+P → Save as PDF → Upload ke Canva → Edit ulang kalau perlu.