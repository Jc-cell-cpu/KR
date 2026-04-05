"use client";

import { useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCw, Sun, Moon, Bell, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showTitle?: boolean;
  breadcrumb?: string[];
}

export function Header({
  title = "AI Engine",
  subtitle = "Overview of your agents, workflows, and executions",
  showTitle = true,
  breadcrumb = ["Dashboard", "AI Engine"],
}: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const handleRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      {showTitle && (
        <div className="min-w-0">
          {/* Breadcrumb */}
          {breadcrumb.length > 0 && (
            <div className="mb-1.5 flex flex-wrap items-center gap-1 text-xs text-muted-foreground/60">
              {breadcrumb.map((crumb, i) => (
                <span key={crumb} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="h-3 w-3" />}
                  <span
                    className={
                      i === breadcrumb.length - 1
                        ? "font-medium text-muted-foreground"
                        : "hover:text-muted-foreground cursor-pointer transition-colors"
                    }
                  >
                    {crumb}
                  </span>
                </span>
              ))}
            </div>
          )}

          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {title}
          </h1>
          <p className="mt-0.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        </div>
      )}

      <div className="flex w-full flex-wrap items-center gap-2 sm:gap-2.5 sm:justify-end lg:w-auto lg:shrink-0">
        {/* Live badge */}
        <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-50 px-2.5 py-1 dark:bg-emerald-500/10">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            Live
          </span>
        </div>

        {/* Notification bell */}
        <Button
          variant="outline"
          size="icon"
          className="relative h-9 w-9 rounded-xl border-border/50 bg-card/50 backdrop-blur-sm hover:bg-accent"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
            3
          </span>
        </Button>

        {/* Refresh with progress ring */}
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          className="relative h-9 w-9 overflow-hidden rounded-xl border-border/50 bg-card/50 backdrop-blur-sm hover:bg-accent"
        >
          {/* SVG progress ring */}
          {isRefreshing && (
            <svg
              className="absolute inset-0 h-full w-full -rotate-90"
              viewBox="0 0 36 36"
              aria-hidden="true"
            >
              <circle
                cx="18" cy="18" r="15"
                fill="none"
                strokeWidth="2.5"
                stroke="rgb(99 102 241)"
                strokeDasharray="94.25"
                strokeLinecap="round"
                className="progress-ring-animate"
              />
            </svg>
          )}
          <motion.div
            animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <RotateCw className="h-4 w-4" />
          </motion.div>
        </Button>

        {/* Theme toggle */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            const next = theme === "dark" ? "light" : "dark";
            setTheme(next);
          }}
          className="relative h-9 w-9 rounded-xl border-border/50 bg-card/50 backdrop-blur-sm hover:bg-accent"
        >
          <AnimatePresence mode="wait">
            {mounted && (
              <motion.div
                key={theme}
                initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Button>

        {/* User avatar */}
        <div className="ml-auto flex items-center gap-2.5 sm:ml-1">
          <div className="hidden text-right sm:block">
            <p className="text-xs font-medium">Admin User</p>
            <p className="text-[10px] text-muted-foreground">admin@krecontracts.com</p>
          </div>
          <Avatar className="h-9 w-9 rounded-xl border border-border/50">
            <AvatarFallback className="rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 text-xs font-semibold text-white">
              A
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
