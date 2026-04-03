"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

interface ProductCardProps {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  gradient?: string;
}

export function ProductCard({
  title,
  description,
  href,
  icon,
  gradient = "from-indigo-500 to-violet-500",
}: ProductCardProps) {
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
        <div className="flex items-start gap-3.5">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
          >
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          </div>
        </div>

        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-500 transition-colors duration-200 hover:text-cyan-400 dark:text-cyan-400 dark:hover:text-cyan-300"
        >
          View Details
          <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}
