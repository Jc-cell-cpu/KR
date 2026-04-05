"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Bot, GitBranch, X } from "lucide-react";

const fabItems = [
  {
    id: "new-agent",
    label: "New Agent",
    icon: <Bot className="h-4 w-4" />,
    color: "bg-orange-500 hover:bg-orange-600",
    textColor: "text-white",
  },
  {
    id: "new-workflow",
    label: "New Workflow",
    icon: <GitBranch className="h-4 w-4" />,
    color: "bg-cyan-500 hover:bg-cyan-600",
    textColor: "text-white",
  },
];

export function FAB() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6 xl:bottom-8 xl:right-8">
      {/* Action items */}
      <AnimatePresence>
        {open &&
          fabItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.85 }}
              transition={{
                duration: 0.2,
                delay: open ? (fabItems.length - 1 - i) * 0.06 : i * 0.04,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="flex items-center gap-2.5"
            >
              {/* Label pill */}
              <span className="rounded-lg border border-border/50 bg-card px-3 py-1.5 text-xs font-medium shadow-lg dark:bg-card/90 dark:backdrop-blur-sm">
                {item.label}
              </span>
              {/* Icon button */}
              <button
                className={`flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-all duration-150 ${item.color} ${item.textColor}`}
                onClick={() => setOpen(false)}
                aria-label={item.label}
              >
                {item.icon}
              </button>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.92 }}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl transition-all duration-200 hover:bg-indigo-700 hover:shadow-indigo-500/30 sm:h-14 sm:w-14"
        aria-label={open ? "Close menu" : "Quick create"}
      >
        {/* Glow ring */}
        <span className="absolute inset-0 rounded-full bg-indigo-500 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-40" />
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {open ? <X className="h-5 w-5" /> : <Plus className="h-6 w-6" />}
        </motion.div>
      </motion.button>
    </div>
  );
}
