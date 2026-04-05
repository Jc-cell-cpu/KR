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
      <div className="flex flex-col gap-3 px-4 pb-0 pt-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:pt-5">
        <div className="min-w-0">
          <h2 className="text-base font-semibold tracking-tight">{title}</h2>
          {subtitle && (
            <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {action}
      </div>

      {stats && stats.length > 0 && (
        <div className="flex flex-wrap gap-x-5 gap-y-2 px-4 pt-3 sm:px-6">
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

      <div className="px-4 pt-4 sm:px-6">
        <Separator className="bg-border/40" />
      </div>

      <div className="p-4 pt-3 sm:p-5 sm:pt-3">{children}</div>
    </div>
  );
}
