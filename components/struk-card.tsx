"use client";
import { Copy, Share2, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function StrukCard({ idx, text, platform, tone }: { idx: number; text: string; platform: string; tone: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const share = async () => {
    if (navigator.share) await navigator.share({ text }).catch(() => {});
    else await copy();
  };
  return (
    <div className="relative overflow-hidden rounded-xl border border-stone-200 bg-[#FFFEFB] shadow-sm">
      <div className="h-1 w-full bg-gradient-to-r from-[#C45A3C] to-[#D4A84B]" />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-widest text-stone-400">VARIAN 0{idx + 1}</span>
          <span className="rounded-full border border-dashed border-stone-300 px-2 py-0.5 text-[10px] font-mono tracking-widest">TERCETAK</span>
        </div>
        <div className="mt-2 flex gap-1.5">
          <Badge variant="secondary" className="text-[10px]">{platform}</Badge>
          <Badge variant="outline" className="text-[10px]">{tone}</Badge>
        </div>
        <p className="mt-3 whitespace-pre-wrap font-mono text-[12.5px] leading-relaxed text-stone-800">{text}</p>
        <div className="mt-4 flex gap-2">
          <Button size="sm" variant="outline" onClick={copy} className="gap-1.5 text-xs">{copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}{copied ? "Tersalin!" : "Salin"}</Button>
          <Button size="sm" variant="ghost" onClick={share} className="gap-1.5 text-xs"><Share2 className="h-3.5 w-3.5" />Bagikan</Button>
        </div>
      </div>
      <div className="h-3 w-full bg-[radial-gradient(circle,_transparent_6px,_#F5F0E6_6px)] bg-[length:16px_16px] bg-repeat-x opacity-60" />
    </div>
  );
}
