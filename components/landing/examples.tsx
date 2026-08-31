import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { HERO_EXAMPLES } from "./hero";

const DATA = HERO_EXAMPLES.map((e) => ({
  name: e.platform === "instagram" ? "Keripik Singkong" : e.platform === "whatsapp" ? "Jamu Kunyit Asem" : "Batik Tulis Kaligawe",
  desc: e.platform === "instagram" ? "500gr renyah tanpa pengawet 15rb" : e.platform === "whatsapp" ? "Segar, tanpa pemanis buatan" : "Motif khas, pewarna alami",
  text: e.text,
}));

export function LandingExamples() {
  return (
    <section id="contoh" className="mx-auto max-w-6xl px-4 pb-10">
      <h2 className="text-lg font-semibold">Contoh hasil</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {DATA.map((ex) => (
          <div key={ex.name} className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="font-medium text-sm">{ex.name}</div>
            <div className="text-xs text-stone-500">{ex.desc}</div>
            <Separator className="my-3" />
            <p className="font-mono text-xs leading-relaxed whitespace-pre-wrap bg-[#FFFEFB] rounded-xl border border-dashed p-3">{ex.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
