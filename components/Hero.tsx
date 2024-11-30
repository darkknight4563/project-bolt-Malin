import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { motion } from 'framer-motion';
import SplineBackground from './SplineBackground';

export default function Hero() {
  return (
    <header className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <SplineBackground />
      
      <motion.div 
        className="absolute top-0 left-0 w-full p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container mx-auto">
          <Logo className="text-white" />
        </div>
      </motion.div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span 
          className="inline-block font-display text-violet-300 text-sm sm:text-lg font-medium tracking-wide mb-4 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Welcome to Mindful Living
        </motion.span>
        <motion.h1 
          className="font-display text-3xl sm:text-4xl md:text-display-lg font-light text-white mb-6 sm:mb-8 leading-tight max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Your Mental Health
          <span className="block font-medium bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
            Matters
          </span>
        </motion.h1>
        <motion.p 
          className="text-lg sm:text-body-lg text-slate-200 max-w-2xl mx-auto mb-8 sm:mb-12 font-light px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Take control of your mental well-being with personalized mindfulness exercises 
          and expert guidance in a luxurious, supportive environment.
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            to="/get-started"
            className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white 
              px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:shadow-lg hover:shadow-violet-500/20 
              transition-all duration-300 flex items-center gap-2 justify-center group"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/learn-more"
            className="bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 
              rounded-full font-medium border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </header>
  );
}