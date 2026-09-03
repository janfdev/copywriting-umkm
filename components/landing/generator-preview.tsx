"use client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { StrukCard } from "@/components/struk-card";
import { HERO_EXAMPLES } from "./hero";
import type { Platform, Tone } from "@/lib/contracts/copywriting";

type Props = {
  tab: string;
  setTab: (v: string) => void;
  loading: boolean;
  variants: string[] | null;
  platform: Platform;
  tone: Tone;
};

export function GeneratorPreview({ tab, setTab, loading, variants, platform, tone }: Props) {
  return (
    <Card className="p-4">
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="struk">Struk</TabsTrigger>
          <TabsTrigger value="hp">Lihat di HP</TabsTrigger>
        </TabsList>
        <TabsContent value="struk">
          {loading ? (
            <div className="space-y-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-40 w-full" />)}</div>
          ) : variants ? (
            <div className="space-y-3">
              {variants.map((v, i) => <StrukCard key={i} idx={i} text={v} platform={platform} tone={tone} />)}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed p-8 text-center text-sm text-stone-500">Isi formulir → 3 struk akan tercetak di sini</div>
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
  );
}
