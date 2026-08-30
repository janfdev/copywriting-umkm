"use client";
import { usePathname } from "next/navigation";
import { SiteNav } from "./site-nav";

export function SiteNavWrapper() {
  const pathname = usePathname();
  if (pathname?.startsWith("/dashboard")) return null;
  return <SiteNav />;
}
