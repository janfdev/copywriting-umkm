export function MarqueeBar({ text = "BUAT JUALAN DI INSTAGRAM · WHATSAPP · TIKTOK · FACEBOOK" }: { text?: string }) {
  return (
    <div className="border-y border-stone-200 bg-white py-3 overflow-hidden">
      <div className="flex animate-[marquee_18s_linear_infinite] whitespace-nowrap hover:[animation-play-state:paused]">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="mx-6 text-xs font-semibold tracking-[0.2em] text-stone-500">
            {text}
          </span>
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={`2-${i}`} className="mx-6 text-xs font-semibold tracking-[0.2em] text-stone-500">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
