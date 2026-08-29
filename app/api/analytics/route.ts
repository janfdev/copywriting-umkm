import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

function rangeDays(range: string): number {
  return range === "30d" ? 30 : 7;
}

export async function GET(req: NextRequest) {
  const range = req.nextUrl.searchParams.get("range") ?? "7d";
  const days = rangeDays(range);
  const since = new Date();
  since.setDate(since.getDate() - days);
  since.setHours(0, 0, 0, 0);
  const prevSince = new Date(since);
  prevSince.setDate(prevSince.getDate() - days);

  const [views, generates, prevViews, prevGenerates] = await Promise.all([
    db.pageView.findMany({ where: { createdAt: { gte: since } } }),
    db.generateEvent.findMany({ where: { createdAt: { gte: since } } }),
    db.pageView.count({ where: { createdAt: { gte: prevSince, lt: since } } }),
    db.generateEvent.count({ where: { createdAt: { gte: prevSince, lt: since } } }),
  ]);

  const totalViews = views.length;
  const totalGenerates = generates.length;

  const delta = (curr: number, prev: number) => (prev === 0 ? (curr > 0 ? 100 : 0) : Math.round(((curr - prev) / prev) * 100));

  const dayKey = (d: Date) => d.toISOString().slice(0, 10);
  const map: Record<string, { views: number; generates: number }> = {};
  for (let i = 0; i < days; i++) {
    const d = new Date(since);
    d.setDate(d.getDate() + i);
    map[dayKey(d)] = { views: 0, generates: 0 };
  }
  for (const v of views) {
    const k = dayKey(new Date(v.createdAt));
    if (map[k]) map[k].views++;
  }
  for (const g of generates) {
    const k = dayKey(new Date(g.createdAt));
    if (map[k]) map[k].generates++;
  }
  const daily = Object.entries(map).map(([date, v]) => ({ date, ...v }));

  const byPlatform: Record<string, number> = {};
  const byTone: Record<string, number> = {};
  for (const g of generates) {
    byPlatform[g.platform] = (byPlatform[g.platform] ?? 0) + 1;
    byTone[g.tone] = (byTone[g.tone] ?? 0) + 1;
  }

  return NextResponse.json({
    status: "success",
    data: {
      totals: { views: totalViews, generates: totalGenerates },
      deltas: { views: delta(totalViews, prevViews), generates: delta(totalGenerates, prevGenerates) },
      daily,
      byPlatform: Object.entries(byPlatform).map(([name, value]) => ({ name, value })),
      byTone: Object.entries(byTone).map(([name, value]) => ({ name, value })),
    },
  });
}
