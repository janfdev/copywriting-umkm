"use client";
import { useEffect, useState } from "react";
import { LandingHero } from "@/components/landing/hero";
import { MarqueeBar } from "@/components/landing/marquee-bar";
import { LandingBento } from "@/components/landing/bento";
import { LandingExamples } from "@/components/landing/examples";
import { LandingGenerator } from "@/components/landing/generator";
import { LandingHistory, LandingTestimonials, LandingFaq } from "@/components/landing/history-and-testimonials";

export default function Home() {
  const [history, setHistory] = useState<{ productName: string; variants: string[] }[]>([]);
  const [testimonials, setTestimonials] = useState<{ name: string; quote: string; rating: number }[]>([]);
  const [marquee, setMarquee] = useState<{ name: string; quote: string }[]>([]);

  useEffect(() => {
    try {
      setHistory(JSON.parse(localStorage.getItem("copy_history") || "[]"));
    } catch {}
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((j) => j.data && setTestimonials(j.data))
      .catch(() =>
        setTestimonials([
          { name: "Bu Siti", quote: "Copy-nya langsung laris di WA!", rating: 5 },
          { name: "Pak Joko", quote: "Biasa bingung caption IG, sekarang 30 detik jadi.", rating: 5 },
          { name: "Mbak Rina", quote: "Marketplace butuh judul SEO, dibantu banget.", rating: 4 },
        ]),
      );
    fetch("/api/testimonials/marquee")
      .then((r) => r.json())
      .then((j) => j.data && setMarquee(j.data))
      .catch(() => {});
    const sid = localStorage.getItem("sid") || Math.random().toString(36).slice(2, 10);
    if (!localStorage.getItem("sid")) localStorage.setItem("sid", sid);
    fetch("/api/analytics/hit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path: "/", sessionId: sid }) }).catch(() => {});
  }, []);

  return (
    <div className="bg-[#F5F0E6]">
      <LandingHero />
      <MarqueeBar text="CURATED FOR INSTAGRAM · WHATSAPP · TIKTOK · FACEBOOK" />
      <LandingBento />
      <LandingExamples />
      <LandingGenerator history={history} onNewHistory={setHistory} />
      <LandingHistory history={history} />
      <LandingTestimonials testimonials={testimonials} marquee={marquee} />
      <LandingFaq />
    </div>
  );
}
