"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";

const LINKS = [
  { href: "/#contoh", label: "Contoh" },
  { href: "/#buat-caption", label: "Buat Caption" },
  { href: "/about", label: "Tentang" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/60 bg-[#F5F0E6]/80 backdrop-blur supports-[backdrop-filter]:bg-[#F5F0E6]/70">
      <div className="mx-auto flex h-[56px] max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C45A3C] text-sm font-bold text-white">{BRAND.logoLetter}</span>
          <span className="text-sm font-semibold tracking-tight">{BRAND.name}</span>
          <span className="hidden sm:inline-flex rounded-full border border-stone-200 bg-white px-2 py-0.5 text-[10px] font-semibold tracking-widest text-stone-500">KKM</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="rounded-full px-3 py-1.5 text-sm text-stone-600 hover:bg-white hover:text-stone-900 transition">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/#buat-caption" className="hidden sm:inline-flex">
            <Button size="sm" className="gap-1.5 rounded-full">
              <Sparkles className="h-3.5 w-3.5" /> Buat Caption
            </Button>
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl border border-stone-200 bg-white"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-stone-200 bg-[#F5F0E6] px-4 py-3 space-y-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-white"
            >
              {l.label}
            </a>
          ))}
          <Link href="/#buat-caption" onClick={() => setOpen(false)} className="flex">
              <Button size="sm" className="w-full gap-1.5 rounded-full mt-1">
                <Sparkles className="h-3.5 w-3.5" /> Buat Caption
              </Button>
            </Link>
        </div>
      )}
    </header>
  );
}
