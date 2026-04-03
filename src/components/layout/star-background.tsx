"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
}

export function StarBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Generate stars only on the client side to avoid hydration mismatches
    const generatedStars = Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1, // 1px to 3px
      duration: Math.random() * 3 + 2, // 2s to 5s
      delay: Math.random() * 2,
      opacity: [
        Math.random() * 0.3 + 0.1, // starting opacity
        Math.random() * 0.6 + 0.4, // peak opacity (brighter)
        Math.random() * 0.3 + 0.1, // ending opacity
      ],
    }));

    const generatedMeteors = Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      // Start in the top/right quadrant, sometimes off screen
      top: `${Math.random() * 30 - 10}%`, 
      left: `${Math.random() * 60 + 50}%`,
      delay: Math.random() * 25 + 15, // 15s to 40s travel delay (much lower frequency)
      duration: Math.random() * 1.5 + 5.2, // 1.2s to 2.7s travel time
    }));
    
    setStars(generatedStars);
    setMeteors(generatedMeteors);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-transparent transition-opacity duration-700 dark:opacity-100 opacity-0">
        {/* Static Twinkling Stars */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.4)]"
            style={{
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: star.opacity,
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Shooting Stars (Meteors) */}
        {meteors.map((m) => (
          <motion.div
            key={`meteor-${m.id}`}
            // Reduced width from 80px to 45px, reduced shadow from 10px to 6px
            className="absolute h-[1px] w-[45px] bg-gradient-to-r from-transparent via-white to-white rounded-full shadow-[0_0_6px_1px_rgba(255,255,255,0.4)]"
            style={{ 
              top: m.top, 
              left: m.left,
              rotate: "-45deg", // points from top right to bottom left
              transformOrigin: "left center" 
            }}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0], 
              x: -1200, 
              y: 1200 
            }}
            transition={{
              duration: m.duration,
              repeat: Infinity,
              delay: m.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>
      
      {/* === Light Mode Background === */}
      <div className="absolute inset-0 bg-transparent transition-opacity duration-700 dark:opacity-0 opacity-100">
        
        {/* Subtle dot grid pattern */}
        <div 
           className="absolute inset-0 opacity-40"
           style={{
             backgroundImage: "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.3) 1px, transparent 0)",
             backgroundSize: "32px 32px"
           }}
        />

        {/* Ambient Pastel Orb 1 (Top Left) */}
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-[100px] bg-indigo-300/30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
            x: [0, 30, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Ambient Pastel Orb 2 (Right) */}
        <motion.div
          className="absolute top-[5%] right-[-5%] w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[100px] bg-sky-300/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
            y: [0, -40, 0],
            x: [0, -20, 0]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Ambient Pastel Orb 3 (Bottom Left) */}
        <motion.div
          className="absolute bottom-[0%] left-[10%] w-[700px] h-[700px] rounded-full mix-blend-multiply filter blur-[120px] bg-fuchsia-300/20"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, -30, 0],
            y: [0, -10, 0]
          }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating Light Particles */}
        {stars.slice(0, 30).map((star) => (
          <motion.div
            key={`light-${star.id}`}
            className="absolute rounded-full bg-slate-400/20"
            style={{
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              y: [0, -10, 0]
            }}
            transition={{
              duration: star.duration * 2,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
