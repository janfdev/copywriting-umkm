import type { Platform, Tone } from "@/lib/contracts/copywriting";

const toneOpen: Record<Tone, string[]> = {
  santai: ["Hai kak", "Halo kak", "Hai kak"],
  formal: ["Perkenalkan", "Hadir untuk Anda", "Kami hadirkan"],
  persuasif: ["Jangan lewatkan", "Wajib coba", "Jangan sampai kehabisan"],
  ceria: ["Bestie", "Hai bestie", "Woy bestie"],
};

const platformWrap = {
  instagram: (t: string) => `${t}\n\n#Kaligawe #UMKM #JualanLaris`,
  whatsapp: (t: string) => `*${t}*`,
  marketplace: (t: string, hl: string) => `${t} | ${hl || "Siap kirim Kaligawe"}`,
  poster: (t: string) => t.toUpperCase(),
};

export function buildStubVariants(input: { productName: string; description: string; highlights?: string; platform: Platform; tone: Tone }): string[] {
  const hl = (input.highlights ?? "").trim();
  const base = `${input.productName} — ${input.description.slice(0, 80).trim()}`;
  const opens = toneOpen[input.tone];
  return [0, 1, 2].map((i) => {
    const open = opens[i % opens.length];
    const suffix = i === 1 ? " Siap kirim Kaligawe!" : i === 2 ? " Stok terbatas!" : "";
    let text = `${open}! ${base}${suffix}`;
    const wrap = platformWrap[input.platform];
    if (input.platform === "marketplace") text = (wrap as (t: string, hl: string) => string)(text, hl);
    else text = (wrap as (t: string) => string)(text);
    return text;
  });
}

export function buildPrompt(input: { productName: string; description: string; highlights?: string; platform: Platform; tone: Tone }): string {
  const hints: Record<Platform, string> = {
    instagram: "Gunakan hashtag relevan, emoji 1-2, CTA komen/DM.",
    whatsapp: "Gunakan *bold* untuk highlight, singkat, CTA chat.",
    marketplace: "Format judul | keunggulan | harga, keyword SEO.",
    poster: "Huruf KAPITAL, singkat, tebal untuk cetak.",
  };
  const toneHints: Record<Tone, string> = {
    santai: "Gaya santai, sapaan 'kak', ramah.",
    formal: "Gaya formal, sopan, profesional.",
    persuasif: "Gaya persuasif, urgency, ajakan kuat.",
    ceria: "Gaya ceria Gen-Z, 'bestie', energik.",
  };
  return `Buat 3 varian copy jualan untuk "${input.productName}". Deskripsi: ${input.description}. Keunggulan: ${input.highlights || "-"}. Platform: ${input.platform} (${hints[input.platform]}). Nada: ${input.tone} (${toneHints[input.tone]}). Output JSON array 3 string varian sahaja.`;
}

export async function callGroq(prompt: string, apiKey: string, model: string): Promise<string[] | null> {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
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
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.8 } }),
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
