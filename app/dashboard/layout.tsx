"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BarChart3, MessageSquare, Home, Sparkles, LogOut } from "lucide-react";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/testimonials", label: "Testimonials", icon: MessageSquare },
];

function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C45A3C] text-sm font-bold text-white">K</span>
          <span className="text-sm font-semibold tracking-tight">Kaligawe</span>
        </Link>
        <span className="ml-auto rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-semibold tracking-widest text-stone-600 border hidden sm:inline">ADMIN</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarMenu>
            {NAV.map((item) => {
              const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={active} tooltip={item.label}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Lainnya</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Beranda">
                <Link href="/"><Home className="h-4 w-4" /><span>Beranda</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Buat copy">
                <a href="/#buat-copy"><Sparkles className="h-4 w-4" /><span>Buat copy</span></a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-stone-500">© KKM Kaligawe</span>
          <button
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              window.location.href = "/";
            }}
            className="inline-flex items-center gap-1 rounded-full border bg-white px-3 py-1 text-xs hover:bg-stone-50"
          >
            <LogOut className="h-3 w-3" />Keluar
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function crumbs(pathname: string): { label: string; href?: string }[] {
  if (pathname === "/dashboard") return [{ label: "Dashboard" }];
  if (pathname.startsWith("/dashboard/analytics")) return [{ label: "Dashboard", href: "/dashboard" }, { label: "Analytics" }];
  if (pathname.startsWith("/dashboard/testimonials")) return [{ label: "Dashboard", href: "/dashboard" }, { label: "Testimonials" }];
  return [{ label: "Dashboard" }];
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const cs = crumbs(pathname);
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full bg-[#F5F0E6]">
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b border-stone-200 bg-white/80 backdrop-blur px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {cs.map((c, i) => (
                  <span key={i} className="contents">
                    <BreadcrumbItem>{c.href ? <BreadcrumbLink href={c.href}>{c.label}</BreadcrumbLink> : <BreadcrumbPage>{c.label}</BreadcrumbPage>}</BreadcrumbItem>
                    {i < cs.length - 1 && <BreadcrumbSeparator />}
                  </span>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex-1 p-4 md:p-6">
            <div className="mx-auto max-w-6xl">{children}</div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
