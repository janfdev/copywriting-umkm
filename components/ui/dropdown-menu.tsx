"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

const Ctx = React.createContext<{ open: boolean; setOpen: (v: boolean) => void } | null>(null);

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return <Ctx.Provider value={{ open, setOpen }}><div className="relative inline-block">{children}</div></Ctx.Provider>;
}
export function DropdownMenuTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  const c = React.useContext(Ctx)!;
  const child = React.Children.only(children) as React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;
  return React.cloneElement(child, { onClick: (e: React.MouseEvent) => { child.props.onClick?.(e); c.setOpen(!c.open); } });
}
export function DropdownMenuContent({ children, className, align = "end" }: { children: React.ReactNode; className?: string; align?: "start" | "end" }) {
  const c = React.useContext(Ctx)!;
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!c.open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) c.setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [c]);
  if (!c.open) return null;
  return <div ref={ref} className={cn("absolute z-50 mt-2 min-w-[180px] rounded-xl border border-stone-200 bg-white p-1 shadow-md", align === "end" ? "right-0" : "left-0", className)}>{children}</div>;
}
export function DropdownMenuItem({ children, className, onClick, variant }: { children: React.ReactNode; className?: string; onClick?: () => void; variant?: "destructive" }) {
  const c = React.useContext(Ctx)!;
  return <button onClick={() => { onClick?.(); c.setOpen(false); }} className={cn("flex w-full items-center rounded-lg px-2.5 py-2 text-left text-sm hover:bg-stone-100", variant === "destructive" && "text-red-600 hover:bg-red-50", className)}>{children}</button>;
}
export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div className={cn("my-1 h-px bg-stone-200", className)} />;
}
export function DropdownMenuLabel({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-2 py-1.5 text-xs font-semibold text-stone-500", className)} {...p} />;
}
export function DropdownMenuCheckboxItem({ children, checked, onCheckedChange }: { children: React.ReactNode; checked?: boolean; onCheckedChange?: (v: boolean) => void }) {
  return <button onClick={() => onCheckedChange?.(!checked)} className={cn("flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm hover:bg-stone-100", checked && "bg-stone-100")}>{children}</button>;
}
