"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Eye, Sparkles, MessageSquare, Activity, ArrowUpRight, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type Data = {
  totals: { views: number; generates: number };
  deltas: { views: number; generates: number };
  daily: { date: string; views: number; generates: number }[];
  byPlatform: { name: string; value: number }[];
  byTone: { name: string; value: number }[];
};

function MiniBars({ values, color = "#C45A3C" }: { values: number[]; color?: string }) {
  const m = Math.max(1, ...values);
  return (
    <div className="flex items-end gap-0.5 h-6">
      {values.map((v, i) => (
        <span key={i} className="w-1 rounded-full" style={{ height: `${Math.max(4, (v / m) * 20)}px`, background: color }} />
      ))}
    </div>
  );
}

function KpiCard({ label, value, delta, desc, Icon, spark, selected, onClick }: { label: string; value: string | number; delta?: number; desc: string; Icon: React.ElementType; spark?: number[]; selected?: boolean; onClick?: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`text-left rounded-2xl border p-4 transition ${selected ? "border-neutral-900 ring-1 ring-neutral-900 bg-white" : "border-neutral-200 bg-white hover:shadow-sm"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-neutral-500">
          <Icon className="h-3.5 w-3.5" />
          {label}
        </span>
        {spark && <MiniBars values={spark} />}
      </div>
      <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
      <p className="mt-0.5 text-xs text-neutral-500">{desc}</p>
      {typeof delta === "number" && delta !== 0 && (
        <span className={`mt-2 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${delta >= 0 ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"}`}>
          {delta >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {delta > 0 ? "+" : ""}
          {delta}%
        </span>
      )}
    </motion.button>
  );
}

