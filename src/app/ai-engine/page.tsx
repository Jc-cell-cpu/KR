"use client";

import { motion, type Variants } from "framer-motion";
import {
  Bot,
  GitBranch,
  Activity,
  PlusCircle,
  Rocket,
  Settings,
} from "lucide-react";

import { Header } from "@/components/layout/header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { ActionCard } from "@/components/dashboard/action-card";
import { AgentsPanel } from "@/components/dashboard/agents-panel";
import { WorkflowsPanel } from "@/components/dashboard/workflows-panel";
import { ExecutionChart } from "@/components/dashboard/execution-chart";

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

const metrics = [
  {
    title: "Active Agents",
    value: 20,
    change: 8.2,
    changeLabel: "vs last week",
    icon: <Bot className="h-5 w-5" />,
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    title: "Active Workflows",
    value: 0,
    change: 0,
    changeLabel: "vs last week",
    icon: <GitBranch className="h-5 w-5" />,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Execution Success Rate",
    value: "0%",
    change: 0,
    changeLabel: "vs last week",
    icon: <Activity className="h-5 w-5" />,
    gradient: "from-emerald-500 to-teal-500",
  },
];

const actions = [
  {
    title: "Create New Agent",
    description: "Configure and deploy a new AI agent",
    icon: <PlusCircle className="h-5 w-5" />,
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    title: "Deployed Agents",
    description: "View and manage your active agents",
    icon: <Rocket className="h-5 w-5" />,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Settings",
    description: "GitHub, GCP, API keys & AI models",
    icon: <Settings className="h-5 w-5" />,
    gradient: "from-slate-500 to-zinc-600",
  },
];

export default function AIEnginePage() {
  return (
    <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={item}>
          <Header />
        </motion.div>

        {/* KPI Metric Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric) => (
            <motion.div key={metric.title} variants={item}>
              <MetricCard {...metric} />
            </motion.div>
          ))}
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map((action) => (
            <motion.div key={action.title} variants={item}>
              <ActionCard {...action} />
            </motion.div>
          ))}
        </div>

        {/* Agents & Workflows Panels */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div variants={item}>
            <AgentsPanel />
          </motion.div>
          <motion.div variants={item}>
            <WorkflowsPanel />
          </motion.div>
        </div>

        {/* Execution Analytics Chart */}
        <motion.div variants={item}>
          <ExecutionChart />
        </motion.div>
      </motion.div>
    </div>
  );
}
