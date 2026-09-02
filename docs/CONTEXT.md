# CONTEXT.md — Captionin — Asisten Caption UMKM Kaligawe

Ubiquitous language untuk proyek ini. Gunakan istilah ini konsisten di code, issues, dan docs.

## Brand

| Key | Value |
|-----|-------|
| **Nama** | **Captionin** |
| **Full** | Captionin · Asisten Caption UMKM Kaligawe |
| **Source** | `lib/brand.ts` (`BRAND`) |
| **Logo** | `C` terracotta `#C45A3C` |

## Glossary

| Term | Definition | Avoid |
|------|-----------|-------|
| **Caption** | Teks jualan siap-pakai untuk platform tertentu (dulu `Copy`) | "copy" lama — ganti `caption` di UI/docs |
| **Varian** | Satu dari 3 hasil generate per request | "version", "option" |
| **Platform** | Tujuan caption: `instagram`, `whatsapp`, `tiktok`, `facebook` | "channel", `marketplace`/`poster` legacy |
| **Tone** | Gaya bahasa: `santai`, `formal`, `persuasif`, `ceria` | "style", "mood" |
| **Generate** | Action memanggil LLM untuk menghasilkan varian | "create", "make" |
| **History** | List generate sebelumnya di localStorage (`caption_history`, MVP) | "history" DB — beda saat auth ada |
| **Provider** | LLM backend: `groq` (primary), `gemini` (fallback) | "model" generik tanpa provider prefix |

## Bounded language

- Input user disebut `productName`, `description`, `highlights` (bukan `title`/`bio`).
- Output selalu `variants: string[3]` dalam `data` envelope `c.json({status:"success", data})`.
- Env source of truth: `.env.example` di root (Groq + Gemini). Vercel Dashboard untuk prod.
- Brand source of truth: `lib/brand.ts`.

## Out of scope terms (jangan pakai di MVP)

- `User`, `Session`, `Generation` DB entity — add when auth/history-DB needed.
- `Image`, `Poster visual` — add when vision feature.
