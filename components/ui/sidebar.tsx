"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { PanelLeft } from "lucide-react";
import { Button } from "./button";

const SidebarContext = React.createContext<{ open: boolean; setOpen: (v: boolean) => void; isMobile: boolean } | null>(null);

export function useSidebar() {
  const c = React.useContext(SidebarContext);
  if (!c) throw new Error("useSidebar outside SidebarProvider");
  return c;
}

export function SidebarProvider({ children, defaultOpen = true }: { children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const m = window.matchMedia("(max-width: 768px)");
    const h = () => setIsMobile(m.matches);
    h();
    m.addEventListener("change", h);
    return () => m.removeEventListener("change", h);
  }, []);
  React.useEffect(() => {
    if (isMobile) setOpen(false);
  }, [isMobile]);
  return <SidebarContext.Provider value={{ open, setOpen, isMobile }}>{children}</SidebarContext.Provider>;
}

export function Sidebar({ children, className }: { children: React.ReactNode; className?: string }) {
  const { open, isMobile } = useSidebar();
  return (
    <aside
      data-state={open ? "open" : "closed"}
      className={cn(
        "shrink-0 border-r border-stone-200 bg-white transition-all duration-200",
        isMobile ? "fixed inset-y-0 left-0 z-40 w-[280px] shadow-xl" + (open ? "" : " -translate-x-full") : open ? "w-[240px]" : "w-[56px] overflow-hidden",
        className
      )}
    >
      <div className={cn("flex h-full flex-col", !open && !isMobile && "[&_[data-label]]:hidden [&_span]:hidden")}>{children}</div>
    </aside>
  );
}

export function SidebarHeader({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex h-14 items-center gap-2 border-b border-stone-200 px-3", className)} {...p} />;
}
export function SidebarContent({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 overflow-y-auto py-3", className)} {...p} />;
}
export function SidebarFooter({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-t border-stone-200 p-3", className)} {...p} />;
}
export function SidebarGroup({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-2 py-2", className)} {...p} />;
}
export function SidebarGroupLabel({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-label className={cn("px-2 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-stone-500", className)} {...p} />;
}
export function SidebarMenu({ className, ...p }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("space-y-1", className)} {...p} />;
}
export function SidebarMenuItem({ className, ...p }: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn("", className)} {...p} />;
}
export function SidebarMenuButton({
  className,
  isActive,
  tooltip,
  asChild,
  ...p
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean; tooltip?: string; asChild?: boolean }) {
  const Comp: React.ElementType = asChild ? "span" : "button";
  return <Comp title={tooltip} data-active={isActive ? "true" : undefined} className={cn("flex w-full items-center gap-2 rounded-full px-3 py-2 text-sm transition", isActive ? "bg-[#C45A3C] text-white shadow-sm" : "text-stone-700 hover:bg-stone-100", className)} {...p} />;
}
export function SidebarTrigger({ className }: { className?: string }) {
  const { open, setOpen } = useSidebar();
  return (
    <Button variant="ghost" size="icon" className={cn("h-8 w-8", className)} onClick={() => setOpen(!open)} aria-label="Toggle sidebar">
      <PanelLeft className="h-4 w-4" />
    </Button>
  );
}
export function SidebarInset({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex min-w-0 flex-1 flex-col bg-[#F5F0E6]", className)}>{children}</div>;
}
