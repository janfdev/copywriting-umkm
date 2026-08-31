"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { StrukCard } from "@/components/struk-card";
import { HERO_EXAMPLES } from "./hero";
import { generateCopySchema, type Platform, type Tone } from "@/lib/contracts/copywriting";

function getSessionId() {
  if (typeof window === "undefined") return "ssr";
  let v = localStorage.getItem("sid");
  if (!v) {
    v = Math.random().toString(36).slice(2, 10);
    localStorage.setItem("sid", v);
  }
  return v;
}

export function LandingGenerator({
  history,
  onNewHistory,
}: {
  history: { productName: string; variants: string[] }[];
  onNewHistory: (next: { productName: string; variants: string[] }[]) => void;
}) {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [highlights, setHighlights] = useState("");
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [tone, setTone] = useState<Tone>("santai");
  const [loading, setLoading] = useState(false);
  const [variants, setVariants] = useState<string[] | null>(null);
  const [sid, setSid] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState("struk");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = generateCopySchema.safeParse({ productName, description, highlights, platform, tone });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
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
      onNewHistory(next);
      localStorage.setItem("copy_history", JSON.stringify(next));
      toast.success("3 varian tercetak!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mencetak";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
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
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="struk">Struk</TabsTrigger>
              <TabsTrigger value="hp">Preview HP</TabsTrigger>
            </TabsList>
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
                <div className="h-6 bg-stone-900 flex justify-center items-start pt-1">
                  <div className="h-2 w-20 rounded-full bg-stone-700" />
                </div>
                <div className="p-3 space-y-2 min-h-[420px] bg-stone-50">
                  {(variants ?? HERO_EXAMPLES.map((e) => e.text)).slice(0, 3).map((t, i) => (
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
  );
}
