"use client";

import { motion, type Variants } from "framer-motion";
import {
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  Bot,
  Scale,
  BarChart3,
  ScanLine,
  Handshake,
} from "lucide-react";

import { Header } from "@/components/layout/header";
import { StatCard } from "@/components/dashboard/stat-card";
import { ProductCard } from "@/components/dashboard/product-card";
import { mockProducts, mockDashboardStats } from "@/lib/mock-data";

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

const statIcons = [
  <TrendingUp key="trending" className="h-5 w-5 text-indigo-500" />,
  <Users key="users" className="h-5 w-5 text-teal-500" />,
  <Clock key="clock" className="h-5 w-5 text-amber-500" />,
  <CheckCircle2 key="check" className="h-5 w-5 text-emerald-500" />,
];

const productIcons: Record<string, React.ReactNode> = {
  "ai-engine": <Bot className="h-5 w-5" />,
  "legal-ops": <Scale className="h-5 w-5" />,
  "analytics": <BarChart3 className="h-5 w-5" />,
  "autoscan": <ScanLine className="h-5 w-5" />,
  "deal-room": <Handshake className="h-5 w-5" />,
};

export default function DashboardPage() {
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
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Dashboard
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Welcome to your workspace
              </p>
            </div>
            <Header showTitle={false} />
          </header>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mockDashboardStats.map((stat, idx) => (
            <motion.div key={stat.title} variants={item}>
              <StatCard
                title={stat.title}
                value={stat.value}
                change={stat.change}
                gradient={stat.gradient}
                iconBg={stat.iconBg}
                icon={statIcons[idx]}
              />
            </motion.div>
          ))}
        </div>

        {/* Products Section */}
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold tracking-tight mb-4">Your Products</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {mockProducts.map((product) => (
            <motion.div key={product.id} variants={item}>
              <ProductCard
                title={product.title}
                description={product.description}
                href={product.href}
                gradient={product.gradient}
                icon={productIcons[product.id]}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
