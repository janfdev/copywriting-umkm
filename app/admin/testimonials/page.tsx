"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Megaphone, Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type T = { id: string; name: string; quote: string; rating: number; status: string; isMarquee: boolean };

export default function AdminTestimonials() {
  const [items, setItems] = useState<T[]>([]);
  const load = () => fetch("/api/testimonials/admin").then((r) => r.json()).then((j) => setItems(j.data ?? [])).catch(() => {});
  useEffect(() => { load(); }, []);

  const setStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/testimonials/${id}/status`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    if (res.ok) { toast.success(status); load(); } else toast.error("Gagal");
  };
  const toggleMarquee = async (id: string, cur: boolean) => {
    const res = await fetch(`/api/testimonials/${id}/marquee`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isMarquee: !cur }) });
    if (res.ok) load();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Testimonials</h1>
      <div className="grid gap-3">
        {items.map((t) => (
          <Card key={t.id} className="p-4 flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[200px]">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{t.name}</span>
                <Badge variant={t.status === "approved" ? "success" : t.status === "rejected" ? "destructive" : "secondary"}>{t.status}</Badge>
                {t.isMarquee && <Badge variant="outline" className="gap-1"><Megaphone className="h-3 w-3" />marquee</Badge>}
              </div>
              <p className="text-sm text-stone-600 mt-1">“{t.quote}” · ★{t.rating}</p>
            </div>
            <div className="flex gap-1.5">
              <Button size="sm" variant="outline" onClick={() => setStatus(t.id, "approved")} className="gap-1"><Check className="h-3.5 w-3.5" />Approve</Button>
              <Button size="sm" variant="ghost" onClick={() => setStatus(t.id, "rejected")} className="gap-1"><X className="h-3.5 w-3.5" />Reject</Button>
              <Button size="sm" variant={t.isMarquee ? "default" : "secondary"} onClick={() => toggleMarquee(t.id, t.isMarquee)} className="gap-1"><Megaphone className="h-3.5 w-3.5" /></Button>
            </div>
          </Card>
        ))}
        {items.length === 0 && <p className="text-sm text-stone-500">Belum ada testimoni</p>}
      </div>
    </div>
  );
}
