import { Separator } from "@/components/ui/separator";
import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  subtitle?: string;
  stats?: { label: string; value: number }[];
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
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm dark:bg-card dark:shadow-lg dark:shadow-black/20">
      <div className="flex items-center justify-between p-6 pb-0">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          {subtitle && (
            <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {action}
      </div>

      {stats && stats.length > 0 && (
        <div className="flex gap-4 px-6 pt-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-1.5 text-xs"
            >
              <span className="font-bold">{stat.value}</span>
              <span className="text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="px-6 pt-4">
        <Separator className="bg-border/50" />
      </div>

      <div className="p-6 pt-4">{children}</div>
    </div>
  );
}
