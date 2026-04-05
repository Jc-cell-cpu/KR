"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Settings,
  FileText,
  ClipboardList,
  Users,
  BarChart3,
  GitBranch,
  Code2,
  Bot,
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, href: "/", label: "Dashboard" },
  { icon: Bot, href: "/ai-engine", label: "AI Engine" },
  { icon: FileText, href: "#", label: "Documents" },
  { icon: ClipboardList, href: "#", label: "Contracts" },
  { icon: Users, href: "#", label: "Team" },
  { icon: BarChart3, href: "#", label: "Analytics" },
  { icon: GitBranch, href: "#", label: "Workflows" },
  { icon: Code2, href: "#", label: "Developer" },
];

const bottomItems = [
  { icon: Settings, href: "#", label: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-3 top-3 bottom-3 z-50 flex w-[64px] flex-col items-center rounded-[20px] border border-white/[0.08] bg-[#0B0F19]/95 backdrop-blur-xl py-4 shadow-[10px_0_30px_-15px_rgba(0,0,0,0.6)]">
      {/* Logo */}
      <Link href="/" className="mb-6 flex h-9 w-9 items-center justify-center">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25">
          <span className="text-sm font-bold text-white">K</span>
        </div>
      </Link>

      {/* Main nav */}
      <nav className="flex flex-1 flex-col items-center gap-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href) && item.href !== "#";

          return (
            <Link
              key={item.label}
              href={item.href}
              className="group relative flex h-10 w-10 items-center justify-center rounded-xl"
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-[-14px] h-6 w-[3px] rounded-r-full bg-gradient-to-b from-cyan-400 to-teal-400"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 ${
                  isActive
                    ? "bg-white/[0.10] text-cyan-400 shadow-inner"
                    : "text-slate-500 hover:bg-white/[0.14] hover:text-white"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" />
              </motion.div>

              {/* Tooltip */}
              <div className="pointer-events-none absolute left-full ml-3 rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-200 opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100 whitespace-nowrap">
                {item.label}
                <div className="absolute left-0 top-1/2 -ml-1 h-2 w-2 -translate-y-1/2 rotate-45 bg-slate-800" />
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom nav */}
      <div className="flex flex-col items-center gap-1 border-t border-white/[0.06] pt-3">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="group relative flex h-10 w-10 items-center justify-center rounded-xl"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-colors duration-200 hover:bg-white/[0.14] hover:text-white"
              >
                <Icon className="h-[18px] w-[18px]" />
              </motion.div>
              <div className="pointer-events-none absolute left-full ml-3 rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-200 opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100">
                {item.label}
                <div className="absolute left-0 top-1/2 -ml-1 h-2 w-2 -translate-y-1/2 rotate-45 bg-slate-800" />
              </div>
            </Link>
          );
        })}

        {/* User avatar */}
        <div className="mt-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 text-[10px] font-bold text-white">
          SU
        </div>
      </div>
    </aside>
  );
}
