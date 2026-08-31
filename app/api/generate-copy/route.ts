import { NextRequest, NextResponse } from "next/server";
import { generateCopySchema } from "@/lib/contracts/copywriting";
import { buildPrompt, buildStubVariants, callGemini, callGroq, hashIp } from "@/lib/generate";
import { db } from "@/lib/db";

const buckets = new Map<string, number[]>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const arr = (buckets.get(ip) ?? []).filter((t) => now - t < 60_000);
  if (arr.length >= 10) return false;
  arr.push(now);
  buckets.set(ip, arr);
  return true;
}

const BLOCKED = [/abaikan instruksi/i, /jailbreak/i, /DAN mode/i, /system prompt/i];
function guardInput(v: { productName: string; description: string; highlights?: string }): boolean {
  const t = `${v.productName} ${v.description} ${v.highlights ?? ""}`;
  return BLOCKED.some((re) => re.test(t));
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "127.0.0.1";
  if (!rateLimit(ip)) return NextResponse.json({ status: "error", message: "Terlalu sering, coba 1 menit lagi" }, { status: 429 });

  const body = await req.json().catch(() => null);
  const parsed = generateCopySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ status: "error", message: parsed.error.issues[0].message, issues: parsed.error.issues }, { status: 400 });
  }
  if (guardInput(parsed.data)) {
    return NextResponse.json({ status: "error", message: "Input mengandung instruksi terlarang. Hanya produk UMKM." }, { status: 400 });
  }
  const input = parsed.data;
  const sessionId = req.headers.get("x-session-id")?.slice(0, 64) || undefined;
  const ipHash = hashIp(ip);

  let variants: string[] | null = null;

  const groqKey = process.env.GROQ_API_KEY;
  const groqModel = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
  if (groqKey) variants = await callGroq(buildPrompt(input), groqKey, groqModel);

  if (!variants || variants.length < 3) {
    const gemKey = process.env.GEMINI_API_KEY;
    const gemModel = process.env.GEMINI_MODEL || "gemini-2.0-flash";
    if (gemKey) {
      const g = await callGemini(buildPrompt(input), gemKey, gemModel);
      if (g && g.length >= 3) variants = g.slice(0, 3);
    }
  }

  if (!variants || variants.length < 3) variants = buildStubVariants(input);
  variants = variants.slice(0, 3).map((v) => v.slice(0, 600));

  try {
    await db.generateEvent.create({ data: { platform: input.platform, tone: input.tone, ipHash, sessionId } });
  } catch {}

  return NextResponse.json({ status: "success", data: { variants, sessionId: sessionId ?? ipHash } });
}
