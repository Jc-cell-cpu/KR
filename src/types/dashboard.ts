export type AgentStatus = "active" | "idle" | "error" | "draft";
export type WorkflowStatus = "active" | "inactive" | "draft";

export interface Agent {
  id: string;
  name: string;
  description: string;
  status: AgentStatus;
  model: string;
  lastRun: string;
  successRate: number;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  nodeCount: number;
  lastRun: string;
  executionCount: number;
}

export interface MetricData {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
}

export interface ActionItem {
  title: string;
  description: string;
  href: string;
}

export interface ExecutionDataPoint {
  date: string;
  success: number;
  failed: number;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  href: string;
  gradient: string;
  iconBg: string;
}

export interface DashboardStat {
  title: string;
  value: string | number;
  change: number;
  gradient: string;
  iconBg: string;
}
