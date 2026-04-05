"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { ReactNode, MouseEvent } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: ReactNode;
  cardBg?: string;
  iconColor?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  cardBg = "bg-card",
  iconColor = "text-indigo-500",
}: MetricCardProps) {
  const isPositive = change >= 0;
  const showTrend = change !== 0;

  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Spotlight follows cursor
    setSpotlight({ x, y, opacity: 1 });

    // Subtle 3-D tilt: max ±6 deg
    const tiltX = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    const tiltY = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    setTilt({ rotateX: tiltX, rotateY: tiltY });
  }

  function handleMouseLeave() {
    setSpotlight((s) => ({ ...s, opacity: 0 }));
    setTilt({ rotateX: 0, rotateY: 0 });
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      whileHover={{ y: -3, scale: 1.01 }}
      style={{ transformStyle: "preserve-3d", perspective: 800 }}
      className={`relative overflow-hidden rounded-2xl border border-border/60 p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl dark:border-white/[0.06] ${cardBg}`}
    >
      {/* ── Spotlight layer ──────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(260px circle at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.13) 0%, transparent 70%)`,
        }}
      />

      {/* ── Animated border glow that follows spotlight ──────────────── */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity * 0.6,
          background: `radial-gradient(180px circle at ${spotlight.x}% ${spotlight.y}%, rgba(99,102,241,0.35) 0%, transparent 80%)`,
          maskImage: "linear-gradient(black,black)",
          WebkitMaskImage: "paint(border-only)",
        }}
      />

      {/* ── Subtle border highlight rim ──────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          opacity: spotlight.opacity,
          boxShadow: `inset 0 0 0 1px rgba(255,255,255,${spotlight.opacity * 0.18})`,
          transition: "opacity 0.3s ease, box-shadow 0.3s ease",
        }}
      />

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="relative z-10">
        {/* Top row: label left — trend badge + icon right */}
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-medium text-muted-foreground leading-snug">{title}</p>

          <div className="flex items-center gap-2 shrink-0">
            {showTrend && (
              <span
                className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  isPositive
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                    : "bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400"
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {isPositive ? "+" : ""}{change}%
              </span>
            )}
            <div className={`${iconColor} opacity-75`}>{icon}</div>
          </div>
        </div>

        {/* Big value */}
        <p className="mt-3 text-3xl font-bold tracking-tight">{value}</p>

        {/* Sub-label */}
        <p className="mt-1 text-[11px] text-muted-foreground/70">{changeLabel}</p>
      </div>
    </motion.div>
  );
}
