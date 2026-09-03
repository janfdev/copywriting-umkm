import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Platform, Tone } from "@/lib/contracts/copywriting";

const PREVIEW: { platform: Platform; tone: Tone; text: string }[] = [
  { platform: "instagram", tone: "ceria", text: "Bestie! Keripik Singkong 500gr renyah tanpa pengawet — 15rb aja! Stok terbatas!\n\n#Kaligawe #UMKM #JajananViral #FYP" },
  { platform: "whatsapp", tone: "santai", text: "*Hai kak! Jamu Kunyit Asem segar tanpa pemanis buatan — siap kirim Kaligawe!*" },
  { platform: "tiktok", tone: "formal", text: "Perkenalkan Batik Tulis Kaligawe — motif khas, pewarna alami, katun primis halus.\n\n#Kaligawe #UMKMKaligawe #BatikTulis" },
];

export function LandingHero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-6 sm:pt-10 pb-8">
      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] items-center">
        <div>
          <h1 className="mt-4 max-w-[18ch] text-[40px] font-bold leading-[0.92] tracking-[-0.03em] sm:text-[48px] lg:text-[54px] text-balance">
            Caption jualan <span className="font-serif italic font-normal text-[#8B2E1F]">siap-pakai</span> dalam 30 detik.
          </h1>
          <p className="mt-3 max-w-[42ch] text-[15px] leading-relaxed text-stone-600">Deskripsi singkat → 3 varian caption. Salin, tempel, jualan.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="#buat-caption">
              <Button size="lg" className="gap-2">
                Buat caption sekarang <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#contoh">
              <Button size="lg" variant="outline">
                Lihat contoh
              </Button>
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-xs text-stone-600">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border px-3 py-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              Tanpa login
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border px-3 py-1">
              <Zap className="h-3.5 w-3.5" />
              Gratis 10x/menit
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border px-3 py-1">
              <PenLine className="h-3.5 w-3.5" />
              Didukung AI
            </span>
          </div>
        </div>
        <Card className="overflow-hidden border-stone-200">
          <div className="bg-stone-900 px-4 py-2 flex items-center justify-between">
            <span className="text-[10px] tracking-widest text-stone-400 font-mono">CONTOH HASIL — 3 VARIAN</span>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <CardContent className="p-4 space-y-3 bg-[#FFFEFB]">
            {PREVIEW.map((ex, i) => (
              <div key={i} className="rounded-xl border border-stone-200 p-3 bg-white">
                <div className="flex gap-1.5">
                  <Badge variant="secondary" className="text-[10px]">
                    {ex.platform}
                  </Badge>
                  <Badge variant="outline" className="text-[10px]">
                    {ex.tone}
                  </Badge>
                </div>
                <p className="mt-2 font-mono text-[12.5px] leading-relaxed line-clamp-3">{ex.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export const HERO_EXAMPLES = PREVIEW;
