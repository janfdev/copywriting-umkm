"use client";
import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type SelectProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (v: string) => void;
  children: React.ReactNode;
};

const SelectContext = React.createContext<{ value: string; setValue: (v: string) => void } | null>(null);

export function Select({ value, defaultValue, onValueChange, children }: SelectProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const v = value !== undefined ? value : internal;
  const set = (nv: string) => {
    setInternal(nv);
    onValueChange?.(nv);
  };
  return <SelectContext.Provider value={{ value: v, setValue: set }}>{children}</SelectContext.Provider>;
}

export function SelectTrigger({ children, className }: { children: React.ReactNode; className?: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn("flex h-10 w-full items-center justify-between rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm", className)}
      >
        {children}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
      {open && <div className="absolute inset-0" onClick={() => setOpen(false)} />}
    </div>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const ctx = React.useContext(SelectContext);
  return <span className={ctx?.value ? "" : "text-stone-400"}>{ctx?.value || placeholder}</span>;
}

export function SelectContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mt-1 rounded-xl border bg-white shadow-md p-1 flex flex-col gap-0.5", className)}>{children}</div>;
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  const ctx = React.useContext(SelectContext)!;
  const active = ctx.value === value;
  return (
    <button
      type="button"
      onClick={() => ctx.setValue(value)}
      className={cn("text-left rounded-lg px-3 py-2 text-sm hover:bg-stone-100", active && "bg-stone-100 font-medium")}
    >
      {children}
    </button>
  );
}
