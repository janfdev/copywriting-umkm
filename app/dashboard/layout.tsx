"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, BarChart3, MessageSquare, Home, Sparkles, LogOut, ChevronDown, Search } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { Logo } from "@/components/logo";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/testimonials", label: "Testimonials", icon: MessageSquare },
];

function NavLink({ href, label, Icon, active }: { href: string; label: string; Icon: React.ElementType; active: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-[13px] transition-colors ${active ? "bg-neutral-900 text-white font-medium border border-neutral-800 shadow-sm" : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 border border-transparent"}`}
    >
      <span className={`flex h-6 w-6 items-center justify-center rounded-md border ${active ? "bg-neutral-800 border-neutral-700 text-white" : "bg-white border-neutral-200 text-neutral-400"}`}>
        <Icon size={13} strokeWidth={2} />
      </span>
      <span className="truncate">{label}</span>
    </Link>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [q, setQ] = useState("");
  const crumbs = pathname === "/dashboard" ? ["Dashboard", "Overview"] : pathname.startsWith("/dashboard/analytics") ? ["Dashboard", "Analytics"] : pathname.startsWith("/dashboard/testimonials") ? ["Dashboard", "Testimonials"] : ["Dashboard", "Overview"];

  return (
    <div className="min-h-screen w-full bg-[#f8f8f7] text-neutral-900">
      <div className="flex min-h-screen w-full items-stretch">
        <motion.aside
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="hidden md:flex w-[248px] shrink-0 flex-col border-r border-neutral-200 bg-white p-3 sticky top-0 h-[100vh]"
        >
          <Link href="/" className="flex items-center gap-2.5 px-1.5 py-1 mb-3">
            <Logo />
            <span className="min-w-0">
              <span className="block text-sm font-semibold leading-none tracking-tight">{BRAND.name}</span>
              <span className="block text-[11px] text-neutral-500 leading-none mt-0.5">Asisten Caption UMKM</span>
            </span>
          </Link>

          <div className="space-y-1">
            <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400">Menu</p>
            {NAV.map((n) => (
              <NavLink
                key={n.href}
                href={n.href}
                label={n.label}
                Icon={n.icon}
                active={n.exact ? pathname === n.href : pathname.startsWith(n.href)}
              />
            ))}
          </div>

          <div className="mt-4 space-y-1">
            <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400">Lainnya</p>
            <Link href="/" className="flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-[13px] text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 border border-transparent">
              <span className="flex h-6 w-6 items-center justify-center rounded-md border bg-white border-neutral-200 text-neutral-400">
                <Home size={13} strokeWidth={2} />
              </span>
              Beranda
            </Link>
            <a href="/#buat-caption" className="flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-[13px] text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 border border-transparent">
              <span className="flex h-6 w-6 items-center justify-center rounded-md border bg-white border-neutral-200 text-neutral-400">
                <Sparkles size={13} strokeWidth={2} />
              </span>
              Buat caption
            </a>
          </div>

          <div className="mt-auto border-t border-neutral-100 pt-3">
            <div className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 px-2.5 py-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-neutral-200 text-xs font-semibold">A</span>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="text-[13px] font-medium truncate">Admin</p>
                <p className="text-[11px] text-neutral-500 truncate">admin · protected</p>
              </div>
              <button
                onClick={async () => {
                  await fetch("/api/auth/logout", { method: "POST" });
                  window.location.href = "/";
                }}
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50"
                title="Keluar"
                aria-label="Keluar"
              >
                <LogOut className="h-3.5 w-3.5 text-neutral-600" />
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-neutral-400">Login via URL <code className="rounded bg-neutral-100 px-1 py-0.5">/login</code></p>
          </div>
        </motion.aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="sticky top-0 z-20 border-b border-neutral-200 bg-white/80 backdrop-blur">
            <div className="flex h-[52px] items-center justify-between gap-3 px-3 md:px-4">
              <div className="flex items-center gap-2 min-w-0">
                <span className="flex md:hidden items-center shrink-0"><Logo className="h-8 w-8" /></span>
                <div className="hidden sm:flex items-center gap-1.5 text-[13px] text-neutral-400">
                  <span>{crumbs[0]}</span>
                  <ChevronDown className="h-3 w-3 rotate-[-90deg] text-neutral-300" />
                  <span className="text-neutral-900 font-medium">{crumbs[1]}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-1.5 w-[220px]">
                  <Search className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                  <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari…" className="w-full bg-transparent text-[13px] outline-none placeholder:text-neutral-400" />
                </div>
                <Link href="/" className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium hover:bg-neutral-50">
                  <Home className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Beranda</span>
                </Link>
              </div>
            </div>
            <div className="md:hidden flex items-center gap-1 overflow-x-auto px-3 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {NAV.map((n) => {
                const active = n.exact ? pathname === n.href : pathname.startsWith(n.href);
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium ${active ? "bg-neutral-900 text-white border-neutral-900" : "bg-white text-neutral-600 border-neutral-200"}`}
                  >
                    <n.icon className="h-3.5 w-3.5" />
                    {n.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <main className="flex-1 p-3 md:p-4">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
