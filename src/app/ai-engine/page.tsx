"use client";

import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Bot, GitBranch, Activity, PlusCircle, Rocket, Settings,
} from "lucide-react";

import { Header } from "@/components/layout/header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { ActionCard } from "@/components/dashboard/action-card";
import { AgentsPanel } from "@/components/dashboard/agents-panel";
import { WorkflowsPanel } from "@/components/dashboard/workflows-panel";
import { ExecutionChart } from "@/components/dashboard/execution-chart";
import { SectionDivider } from "@/components/ui/section-divider";
import { FAB } from "@/components/ui/fab";
import { CommandPalette } from "@/components/ui/command-palette";
import {
  MetricCardSkeleton,
  ActionCardSkeleton,
  SectionPanelSkeleton,
  ChartSkeleton,
} from "@/components/dashboard/skeleton-cards";

// ─── Animation variants ────────────────────────────────────────────────────
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Data ──────────────────────────────────────────────────────────────────
const metrics = [
  {
    title: "Active Agents",
    value: 20,
    change: 8.2,
    changeLabel: "vs last week",
    icon: <Bot className="h-5 w-5" />,
    cardBg: "bg-orange-50 dark:bg-orange-500/10",
    iconColor: "text-orange-500",
  },
  {
    title: "Active Workflows",
    value: 0,
    change: 0,
    changeLabel: "vs last week",
    icon: <GitBranch className="h-5 w-5" />,
    cardBg: "bg-sky-50 dark:bg-sky-500/10",
    iconColor: "text-sky-500",
  },
  {
    title: "Execution Success Rate",
    value: "0%",
    change: 0,
    changeLabel: "vs last week",
    icon: <Activity className="h-5 w-5" />,
    cardBg: "bg-teal-50 dark:bg-teal-500/10",
    iconColor: "text-teal-500",
  },
];

const actions = [
  {
    title: "Create New Agent",
    description: "Configure and deploy a new AI agent",
    icon: <PlusCircle className="h-5 w-5" />,
    gradient: "from-orange-400 to-orange-500",
  },
  {
    title: "Deployed Agents",
    description: "View and manage your active agents",
    icon: <Rocket className="h-5 w-5" />,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    title: "Settings",
    description: "GitHub, GCP, API keys & AI models",
    icon: <Settings className="h-5 w-5" />,
    gradient: "from-slate-600 to-slate-700",
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────
export default function AIEnginePage() {
  const [loading, setLoading] = useState(true);
  const [cmdOpen, setCmdOpen] = useState(false);

  // Simulate initial data load — dismiss skeleton after 1.5 s
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  // Global ⌘K / Ctrl+K listener
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
      <FAB />

      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full space-y-5 sm:space-y-6"
        >
          {/* Header */}
          <motion.div variants={item}>
            <Header />
          </motion.div>

          {/* ── KPI Cards ─────────────────────────────────────────────── */}
          <motion.div variants={item}>
            <SectionDivider label="Overview" />
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {loading
              ? [1, 2, 3].map((i) => (
                  <motion.div key={i} variants={item}>
                    <MetricCardSkeleton />
                  </motion.div>
                ))
              : metrics.map((metric) => (
                  <motion.div key={metric.title} variants={item}>
                    <MetricCard {...metric} />
                  </motion.div>
                ))}
          </div>

          {/* ── Quick Actions ─────────────────────────────────────────── */}
          <motion.div variants={item}>
            <SectionDivider label="Quick Actions" />
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {loading
              ? [1, 2, 3].map((i) => (
                  <motion.div key={i} variants={item}>
                    <ActionCardSkeleton />
                  </motion.div>
                ))
              : actions.map((action) => (
                  <motion.div key={action.title} variants={item}>
                    <ActionCard {...action} />
                  </motion.div>
                ))}
          </div>

          {/* ── Agents & Workflows ────────────────────────────────────── */}
          <motion.div variants={item}>
            <SectionDivider label="Resources" />
          </motion.div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {loading ? (
              <>
                <motion.div variants={item}><SectionPanelSkeleton rows={4} /></motion.div>
                <motion.div variants={item}><SectionPanelSkeleton rows={4} /></motion.div>
              </>
            ) : (
              <>
                <motion.div variants={item}><AgentsPanel /></motion.div>
                <motion.div variants={item}><WorkflowsPanel /></motion.div>
              </>
            )}
          </div>

          {/* ── Analytics ─────────────────────────────────────────────── */}
          <motion.div variants={item}>
            <SectionDivider label="Analytics" />
          </motion.div>

          <motion.div variants={item}>
            {loading ? <ChartSkeleton /> : <ExecutionChart />}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
