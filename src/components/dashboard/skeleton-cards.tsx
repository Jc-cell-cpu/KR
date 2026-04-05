/** Shimmer skeleton placeholders shown while dashboard data loads */
import type { CSSProperties } from "react";

function SkeletonBox({ className }: { className?: string }) {
  return (
    <div
      className={`skeleton-shimmer rounded-lg ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm dark:border-white/[0.06]">
      <div className="flex items-start justify-between gap-3">
        <SkeletonBox className="h-4 w-28" />
        <div className="flex items-center gap-2">
          <SkeletonBox className="h-5 w-14 rounded-full" />
          <SkeletonBox className="h-5 w-5 rounded-md" />
        </div>
      </div>
      <SkeletonBox className="mt-4 h-8 w-20" />
      <SkeletonBox className="mt-2 h-3 w-24" />
    </div>
  );
}

export function ActionCardSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-sm dark:border-white/[0.06]">
      <SkeletonBox className="h-11 w-11 shrink-0 rounded-xl" />
      <div className="flex-1 space-y-2">
        <SkeletonBox className="h-4 w-32" />
        <SkeletonBox className="h-3 w-44" />
      </div>
      <SkeletonBox className="h-4 w-4 shrink-0 rounded-sm" />
    </div>
  );
}

export function PanelRowSkeleton() {
  return (
    <div className="flex items-center gap-3 px-2 py-2.5">
      <SkeletonBox className="h-8 w-8 shrink-0 rounded-full" />
      <SkeletonBox className="h-4 flex-1 max-w-[160px]" />
      <SkeletonBox className="h-3 w-16 shrink-0" />
    </div>
  );
}

export function SectionPanelSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm dark:border-white/[0.06]">
      <div className="flex items-center justify-between px-6 pt-5 pb-0">
        <div className="space-y-2">
          <SkeletonBox className="h-4 w-20" />
          <div className="flex gap-4 pt-1">
            {[1, 2, 3].map((i) => (
              <SkeletonBox key={i} className="h-6 w-12" />
            ))}
          </div>
        </div>
        <SkeletonBox className="h-4 w-14" />
      </div>
      <div className="px-6 pt-4">
        <div className="h-px bg-border/40" />
      </div>
      <div className="p-5 pt-3 space-y-0.5">
        {Array.from({ length: rows }).map((_, i) => (
          <PanelRowSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-sm dark:border-white/[0.06]">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2">
          <SkeletonBox className="h-4 w-36" />
          <SkeletonBox className="h-3 w-52" />
        </div>
        <SkeletonBox className="h-7 w-7 rounded-lg" />
      </div>
      {/* Chart bars placeholder */}
      <div className="flex h-[200px] items-end gap-3 px-2">
        {[60, 85, 45, 90, 70, 55, 80].map((h, i) => (
          <SkeletonBox
            key={i}
            className="flex-1 rounded-t-md"
            style={{ height: `${h}%` } as CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
