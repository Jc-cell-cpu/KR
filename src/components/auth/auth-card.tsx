"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AuthCardProps {
  children: React.ReactNode
  className?: string
  title?: string
  description?: string
}

export function AuthCard({ children, className, title, description }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "glass-card w-full max-w-md overflow-hidden rounded-2xl p-8 shadow-2xl",
        "bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10",
        className
      )}
    >
      {title && (
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </motion.div>
  )
}
