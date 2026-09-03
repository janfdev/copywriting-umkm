"use client";
import { motion } from "framer-motion";

const ITEMS = [
  { k: "01 MASALAH", t: "Bingung caption jualan tiap hari", d: "Foto produk ada, tapi kata-kata nggak jadi-jadi." },
  { k: "02 SOLUSI", t: "Isi 2 field → 3 varian langsung", d: "Pilih platform & nada, cetak struk siap tempel." },
  { k: "03 HASIL", t: "Salin, tempel, langsung jualan", d: "Tanpa login, gratis 10x/menit, otomatis pakai AI terbaik.", dark: true },
];

export function LandingBento() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-4 md:grid-cols-3">
        {ITEMS.map((b, i) => (
          <motion.div key={b.k} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className={`rounded-2xl border p-6 ${b.dark ? "bg-[#1A1A18] text-white border-[#1A1A18]" : "bg-white"}`}>
            <div className={`text-[10px] tracking-widest font-mono ${b.dark ? "text-amber-300" : "text-stone-400"}`}>{b.k}</div>
            <h3 className="mt-2 font-semibold">{b.t}</h3>
            <p className={`mt-1 text-sm ${b.dark ? "text-stone-300" : "text-stone-600"}`}>{b.d}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {["1 Isi produk", "2 Pilih platform", "3 Cetak"].map((s) => (
          <span key={s} className="rounded-full bg-white border px-4 py-2 text-xs font-medium shadow-sm">
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}
