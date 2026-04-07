"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface Star {
  id: number;
  x: string;
  y: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number[];
}

interface Meteor {
  id: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
  width: number;
  repeatDelay: number;
}

const stars: Star[] = Array.from({ length: 145 }).map((_, i) => {
  let x = Math.random() * 100;
  let y = Math.random() * 100;

  if (i < 85) {
    // Concentrated in the top 60% of the screen
    y = Math.random() * 60;
  } else if (i < 130) {
    // Normal random distribution across whole screen
    y = Math.random() * 100;
  } else {
    // Targeting the bottom-right quadrant as requested
    x = Math.random() * 35 + 65; // 65% to 100%
    y = Math.random() * 35 + 65; // 65% to 100%
  }

  return {
    id: i,
    x: `${x}%`,
    y: `${y}%`,
    size: Math.random() * 2.5 + 0.8,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 3,
    opacity: [
      Math.random() * 0.25 + 0.15,
      Math.random() * 0.5 + 0.5,
      Math.random() * 0.25 + 0.15,
    ],
  };
});

const meteors: Meteor[] = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  top: `${Math.random() * 40 - 5}%`,
  left: `${Math.random() * 70 + 30}%`,
  delay: i * 4 + Math.random() * 5,
  duration: Math.random() * 1.1 + 2.2,
  width: Math.random() * 60 + 70,
  repeatDelay: Math.random() * 12 + 8,
}));

export function StarBackground() {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!mounted) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {resolvedTheme === "dark" ? (
        <div className="absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-[400px] bg-gradient-to-b from-indigo-900/20 to-transparent" />

          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: star.x,
                top: star.y,
                width: star.size,
                height: star.size,
                boxShadow: `0 0 ${star.size * 3}px ${star.size}px rgba(255,255,255,0.35)`,
              }}
              animate={{ opacity: star.opacity }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
                ease: "easeInOut",
              }}
            />
          ))}

          {meteors.map((meteor) => (
            <motion.div
              key={`meteor-${meteor.id}`}
              className="absolute h-[1.5px] rounded-full"
              style={{
                top: meteor.top,
                left: meteor.left,
                width: meteor.width,
                rotate: "-45deg",
                transformOrigin: "left center",
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, white 100%)",
                boxShadow: "0 0 8px 2px rgba(255,255,255,0.3)",
              }}
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: -1400,
                y: 1400,
              }}
              transition={{
                duration: meteor.duration,
                repeat: Infinity,
                delay: meteor.delay,
                repeatDelay: meteor.repeatDelay,
                ease: "linear",
              }}
            />
          ))}
        </div>
      ) : (
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.3) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <motion.div
            className="absolute left-[-10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-300/30 mix-blend-multiply blur-[100px]"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
              x: [0, 30, 0],
              y: [0, 20, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[-5%] top-[5%] h-[500px] w-[500px] rounded-full bg-sky-300/30 mix-blend-multiply blur-[100px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
              y: [0, -40, 0],
              x: [0, -20, 0],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-[10%] h-[700px] w-[700px] rounded-full bg-fuchsia-300/20 mix-blend-multiply blur-[120px]"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, -30, 0],
            }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}
    </div>
  );
}
