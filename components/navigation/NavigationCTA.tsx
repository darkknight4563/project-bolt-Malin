import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function NavigationCTA() {
  return (
    <div className="hidden md:flex items-center">
      <Link
        to="/get-started"
        className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm 
          font-medium text-white bg-violet-600 rounded-lg overflow-hidden group 
          hover:shadow-lg hover:shadow-violet-500/20 transition-all duration-200"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-violet-500 
          to-violet-600 transform translate-x-[-100%] group-hover:translate-x-[100%] 
          transition-transform duration-300" />
        <span className="relative flex items-center gap-2">
          Get Started
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
        </span>
      </Link>
    </div>
  );
}