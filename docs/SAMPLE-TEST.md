# Sample Test Data — Captionin

> 10 JSON body siap test `POST /api/generate-copy`. Copy-paste ke curl, Postman, atau browser DevTools.

## Cara Test

### curl (terminal)
```bash
curl -X POST https://captionin.vercel.app/api/generate-copy \
  -H "Content-Type: application/json" \
  -d '{"productName":"Keripik Singkong Original","description":"Keripik singkong 500gr renyah tanpa pengawet harga 15rb cocok buat keluarga","highlights":"tanpa pengawet, 500gr, 15rb","platform":"instagram","tone":"ceria"}'
```

### Browser Console (DevTools)
```js
fetch('/api/generate-copy', {
  method: 'POST',
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify({
    productName: 'Keripik Singkong Original',
    description: 'Keripik singkong 500gr renyah tanpa pengawet harga 15rb cocok buat keluarga',
    highlights: 'tanpa pengawet, 500gr, 15rb',
    platform: 'instagram',
    tone: 'ceria'
  })
}).then(r=>r.json()).then(console.log)
```

### Postman / Insomnia
- Method: `POST`
- URL: `https://captionin.vercel.app/api/generate-copy`
- Headers: `Content-Type: application/json`
- Body: JSON dari tabel bawah

---

## 10 Sample JSON

| # | productName | description | highlights | platform | tone |
|---|-------------|-------------|------------|----------|------|
| 1 | Keripik Singkong Original | Keripik singkong 500gr renyah tanpa pengawet harga 15rb cocok buat keluarga | tanpa pengawet, 500gr, 15rb | instagram | ceria |
| 2 | Jamu Kunyit Asem Segar | Jamu kunyit asem segar dibuat harian tanpa pemanis buatan botol 250ml harga 8rb | tanpa pemanis buatan, 250ml | whatsapp | santai |
| 3 | Batik Tulis Kaligawe | Batik tulis motif khas Kaligawe pewarna alami katun primis halus harga mulai 150rb | pewarna alami, katun primis | tiktok | formal |
| 4 | Kopi Arabika Gayo 250gr | Kopi arabika Gayo sangrai medium aroma buah dan cokelat kemasan 250gr harga 35rb | sangrai medium, 250gr | facebook | santai |
| 5 | Brownies Kukus Cokelat | Brownies kukus cokelat lumer lembut ukuran 20x10 harga 30rb bisa request topping | lumer, topping keju/cokelat | instagram | persuasif |
| 6 | Tas Anyam Pandan | Tas anyam pandan handmade ukuran 30cm kuat dan ringan harga 45rb | handmade, ringan | whatsapp | persuasif |
| 7 | Peyek Kacang Gurih | Peyek kacang gurih renyah toples 500gr harga 25rb cocok oleh-oleh | toples 500gr, oleh-oleh | tiktok | ceria |
| 8 | Kerupuk Ikan Tenggiri | Kerupuk ikan tenggiri premium tanpa msg kemasan 250gr harga 20rb | tanpa msg, 250gr | facebook | formal |
| 9 | Sambal Bajak Pedas Nampol | Sambal bajak pedas nampol level 1-3 botol 150ml harga 12rb tahan 1 bulan kulkas | level 1-3, 150ml | instagram | persuasif |
| 10 | Es Teh Jumbo Gula Aren | Es teh jumbo gula aren asli gelas 22oz harga 7rb segar diminum siang hari | gula aren asli, 22oz | tiktok | santai |

---

## JSON Full (copy-paste)

```json
{"productName":"Keripik Singkong Original","description":"Keripik singkong 500gr renyah tanpa pengawet harga 15rb cocok buat keluarga","highlights":"tanpa pengawet, 500gr, 15rb","platform":"instagram","tone":"ceria"}
```

