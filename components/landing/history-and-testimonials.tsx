"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Star, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function LandingHistory({ history }: { history: { productName: string; variants: string[] }[] }) {
  if (history.length === 0) return null;
  return (
    <section className="mx-auto max-w-6xl px-4 pb-6">
      <h3 className="text-sm font-semibold">Riwayat (5 terbaru)</h3>
      <div className="mt-2 grid gap-2">
        {history.map((h, i) => (
          <div key={i} className="rounded-xl bg-white border p-3 flex items-center justify-between">
            <span className="text-sm font-medium">{h.productName}</span>
            <span className="text-xs text-stone-500">{h.variants.length} varian</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function LandingTestimonials({
  testimonials,
  marquee,
}: {
  testimonials: { name: string; quote: string; rating: number }[];
  marquee: { name: string; quote: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(5);

  const submit = async () => {
    if (name.trim().length < 2 || quote.trim().length < 10) {
      toast.error("Nama ≥2, testimoni ≥10 karakter");
      return;
    }
    const res = await fetch("/api/testimonials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, quote, rating }) });
    if (res.ok) {
      toast.success("Terima kasih — menunggu persetujuan");
      setOpen(false);
      setName("");
      setQuote("");
    } else toast.error("Gagal kirim testimoni");
  };

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Testimoni</h3>
          <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
            Beri testimoni
          </Button>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {testimonials.slice(0, 6).map((t, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center gap-2">
                <img src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${encodeURIComponent(t.name)}`} alt={t.name} className="h-8 w-8 rounded-full bg-stone-100" />
                <span className="text-sm font-medium">{t.name}</span>
                <span className="ml-auto flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
                </span>
              </div>
              <p className="mt-2 text-sm text-stone-600">“{t.quote}”</p>
            </Card>
          ))}
        </div>
      </section>

      {marquee.length > 0 && (
        <div className="bg-amber-50 border-y border-amber-200 py-3 overflow-hidden">
          <div className="flex animate-[marquee_18s_linear_infinite] whitespace-nowrap hover:[animation-play-state:paused]">
            {marquee.concat(marquee).map((m, i) => (
              <span key={i} className="mx-6 inline-flex items-center gap-2 text-sm">
                <Megaphone className="h-4 w-4 text-amber-600" />“{m.quote}” — {m.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <Card className="relative z-10 w-full max-w-md p-6">
            <h3 className="font-semibold">Beri testimoni</h3>
            <p className="text-xs text-stone-500">Akan tampil setelah disetujui admin</p>
            <div className="mt-4 space-y-3">
              <div>
                <Label>Nama</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama" />
              </div>
              <div>
                <Label>Testimoni</Label>
                <Textarea value={quote} onChange={(e) => setQuote(e.target.value)} placeholder="Minimal 10 karakter" />
              </div>
              <div>
                <Label>Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} onClick={() => setRating(n)} className={`h-8 w-8 rounded-full border ${rating >= n ? "bg-amber-400 border-amber-400" : "bg-white"}`}>
                      <Star className={`mx-auto h-4 w-4 ${rating >= n ? "fill-white text-white" : "text-stone-300"}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                  Batal
                </Button>
                <Button className="flex-1" onClick={submit}>
                  Kirim
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

export function LandingFaq() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h3 className="font-semibold">FAQ</h3>
      <div className="mt-3 rounded-2xl bg-white border divide-y">
        {[
          ["Gratis?", "Ya, gratis untuk pedagang Kaligawe. Rate-limit 10/menit."],
          ["Perlu login?", "Tidak. Tanpa login, langsung pakai."],
          ["Platform apa saja?", "Instagram (hashtag 5-10), WhatsApp (*bold* CTAs), TikTok (#FYP hook), Facebook (cerita)."],
        ].map(([q, a]) => (
          <details key={q} className="p-4 group">
            <summary className="flex justify-between cursor-pointer text-sm font-medium list-none">
              {q}
              <span className="text-stone-400 group-open:rotate-180">⌄</span>
            </summary>
            <p className="pt-2 text-sm text-stone-600">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
