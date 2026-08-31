"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowRight, Sparkles, Loader2, ShieldCheck, Zap, PenLine, Copy, Share2, Star, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { StrukCard } from "@/components/struk-card";
import { generateCopySchema, type Platform, type Tone } from "@/lib/contracts/copywriting";

const examples = [
  { name: "Keripik Singkong", desc: "500gr renyah tanpa pengawet 15rb", platform: "instagram" as Platform, tone: "ceria" as Tone, text: "Bestie! Keripik Singkong 500gr renyah tanpa pengawet — 15rb aja! Stok terbatas!\n\n#Kaligawe #UMKM #JajananViral #FYP" },
  { name: "Jamu Kunyit Asem", desc: "Segar, tanpa pemanis buatan", platform: "whatsapp" as Platform, tone: "santai" as Tone, text: "*Hai kak! Jamu Kunyit Asem segar tanpa pemanis buatan — siap kirim Kaligawe!*" },
  { name: "Batik Tulis Kaligawe", desc: "Motif khas, pewarna alami", platform: "tiktok" as Platform, tone: "formal" as Tone, text: "STOP SCROLL! Batik Tulis Kaligawe motif khas pewarna alami — cuma 30 detik lihat!\n\n#Kaligawe #UMKMKaligawe #FYP #BatikViral" },
];

function getSessionId() {
  if (typeof window === "undefined") return "ssr";
  let v = localStorage.getItem("sid");
  if (!v) { v = Math.random().toString(36).slice(2, 10); localStorage.setItem("sid", v); }
  return v;
}

