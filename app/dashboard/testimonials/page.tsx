"use client";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Megaphone, Check, X, Trash2, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

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
    } catch { toast.error("Gagal memuat"); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const setStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/testimonials/${id}/status`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    if (res.ok) { toast.success(status); load(); } else toast.error("Gagal");
  };
  const toggleMarquee = async (id: string, cur: boolean) => {
    const res = await fetch(`/api/testimonials/${id}/marquee`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isMarquee: !cur }) });
    if (res.ok) { toast.success(cur ? "Marquee dimatikan" : "Ditampilkan di marquee"); load(); } else toast.error("Gagal");
  };
  const del = async (id: string) => {
    if (!confirm("Hapus testimoni ini?")) return;
    const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Dihapus"); load(); } else toast.error("Gagal hapus");
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
          <p className="text-xs text-stone-500">{counts.pending} pending · {counts.approved} approved · {counts.rejected} rejected</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari nama / quote" className="h-9 w-[220px] pl-8" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {(["all", "pending", "approved", "rejected"] as const).map((k) => (
          <button key={k} onClick={() => setFilter(k)} className={`rounded-full px-3 py-1.5 text-xs font-medium border transition ${filter === k ? "bg-stone-900 text-white border-stone-900" : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"}`}>
            {k} ({counts[k]})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Card key={i} className="p-4"><Skeleton className="h-16 w-full" /></Card>)}</div>
      ) : filtered.length === 0 ? (
        <Card className="flex min-h-[140px] items-center justify-center border-dashed p-8 text-sm text-stone-500">Tidak ada testimoni untuk filter ini.</Card>
      ) : (
        <>
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Quote</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Marquee</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium whitespace-nowrap">{t.name} <span className="text-stone-500">★{t.rating}</span></TableCell>
                    <TableCell className="max-w-[360px]"><span className="line-clamp-2 text-stone-600">{t.quote}</span></TableCell>
                    <TableCell><Badge variant={t.status === "approved" ? "success" : t.status === "rejected" ? "destructive" : "secondary"}>{t.status}</Badge></TableCell>
                    <TableCell>{t.isMarquee ? <Badge variant="outline" className="gap-1"><Megaphone className="h-3 w-3" />marquee</Badge> : <span className="text-xs text-stone-400">—</span>}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Button size="sm" variant="outline" onClick={() => setStatus(t.id, "approved")} className="gap-1"><Check className="h-3.5 w-3.5" />Approve</Button>
                        <Button size="sm" variant="ghost" onClick={() => setStatus(t.id, "rejected")}><X className="h-3.5 w-3.5" /></Button>
                        <Button size="sm" variant={t.isMarquee ? "default" : "secondary"} onClick={() => toggleMarquee(t.id, t.isMarquee)}><Megaphone className="h-3.5 w-3.5" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => del(t.id)} className="text-red-600 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="grid gap-3 md:hidden">
            {filtered.map((t) => (
              <Card key={t.id} className="p-4 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm">{t.name}</span>
                  <Badge variant={t.status === "approved" ? "success" : t.status === "rejected" ? "destructive" : "secondary"}>{t.status}</Badge>
                  {t.isMarquee && <Badge variant="outline" className="gap-1"><Megaphone className="h-3 w-3" />marquee</Badge>}
                  <span className="text-xs text-stone-500">★{t.rating}</span>
                </div>
                <p className="text-sm text-stone-600">“{t.quote}”</p>
                <div className="flex gap-1.5 flex-wrap">
                  <Button size="sm" variant="outline" onClick={() => setStatus(t.id, "approved")} className="gap-1"><Check className="h-3.5 w-3.5" />Approve</Button>
                  <Button size="sm" variant="ghost" onClick={() => setStatus(t.id, "rejected")} className="gap-1"><X className="h-3.5 w-3.5" />Reject</Button>
                  <Button size="sm" variant={t.isMarquee ? "default" : "secondary"} onClick={() => toggleMarquee(t.id, t.isMarquee)} className="gap-1"><Megaphone className="h-3.5 w-3.5" /></Button>
                  <Button size="sm" variant="ghost" onClick={() => del(t.id)} className="text-red-600"><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
