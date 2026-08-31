"use client";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Megaphone, Check, X, Trash2, Search, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

type T = { id: string; name: string; quote: string; rating: number; status: string; isMarquee: boolean; createdAt: string };

export default function DashboardTestimonials() {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const load = async () => {
    setLoading(true);
    try {
      const j = await fetch("/api/testimonials/admin").then((r) => r.json());
      setItems((j.data as T[]) ?? []);
    } catch {
      toast.error("Gagal memuat");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);

  const setStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/testimonials/${id}/status`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    if (res.ok) {
      toast.success(status);
      load();
    } else toast.error("Gagal");
  };
  const toggleMarquee = async (id: string, cur: boolean) => {
    const res = await fetch(`/api/testimonials/${id}/marquee`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isMarquee: !cur }) });
    if (res.ok) {
      toast.success(cur ? "Marquee dimatikan" : "Ditampilkan di marquee");
      load();
    } else toast.error("Gagal");
  };
  const del = async (id: string) => {
    if (!confirm("Hapus testimoni ini?")) return;
    const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Dihapus");
      load();
    } else toast.error("Gagal hapus");
  };

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return items.filter((t) => (filter === "all" || t.status === filter) && (!s || t.name.toLowerCase().includes(s) || t.quote.toLowerCase().includes(s)));
  }, [items, q, filter]);

  const counts = { all: items.length, pending: items.filter((x) => x.status === "pending").length, approved: items.filter((x) => x.status === "approved").length, rejected: items.filter((x) => x.status === "rejected").length };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Testimonials</h1>
          <p className="text-xs text-neutral-500">
            {counts.pending} pending · {counts.approved} approved · {counts.rejected} rejected
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-1.5">
          <Search className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari nama / quote" className="w-[200px] bg-transparent text-sm outline-none placeholder:text-neutral-400" />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {(["all", "pending", "approved", "rejected"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium border transition ${filter === k ? "bg-neutral-900 text-white border-neutral-900" : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"}`}
          >
            {k} ({counts[k]})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="rounded-2xl p-4">
              <Skeleton className="h-16 w-full" />
            </Card>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="flex min-h-[140px] items-center justify-center rounded-2xl border-dashed p-8 text-sm text-neutral-500">Tidak ada testimoni untuk filter ini.</Card>
      ) : (
        <Card className="overflow-hidden rounded-2xl p-0">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-neutral-100 text-[11px] text-neutral-400">
                  <th className="px-4 py-2.5 font-medium">Nama</th>
                  <th className="px-4 py-2.5 font-medium">Quote</th>
                  <th className="px-4 py-2.5 font-medium">Status</th>
                  <th className="px-4 py-2.5 font-medium">Marquee</th>
                  <th className="px-4 py-2.5 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id} className="border-b border-neutral-50 last:border-0">
                    <td className="px-4 py-3 font-medium whitespace-nowrap">
                      {t.name} <span className="inline-flex items-center gap-0.5 text-amber-500">{Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="h-3 w-3 fill-amber-400 text-amber-400" />)}</span>
                    </td>
                    <td className="max-w-[360px] px-4 py-3">
                      <span className="line-clamp-2 text-neutral-600">{t.quote}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={t.status === "approved" ? "success" : t.status === "rejected" ? "destructive" : "secondary"}>{t.status}</Badge>
                    </td>
                    <td className="px-4 py-3">{t.isMarquee ? <Badge variant="outline" className="gap-1"><Megaphone className="h-3 w-3" />marquee</Badge> : <span className="text-xs text-neutral-400">—</span>}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <Button size="sm" variant="outline" onClick={() => setStatus(t.id, "approved")} className="h-7 gap-1 rounded-full px-2.5 text-xs">
                          <Check className="h-3 w-3" />
                          Approve
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setStatus(t.id, "rejected")} className="h-7 w-7 p-0">
                          <X className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" variant={t.isMarquee ? "default" : "secondary"} onClick={() => toggleMarquee(t.id, t.isMarquee)} className="h-7 w-7 p-0 rounded-full">
                          <Megaphone className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => del(t.id)} className="h-7 w-7 p-0 text-red-600 hover:bg-red-50">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid gap-3 p-3 md:hidden">
            {filtered.map((t) => (
              <div key={t.id} className="rounded-2xl border border-neutral-200 bg-white p-3 space-y-2.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm">{t.name}</span>
                  <Badge variant={t.status === "approved" ? "success" : t.status === "rejected" ? "destructive" : "secondary"}>{t.status}</Badge>
                  {t.isMarquee && <Badge variant="outline" className="gap-1"><Megaphone className="h-3 w-3" />marquee</Badge>}
                  <span className="inline-flex gap-0.5">{Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="h-3 w-3 fill-amber-400 text-amber-400" />)}</span>
                </div>
                <p className="text-sm leading-relaxed text-neutral-600">“{t.quote}”</p>
                <div className="flex gap-1.5 flex-wrap">
                  <Button size="sm" variant="outline" onClick={() => setStatus(t.id, "approved")} className="gap-1 rounded-full">
                    <Check className="h-3.5 w-3.5" />
                    Approve
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setStatus(t.id, "rejected")} className="gap-1 rounded-full">
                    <X className="h-3.5 w-3.5" />
                    Reject
                  </Button>
                  <Button size="sm" variant={t.isMarquee ? "default" : "secondary"} onClick={() => toggleMarquee(t.id, t.isMarquee)} className="gap-1 rounded-full">
                    <Megaphone className="h-3.5 w-3.5" /> Marquee
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => del(t.id)} className="text-red-600">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
