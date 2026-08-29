"use client";
import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Ctx = React.createContext<{ open: string | null; setOpen: (v: string | null) => void } | null>(null);

export function Accordion({ children, type, collapsible, className }: { children: React.ReactNode; type?: string; collapsible?: boolean; className?: string }) {
  const [open, setOpen] = React.useState<string | null>(null);
  return (
    <Ctx.Provider value={{ open, setOpen }}>
      <div className={cn("", className)}>{children}</div>
    </Ctx.Provider>
  );
}
export function AccordionItem({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  return <div className={cn("border-b border-stone-200 last:border-0", className)}>{children}</div>;
}
export function AccordionTrigger({ children, className }: { children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(Ctx)!;
  const id = React.useId();
  const isOpen = (ctx as unknown as { _id?: string })?._id === id;
  return (
    <button
      onClick={() => {
        const cur = (ctx as unknown as { _cur?: string | null })?._cur ?? ctx.open;
        const next = cur === id ? null : id;
        ctx.setOpen(next);
        (ctx as unknown as { _id: string; _cur: string | null })._id = id;
        (ctx as unknown as { _cur: string | null })._cur = next;
      }}
      className={cn("flex w-full items-center justify-between py-4 text-left text-sm font-medium", className)}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0" />
    </button>
  );
}
export function AccordionContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("pb-4 text-sm text-stone-600", className)}>{children}</div>;
}
