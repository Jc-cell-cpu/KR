"use client";

import { useEffect, useState } from "react";
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
}

export function StarBackground() {
  const { resolvedTheme } = useTheme();
  const [stars, setStars] = useState<Star[]>([]);
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // More stars concentrated toward the top half for better top-area visibility
    const generatedStars = Array.from({ length: 120 }).map((_, i) => {
      const inTopHalf = i < 70; // bias more stars to top 50%
      return {
        id: i,
        x: `${Math.random() * 100}%`,
        y: inTopHalf ? `${Math.random() * 55}%` : `${Math.random() * 100}%`,
        size: Math.random() * 2.5 + 0.8,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 3,
        opacity: [
          Math.random() * 0.25 + 0.15,
          Math.random() * 0.5 + 0.5,  // brighter peak
          Math.random() * 0.25 + 0.15,
        ],
      };
    });

    const generatedMeteors = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 40 - 5}%`,   // mostly top area
      left: `${Math.random() * 70 + 30}%`,  // right half, crosses screen diagonally
      delay: i * 4 + Math.random() * 5,     // spread 0–29s
      duration: Math.random() * 1.1 + 2.2,  // 2.8–4.3s — slow enough to follow visually
      width: Math.random() * 60 + 70,       // 70–130px trail
    }));

    setStars(generatedStars);
    setMeteors(generatedMeteors);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <>
        {resolvedTheme === "dark" ? (
          <div key="dark-bg" className="absolute inset-0">
            {/* Subtle top radial glow so stars stand out against the dark bg */}
            <div className="absolute inset-x-0 top-0 h-[400px] bg-gradient-to-b from-indigo-900/20 to-transparent" />

            {/* Twinkling stars */}
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

            {/* Shooting stars / meteors */}
            {meteors.map((m) => (
              <motion.div
                key={`meteor-${m.id}`}
                className="absolute h-[1.5px] rounded-full"
                style={{
                  top: m.top,
                  left: m.left,
                  width: m.width,
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
                  duration: m.duration,
                  repeat: Infinity,
                  delay: m.delay,
                  repeatDelay: Math.random() * 12 + 8, // 8–20s between repeats
                  ease: "linear",
                }}
              />
            ))}
          </div>
        ) : (
          <div key="light-bg" className="absolute inset-0">
            {/* Dot grid */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.3) 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />
            {/* Pastel orb — top left */}
            <motion.div
              className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-[100px] bg-indigo-300/30"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5], x: [0, 30, 0], y: [0, 20, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Pastel orb — top right */}
            <motion.div
              className="absolute top-[5%] right-[-5%] w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[100px] bg-sky-300/30"
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4], y: [0, -40, 0], x: [0, -20, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Pastel orb — bottom left */}
            <motion.div
              className="absolute bottom-0 left-[10%] w-[700px] h-[700px] rounded-full mix-blend-multiply filter blur-[120px] bg-fuchsia-300/20"
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3], x: [0, -30, 0] }}
              transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        )}
      </>
    </div>
  );
}
