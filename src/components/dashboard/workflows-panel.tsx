"use client";

import { GitBranch, Clock, Play } from "lucide-react";
import { SectionCard } from "./section-card";
import { StatusBadge } from "./status-badge";
import { mockWorkflows } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export function WorkflowsPanel() {
  const stats = [
    {
      label: "Total",
      value: mockWorkflows.length,
    },
    {
      label: "Active",
      value: mockWorkflows.filter((w) => w.status === "active").length,
    },
    {
      label: "Inactive",
      value: mockWorkflows.filter((w) => w.status === "inactive").length,
    },
    {
      label: "Draft",
      value: mockWorkflows.filter((w) => w.status === "draft").length,
    },
  ];

  return (
    <SectionCard
      title="Workflows"
      subtitle="Automated multi-agent pipelines"
      stats={stats}
      action={
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          View All
        </Button>
      }
    >
      <div className="space-y-1 max-h-[380px] overflow-y-auto -mr-2 pr-2">
        {mockWorkflows.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <GitBranch className="h-10 w-10 text-muted-foreground/40 mb-3" />
            <p className="text-sm font-medium text-muted-foreground">
              No workflows yet
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Create your first workflow to automate tasks
            </p>
          </div>
        ) : (
          mockWorkflows.map((workflow) => (
            <div
              key={workflow.id}
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-accent/50"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/20 dark:to-blue-500/20">
                <GitBranch className="h-4 w-4 text-cyan-500" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">
                    {workflow.name}
                  </p>
                  <span className="shrink-0 rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {workflow.nodeCount} nodes
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {workflow.lastRun}
                  </span>
                  {workflow.executionCount > 0 && (
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Play className="h-3 w-3" />
                      {workflow.executionCount.toLocaleString()} runs
                    </span>
                  )}
                </div>
              </div>

              <StatusBadge status={workflow.status} />
            </div>
          ))
        )}
      </div>
    </SectionCard>
  );
}
