"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, TrendingDown, Eye, Sparkles, Users, Activity, MessageSquare, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type Data = {
  totals: { views: number; generates: number };
  deltas: { views: number; generates: number };
  daily: { date: string; views: number; generates: number }[];
  byPlatform: { name: string; value: number }[];
  byTone: { name: string; value: number }[];
};

export default function DashboardOverview() {
  const [data, setData] = useState<Data | null>(null);
  const [testiCount, setTestiCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/analytics?range=7d").then((r) => r.json()).then((j) => setData(j.data)).catch(() => {});
    fetch("/api/testimonials/admin").then((r) => r.json()).then((j) => setTestiCount((j.data as unknown[])?.length ?? 0)).catch(() => setTestiCount(0));
    fetch("/api/analytics/sessions").then((r) => r.json()).catch(() => {});
  }, []);

  const cards = data
    ? [
        { label: "Total Views (7d)", value: data.totals.views, delta: data.deltas.views, desc: "vs 7 hari sebelumnya", icon: Eye },
        { label: "Generates (7d)", value: data.totals.generates, delta: data.deltas.generates, desc: "copy berhasil digenerate", icon: Sparkles },
        { label: "Testimonials", value: testiCount ?? 0, desc: "total moderasi", icon: MessageSquare },
        { label: "Platform top", value: data.byPlatform[0]?.name ?? "—", desc: data.byPlatform[0] ? `${data.byPlatform[0].value} generate` : "belum ada data", icon: Activity },
      ]
    : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-stone-500">Ringkasan performa · shadcn dashboard-01 lean (tanpa @tabler/@tanstack/@dnd-kit)</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm"><Link href="/dashboard/analytics">Lihat Analytics <ArrowUpRight className="h-3.5 w-3.5" /></Link></Button>
          <Button asChild size="sm"><Link href="/dashboard/testimonials">Kelola Testimoni</Link></Button>
        </div>
      </div>

      {!cards ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <Card key={i} className="p-4"><Skeleton className="h-24 w-full" /></Card>)}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <Card key={c.label}>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-1.5"><c.icon className="h-3.5 w-3.5" />{c.label}</CardDescription>
                <CardTitle className="text-2xl tabular-nums">{typeof c.value === "number" ? c.value : c.value}</CardTitle>
                {"delta" in c && (c as { delta: number }).delta !== 0 && (
                  <Badge variant={(c as { delta: number }).delta >= 0 ? "success" : "destructive"} className="w-fit gap-1 mt-1">
                    {(c as { delta: number }).delta >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}{((c as { delta: number }).delta > 0 ? "+" : "") + (c as { delta: number }).delta}%
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-xs text-stone-500">{c.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium">Traffic 7 hari — Views vs Generates</h3>
          <Link href="/dashboard/analytics" className="text-xs text-stone-500 hover:text-stone-900 inline-flex items-center gap-1">Detail <ArrowUpRight className="h-3 w-3" /></Link>
        </div>
        {!data ? (
          <Skeleton className="h-[220px] w-full" />
        ) : data.daily.every((d) => d.views === 0 && d.generates === 0) ? (
          <div className="flex h-[160px] items-center justify-center rounded-xl border border-dashed bg-stone-50/70 text-sm text-stone-500">Belum ada traffic.</div>
        ) : (
          <ChartContainer config={{ views: { label: "Views", color: "#C45A3C" }, generates: { label: "Generates", color: "#D4A84B" } }} className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.daily}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v: string) => v.slice(5)} tickLine={false} axisLine={false} />
                <Tooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="views" stroke="var(--color-views)" fill="var(--color-views)" fillOpacity={0.15} strokeWidth={2} />
                <Area type="monotone" dataKey="generates" stroke="var(--color-generates)" fill="var(--color-generates)" fillOpacity={0.18} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-2">Aksi cepat</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/dashboard/analytics" className="text-[#C45A3C] hover:underline">Buka Analytics 7d/30d →</Link> <span className="text-stone-500">KPI + Area/Bar/Pie + recent table</span></li>
            <li><Link href="/dashboard/testimonials" className="text-[#C45A3C] hover:underline">Moderasi Testimoni →</Link> <span className="text-stone-500">approve/reject + marquee toggle + filter</span></li>
            <li><a href="/#buat-copy" className="text-[#C45A3C] hover:underline">Generator Landing →</a> <span className="text-stone-500">uji generate end-to-end</span></li>
          </ul>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-2">Catatan</h3>
          <p className="text-xs leading-relaxed text-stone-600">
            Route lama <code className="rounded bg-stone-100 px-1 py-0.5">/admin/*</code> di-redirect ke <code className="rounded bg-stone-100 px-1 py-0.5">/dashboard/*</code> via middleware + next.config. Dashboard pakai primitives shadcn lean (sidebar/breadcrumb/chart/table/dropdown) tanpa deps berat dashboard-01.
          </p>
        </Card>
      </div>
    </div>
  );
}
