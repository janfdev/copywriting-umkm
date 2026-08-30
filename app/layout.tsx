import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteNavWrapper } from "@/components/site-nav-wrapper";
import { Toaster } from "sonner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kaligawe · Asisten Copywriting UMKM",
  description: "Copy jualan siap-pakai dalam 30 detik — untuk pedagang Pasar Kaligawe.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteNavWrapper />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-stone-200 py-8 text-center text-xs text-stone-500">
          <div className="mx-auto max-w-6xl px-4 flex flex-wrap justify-center gap-4">
            <a href="/about" className="hover:text-stone-900">Tentang</a>
            <a href="/privacy-policy" className="hover:text-stone-900">Privasi</a>
            <a href="/terms-of-service" className="hover:text-stone-900">Syarat</a>
            <span>© KKM Kaligawe</span>
          </div>
        </footer>
        <Toaster richColors />
      </body>
    </html>
  );
}
