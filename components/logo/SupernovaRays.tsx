import React from 'react';
import { motion } from 'framer-motion';

interface SupernovaRaysProps {
  className?: string;
}

export default function SupernovaRays({ className = '' }: SupernovaRaysProps) {
  return (
    <motion.div 
      className={`absolute inset-0 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: [0.4, 0.6, 0.4],
        scale: [0.8, 1.1, 0.8],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Primary rays */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`primary-${i}`}
          className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-violet-500/50 via-white/30 to-transparent origin-left"
          style={{
            transform: `rotate(${i * 30}deg) translateX(-50%)`,
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Secondary rays */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`secondary-${i}`}
          className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-indigo-500/30 via-purple-300/20 to-transparent origin-left"
          style={{
            transform: `rotate(${(i * 45) + 22.5}deg) translateX(-50%)`,
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );
}