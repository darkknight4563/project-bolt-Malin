import React from 'react';
import { motion } from 'framer-motion';

export default function HeroBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950 via-slate-900 to-indigo-950">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 opacity-30"
          animate={{
            opacity: [0.2, 0.3, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/50 to-slate-900/90" />
    </>
  );
}