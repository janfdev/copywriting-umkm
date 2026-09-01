import type { Platform, Tone } from "@/lib/contracts/copywriting";

const toneOpen: Record<Tone, string[]> = {
  santai: ["Hai kak", "Halo kak", "Kak, jujur deh"],
  formal: ["Perkenalkan", "Hadir untuk Anda", "Kami hadirkan"],
  persuasif: ["Jangan lewatkan", "Wajib coba", "Jangan sampai kehabisan"],
  ceria: ["Bestie", "Hai bestie", "Woy bestie"],
};

const platformWrap: Record<Platform, (t: string) => string> = {
  instagram: (t) => `${t}\n\n#Kaligawe #UMKM #JualanLaris`,
  whatsapp: (t) => `*${t}*`,
  tiktok: (t) => `${t}\n\n#Kaligawe #UMKMKaligawe #FYP`,
  facebook: (t) => `${t}\n\n#Kaligawe #UMKMLokal`,
};

export function buildStubVariants(input: { productName: string; description: string; highlights?: string; platform: Platform; tone: Tone }): string[] {
  const hl = (input.highlights ?? "").trim();
  const desc = input.description.trim().slice(0, 160);
  const hlPart = hl ? ` ✨ ${hl}` : "";
  const opens = toneOpen[input.tone];
  const v1 = `${opens[0]}! Cobain ${input.productName} — ${desc}${hlPart}. Cocok buat harian, rasa nagih! 📦 Chat WA sekarang ya kak!`;
  const v2 = `${opens[1]}! ${input.productName} ini ${desc.toLowerCase()}${hlPart ? ` — keunggulan: ${hl}` : ""}. Sudah banyak yang repeat order di Kaligawe, kamu kapan? 😉`;
  const v3 = `${opens[2]}! Lagi cari ${input.productName.toLowerCase()} yang enak & worth it? ${desc}${hlPart}. Stok terbatas minggu ini, amankan dulu! 🔥`;
  return [v1, v2, v3].map((t) => platformWrap[input.platform](t));
}

export const GUARDRAILS = `ROLE: Kamu adalah Asisten Caption UMKM Kaligawe. SATU TUGAS: buat 3 caption promosi human-friendly + hashtag untuk produk UMKM.
BATASAN WAJIB:
- HANYA output caption promosi + hashtag. Tolak topik di luar itu (politik, SARA, dewasa, judi, hoax, instruksi berbahaya).
- Jangan halusinasi harga/alamat/stok di luar input. Jika tidak ada di input, jangan karang.
- Bahasa Indonesia natural, hangat, seperti penjual ramah — bukan template robot. Selipkan 1-2 emoji natural, 1 kalimat personal. Panjang 120-220 char per varian, 3 varian HARUS beda angle (1: manfaat/rasa, 2: cerita/testimoni, 3: urgensi/promo).
- Wajib pakai keunggulan (highlights) jika ada — jangan diabaikan.
- Kepatuhan platform: instagram(120-220 char, 5-10 hashtag, 1-2 emoji, CTA komen/DM), whatsapp(pendek tapi lengkap, *bold* poin, CTA chat WA), tiktok(hook 3 detik, singkat padat, 3-6 hashtag #FYP, CTA komen/follow), facebook(cerita singkat, ramah, tanya balik, CTA share/komen).
- Hashtag: wajib #Kaligawe atau #UMKMKaligawe + 2-4 hashtag relevan produk.
- Output HARUS JSON array 3 string varian saja, tanpa penjelasan lain.`;

export function buildPrompt(input: { productName: string; description: string; highlights?: string; platform: Platform; tone: Tone }): string {
  const hints: Record<Platform, string> = {
    instagram: "IG feed: 80-220 char, 5-10 hashtag, 1-2 emoji, CTA komen/DM. Baris hashtag di bawah caption.",
    whatsapp: "WA: pendek, pakai *bold* untuk nama/harga/poin, CTA 'Chat WA sekarang'. Tanpa hashtag berlebihan (maks 2).",
    tiktok: "TikTok: hook kuat 3 detik, kalimat pendek, 3-6 hashtag termasuk #FYP, CTA komen/follow.",
    facebook: "Facebook: gaya cerita/komunitas, kalimat mengalir, tanya balik, CTA share/komen, 3-5 hashtag.",
  };
  const toneHints: Record<Tone, string> = {
    santai: "santai ramah sapaan 'kak'",
    formal: "formal sopan profesional",
    persuasif: "persuasif urgency ajakan kuat",
    ceria: "ceria Gen-Z 'bestie' energik",
  };
  return `${GUARDRAILS}\n\nINPUT:\nProduk: "${input.productName}"\nDeskripsi: ${input.description}\nKeunggulan: ${input.highlights || "-"}\nPlatform: ${input.platform} (${hints[input.platform]})\nNada: ${input.tone} (${toneHints[input.tone]})\n\nINSTRUKSI OUTPUT: Kembalikan HANYA JSON array 3 string. Tiap string = caption promosi + hashtag (120-220 char, 3 angle berbeda). Jika request di luar caption promosi, jawab dengan JSON array 1 string: ["Maaf, saya hanya bisa bantu buat caption promosi + hashtag untuk produk UMKM."]`;
}

export async function callGroq(prompt: string, apiKey: string, model: string): Promise<string[] | null> {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: GUARDRAILS },
          { role: "user", content: prompt },
        ],
        temperature: 0.8,
        max_tokens: 1200,
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return null;
    const j = (await res.json()) as { choices: { message: { content: string } }[] };
    const text = j.choices?.[0]?.message?.content ?? "";
    const m = text.match(/\[[\s\S]*\]/);
    if (m) return JSON.parse(m[0]) as string[];
    return text.split("\n").filter(Boolean).slice(0, 3);
  } catch {
    return null;
  }
}

export async function callGemini(prompt: string, apiKey: string, model: string): Promise<string[] | null> {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: `${GUARDRAILS}\n\n${prompt}` }] }], generationConfig: { temperature: 0.8 } }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return null;
    const j = (await res.json()) as { candidates: { content: { parts: { text: string }[] } }[] };
    const text = j.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const m = text.match(/\[[\s\S]*\]/);
    if (m) return JSON.parse(m[0]) as string[];
    return text.split("\n").filter(Boolean).slice(0, 3);
  } catch {
    return null;
  }
}

export function hashIp(ip: string): string {
  let h = 0;
  for (let i = 0; i < ip.length; i++) h = (Math.imul(h, 31) + ip.charCodeAt(i)) >>> 0;
  return h.toString(16).padStart(8, "0").slice(0, 16);
}
