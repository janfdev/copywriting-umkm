"use client";
import { useState } from "react";
import { toast } from "sonner";
import { GeneratorForm } from "./generator-form";
import { GeneratorPreview } from "./generator-preview";
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
      const msg = parsed.error.issues[0].message;
      setError(msg);
      toast.error(msg, { description: "Perbaiki field yang ditandai" });
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
      localStorage.setItem("caption_history", JSON.stringify(next));
      toast.success("3 varian tercetak!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mencetak";
      setError(msg);
      toast.error(msg, { 
        description: res.ok ? "Coba lagi dalam 1 menit" : "Periksa koneksi internet" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="buat-caption" className="mx-auto max-w-6xl px-4 pb-10">
      <div className="grid gap-6 lg:grid-cols-[0.96fr_1.04fr]">
        <GeneratorForm
          productName={productName}
          setProductName={setProductName}
          description={description}
          setDescription={setDescription}
          highlights={highlights}
          setHighlights={setHighlights}
          platform={platform}
          setPlatform={setPlatform}
          tone={tone}
          setTone={setTone}
          loading={loading}
          error={error}
          onSubmit={submit}
        />
        <GeneratorPreview tab={tab} setTab={setTab} loading={loading} variants={variants} sid={sid} platform={platform} tone={tone} />
      </div>
    </section>
  );
}
