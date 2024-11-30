import React from 'react';
import { motion } from 'framer-motion';

interface SupernovaCoreProps {
  className?: string;
}

export default function SupernovaCore({ className = '' }: SupernovaCoreProps) {
  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/40 via-indigo-500/40 to-purple-500/40 blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Middle glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-400/60 to-indigo-400/60 blur-md"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Core center */}
      <motion.div
        className="relative w-full h-full rounded-full bg-gradient-to-br from-white via-violet-200 to-violet-300"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Inner highlight */}
        <div className="absolute inset-[15%] rounded-full bg-white/80 blur-sm" />
      </motion.div>
    </motion.div>
  );
}