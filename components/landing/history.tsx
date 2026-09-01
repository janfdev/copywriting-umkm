"use client";

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
