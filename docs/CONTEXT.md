# CONTEXT.md — Asisten Copywriting UMKM Kaligawe

Ubiquitous language untuk proyek ini. Gunakan istilah ini konsisten di code, issues, dan docs.

## Glossary

| Term | Definition | Avoid |
|------|-----------|-------|
| **Copy / Copywriting** | Teks jualan siap-pakai untuk platform tertentu | "content", "caption" generik — pakai `copy` |
| **Varian** | Satu dari 3 hasil generate per request | "version", "option" |
| **Platform** | Tujuan copy: `instagram`, `whatsapp`, `marketplace`, `poster` | "channel" |
| **Tone** | Gaya bahasa: `santai`, `formal`, `persuasif`, `ceria` | "style", "mood" |
| **Generate** | Action memanggil LLM untuk menghasilkan varian | "create", "make" |
| **History** | List generate sebelumnya di localStorage (MVP) | "history" DB — beda saat auth ada |
| **Provider** | LLM backend: `groq` (primary), `gemini` (fallback) | "model" generik tanpa provider prefix |

## Bounded language

- Input user disebut `productName`, `description`, `highlights` (bukan `title`/`bio`).
- Output selalu `variants: string[3]` dalam `data` envelope `c.json({status:"success", data})`.
- Env source of truth: `.env.example` di root (Groq + Gemini), `packages/env` load root `.env` dulu lalu `apps/server/.env`.

## Out of scope terms (jangan pakai di MVP)

- `User`, `Session`, `Generation` DB entity — add when auth/history-DB needed.
- `Image`, `Poster visual` — add when vision feature.
