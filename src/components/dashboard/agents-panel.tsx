"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Clock, CheckCircle2, Circle, ChevronDown, Percent, Cpu } from "lucide-react";
import { SectionCard } from "./section-card";
import { mockAgents } from "@/lib/mock-data";

const STATUS_COLORS: Record<string, string> = {
  active: "bg-emerald-500",
  idle:   "bg-amber-500",
  error:  "bg-red-500",
  draft:  "bg-slate-400",
};

export function AgentsPanel() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const total    = mockAgents.length;
  const active   = mockAgents.filter((a) => a.status === "active").length;
  const idle     = mockAgents.filter((a) => a.status === "idle").length;
  const errored  = mockAgents.filter((a) => a.status === "error").length;
  const draft    = mockAgents.filter((a) => a.status === "draft").length;

  const segments = [
    { key: "active", count: active, color: "bg-emerald-500", label: "Active" },
    { key: "idle",   count: idle,   color: "bg-amber-500",   label: "Idle"   },
    { key: "error",  count: errored, color: "bg-red-500",    label: "Error"  },
    { key: "draft",  count: draft,  color: "bg-slate-400",   label: "Draft"  },
  ].filter((s) => s.count > 0);

  return (
    <SectionCard
      title="Agents"
      stats={[
        { label: "Total",    value: total  },
        { label: "Deployed", value: active, color: "text-green-600 dark:text-green-400" },
        { label: "Draft",    value: draft,  color: "text-slate-400" },
      ]}
      action={
        <a href="#" className="text-xs font-medium text-orange-500 hover:text-orange-600 transition-colors">
          View all →
        </a>
      }
    >
      <div className="space-y-0.5 max-h-[340px] overflow-y-auto -mx-1 px-1">
        {mockAgents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Bot className="h-10 w-10 text-muted-foreground/30 mb-3" />
            <p className="text-sm font-medium text-muted-foreground">No agents yet</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Create your first AI agent to get started</p>
          </div>
        ) : (
          mockAgents.map((agent) => {
            const isExpanded = expandedId === agent.id;
            const isActive   = agent.status === "active";

            return (
              <div key={agent.id}>
                {/* Row */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : agent.id)}
                  className="group/row relative flex items-center gap-3 rounded-lg px-2 py-2.5 cursor-pointer transition-colors hover:bg-accent/50"
                >
                  {/* Colored left-border indicator on hover */}
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-indigo-400 opacity-0 transition-opacity duration-200 group-hover/row:opacity-100" />

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted/50">
                    {isActive ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground/40" />
                    )}
                  </div>

                  <p className="flex-1 truncate text-sm font-medium">{agent.name}</p>

                  <span className="shrink-0 flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {agent.lastRun}
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
                            <Cpu className="h-3 w-3" />{agent.model}
                          </span>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            STATUS_COLORS[agent.status]
                          } bg-opacity-15 text-foreground`}>
                            {agent.status}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{agent.description}</p>
                        {agent.successRate > 0 && (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <Percent className="h-3 w-3" /> Success rate
                              </span>
                              <span className="font-semibold">{agent.successRate}%</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${agent.successRate}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="h-full rounded-full bg-emerald-500"
                              />
                            </div>
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

      {/* Status distribution bar */}
      {mockAgents.length > 0 && (
        <div className="mt-3 space-y-1.5">
          <div className="flex h-1.5 w-full overflow-hidden rounded-full gap-0.5">
            {segments.map((seg) => (
              <motion.div
                key={seg.key}
                initial={{ width: 0 }}
                animate={{ width: `${(seg.count / total) * 100}%` }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                title={`${seg.label}: ${seg.count}`}
                className={`h-full ${seg.color} first:rounded-l-full last:rounded-r-full`}
              />
            ))}
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {segments.map((seg) => (
              <span key={seg.key} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <span className={`h-1.5 w-1.5 rounded-full ${seg.color}`} />
                {seg.label} {seg.count}
              </span>
            ))}
          </div>
        </div>
      )}
    </SectionCard>
  );
}
