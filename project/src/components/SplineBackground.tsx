import React from 'react';
import { motion } from 'framer-motion';

function Star({ delay = 0, x = 0, y = 0 }: { delay?: number; x?: number; y?: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-white rounded-full"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: Math.random() * 2 + 1,
        repeat: Infinity,
        delay: delay,
      }}
    />
  );
}

function ShootingStar({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute w-0.5 h-0.5 bg-white rounded-full"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 50}%`,
      }}
      initial={{ opacity: 0, scale: 0, rotate: -45 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        x: [0, 100],
        y: [0, 100],
      }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        delay: delay,
        ease: "linear",
      }}
    />
  );
}

function Galaxy() {
  return (
    <motion.div
      className="absolute w-96 h-96 rounded-full opacity-20"
      style={{
        background: 'radial-gradient(circle, rgba(167,139,250,0.3) 0%, rgba(139,92,246,0) 70%)',
        left: '50%',
        top: '30%',
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.3, 0.2],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

export default function SplineBackground() {
  // Generate random positions for stars
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
  }));

  // Generate shooting stars
  const shootingStars = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    delay: i * 2,
  }));

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950 via-indigo-950 to-slate-900">
        {/* Star pattern */}
        {stars.map((star) => (
          <Star key={star.id} x={star.x} y={star.y} delay={star.delay} />
        ))}

        {/* Shooting stars */}
        {shootingStars.map((star) => (
          <ShootingStar key={star.id} delay={star.delay} />
        ))}

        {/* Galaxy effect */}
        <Galaxy />

        {/* Additional galaxies */}
        <motion.div
          className="absolute w-full h-full opacity-30"
          style={{
            background: 'radial-gradient(circle at 70% 20%, rgba(139,92,246,0.3) 0%, rgba(0,0,0,0) 50%)',
          }}
        />
        <motion.div
          className="absolute w-full h-full opacity-20"
          style={{
            background: 'radial-gradient(circle at 30% 70%, rgba(129,140,248,0.3) 0%, rgba(0,0,0,0) 50%)',
          }}
        />

        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwdjJoLTYweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-20" />
      </div>

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/50 to-slate-900/90" />
    </div>
  );
}