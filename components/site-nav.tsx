"use client";
import Link from "next/link";
import { Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/60 bg-[#F5F0E6]/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C45A3C] text-sm font-bold text-white">K</span>
          <span className="hidden sm:inline text-sm font-semibold tracking-tight">Kaligawe · Asisten Copy</span>
          <span className="ml-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold tracking-widest text-stone-600 border">DEMO KKM</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 rounded-full bg-white p-1 shadow-sm border">
          <a href="/#contoh" className="rounded-full px-3 py-1 text-xs font-medium hover:bg-stone-100">Contoh</a>
          <a href="/#buat-copy" className="rounded-full px-3 py-1 text-xs font-medium hover:bg-stone-100">Buat Copy</a>
          <Link href="/admin/analytics" className="rounded-full px-3 py-1 text-xs font-medium hover:bg-stone-100 inline-flex items-center gap-1"><ShieldCheck className="h-3 w-3" />Admin</Link>
        </nav>
        <a href="/#buat-copy">
          <Button size="sm" className="gap-1.5"><Sparkles className="h-4 w-4" />Buat copy</Button>
        </a>
      </div>
    </header>
  );
}
