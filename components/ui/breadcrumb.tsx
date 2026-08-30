import * as React from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export function Breadcrumb({ className, ...p }: React.HTMLAttributes<HTMLElement>) {
  return <nav aria-label="breadcrumb" className={cn("", className)} {...p} />;
}
export function BreadcrumbList({ className, ...p }: React.HTMLAttributes<HTMLOListElement>) {
  return <ol className={cn("flex items-center gap-1 text-sm", className)} {...p} />;
}
export function BreadcrumbItem({ className, ...p }: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn("inline-flex items-center gap-1", className)} {...p} />;
}
export function BreadcrumbLink({ className, ...p }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cn("text-stone-500 hover:text-stone-900", className)} {...p} />;
}
export function BreadcrumbPage({ className, ...p }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span aria-current="page" className={cn("font-medium text-stone-900", className)} {...p} />;
}
export function BreadcrumbSeparator({ className, ...p }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("text-stone-400", className)} {...p}><ChevronRight className="h-3.5 w-3.5" /></span>;
}
export function BreadcrumbEllipsis({ className, ...p }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("flex h-8 w-8 items-center justify-center", className)} {...p}><MoreHorizontal className="h-3.5 w-3.5" /></span>;
}
