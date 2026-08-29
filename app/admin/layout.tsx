import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <nav className="flex gap-2 mb-6">
        <Link href="/admin/analytics" className="rounded-full border bg-white px-4 py-2 text-sm hover:bg-stone-50">Analytics</Link>
        <Link href="/admin/testimonials" className="rounded-full border bg-white px-4 py-2 text-sm hover:bg-stone-50">Testimonials</Link>
        <Link href="/" className="ml-auto rounded-full border bg-white px-4 py-2 text-sm">← Beranda</Link>
      </nav>
      {children}
    </div>
  );
}
