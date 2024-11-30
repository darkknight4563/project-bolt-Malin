import React from 'react';
import { motion } from 'framer-motion';

interface LogoTextProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export default function LogoText({ className = '', theme = 'light' }: LogoTextProps) {
  const textColor = theme === 'light' ? 'text-white' : 'text-slate-900';
  const glowColor = theme === 'light' ? 'text-shadow-white' : 'text-shadow-violet';

  return (
    <motion.span 
      className={`font-display text-lg sm:text-xl font-medium ${textColor} ${glowColor} ${className}`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      Malin
    </motion.span>
  );
}