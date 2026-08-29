"use client";
import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const DialogCtx = React.createContext<{ open: boolean; setOpen: (v: boolean) => void } | null>(null);

export function Dialog({ open: controlled, onOpenChange, children }: { open?: boolean; onOpenChange?: (v: boolean) => void; children: React.ReactNode }) {
  const [internal, setInternal] = React.useState(false);
  const open = controlled ?? internal;
  const setOpen = (v: boolean) => {
    setInternal(v);
    onOpenChange?.(v);
  };
  return <DialogCtx.Provider value={{ open, setOpen }}>{children}</DialogCtx.Provider>;
}
export function DialogTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  const ctx = React.useContext(DialogCtx)!;
  return (
    <span onClick={() => ctx.setOpen(true)} className="cursor-pointer">
      {children}
    </span>
  );
}
export function DialogContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(DialogCtx)!;
  if (!ctx.open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" onClick={() => ctx.setOpen(false)} />
      <div className={cn("relative z-50 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl", className)}>
        <button onClick={() => ctx.setOpen(false)} className="absolute right-4 top-4 rounded-full p-1 hover:bg-stone-100">
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}
export function DialogHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex flex-col gap-1.5 text-center sm:text-left", className)}>{children}</div>;
}
export function DialogTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn("text-lg font-semibold", className)}>{children}</h3>;
}
export function DialogDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-sm text-stone-500", className)}>{children}</p>;
}
