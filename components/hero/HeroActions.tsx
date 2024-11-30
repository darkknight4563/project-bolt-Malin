import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroActions() {
  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-4 justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <Link
        to="/get-started"
        className="group bg-gradient-to-r from-violet-600 to-indigo-600 text-white 
          px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-violet-500/20 
          transition-all duration-300 flex items-center justify-center relative overflow-hidden"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-violet-500 to-indigo-500 
          transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500">
        </span>
        <span className="relative flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Begin Your Journey
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
      </Link>
      <Link
        to="/learn-more"
        className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 
          rounded-full font-medium border border-white/20 hover:bg-white/20 
          transition-all duration-300 flex items-center justify-center"
      >
        Explore Features
      </Link>
    </motion.div>
  );
}