"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

interface ActionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  gradient?: string;
}

export function ActionCard({
  title,
  description,
  icon,
  gradient = "from-indigo-500 to-violet-500",
}: ActionCardProps) {
  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 dark:bg-card dark:shadow-lg dark:shadow-black/20 dark:hover:border-indigo-500/20 dark:hover:shadow-indigo-500/10"
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg transition-shadow duration-300 group-hover:shadow-xl`}
      >
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground truncate">
          {description}
        </p>
      </div>

      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-foreground" />
    </motion.button>
  );
}
