import React from 'react';
import { motion } from 'framer-motion';

export default function HeroHeading() {
  return (
    <div className="text-center mb-8">
      <motion.span 
        className="inline-block font-display text-violet-300 text-sm sm:text-lg font-medium tracking-wide mb-4 uppercase"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Begin Your Wellness Journey
      </motion.span>
      <motion.h1 
        className="font-display text-3xl sm:text-4xl md:text-display-lg font-light text-white mb-6 sm:mb-8 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Find Peace Within,
        <span className="block font-medium bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
          Thrive Without
        </span>
      </motion.h1>
      <motion.p 
        className="text-lg sm:text-body-lg text-slate-200 max-w-2xl mx-auto mb-8 sm:mb-12 font-light px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        Experience personalized mindfulness exercises, expert guidance, and a supportive 
        community on your journey to better mental health.
      </motion.p>
    </div>
  );
}