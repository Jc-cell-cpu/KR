"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Bot, GitBranch, Settings, Rocket, PlusCircle, X, ArrowRight,
  Zap, BarChart2, FileText,
} from "lucide-react";

interface CommandItem {
  id: string;
  group: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  shortcut?: string;
  action?: () => void;
}

const commands: CommandItem[] = [
  // Quick Actions
  { id: "new-agent",    group: "Quick Actions", label: "Create New Agent",    description: "Deploy a new AI agent",        icon: <PlusCircle className="h-4 w-4 text-orange-500" />, shortcut: "N" },
  { id: "new-workflow", group: "Quick Actions", label: "New Workflow",        description: "Build an automation workflow",  icon: <Zap className="h-4 w-4 text-amber-500" />,         shortcut: "W" },
  // Agents
  { id: "a1", group: "Agents", label: "Contract Analyzer",   description: "Active · GPT-4o",         icon: <Bot className="h-4 w-4 text-indigo-500" /> },
  { id: "a2", group: "Agents", label: "Invoice Processor",   description: "Active · Claude 3.5",     icon: <Bot className="h-4 w-4 text-indigo-500" /> },
  { id: "a3", group: "Agents", label: "Compliance Checker",  description: "Idle · GPT-4",             icon: <Bot className="h-4 w-4 text-indigo-500" /> },
  { id: "a4", group: "Agents", label: "Risk Assessor",       description: "Active · Gemini 1.5 Pro", icon: <Bot className="h-4 w-4 text-indigo-500" /> },
  // Workflows
  { id: "w1", group: "Workflows", label: "Document Ingestion Pipeline", description: "12 nodes · Active",  icon: <GitBranch className="h-4 w-4 text-cyan-500" /> },
  { id: "w2", group: "Workflows", label: "Approval Routing",            description: "8 nodes · Active",   icon: <GitBranch className="h-4 w-4 text-cyan-500" /> },
  { id: "w3", group: "Workflows", label: "Notification Dispatcher",    description: "6 nodes · Draft",    icon: <GitBranch className="h-4 w-4 text-cyan-500" /> },
  // Navigate
  { id: "nav-agents",    group: "Navigate", label: "Go to Agents",    icon: <Rocket className="h-4 w-4 text-slate-400" />,    shortcut: "G A" },
  { id: "nav-analytics", group: "Navigate", label: "Go to Analytics", icon: <BarChart2 className="h-4 w-4 text-slate-400" />, shortcut: "G N" },
  { id: "nav-docs",      group: "Navigate", label: "Documentation",   icon: <FileText className="h-4 w-4 text-slate-400" />,  shortcut: "G D" },
  { id: "nav-settings",  group: "Navigate", label: "Settings",        icon: <Settings className="h-4 w-4 text-slate-400" />,  shortcut: "G S" },
];

const groupOrder = ["Quick Actions", "Agents", "Workflows", "Navigate"];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.description?.toLowerCase().includes(query.toLowerCase()) ||
          c.group.toLowerCase().includes(query.toLowerCase()),
      )
    : commands;

  // Group filtered results
  const grouped: Record<string, CommandItem[]> = {};
  for (const item of filtered) {
    if (!grouped[item.group]) grouped[item.group] = [];
    grouped[item.group].push(item);
  }
  const orderedGroups = groupOrder.filter((g) => grouped[g]?.length);

  // Flat list for keyboard nav
  const flatList = orderedGroups.flatMap((g) => grouped[g]);

  const close = useCallback(() => {
    setQuery("");
    setActiveIndex(0);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const el = listRef.current?.querySelectorAll("[data-cmd-item]")[activeIndex];
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") { close(); return; }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, flatList.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        flatList[activeIndex]?.action?.();
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, activeIndex, flatList, close]);

  let flatIdx = -1;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-x-4 top-20 z-50 w-auto rounded-2xl border border-border/60 bg-card shadow-2xl dark:border-white/[0.08] sm:left-1/2 sm:right-auto sm:top-[15vh] sm:w-full sm:max-w-xl sm:-translate-x-1/2"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-border/40 px-4 py-3.5">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                placeholder="Search agents, workflows, actions…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
              />
              <button
                onClick={close}
                className="flex h-6 w-6 items-center justify-center rounded-md border border-border/50 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[min(60vh,380px)] overflow-y-auto py-2">
              {flatList.length === 0 ? (
                <div className="py-12 text-center text-sm text-muted-foreground">
                  No results for &ldquo;{query}&rdquo;
                </div>
              ) : (
                orderedGroups.map((group) => {
                  const items = grouped[group];
                  return (
                    <div key={group}>
                      <p className="px-4 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                        {group}
                      </p>
                      {items.map((cmd) => {
                        flatIdx += 1;
                        const idx = flatIdx;
                        const isActive = activeIndex === idx;
                        return (
                          <button
                            key={cmd.id}
                            data-cmd-item
                            onMouseEnter={() => setActiveIndex(idx)}
                            onClick={() => { cmd.action?.(); close(); }}
                            className={`flex w-full items-center gap-3 px-4 py-2 text-left transition-colors ${
                              isActive ? "bg-accent" : "hover:bg-accent/50"
                            }`}
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-muted/50">
                              {cmd.icon}
                            </span>
                            <span className="flex-1 min-w-0">
                              <span className="block truncate text-sm font-medium">{cmd.label}</span>
                              {cmd.description && (
                                <span className="block truncate text-[11px] text-muted-foreground">{cmd.description}</span>
                              )}
                            </span>
                            {cmd.shortcut ? (
                              <span className="flex items-center gap-1 shrink-0">
                                {cmd.shortcut.split(" ").map((k) => (
                                  <kbd key={k} className="rounded border border-border/50 bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                                    {k}
                                  </kbd>
                                ))}
                              </span>
                            ) : (
                              isActive && (
                                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                              )
                            )}
                          </button>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/40 px-4 py-2.5 text-[10px] text-muted-foreground/60">
              <span><kbd className="font-mono">↑↓</kbd> navigate</span>
              <span><kbd className="font-mono">↵</kbd> select</span>
              <span><kbd className="font-mono">Esc</kbd> close</span>
              <span className="ml-auto">⌘K to open</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
