"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: ReactNode;
  gradient?: string;
  iconBg?: string;
}

export function StatCard({
  title,
  value,
  change,
  icon,
  gradient = "from-indigo-500 to-violet-500",
  iconBg = "bg-indigo-500/10 dark:bg-indigo-500/20",
}: StatCardProps) {
  const isPositive = change >= 0;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 dark:bg-card dark:shadow-lg dark:shadow-black/20 dark:hover:shadow-indigo-500/10"
    >
      {/* Subtle gradient border glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className={`absolute inset-[-1px] rounded-2xl bg-gradient-to-r ${gradient} opacity-[0.06]`} />
      </div>

      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
            {icon}
          </div>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
              isPositive
                ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400"
                : "bg-red-500/10 text-red-600 dark:bg-red-500/15 dark:text-red-400"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {isPositive ? "+" : ""}
            {change}%
          </span>
        </div>

        <p className="text-2xl font-bold tracking-tight sm:text-3xl">{value}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{title}</p>
      </div>
    </motion.div>
  );
}
