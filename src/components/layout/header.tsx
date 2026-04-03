"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCw, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showTitle?: boolean;
}

export function Header({ title = "AI Engine", subtitle = "Overview of your agents, workflows, and executions", showTitle = true }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on client — prevents hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {showTitle && (
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            <span className="gradient-text">{title}</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {subtitle}
          </p>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          className="relative h-9 w-9 rounded-xl border-border/50 bg-card/50 backdrop-blur-sm hover:bg-accent"
        >
          <motion.div
            animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <RotateCw className="h-4 w-4" />
          </motion.div>
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
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

        <div className="flex items-center gap-2.5 ml-1">
          <div className="hidden sm:block text-right">
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
