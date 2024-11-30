import React from 'react';
import HeroBackground from './HeroBackground';
import HeroHeading from './HeroHeading';
import HeroActions from './HeroActions';
import Logo from '../Logo';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <header className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <HeroBackground />
      
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
        <HeroHeading />
        <HeroActions />
      </div>
    </header>
  );
}