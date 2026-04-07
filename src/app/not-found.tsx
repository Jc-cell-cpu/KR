"use client";

import { useCallback, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimate,
} from "framer-motion";
import Lottie from "lottie-react";
import { MoveLeft } from "lucide-react";
import animationData from "../../public/animation/floatingAst.json";
import { StarBackground } from "@/components/layout/star-background";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 50, damping: 20, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Astronaut parallax transforms
  const astX = useTransform(smoothX, [-1, 1], [-40, 40]);
  const astY = useTransform(smoothY, [-1, 1], [-30, 30]);
  const astRotateY = useTransform(smoothX, [-1, 1], [-8, 8]);
  const astRotateX = useTransform(smoothY, [-1, 1], [5, -5]);

  // Star background parallax (subtle inverse)
  const starParallaxX = useTransform(smoothX, [-1, 1], [6, -6]);
  const starParallaxY = useTransform(smoothY, [-1, 1], [4, -4]);

  // Click boost
  const [boostScope, animateBoost] = useAnimate();
  const astronautRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const normalizedX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normalizedY = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const handleAstronautClick = useCallback(
    async (e: React.MouseEvent) => {
      if (!astronautRef.current) return;
      const rect = astronautRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Direction away from click
      const dx = centerX - e.clientX;
      const dy = centerY - e.clientY;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const pushX = (dx / dist) * 60;
      const pushY = (dy / dist) * 40;

      await animateBoost(
        boostScope.current,
        { x: pushX, y: pushY, rotate: pushX > 0 ? 15 : -15 },
        { type: "spring", stiffness: 300, damping: 12, duration: 0.3 },
      );
      await animateBoost(
        boostScope.current,
        { x: 0, y: 0, rotate: 0 },
        { type: "spring", stiffness: 80, damping: 15 },
      );
    },
    [animateBoost, boostScope],
  );

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#030712] px-4 text-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Space Background */}
      <StarBackground parallaxX={starParallaxX} parallaxY={starParallaxY} />

      <div className="relative z-10 flex max-w-2xl flex-col items-center">
        {/* Animated Astronaut — 3 layers */}
        {/* Layer 1: Fade-in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-[400px] will-change-transform"
          ref={astronautRef}
          onClick={handleAstronautClick}
        >
          {/* Layer 2: Continuous floating */}
          <motion.div
            animate={{
              y: [0, -18, 0, 12, 0],
              x: [0, 10, -8, 5, 0],
            }}
            transition={{
              y: {
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              },
              x: {
                duration: 11,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <motion.div
              animate={{ rotate: [0, 2, -1.5, 1, 0] }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Layer 3: Mouse parallax + click boost */}
              <motion.div
                ref={boostScope}
                style={{
                  x: astX,
                  y: astY,
                  rotateX: astRotateX,
                  rotateY: astRotateY,
                  perspective: 800,
                }}
                className="cursor-grab active:cursor-grabbing"
              >
                <Lottie
                  animationData={animationData}
                  loop={true}
                  className="pointer-events-none drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 space-y-4"
        >
          <h1 className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-6xl font-bold tracking-tighter text-transparent sm:text-7xl">
            404
          </h1>
          <h2 className="text-2xl font-medium text-slate-200 sm:text-3xl">
            Lost in Space?
          </h2>
          <p className="mx-auto max-w-md text-base text-slate-400 sm:text-lg">
            It seems you've drifted too far into the void. The portal you're
            looking for doesn't exist or has moved to another dimension.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10"
        >
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({ size: "lg" }),
              "group relative h-12 gap-3 overflow-hidden rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-8 font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-indigo-500/50 hover:bg-indigo-500/20 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] active:scale-95",
            )}
          >
            <MoveLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1.5" />
            <span className="relative z-10">Return to Command Center</span>

            {/* Shimmer Effect */}
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </motion.div>
      </div>

      {/* Decorative Orbs */}
      <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-fuchsia-500/10 blur-[120px]" />
    </main>
  );
}
