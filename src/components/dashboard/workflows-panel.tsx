"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Clock, ChevronDown, Play, Network } from "lucide-react";
import { SectionCard } from "./section-card";
import { mockWorkflows } from "@/lib/mock-data";

const STATUS_COLORS: Record<string, string> = {
  active:   "bg-emerald-500",
  inactive: "bg-slate-400",
  draft:    "bg-amber-400",
};

export function WorkflowsPanel() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const total    = mockWorkflows.length;
  const active   = mockWorkflows.filter((w) => w.status === "active").length;
  const inactive = mockWorkflows.filter((w) => w.status === "inactive").length;
  const draft    = mockWorkflows.filter((w) => w.status === "draft").length;

  return (
    <SectionCard
      title="Workflows"
      stats={[
        { label: "Total",    value: total    },
        { label: "Active",   value: active,   color: "text-green-600 dark:text-green-400" },
        { label: "Inactive", value: inactive, color: "text-slate-400" },
        { label: "Draft",    value: draft,    color: "text-slate-400" },
      ]}
      action={
        <a href="#" className="text-xs font-medium text-orange-500 hover:text-orange-600 transition-colors">
          View all →
        </a>
      }
    >
      <div className="space-y-0.5 max-h-[340px] overflow-y-auto -mx-1 px-1">
        {mockWorkflows.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <GitBranch className="h-10 w-10 text-muted-foreground/30 mb-3" />
            <p className="text-sm font-medium text-muted-foreground">No workflows yet</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Create your first workflow to automate tasks</p>
          </div>
        ) : (
          mockWorkflows.map((workflow) => {
            const isExpanded = expandedId === workflow.id;

            return (
              <div key={workflow.id}>
                {/* Row */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : workflow.id)}
                  className="group/row relative flex items-center gap-3 rounded-lg px-2 py-2.5 cursor-pointer transition-colors hover:bg-accent/50"
                >
                  {/* Colored left-border indicator on hover */}
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-cyan-400 opacity-0 transition-opacity duration-200 group-hover/row:opacity-100" />

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted/50">
                    <Clock className="h-4 w-4 text-muted-foreground/50" />
                  </div>

                  <p className="flex-1 truncate text-sm font-medium">{workflow.name}</p>

                  <span className="shrink-0 text-[11px] text-muted-foreground">
                    {workflow.nodeCount} nodes
                  </span>

                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-muted-foreground/40"
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </motion.div>
                </div>

                {/* Expanded detail */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mx-2 mb-1.5 rounded-lg bg-muted/40 border border-border/40 px-3 py-3 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                            <Network className="h-3 w-3" />{workflow.nodeCount} nodes
                          </span>
                          <span className={`h-2 w-2 rounded-full ${STATUS_COLORS[workflow.status] ?? "bg-slate-400"}`} />
                          <span className="text-[11px] capitalize text-muted-foreground">{workflow.status}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{workflow.description}</p>
                        {workflow.executionCount > 0 && (
                          <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Play className="h-3 w-3" />
                              {workflow.executionCount.toLocaleString()} total runs
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Last: {workflow.lastRun}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>
    </SectionCard>
  );
}
