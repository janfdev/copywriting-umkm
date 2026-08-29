import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashIp } from "@/lib/generate";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
  const body = (await req.json().catch(() => ({}))) as { path?: string; sessionId?: string };
  const path = (body.path ?? "/").slice(0, 200);
  const sessionId = body.sessionId?.slice(0, 64);
  try {
    await db.pageView.create({ data: { path, ipHash: hashIp(ip), sessionId } });
  } catch {}
  return NextResponse.json({ status: "success" });
}
