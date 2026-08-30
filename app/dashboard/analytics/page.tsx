"use client";
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Eye, Sparkles, Users, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#C45A3C", "#D4A84B", "#6B7F3D", "#1A1A18"];

type Data = {
  totals: { views: number; generates: number };
  deltas: { views: number; generates: number };
  daily: { date: string; views: number; generates: number }[];
  byPlatform: { name: string; value: number }[];
  byTone: { name: string; value: number }[];
};
type Sessions = {
  totalSessions: number;
  uniqueIps: number;
  avgGeneratesPerSession: number;
  recent: { path: string; sessionId: string | null; ipHash: string; createdAt: string }[];
};

function Empty({ label }: { label: string }) {
  return <div className="flex h-full min-h-[140px] items-center justify-center rounded-xl border border-dashed bg-stone-50/70 px-4 py-10 text-sm text-stone-500">{label}</div>;
}

export default function AnalyticsPage() {
  const [range, setRange] = useState<"7d" | "30d">("7d");
  const [data, setData] = useState<Data | null>(null);
  const [sessions, setSessions] = useState<Sessions | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    Promise.all([
      fetch(`/api/analytics?range=${range}`).then((r) => r.json()).then((j) => j.data as Data),
      fetch("/api/analytics/sessions").then((r) => r.json()).then((j) => j.data as Sessions),
    ])
      .then(([d, s]) => {
        if (!alive) return;
        setData(d);
        setSessions(s);
      })
      .catch(() => {})
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [range]);

  if (loading && !data) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-28" />
          <Skeleton className="h-9 w-36 rounded-full" />
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-4"><Skeleton className="h-20 w-full" /></Card>
          ))}
        </div>
        <Skeleton className="h-[280px] w-full" />
        <div className="grid gap-4 md:grid-cols-2"><Skeleton className="h-[260px]" /><Skeleton className="h-[260px]" /></div>
      </div>
    );
  }

  if (!data) return <div className="p-8 text-sm text-stone-500">Gagal memuat analytics.</div>;

  const kpi = [
    { label: "Total views", value: data.totals.views, delta: data.deltas.views, icon: Eye },
    { label: "Total generates", value: data.totals.generates, delta: data.deltas.generates, icon: Sparkles },
    { label: "Sessions", value: sessions?.totalSessions ?? 0, sub: `${sessions?.uniqueIps ?? 0} IP unik`, icon: Users },
    { label: "Avg / sesi", value: sessions?.avgGeneratesPerSession ?? 0, sub: "generate per sesi", icon: Activity },
  ];

  const hasDaily = data.daily.some((d) => d.views > 0 || d.generates > 0);
  const hasPlatform = data.byPlatform.length > 0 && data.byPlatform.some((d) => d.value > 0);
  const hasTone = data.byTone.length > 0 && data.byTone.some((d) => d.value > 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Analytics</h1>
          <p className="text-xs text-stone-500">Traffic 7/30 hari · delta vs periode sebelumnya</p>
        </div>
        <div className="inline-flex rounded-full bg-stone-100 p-1">
          <button onClick={() => setRange("7d")} className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${range === "7d" ? "bg-white shadow-sm text-stone-900" : "text-stone-500 hover:text-stone-900"}`}>7 hari</button>
          <button onClick={() => setRange("30d")} className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${range === "30d" ? "bg-white shadow-sm text-stone-900" : "text-stone-500 hover:text-stone-900"}`}>30 hari</button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {kpi.map((k) => (
          <Card key={k.label}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-xs font-normal text-stone-500 flex items-center gap-1.5"><k.icon className="h-3.5 w-3.5" />{k.label}</CardTitle>
              {"delta" in k && (k as { delta: number }).delta !== 0 && (
                <Badge variant={(k as { delta: number }).delta >= 0 ? "success" : "destructive"} className="gap-1">
                  {(k as { delta: number }).delta >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}{((k as { delta: number }).delta > 0 ? "+" : "") + (k as { delta: number }).delta}%
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tabular-nums">{k.value}</div>
              {"sub" in k && <div className="text-xs text-stone-500">{(k as { sub: string }).sub}</div>}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="p-4">
        <h3 className="text-sm font-medium mb-3">Views vs Generates (harian)</h3>
        {hasDaily ? (
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.daily}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v: string) => v.slice(5)} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip />
                <Area type="monotone" dataKey="views" stroke="#C45A3C" fill="#C45A3C" fillOpacity={0.15} strokeWidth={2} />
                <Area type="monotone" dataKey="generates" stroke="#D4A84B" fill="#D4A84B" fillOpacity={0.18} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <Empty label="Belum ada traffic di rentang ini — kirim hit atau generate untuk melihat grafik." />
        )}
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-3">By Platform</h3>
          {hasPlatform ? (
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.byPlatform}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#C45A3C" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <Empty label="Belum ada generate per platform." />
          )}
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-3">By Tone</h3>
          {hasTone ? (
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data.byTone} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={85} label>
                    {data.byTone.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <Empty label="Belum ada generate per tone." />
          )}
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="text-sm font-medium mb-3">Recent · 20 page views terakhir</h3>
        {(sessions?.recent?.length ?? 0) === 0 ? (
          <Empty label="Belum ada page view." />
        ) : (
          <div className="divide-y text-xs">
            <div className="grid grid-cols-[1.2fr_1fr_0.8fr] gap-2 py-2 font-medium text-stone-500"><span>path</span><span>session · ip</span><span>tanggal</span></div>
            {(sessions?.recent ?? []).map((r, i) => (
              <div key={i} className="grid grid-cols-[1.2fr_1fr_0.8fr] gap-2 py-2.5">
                <span className="truncate font-mono">{r.path}</span>
                <span className="truncate font-mono text-stone-600">{(r.sessionId ?? "—").slice(0, 8)} · {r.ipHash.slice(0, 8)}</span>
                <span className="text-stone-600">{new Date(r.createdAt).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })} {new Date(r.createdAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
