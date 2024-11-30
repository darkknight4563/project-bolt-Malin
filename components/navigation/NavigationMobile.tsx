import React from 'react';
import { Menu } from 'lucide-react';

export default function NavigationMobile() {
  return (
    <button 
      className="md:hidden p-2 rounded-lg text-slate-600 hover:text-violet-600 
        hover:bg-violet-50 transition-all duration-200 focus:outline-none 
        focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
      aria-label="Toggle menu"
    >
      <Menu className="w-6 h-6" />
    </button>
  );
}