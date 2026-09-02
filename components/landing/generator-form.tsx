"use client";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Platform, Tone } from "@/lib/contracts/copywriting";

type Props = {
  productName: string;
  setProductName: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  highlights: string;
  setHighlights: (v: string) => void;
  platform: Platform;
  setPlatform: (v: Platform) => void;
  tone: Tone;
  setTone: (v: Tone) => void;
  loading: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
};

export function GeneratorForm({ productName, setProductName, description, setDescription, highlights, setHighlights, platform, setPlatform, tone, setTone, loading, error, onSubmit }: Props) {
  const nameError = error?.toLowerCase().includes("produk") || error?.toLowerCase().includes("2");
  const descError = error?.toLowerCase().includes("deskripsi") || error?.toLowerCase().includes("20");
  return (
    <Card className="p-6">
      <h2 className="font-semibold">Buat caption</h2>
      <p className="text-xs text-stone-500">Hasil menyesuaikan platform & nada</p>
      <form onSubmit={onSubmit} className="mt-4 space-y-4">
        <div>
          <Label className={nameError ? "text-red-600" : ""}>Nama produk *</Label>
          <Input 
            value={productName} 
            onChange={(e) => setProductName(e.target.value)} 
            placeholder="Keripik Singkong Original" 
            maxLength={60}
            className={nameError ? "border-red-500 focus:border-red-500 ring-1 ring-red-500" : ""}
          />
          <p className={`mt-1 text-[11px] ${nameError ? "text-red-500 font-medium" : "text-stone-500"}`}>
            {productName.length}/60 — {productName.length < 2 ? "minimal 2 karakter" : productName.length > 60 ? "maksimal 60" : "ok"}
          </p>
        </div>
        <div>
          <Label className={descError ? "text-red-600" : ""}>Deskripsi singkat *</Label>
          <Textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Keripik singkong 500gr, renyah, tanpa pengawet, harga 15rb..." 
            rows={3} 
            maxLength={500}
            className={descError ? "border-red-500 focus:border-red-500 ring-1 ring-red-500" : ""}
          />
          <p className={`mt-1 text-[11px] ${descError ? "text-red-500 font-medium" : "text-stone-500"}`}>
            {description.length}/500 — {description.length < 20 ? `minimal 20 (${description.length})` : "ok"}
          </p>
        </div>
        <div>
          <Label>Keunggulan (opsional)</Label>
          <Input value={highlights} onChange={(e) => setHighlights(e.target.value)} placeholder="tanpa pengawet, 500gr" maxLength={200} />
          <p className="mt-1 text-[11px] text-stone-500">{highlights.length}/200</p>
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
  );
}
