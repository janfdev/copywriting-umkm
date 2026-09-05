# Prompt Canva — Buku Panduan Captionin (8 hal A5)

> Sumber cetak: `public/panduan/buku-panduan.html` (buka → Ctrl+P → PDF). Di bawah prompt per halaman + data contoh + daftar screenshot.

## Daftar Screenshot (OPSIONAL — buku sudah terisi penuh)

Semua halaman sudah berisi konten asli (mockup + contoh teks), jadi **bisa cetak langsung tanpa screenshot**. Tabel di bawah hanya untuk upgrade visual saat final:

| # | Apa | Cara ambil | Ganti apa |
|---|-----|-----------|-----------|
| S1 | Generator form asli | `#buat-caption` → screenshot form + tombol | Mockup bernomor hal 5 |
| S2 | Hasil struk asli | Isi contoh → screenshot 3 struk | Mockup struk hal 6 |
| S3 | Tab "Lihat di HP" asli | Klik tab → screenshot | Mockup HP hal 7 |
| S4 | Hero asli | Screenshot atas landing | Mockup hero hal 3 |

## Data Contoh (pakai di semua halaman, konsisten)

- **Produk:** Keripik singkong balado pedas manis
- **Rumus:** Nama + Harga + 1 Keunggulan → "Keripik singkong balado pedas manis, kemasan 250 gram, harga 15 ribu, renyah tanpa pengawet"
- **Contoh 2 (WA):** Jamu Kunyit Asem — segar tanpa pemanis, siap kirim Kaligawe

## Prompt per Halaman

### Hal 1 — Sampul
```
A5 cover, bg parchment #F5F0E6. Logo Captionin atas. Judul "Buku Panduan Captionin" 28px bold + sub "Asisten Promosi UMKM". Tagline italic: "Bikin kata-kata jualan otomatis dalam 30 detik." QR besar tengah (captionin.vercel.app/#buat-caption) + "Scan — langsung coba, tanpa login". Footer: Pasar Kaligawe 2026.
```

### Hal 2 — Daftar Isi
```
Judul "Daftar Isi". 7 baris dotted: 1 Pengenalan(3) 2 Persiapan(4) 3 Langkah(5) 4 Before-After(6) 5 Perbandingan(7... dst. Note box: baca 3-4 dulu, ikuti 5 sambil buka HP.
```

### Hal 3 — Pengenalan
```
Judul "1 · Pengenalan". Box "Apa itu": 1-2 kalimat alat gratis merangkai kata jualan. List manfaat: hemat waktu, disesuaikan WA/IG/FB. Placeholder S4 (hero) + caption "wajah aplikasi".
```

### Hal 4 — Persiapan
```
Judul "2 · Persiapan". Formula box gelap: "Nama Produk + Harga + 1 Keunggulan Utama". Tabel 2 baris: ❌ "Keripik enak" (AI bingung) vs ✅ teks panjang spesifik.
```

### Hal 5 — 3 Langkah
```
Judul "3 · Panduan Inti". Mockup form bernomor ① Ketik produk ② Pilih tujuan (Ceria=IG, Santai=WA) ③ Cetak & Salin. Placeholder S1 + instruksi "panah ①②③".
```

### Hal 6 — Before-After
```
Judul "4 · Contoh Hasil". Box mono teks mentah (data contoh) → panah → box hasil + hashtag. Placeholder S2 (struk + tombol Salin).
```

### Hal 7 — Perbandingan Platform
```
Judul "5 · Perbandingan". 2 kolom: WA (bold, pendek, sapaan) vs IG (emoji, hashtag). Placeholder S3 (tab HP).
```

### Hal 8 — Solusi + FAQ (bg gelap #1A1A18, teks putih)
```
3 bullet tanpa bahasa teknis: kotak merah→cek 20 huruf; "Tunggu"→1 menit; kosong→cek internet + tarik layar. FAQ: gratis, batas/menit, bebas edit. QR kecil + © KKM Kaligawe 2026.
```

## Warna & Font (semua hal)
- BG `#F5F0E6`, aksen `#C45A3C`, teks `#1A1A18`, hal 8 gelap `#1A1A18`
- Font: Poppins; mono untuk contoh teks