```json
{"productName":"Jamu Kunyit Asem Segar","description":"Jamu kunyit asem segar dibuat harian tanpa pemanis buatan botol 250ml harga 8rb","highlights":"tanpa pemanis buatan, 250ml","platform":"whatsapp","tone":"santai"}
```

```json
{"productName":"Batik Tulis Kaligawe","description":"Batik tulis motif khas Kaligawe pewarna alami katun primis halus harga mulai 150rb","highlights":"pewarna alami, katun primis","platform":"tiktok","tone":"formal"}
```

```json
{"productName":"Kopi Arabika Gayo 250gr","description":"Kopi arabika Gayo sangrai medium aroma buah dan cokelat kemasan 250gr harga 35rb","highlights":"sangrai medium, 250gr","platform":"facebook","tone":"santai"}
```

```json
{"productName":"Brownies Kukus Cokelat","description":"Brownies kukus cokelat lumer lembut ukuran 20x10 harga 30rb bisa request topping","highlights":"lumer, topping keju/cokelat","platform":"instagram","tone":"persuasif"}
```

```json
{"productName":"Tas Anyam Pandan","description":"Tas anyam pandan handmade ukuran 30cm kuat dan ringan harga 45rb","highlights":"handmade, ringan","platform":"whatsapp","tone":"persuasif"}
```

```json
{"productName":"Peyek Kacang Gurih","description":"Peyek kacang gurih renyah toples 500gr harga 25rb cocok oleh-oleh","highlights":"toples 500gr, oleh-oleh","platform":"tiktok","tone":"ceria"}
```

```json
{"productName":"Kerupuk Ikan Tenggiri","description":"Kerupuk ikan tenggiri premium tanpa msg kemasan 250gr harga 20rb","highlights":"tanpa msg, 250gr","platform":"facebook","tone":"formal"}
```

```json
{"productName":"Sambal Bajak Pedas Nampol","description":"Sambal bajak pedas nampol level 1-3 botol 150ml harga 12rb tahan 1 bulan kulkas","highlights":"level 1-3, 150ml","platform":"instagram","tone":"persuasif"}
```

```json
{"productName":"Es Teh Jumbo Gula Aren","description":"Es teh jumbo gula aren asli gelas 22oz harga 7rb segar diminum siang hari","highlights":"gula aren asli, 22oz","platform":"tiktok","tone":"santai"}
```

---

## Expected Response (200)

```json
{
  "status": "success",
  "data": {
    "variants": [
      "Bestie! Cobain Keripik Singkong Original — Keripik singkong 500gr renyah tanpa pengawet ✨ tanpa pengawet, 500gr, 15rb. Cocok buat harian! 📦\n\n#Kaligawe #UMKM #JajananViral #FYP",
      "Hai kak! Keripik Singkong Original ini Keripik singkong 500gr renyah tanpa pengawet — keunggulan: tanpa pengawet, 500gr, 15rb. Sudah banyak yang repeat order di Kaligawe, kamu kapan? 😉",
      "Woy bestie! Lagi cari keripik singkong original yang enak & worth it? Keripik singkong 500gr renyah tanpa pengawet ✨ tanpa pengawet, 500gr, 15rb. Stok terbatas minggu ini, amankan dulu! 🔥"
    ],
    "sessionId": "abc12345"
  }
}
```

## Expected Error (400/429)

- **400** (validasi): `{"status":"error","message":"Minimal 20 karakter","issues":[...]}`
- **429** (rate-limit): `{"status":"error","message":"Terlalu sering, coba 1 menit lagi"}`

---

## Test Coverage (vitest)

File: `tests/generate.test.ts` — 50 test cases mencakup:
- Contract: productName 2-60, description 20-500, highlights ≤200, platform 4 enum, tone 4 enum
- Stub: 16 platform×tone distinct
- Guardrails: Captionin, hashtag, JSON array 3
- hashIp: deterministic, 8 hex
- BLOCKED: jailbreak/abaikan instruksi
- Rate-limit: 10/menit bucket

Run: `npm test` → 50 passed.