export default function Home() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [highlights, setHighlights] = useState("");
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [tone, setTone] = useState<Tone>("santai");
  const [loading, setLoading] = useState(false);
  const [variants, setVariants] = useState<string[] | null>(null);
  const [sid, setSid] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<{ productName: string; variants: string[] }[]>([]);
  const [testimonials, setTestimonials] = useState<{ name: string; quote: string; rating: number }[]>([]);
  const [marquee, setMarquee] = useState<{ name: string; quote: string }[]>([]);
  const [tab, setTab] = useState("struk");
  const [fbOpen, setFbOpen] = useState(false);
  const [fbName, setFbName] = useState("");
  const [fbQuote, setFbQuote] = useState("");
  const [fbRating, setFbRating] = useState(5);

  useEffect(() => {
    try { setHistory(JSON.parse(localStorage.getItem("copy_history") || "[]")); } catch {}
    fetch("/api/testimonials").then((r) => r.json()).then((j) => j.data && setTestimonials(j.data)).catch(() => setTestimonials([
      { name: "Bu Siti", quote: "Copy-nya langsung laris di WA!", rating: 5 },
      { name: "Pak Joko", quote: "Biasa bingung caption IG, sekarang 30 detik jadi.", rating: 5 },
      { name: "Mbak Rina", quote: "Marketplace butuh judul SEO, dibantu banget.", rating: 4 },
    ]));
    fetch("/api/testimonials/marquee").then((r) => r.json()).then((j) => j.data && setMarquee(j.data)).catch(() => {});
    const sid = getSessionId();
    fetch("/api/analytics/hit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path: "/", sessionId: sid }) }).catch(() => {});
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = generateCopySchema.safeParse({ productName, description, highlights, platform, tone });
    if (!parsed.success) { setError(parsed.error.issues[0].message); return; }
    setLoading(true);
    setVariants(null);
    try {
      const res = await fetch("/api/generate-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Session-Id": getSessionId() },
        body: JSON.stringify(parsed.data),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.message || "Gagal");
      setVariants(j.data.variants);
      setSid(j.data.sessionId);
      const next = [{ productName, variants: j.data.variants }, ...history].slice(0, 5);
      setHistory(next);
      localStorage.setItem("copy_history", JSON.stringify(next));
      toast.success("3 varian tercetak!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mencetak";
      setError(msg);
      toast.error(msg);
    } finally { setLoading(false); }
  };

  const submitFeedback = async () => {
    if (fbName.trim().length < 2 || fbQuote.trim().length < 10) { toast.error("Nama ≥2, testimoni ≥10 karakter"); return; }
    const res = await fetch("/api/testimonials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: fbName, quote: fbQuote, rating: fbRating }) });
    if (res.ok) { toast.success("Terima kasih — menunggu persetujuan"); setFbOpen(false); setFbName(""); setFbQuote(""); }
    else toast.error("Gagal kirim testimoni");
  };

  return (
    <div className="bg-[#F5F0E6]">
      <section className="mx-auto max-w-6xl px-4 pt-6 sm:pt-10 pb-8">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] items-center">
          <div>
            <h1 className="mt-4 max-w-[18ch] text-[40px] font-bold leading-[0.92] tracking-[-0.03em] sm:text-[48px] lg:text-[54px] text-balance">
              Copy jualan <span className="font-serif italic font-normal text-[#8B2E1F]">siap-pakai</span> dalam 30 detik.
            </h1>
            <p className="mt-3 max-w-[42ch] text-[15px] leading-relaxed text-stone-600">Deskripsi singkat → 3 varian caption. Salin, tempel, jualan.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#buat-copy"><Button size="lg" className="gap-2">Buat copy sekarang <ArrowRight className="h-4 w-4" /></Button></a>
              <a href="#contoh"><Button size="lg" variant="outline">Lihat contoh</Button></a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-stone-600">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white border px-3 py-1"><ShieldCheck className="h-3.5 w-3.5" />Tanpa login</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white border px-3 py-1"><Zap className="h-3.5 w-3.5" />10/menit</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white border px-3 py-1"><PenLine className="h-3.5 w-3.5" />Groq + Gemini</span>
            </div>
          </div>
          <Card className="overflow-hidden border-stone-200">
            <div className="bg-stone-900 px-4 py-2 flex items-center justify-between">
              <span className="text-[10px] tracking-widest text-stone-400 font-mono">STRUK PREVIEW — 3 VARIAN</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <CardContent className="p-4 space-y-3 bg-[#FFFEFB]">
              {examples.map((ex, i) => (
                <div key={i} className="rounded-xl border border-stone-200 p-3 bg-white">
                  <div className="flex gap-1.5"><Badge variant="secondary" className="text-[10px]">{ex.platform}</Badge><Badge variant="outline" className="text-[10px]">{ex.tone}</Badge></div>
                  <p className="mt-2 font-mono text-[12.5px] leading-relaxed line-clamp-3">{ex.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="border-y border-stone-200 bg-white py-3 overflow-hidden">
        <div className="flex animate-[marquee_18s_linear_infinite] whitespace-nowrap hover:[animation-play-state:paused]">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mx-6 text-xs font-semibold tracking-[0.2em] text-stone-500">CURATED FOR INSTAGRAM · WHATSAPP · SHOPEE · POSTER</span>
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={`2-${i}`} className="mx-6 text-xs font-semibold tracking-[0.2em] text-stone-500">CURATED FOR INSTAGRAM · WHATSAPP · SHOPEE · POSTER</span>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { k: "01 MASALAH", t: "Bingung caption jualan tiap hari", d: "Foto produk ada, tapi kata-kata nggak jadi-jadi." },
            { k: "02 SOLUSI", t: "Isi 2 field → 3 varian langsung", d: "Pilih platform & nada, cetak struk siap tempel." },
            { k: "03 HASIL", t: "Salin, tempel, langsung jualan", d: "Tanpa login, 10/menit, fallback Groq→Gemini.", dark: true },
          ].map((b, i) => (
            <motion.div key={b.k} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className={`rounded-2xl border p-6 ${b.dark ? "bg-[#1A1A18] text-white border-[#1A1A18]" : "bg-white"}`}>
              <div className={`text-[10px] tracking-widest font-mono ${b.dark ? "text-amber-300" : "text-stone-400"}`}>{b.k}</div>
              <h3 className="mt-2 font-semibold">{b.t}</h3>
              <p className={`mt-1 text-sm ${b.dark ? "text-stone-300" : "text-stone-600"}`}>{b.d}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {["1 Isi produk", "2 Pilih platform", "3 Generate"].map((s) => (
            <span key={s} className="rounded-full bg-white border px-4 py-2 text-xs font-medium shadow-sm">{s}</span>
          ))}
        </div>
      </section>

      <section id="contoh" className="mx-auto max-w-6xl px-4 pb-10">
        <h2 className="text-lg font-semibold">Contoh hasil</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {examples.map((ex) => (
            <div key={ex.name} className="rounded-2xl border bg-white p-4 shadow-sm">
              <div className="font-medium text-sm">{ex.name}</div>
              <div className="text-xs text-stone-500">{ex.desc}</div>
              <Separator className="my-3" />
              <p className="font-mono text-xs leading-relaxed whitespace-pre-wrap bg-[#FFFEFB] rounded-xl border border-dashed p-3">{ex.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="buat-copy" className="mx-auto max-w-6xl px-4 pb-10">
        <div className="grid gap-6 lg:grid-cols-[0.96fr_1.04fr]">
          <Card className="p-6">
            <h2 className="font-semibold">Buat copy</h2>
            <p className="text-xs text-stone-500">Hasil menyesuaikan platform & nada</p>
            <form onSubmit={submit} className="mt-4 space-y-4">
              <div>
                <Label>Nama produk *</Label>
                <Input value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Keripik Singkong Original" maxLength={60} />
                <p className="mt-1 text-[11px] text-stone-500">Maks 60</p>
              </div>
              <div>
                <Label>Deskripsi singkat *</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Keripik singkong 500gr, renyah, tanpa pengawet, harga 15rb..." rows={3} maxLength={500} />
                <p className="mt-1 text-[11px] text-stone-500">{description.length}/500 — minimal 20</p>
              </div>
              <div>
                <Label>Keunggulan (opsional)</Label>
                <Input value={highlights} onChange={(e) => setHighlights(e.target.value)} placeholder="tanpa pengawet, 500gr" maxLength={200} />
                <p className="mt-1 text-[11px] text-stone-500">Maks 200</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Platform *</Label>
                  <select value={platform} onChange={(e) => setPlatform(e.target.value as Platform)} className="flex h-10 w-full rounded-xl border border-stone-200 bg-white px-3 text-sm">
                    <option value="instagram">Instagram</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="tiktok">TikTok</option>
                    <option value="facebook">Facebook</option>
                  </select>
                </div>
                <div>
                  <Label>Nada *</Label>
                  <select value={tone} onChange={(e) => setTone(e.target.value as Tone)} className="flex h-10 w-full rounded-xl border border-stone-200 bg-white px-3 text-sm">
                    <option value="santai">Santai</option>
                    <option value="formal">Formal</option>
                    <option value="persuasif">Persuasif</option>
                    <option value="ceria">Ceria</option>
                  </select>
                </div>
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Gagal mencetak</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" disabled={loading} className="w-full gap-2">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />} {loading ? "Mencetak 3 struk…" : "Cetak 3 varian — Gratis"}
              </Button>
              {loading && <p className="text-center text-xs text-stone-500">Groq → Gemini fallback</p>}
            </form>
          </Card>

          <Card className="p-4">
            <Tabs defaultValue="struk" value={tab} onValueChange={setTab}>
              <TabsList><TabsTrigger value="struk">Struk</TabsTrigger><TabsTrigger value="hp">Preview HP</TabsTrigger></TabsList>
              <TabsContent value="struk">
                {loading ? (
                  <div className="space-y-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-40 w-full" />)}</div>
                ) : variants ? (
                  <div className="space-y-3">
                    {sid && <div className="text-[10px] font-mono text-stone-400">sid: {sid.slice(0, 8)}</div>}
                    {variants.map((v, i) => <StrukCard key={i} idx={i} text={v} platform={platform} tone={tone} />)}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed p-8 text-center text-sm text-stone-500">Isi form → 3 struk akan tercetak di sini</div>
                )}
              </TabsContent>
              <TabsContent value="hp">
                <div className="mx-auto w-[320px] rounded-[28px] border-[7px] border-stone-900 bg-white shadow-xl overflow-hidden">
                  <div className="h-6 bg-stone-900 flex justify-center items-start pt-1"><div className="h-2 w-20 rounded-full bg-stone-700" /></div>
                  <div className="p-3 space-y-2 min-h-[420px] bg-stone-50">
                    {(variants ?? examples.map((e) => e.text)).slice(0, 3).map((t, i) => (
                      <div key={i} className={`rounded-2xl p-3 text-xs leading-relaxed ${platform === "whatsapp" ? "bg-[#dcf8c6] ml-6" : "bg-white border shadow-sm"}`}>
                        {t.slice(0, 180)}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </section>

      {history.length > 0 && (
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
      )}

      <section className="mx-auto max-w-6xl px-4 pb-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Testimoni</h3>
          <Button size="sm" variant="outline" onClick={() => setFbOpen(true)}>Beri testimoni</Button>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {testimonials.slice(0, 6).map((t, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center gap-2">
                <img src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${encodeURIComponent(t.name)}`} alt={t.name} className="h-8 w-8 rounded-full bg-stone-100" />
                <span className="text-sm font-medium">{t.name}</span>
                <span className="ml-auto flex gap-0.5">{Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}</span>
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
              <span key={i} className="mx-6 inline-flex items-center gap-2 text-sm"><Megaphone className="h-4 w-4 text-amber-600" />“{m.quote}” — {m.name}</span>
            ))}
          </div>
        </div>
      )}

      {fbOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setFbOpen(false)} />
          <Card className="relative z-10 w-full max-w-md p-6">
            <h3 className="font-semibold">Beri testimoni</h3>
            <p className="text-xs text-stone-500">Akan tampil setelah disetujui admin</p>
            <div className="mt-4 space-y-3">
              <div><Label>Nama</Label><Input value={fbName} onChange={(e) => setFbName(e.target.value)} placeholder="Nama" /></div>
              <div><Label>Testimoni</Label><Textarea value={fbQuote} onChange={(e) => setFbQuote(e.target.value)} placeholder="Minimal 10 karakter" /></div>
              <div><Label>Rating</Label>
                <div className="flex gap-1">{[1, 2, 3, 4, 5].map((n) => <button key={n} onClick={() => setFbRating(n)} className={`h-8 w-8 rounded-full border ${fbRating >= n ? "bg-amber-400 border-amber-400" : "bg-white"}`}><Star className={`mx-auto h-4 w-4 ${fbRating >= n ? "fill-white text-white" : "text-stone-300"}`} /></button>)}</div>
              </div>
              <div className="flex gap-2"><Button variant="outline" className="flex-1" onClick={() => setFbOpen(false)}>Batal</Button><Button className="flex-1" onClick={submitFeedback}>Kirim</Button></div>
            </div>
          </Card>
        </div>
      )}

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h3 className="font-semibold">FAQ</h3>
        <div className="mt-3 rounded-2xl bg-white border divide-y">
          {[
            ["Gratis?", "Ya, gratis untuk pedagang Kaligawe. Rate-limit 10/menit."],
            ["Perlu login?", "Tidak. Tanpa login, langsung pakai."],
              ["Platform apa saja?", "Instagram (hashtag 5-10), WhatsApp (*bold* CTAs), TikTok (#FYP hook), Facebook (cerita)."],
          ].map(([q, a]) => (
            <details key={q} className="p-4 group">
              <summary className="flex justify-between cursor-pointer text-sm font-medium list-none">{q}<span className="text-stone-400 group-open:rotate-180">⌄</span></summary>
              <p className="pt-2 text-sm text-stone-600">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
