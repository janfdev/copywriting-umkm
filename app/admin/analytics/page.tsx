"use client";
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#C45A3C", "#D4A84B", "#6B7F3D", "#1A1A18"];

export default function AnalyticsPage() {
  const [range, setRange] = useState<"7d" | "30d">("7d");
  const [data, setData] = useState<{ totals: { views: number; generates: number }; deltas: { views: number; generates: number }; daily: { date: string; views: number; generates: number }[]; byPlatform: { name: string; value: number }[]; byTone: { name: string; value: number }[] } | null>(null);
  const [sessions, setSessions] = useState<{ totalSessions: number; uniqueIps: number; avgGeneratesPerSession: number; recent: { path: string; sessionId: string | null; ipHash: string; createdAt: string }[] } | null>(null);

  useEffect(() => {
    fetch(`/api/analytics?range=${range}`).then((r) => r.json()).then((j) => setData(j.data)).catch(() => {});
    fetch("/api/analytics/sessions").then((r) => r.json()).then((j) => setSessions(j.data)).catch(() => {});
  }, [range]);

  if (!data) return <div className="p-8 text-sm text-stone-500">Memuat…</div>;

  const kpi = [
    { label: "Total views", value: data.totals.views, delta: data.deltas.views },
    { label: "Total generates", value: data.totals.generates, delta: data.deltas.generates },
    { label: "Sessions", value: sessions?.totalSessions ?? 0, delta: 0 },
    { label: "Range", value: range, delta: 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Analytics</h1>
        <div className="inline-flex rounded-full bg-stone-100 p-1">
          <button onClick={() => setRange("7d")} className={`rounded-full px-4 py-1 text-sm ${range === "7d" ? "bg-white shadow-sm" : ""}`}>7 hari</button>
          <button onClick={() => setRange("30d")} className={`rounded-full px-4 py-1 text-sm ${range === "30d" ? "bg-white shadow-sm" : ""}`}>30 hari</button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {kpi.map((k) => (
          <Card key={k.label}>
            <CardHeader className="pb-2"><CardTitle className="text-xs font-normal text-stone-500">{k.label}</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-2xl font-bold">{k.value}</span>
              {k.delta !== 0 && (
                <Badge variant={k.delta >= 0 ? "success" : "destructive"} className="gap-1">
                  {k.delta >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}{k.delta > 0 ? `+${k.delta}%` : `${k.delta}%`}
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="p-4">
        <h3 className="text-sm font-medium mb-3">Views vs Generates (harian)</h3>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.daily}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Area type="monotone" dataKey="views" stroke="#C45A3C" fill="#C45A3C" fillOpacity={0.15} />
              <Area type="monotone" dataKey="generates" stroke="#D4A84B" fill="#D4A84B" fillOpacity={0.15} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-3">By Platform</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.byPlatform}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#C45A3C" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-3">By Tone</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.byTone} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {data.byTone.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="text-sm font-medium mb-3">Recent (20)</h3>
        <div className="divide-y text-xs">
          <div className="grid grid-cols-3 gap-2 py-2 font-medium text-stone-500"><span>path</span><span>session · ip</span><span>date</span></div>
          {(sessions?.recent ?? []).map((r, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 py-2">
              <span className="truncate">{r.path}</span>
              <span className="truncate">{(r.sessionId ?? "").slice(0, 8)} · {r.ipHash.slice(0, 8)}</span>
              <span>{new Date(r.createdAt).toLocaleDateString("id-ID")}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
