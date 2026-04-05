"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Bot,
  Rocket,
  GitBranch,
  FileText,
  Settings,
  ChevronLeft,
  Sparkles,
} from "lucide-react";

interface NavSection {
  label: string;
  items: {
    icon: React.ElementType;
    label: string;
    href: string;
  }[];
}

const sections: NavSection[] = [
  {
    label: "OVERVIEW",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/ai-engine" },
    ],
  },
  {
    label: "AI ENGINE",
    items: [
      { icon: Bot, label: "Create Agent", href: "/ai-engine/create-agent" },
      { icon: Rocket, label: "Deployed Agents", href: "/ai-engine/deployed" },
    ],
  },
  {
    label: "AI AUTOMATION",
    items: [
      { icon: GitBranch, label: "Workflow Builder", href: "/ai-engine/workflow-builder" },
      { icon: FileText, label: "My Workflows", href: "/ai-engine/workflows" },
    ],
  },
  {
    label: "CONFIGURATION",
    items: [
      { icon: Settings, label: "Settings", href: "/ai-engine/settings" },
    ],
  },
];

export function AIEngineSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Sidebar — always mounted, animates width only */}
      <motion.aside
        animate={{ width: collapsed ? 0 : 240 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative flex shrink-0 flex-col overflow-hidden rounded-[20px] border border-border/60 bg-card shadow-sm dark:bg-[#0f1623]/95 dark:border-white/[0.06] dark:backdrop-blur-xl"
      >
        <div className="flex min-w-[240px] flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-sm">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold tracking-tight">AI Engine</span>
            </div>
            <button
              onClick={() => setCollapsed(true)}
              className="flex items-center justify-center rounded-md px-1.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="h-3 w-3" />
              <ChevronLeft className="h-3 w-3 -ml-1.5" />
            </button>
          </div>

          {/* Nav sections */}
          <nav className="flex-1 space-y-5 overflow-y-auto px-3 pb-4">
            {sections.map((section) => (
              <div key={section.label}>
                <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                  {section.label}
                </p>
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <motion.div
                        key={item.href}
                        whileHover={isActive ? {} : { x: 2 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Link
                          href={item.href}
                          className={`group relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all duration-200 ${
                            isActive
                              ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                              : "text-muted-foreground hover:bg-slate-100 hover:text-foreground dark:hover:bg-white/[0.07] dark:hover:text-slate-100"
                          }`}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="ai-sidebar-active"
                              className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-blue-500"
                              transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            />
                          )}
                          <Icon
                            className={`h-4 w-4 shrink-0 transition-colors duration-200 ${
                              isActive
                                ? "text-blue-500"
                                : "group-hover:text-indigo-500"
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                          <ChevronLeft className="ml-auto h-3 w-3 -rotate-180 opacity-30 transition-opacity duration-200 group-hover:opacity-70" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </motion.aside>

      {/* Expand button — in flex flow so it never overlaps content */}
      <AnimatePresence>
        {collapsed && (
          <motion.div
            key="expand-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex shrink-0 flex-col items-center pt-5 pr-1"
          >
            <button
              onClick={() => setCollapsed(false)}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 bg-card text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-foreground dark:bg-[#0f1623] dark:border-white/[0.06]"
              aria-label="Expand sidebar"
            >
              <ChevronLeft className="h-3.5 w-3.5 rotate-180" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
