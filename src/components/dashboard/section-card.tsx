import { Separator } from "@/components/ui/separator";
import type { ReactNode } from "react";

interface StatItem {
  label: string;
  value: number;
  /** Tailwind color class e.g. "text-green-600 dark:text-green-400" */
  color?: string;
}

interface SectionCardProps {
  title: string;
  subtitle?: string;
  stats?: StatItem[];
  /** Node rendered in the top-right action slot */
  action?: ReactNode;
  children: ReactNode;
}

export function SectionCard({
  title,
  subtitle,
  stats,
  action,
  children,
}: SectionCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm dark:border-white/[0.06] dark:bg-card">
      <div className="flex items-center justify-between px-6 pt-5 pb-0">
        <div>
          <h2 className="text-base font-semibold tracking-tight">{title}</h2>
          {subtitle && (
            <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {action}
      </div>

      {stats && stats.length > 0 && (
        <div className="flex gap-5 px-6 pt-3">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-1.5 text-sm">
              <span className={`text-xl font-bold ${stat.color ?? ""}`}>
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="px-6 pt-4">
        <Separator className="bg-border/40" />
      </div>

      <div className="p-5 pt-3">{children}</div>
    </div>
  );
}
