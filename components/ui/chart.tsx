"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export type ChartConfig = Record<string, { label: string; color: string }>;

export function ChartContainer({ config, className, children }: { config: ChartConfig; className?: string; children: React.ReactNode }) {
  const style = React.useMemo(() => {
    const vars: Record<string, string> = {};
    for (const [k, v] of Object.entries(config)) vars[`--color-${k}`] = v.color;
    return vars as React.CSSProperties;
  }, [config]);
  return <div style={style} className={cn("w-full", className)}>{children}</div>;
}

export function ChartTooltipContent({ active, payload, label }: { active?: boolean; payload?: Array<{ dataKey?: string; value?: number; name?: string; color?: string; payload?: Record<string, unknown> }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-stone-200 bg-white px-3 py-2 shadow-sm text-xs">
      {label != null && <div className="font-medium text-stone-900 mb-1">{String(label)}</div>}
      <div className="space-y-1">
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
            <span className="text-stone-500">{p.name ?? p.dataKey}</span>
            <span className="ml-auto font-medium text-stone-900">{String(p.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
