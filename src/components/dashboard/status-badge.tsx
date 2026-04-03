import type { AgentStatus, WorkflowStatus } from "@/types/dashboard";

const statusConfig: Record<
  AgentStatus | WorkflowStatus,
  { color: string; bg: string; dot: string; pulse?: boolean }
> = {
  active: {
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    dot: "bg-emerald-500",
    pulse: true,
  },
  idle: {
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    dot: "bg-amber-500",
  },
  error: {
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-500/10",
    dot: "bg-red-500",
  },
  draft: {
    color: "text-slate-500 dark:text-slate-400",
    bg: "bg-slate-100 dark:bg-slate-500/10",
    dot: "bg-slate-400",
  },
  inactive: {
    color: "text-slate-500 dark:text-slate-400",
    bg: "bg-slate-100 dark:bg-slate-500/10",
    dot: "bg-slate-400",
  },
};

interface StatusBadgeProps {
  status: AgentStatus | WorkflowStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color} ${config.bg}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {config.pulse && (
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full ${config.dot} opacity-75`}
          />
        )}
        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${config.dot}`}
        />
      </span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
