"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  Menu,
  X,
  LogOut,
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, href: "/dashboard", label: "Dashboard" },
  { icon: Bot, href: "/ai-engine", label: "AI Engine" },
  { icon: FileText, href: "#", label: "Documents" },
  { icon: ClipboardList, href: "#", label: "Contracts" },
  { icon: Users, href: "#", label: "Team" },
  { icon: BarChart3, href: "#", label: "Analytics" },
  { icon: GitBranch, href: "#", label: "Workflows" },
  { icon: Code2, href: "#", label: "Developer" },
];

const bottomItems = [{ icon: Settings, href: "#", label: "Settings" }];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    router.push("/");
  };

  const isActiveRoute = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : href !== "#" && pathname.startsWith(href);

  const activeItem = [...sidebarItems, ...bottomItems].find((item) =>
    isActiveRoute(item.href),
  );

  return (
    <>
      <aside className="fixed bottom-3 left-3 top-3 z-50 hidden w-[64px] flex-col items-center rounded-[20px] border border-white/[0.08] bg-[#0B0F19]/95 py-4 shadow-[10px_0_30px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl lg:flex">
        <Link href="/dashboard" className="mb-6 flex h-9 w-9 items-center justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25">
            <span className="text-sm font-bold text-white">K</span>
          </div>
        </Link>

        <nav className="flex flex-1 flex-col items-center gap-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className="group relative flex h-10 w-10 items-center justify-center rounded-xl"
              >
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

                <div className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-200 opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100">
                  {item.label}
                  <div className="absolute left-0 top-1/2 -ml-1 h-2 w-2 -translate-y-1/2 rotate-45 bg-slate-800" />
                </div>
              </Link>
            );
          })}
        </nav>

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

          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="group relative mb-2 flex h-10 w-10 items-center justify-center rounded-xl transition-colors"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-red-400/70 transition-colors duration-200 hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut className="h-[18px] w-[18px]" />
            </motion.div>
            <div className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-200 opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100">
              Logout
              <div className="absolute left-0 top-1/2 -ml-1 h-2 w-2 -translate-y-1/2 rotate-45 bg-slate-800" />
            </div>
          </button>
        </div>
      </aside>

      <div className="fixed inset-x-0 top-0 z-50 px-3 pt-3 lg:hidden">
        <div className="flex items-center justify-between rounded-[20px] border border-border/70 bg-card/90 px-4 py-3 shadow-lg backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#0B0F19]/90">
          <Link
            href="/dashboard"
            className="flex min-w-0 items-center gap-3"
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20">
              <span className="text-sm font-bold text-white">K</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold tracking-tight">KR Workspace</p>
              <p className="truncate text-xs text-muted-foreground">
                {activeItem?.label ?? "Dashboard"}
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/70 text-foreground transition-colors hover:bg-accent"
            aria-label="Open navigation"
            aria-expanded={mobileOpen}
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-[60] bg-slate-950/45 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-y-0 left-0 z-[61] flex w-[min(88vw,320px)] flex-col border-r border-white/[0.08] bg-[#0B0F19]/98 px-4 py-5 text-slate-100 shadow-2xl backdrop-blur-xl lg:hidden"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20">
                    <span className="text-sm font-bold text-white">K</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold tracking-tight text-white">
                      KR Workspace
                    </p>
                    <p className="truncate text-xs text-slate-400">
                      Enterprise command center
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-slate-300 transition-colors hover:bg-white/[0.08] hover:text-white"
                  aria-label="Close navigation"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="mt-6 flex-1 space-y-1 overflow-y-auto">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActiveRoute(item.href);

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-white/[0.10] text-cyan-300"
                          : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          isActive ? "bg-white/[0.08]" : "bg-white/[0.04]"
                        }`}
                      >
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-4 space-y-1 border-t border-white/[0.08] pt-4">
                {bottomItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04]">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-auto pt-4 border-t border-white/[0.08]">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setShowLogoutConfirm(true);
                  }}
                  className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-red-400/80 transition-colors hover:bg-red-500/5 hover:text-red-400"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10">
                    <LogOut className="h-[18px] w-[18px]" />
                  </span>
                  <span>Log out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutConfirm(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-[380px] overflow-hidden rounded-[24px] border border-border bg-card/90 p-6 shadow-2xl backdrop-blur-2xl"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
                  <LogOut className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Sign Out</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Are you sure you want to sign out? You will need to verify your credentials to access the workspace again.
                </p>

                <div className="mt-8 flex w-full flex-col gap-2">
                  <button
                    onClick={handleLogout}
                    className="flex h-11 w-full items-center justify-center rounded-xl bg-red-500 font-semibold text-white transition-all hover:bg-red-600 active:scale-[0.98]"
                  >
                    Yes, Sign Out
                  </button>
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex h-11 w-full items-center justify-center rounded-xl border border-border bg-accent/50 font-semibold text-foreground transition-all hover:bg-accent active:scale-[0.98]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
