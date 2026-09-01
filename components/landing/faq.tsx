export function LandingFaq() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h3 className="font-semibold">FAQ</h3>
      <div className="mt-3 rounded-2xl bg-white border divide-y">
        {[
          ["Gratis?", "Ya, gratis untuk pedagang Kaligawe. Rate-limit 10/menit."],
          ["Perlu login?", "Tidak. Tanpa login, langsung pakai."],
          ["Platform apa saja?", "Instagram (hashtag 5-10), WhatsApp (*bold* CTAs), TikTok (#FYP hook), Facebook (cerita)."],
        ].map(([q, a]) => (
          <details key={q} className="p-4 group">
            <summary className="flex justify-between cursor-pointer text-sm font-medium list-none">
              {q}
              <span className="text-stone-400 group-open:rotate-180">⌄</span>
            </summary>
            <p className="pt-2 text-sm text-stone-600">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
