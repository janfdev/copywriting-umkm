import * as React from "react";
import { cn } from "@/lib/utils";

export function Table({ className, ...p }: React.HTMLAttributes<HTMLTableElement>) {
  return <div className="overflow-hidden rounded-xl border border-stone-200 bg-white"><table className={cn("w-full text-sm", className)} {...p} /></div>;
}
export function TableHeader({ className, ...p }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("bg-stone-50", className)} {...p} />;
}
export function TableBody({ className, ...p }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn("divide-y divide-stone-200", className)} {...p} />;
}
export function TableRow({ className, ...p }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn("hover:bg-stone-50/70 transition", className)} {...p} />;
}
export function TableHead({ className, ...p }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={cn("px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-stone-500", className)} {...p} />;
}
export function TableCell({ className, ...p }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn("px-4 py-3", className)} {...p} />;
}
export function TableCaption({ className, ...p }: React.HTMLAttributes<HTMLTableCaptionElement>) {
  return <caption className={cn("px-4 py-3 text-xs text-stone-500", className)} {...p} />;
}
