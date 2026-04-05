"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { mockExecutionData } from "@/lib/mock-data";

function CustomTooltip({
  active, payload, label,
}: {
  active?: boolean;
  payload?: { value: number; dataKey: string }[];
  label?: string;
}) {
  if (!active || !payload) return null;
  return (
    <div className="rounded-xl border border-border/50 bg-card p-3 shadow-xl dark:bg-card/95 dark:backdrop-blur-xl">
      <p className="mb-2 text-xs font-medium text-muted-foreground">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 text-xs">
          <span className={`h-2 w-2 rounded-full ${entry.dataKey === "success" ? "bg-emerald-500" : "bg-red-400"}`} />
          <span className="capitalize text-muted-foreground">{entry.dataKey}:</span>
          <span className="font-semibold">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export function ExecutionChart() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm dark:border-white/[0.06]">
      {/* Header row with collapse toggle */}
      <div className="flex flex-col gap-3 px-4 pb-0 pt-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:pt-5">
        <div className="min-w-0">
          <h2 className="text-base font-semibold tracking-tight">Execution Analytics</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Success vs failed executions — last 7 days
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Legend */}
          <div className="hidden items-center gap-3 md:flex">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />Success
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-red-400" />Failed
            </span>
          </div>
          {/* Collapse toggle */}
          <button
            onClick={() => setIsExpanded((p) => !p)}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 0 : -90 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </motion.div>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="chart-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-4 sm:p-6 sm:pt-4">
              <div className="h-[220px] w-full sm:h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockExecutionData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="successGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0}   />
                      </linearGradient>
                      <linearGradient id="failedGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#f87171" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#f87171" stopOpacity={0}   />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.06} vertical={false} />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "currentColor", opacity: 0.4 }} dy={8} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "currentColor", opacity: 0.4 }} dx={-4} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="success" stroke="#10b981" strokeWidth={2} fill="url(#successGradient)" />
                    <Area type="monotone" dataKey="failed"  stroke="#f87171" strokeWidth={2} fill="url(#failedGradient)"  />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
