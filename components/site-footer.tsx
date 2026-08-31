"use client";
import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/dashboard") || pathname === "/login") return null;
  return (
    <footer className="border-t border-stone-200 py-8 text-center text-xs text-stone-500">
      <div className="mx-auto max-w-6xl px-4 flex flex-wrap justify-center gap-4">
        <a href="/about" className="hover:text-stone-900">
          Tentang
        </a>
        <a href="/privacy-policy" className="hover:text-stone-900">
          Privasi
        </a>
        <a href="/terms-of-service" className="hover:text-stone-900">
          Syarat
        </a>
        <span>© KKM Kaligawe</span>
      </div>
    </footer>
  );
}
