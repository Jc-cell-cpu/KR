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
    <AnimatePresence mode="wait">
      <motion.aside
        initial={{ width: 240 }}
        animate={{ width: collapsed ? 0 : 240 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative flex h-screen shrink-0 flex-col overflow-hidden border-r border-border/50 bg-card dark:bg-[#0f1623]"
      >
        <div className="flex min-w-[240px] flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold tracking-tight">AI Engine</span>
            </div>
            <button
              onClick={() => setCollapsed(true)}
              className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Nav sections */}
          <nav className="flex-1 space-y-5 overflow-y-auto px-3 pb-4">
            {sections.map((section) => (
              <div key={section.label}>
                <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                  {section.label}
                </p>
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`group relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary"
                            : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="ai-sidebar-active"
                            className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}
                        <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-primary" : ""}`} />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </motion.aside>

      {/* Expand button when collapsed */}
      {collapsed && (
        <motion.button
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          onClick={() => setCollapsed(false)}
          className="absolute left-[60px] top-5 z-40 flex h-7 w-7 items-center justify-center rounded-lg border border-border/50 bg-card text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-foreground dark:bg-[#0f1623]"
        >
          <ChevronLeft className="h-3.5 w-3.5 rotate-180" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
