import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { adminEmail, COOKIE_NAME, signSession, verifyAdminPassword } from "@/lib/auth";

const schema = z.object({ email: z.string().email(), password: z.string().min(1) });

const buckets = new Map<string, number[]>();
function hit(ip: string) {
  const now = Date.now();
  const arr = (buckets.get(ip) ?? []).filter((t) => now - t < 60_000);
  arr.push(now);
  buckets.set(ip, arr);
  return arr.length;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
  if (hit(ip) > 5) return NextResponse.json({ status: "error", message: "Terlalu sering, coba 1 menit lagi" }, { status: 429 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ status: "error", message: parsed.error.issues[0].message }, { status: 400 });

  const { email, password } = parsed.data;
  const expected = adminEmail().toLowerCase();
  if (email.toLowerCase() !== expected) return NextResponse.json({ status: "error", message: "Email atau password salah" }, { status: 401 });

  const ok = await verifyAdminPassword(password);
  if (!ok) return NextResponse.json({ status: "error", message: "Email atau password salah" }, { status: 401 });

  const token = await signSession({ sub: email.toLowerCase(), email: expected, role: "admin" });
  const res = NextResponse.json({ status: "success", data: { email: expected, role: "admin" } });
  res.cookies.set(COOKIE_NAME, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
  return res;
}