export default function DashboardOverview() {
  const [data, setData] = useState<Data | null>(null);
  const [testiCount, setTestiCount] = useState<number | null>(null);
  const [range, setRange] = useState<"7d" | "30d">("7d");
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/analytics?range=${range}`)
      .then((r) => r.json())
      .then((j) => setData(j.data as Data))
      .catch(() => {});
  }, [range]);
  useEffect(() => {
    fetch("/api/testimonials/admin")
      .then((r) => r.json())
      .then((j) => setTestiCount((j.data as unknown[])?.length ?? 0))
      .catch(() => setTestiCount(0));
  }, []);

  const sparkViews = data ? data.daily.map((d) => d.views) : [0, 0, 0, 0, 0];
  const sparkGen = data ? data.daily.map((d) => d.generates) : [0, 0, 0, 0, 0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-neutral-500">Ringkasan performa · {range === "7d" ? "7 hari" : "30 hari"} terakhir</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-600">
            <Calendar className="h-3.5 w-3.5" />
            {range === "7d" ? "7 hari" : "30 hari"}
          </span>
          <div className="inline-flex rounded-full bg-neutral-100 p-1">
            <button onClick={() => setRange("7d")} className={`rounded-full px-3 py-1 text-xs font-medium transition ${range === "7d" ? "bg-white shadow-sm text-neutral-900" : "text-neutral-500 hover:text-neutral-900"}`}>
              7d
            </button>
            <button onClick={() => setRange("30d")} className={`rounded-full px-3 py-1 text-xs font-medium transition ${range === "30d" ? "bg-white shadow-sm text-neutral-900" : "text-neutral-500 hover:text-neutral-900"}`}>
              30d
            </button>
          </div>
        </div>
      </div>

      {!data ? (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-24 w-full" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="Total Views" value={data.totals.views} delta={data.deltas.views} desc="vs periode sebelumnya" Icon={Eye} spark={sparkViews} selected={selected === "views"} onClick={() => setSelected(selected === "views" ? null : "views")} />
          <KpiCard label="Generates" value={data.totals.generates} delta={data.deltas.generates} desc="copy berhasil digenerate" Icon={Sparkles} spark={sparkGen} selected={selected === "gen"} onClick={() => setSelected(selected === "gen" ? null : "gen")} />
          <KpiCard label="Testimonials" value={testiCount ?? 0} desc="total moderasi" Icon={MessageSquare} selected={selected === "testi"} onClick={() => setSelected(selected === "testi" ? null : "testi")} />
          <KpiCard label="Platform top" value={data.byPlatform[0]?.name ?? "—"} desc={data.byPlatform[0] ? `${data.byPlatform[0].value} generate` : "belum ada data"} Icon={Activity} />
        </div>
      )}

      <Card className="rounded-2xl p-4">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="text-sm font-medium">Traffic harian · Views vs Generates</h3>
            <p className="text-xs text-neutral-500">{range === "7d" ? "7 hari" : "30 hari"} · bar harian (stacked)</p>
          </div>
          <Link href="/dashboard/analytics" className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900">
            Detail <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
        {!data ? (
          <Skeleton className="h-[240px] w-full rounded-xl" />
        ) : data.daily.every((d) => d.views === 0 && d.generates === 0) ? (
          <div className="flex h-[160px] items-center justify-center rounded-xl border border-dashed bg-neutral-50/70 text-sm text-neutral-500">Belum ada traffic — buka landing sebagai visitor untuk hit.</div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-neutral-100">
            <div className="flex h-[220px] items-end gap-px bg-neutral-100 p-px">
              {(() => {
                const max = Math.max(1, ...data.daily.map((x) => Math.max(x.views, x.generates)));
                return data.daily.map((d) => (
                  <div key={d.date} className="flex flex-1 flex-col justify-end gap-px bg-white group relative">
                    <div className="flex flex-1 flex-col justify-end gap-px">
                      <div className="w-full bg-[#C45A3C]/90" style={{ height: `${(d.views / max) * 100}%`, minHeight: d.views ? 2 : 0 }} />
                      <div className="w-full bg-[#D4A84B]" style={{ height: `${(d.generates / max) * 100}%`, minHeight: d.generates ? 2 : 0 }} />
                    </div>
                    <span className="hidden sm:block truncate px-0.5 py-1 text-center text-[10px] text-neutral-400">{d.date.slice(5)}</span>
                    <div className="pointer-events-none absolute bottom-full left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-neutral-900 px-2 py-1 text-[11px] text-white shadow group-hover:block">
                      {d.date.slice(5)} · Views {d.views} · Gen {d.generates}
                    </div>
                  </div>
                ));
              })()}
            </div>
            <div className="flex flex-wrap items-center gap-3 px-3 py-2 text-[11px] text-neutral-500">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#C45A3C]" /> Views (page)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#D4A84B]" /> Generates
              </span>
              <span className="ml-auto hidden sm:inline text-neutral-400">total {data.totals.views} views · {data.totals.generates} gen · {range}</span>
            </div>
          </div>
        )}
      </Card>

      <div className="grid gap-3 md:grid-cols-2">
        <Card className="rounded-2xl p-4">
          <h3 className="text-sm font-medium">Aksi cepat</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/dashboard/analytics" className="text-[#C45A3C] hover:underline">
                Buka Analytics 7d/30d →
              </Link>
              <span className="text-neutral-500"> KPI + charts + recent</span>
            </li>
            <li>
              <Link href="/dashboard/testimonials" className="text-[#C45A3C] hover:underline">
                Moderasi Testimoni →
              </Link>
              <span className="text-neutral-500"> approve/reject + marquee</span>
            </li>
            <li>
              <a href="/#buat-copy" className="text-[#C45A3C] hover:underline">
                Generator Landing →
              </a>
              <span className="text-neutral-500"> uji generate end-to-end</span>
            </li>
          </ul>
        </Card>
        <Card className="rounded-2xl p-4">
          <h3 className="text-sm font-medium">Platform & tone</h3>
          {!data ? (
            <Skeleton className="mt-3 h-20 w-full" />
          ) : (
            <div className="mt-3 space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {data.byPlatform.slice(0, 4).map((p) => (
                  <span key={p.name} className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-xs">
                    {p.name} · {p.value}
                  </span>
                ))}
                {data.byPlatform.length === 0 && <span className="text-xs text-neutral-500">Belum ada generate.</span>}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {data.byTone.slice(0, 4).map((p) => (
                  <span key={p.name} className="rounded-full bg-neutral-900 px-2.5 py-1 text-xs text-white">
                    {p.name} · {p.value}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="mt-4 flex gap-2">
            <Button asChild variant="outline" size="sm" className="rounded-full">
              <Link href="/dashboard/analytics">Lihat Analytics</Link>
            </Button>
            <Button asChild size="sm" className="rounded-full">
              <Link href="/dashboard/testimonials">Kelola Testimoni</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
