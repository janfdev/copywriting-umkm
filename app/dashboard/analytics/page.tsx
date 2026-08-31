"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Eye, Sparkles, Users, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

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

function Kpi({ label, value, delta, sub, Icon }: { label: string; value: number; delta?: number; sub?: string; Icon: React.ElementType }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="rounded-2xl border border-neutral-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500">
          <Icon className="h-3.5 w-3.5" />
          {label}
        </span>
        {typeof delta === "number" && delta !== 0 && (
          <Badge variant={delta >= 0 ? "success" : "destructive"} className="gap-1 text-[11px]">
            {delta >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {delta > 0 ? "+" : ""}
            {delta}%
          </Badge>
        )}
      </div>
      <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
      {sub && <p className="text-xs text-neutral-500">{sub}</p>}
    </motion.div>
  );
}

function Empty({ label }: { label: string }) {
  return <div className="flex min-h-[120px] items-center justify-center rounded-xl border border-dashed bg-neutral-50/70 px-4 py-8 text-sm text-neutral-500">{label}</div>;
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
      fetch(`/api/analytics?range=${range}`)
        .then((r) => r.json())
        .then((j) => j.data as Data),
      fetch("/api/analytics/sessions")
        .then((r) => r.json())
        .then((j) => j.data as Sessions),
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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-28" />
          <Skeleton className="h-9 w-36 rounded-full" />
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-20 w-full" />
            </Card>
          ))}
        </div>
        <Skeleton className="h-[260px] w-full rounded-2xl" />
      </div>
    );
  }
  if (!data) return <div className="p-8 text-sm text-neutral-500">Gagal memuat analytics.</div>;

  const hasDaily = data.daily.some((d) => d.views > 0 || d.generates > 0);
  const hasPlatform = data.byPlatform.length > 0 && data.byPlatform.some((d) => d.value > 0);
  const hasTone = data.byTone.length > 0 && data.byTone.some((d) => d.value > 0);
  const maxDaily = Math.max(1, ...data.daily.map((d) => Math.max(d.views, d.generates)));
  const maxPlat = Math.max(1, ...data.byPlatform.map((p) => p.value));
  const maxTone = Math.max(1, ...data.byTone.map((p) => p.value));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Analytics</h1>
          <p className="text-xs text-neutral-500">Traffic {range} · delta vs periode sebelumnya</p>
        </div>
        <div className="inline-flex rounded-full bg-neutral-100 p-1">
          <button onClick={() => setRange("7d")} className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${range === "7d" ? "bg-white shadow-sm text-neutral-900" : "text-neutral-500 hover:text-neutral-900"}`}>
            7 hari
          </button>
          <button onClick={() => setRange("30d")} className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${range === "30d" ? "bg-white shadow-sm text-neutral-900" : "text-neutral-500 hover:text-neutral-900"}`}>
            30 hari
          </button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <Kpi label="Total views" value={data.totals.views} delta={data.deltas.views} Icon={Eye} />
        <Kpi label="Total generates" value={data.totals.generates} delta={data.deltas.generates} Icon={Sparkles} />
        <Kpi label="Sessions" value={sessions?.totalSessions ?? 0} sub={`${sessions?.uniqueIps ?? 0} IP unik`} Icon={Users} />
        <Kpi label="Avg / sesi" value={sessions?.avgGeneratesPerSession ?? 0} sub="generate per sesi" Icon={Activity} />
      </div>

      <Card className="rounded-2xl p-4">
        <h3 className="text-sm font-medium">Views vs Generates (harian)</h3>
        {hasDaily ? (
          <div className="mt-3 overflow-hidden rounded-xl border border-neutral-100">
            <div className="flex h-[240px] items-end gap-px bg-neutral-100 p-px">
              {data.daily.map((d) => (
                <div key={d.date} className="flex flex-1 flex-col justify-end gap-px bg-white">
                  <div className="w-full bg-[#C45A3C]" style={{ height: `${(d.views / maxDaily) * 100}%`, minHeight: d.views ? 2 : 0 }} title={`${d.date} views ${d.views}`} />
                  <div className="w-full bg-[#D4A84B]" style={{ height: `${(d.generates / maxDaily) * 100}%`, minHeight: d.generates ? 2 : 0 }} title={`${d.date} generates ${d.generates}`} />
                  <span className="hidden sm:block truncate px-0.5 py-1 text-center text-[10px] text-neutral-400">{d.date.slice(5)}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 px-3 py-2 text-[11px] text-neutral-500">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#C45A3C]" /> Views
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#D4A84B]" /> Generates
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-3">
            <Empty label="Belum ada traffic di rentang ini — kirim hit atau generate untuk melihat grafik." />
          </div>
        )}
      </Card>

      <div className="grid gap-3 md:grid-cols-2">
        <Card className="rounded-2xl p-4">
          <h3 className="text-sm font-medium">By Platform</h3>
          {hasPlatform ? (
            <div className="mt-3 space-y-2">
              {data.byPlatform.map((p, i) => (
                <div key={p.name} className="flex items-center gap-3">
                  <span className="w-20 truncate text-xs text-neutral-600">{p.name}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(p.value / maxPlat) * 100}%` }} transition={{ duration: 0.5, delay: i * 0.05 }} className="h-full rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                  </div>
                  <span className="w-8 text-right text-xs font-medium tabular-nums">{p.value}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-3">
              <Empty label="Belum ada generate per platform." />
            </div>
          )}
        </Card>
        <Card className="rounded-2xl p-4">
          <h3 className="text-sm font-medium">By Tone</h3>
          {hasTone ? (
            <div className="mt-3 space-y-2">
              {data.byTone.map((p, i) => (
                <div key={p.name} className="flex items-center gap-3">
                  <span className="w-20 truncate text-xs text-neutral-600">{p.name}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(p.value / maxTone) * 100}%` }} transition={{ duration: 0.5, delay: i * 0.05 }} className="h-full rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                  </div>
                  <span className="w-8 text-right text-xs font-medium tabular-nums">{p.value}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-3">
              <Empty label="Belum ada generate per tone." />
            </div>
          )}
        </Card>
      </div>

      <Card className="rounded-2xl p-4">
        <h3 className="text-sm font-medium">Recent · 20 page views terakhir</h3>
        {(sessions?.recent?.length ?? 0) === 0 ? (
          <div className="mt-3">
            <Empty label="Belum ada page view." />
          </div>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <div className="min-w-[520px] divide-y text-xs">
              <div className="grid grid-cols-[1.2fr_1fr_0.8fr] gap-2 py-2 font-medium text-neutral-500">
                <span>path</span>
                <span>session · ip</span>
                <span>tanggal</span>
              </div>
              {(sessions?.recent ?? []).map((r, i) => (
                <div key={i} className="grid grid-cols-[1.2fr_1fr_0.8fr] gap-2 py-2.5">
                  <span className="truncate font-mono">{r.path}</span>
                  <span className="truncate font-mono text-neutral-600">{(r.sessionId ?? "—").slice(0, 8)} · {r.ipHash.slice(0, 8)}</span>
                  <span className="text-neutral-600">
                    {new Date(r.createdAt).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })} {new Date(r.createdAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
