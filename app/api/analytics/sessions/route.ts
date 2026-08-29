import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const [views, generates] = await Promise.all([db.pageView.findMany({ orderBy: { createdAt: "desc" }, take: 20 }), db.generateEvent.findMany()]);
  const uniq = new Set(views.map((v: { ipHash: string }) => v.ipHash).concat(generates.map((g: { ipHash: string }) => g.ipHash)));
  const sessions = new Set([...views.map((v: { sessionId: string | null }) => v.sessionId).filter(Boolean), ...generates.map((g: { sessionId: string | null }) => g.sessionId).filter(Boolean)]);
  return NextResponse.json({
    status: "success",
    data: {
      totalSessions: sessions.size || uniq.size,
      uniqueIps: uniq.size,
      avgGeneratesPerSession: sessions.size ? +(generates.length / sessions.size).toFixed(2) : 0,
      recent: views.slice(0, 20),
    },
  });
}
