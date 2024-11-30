import React from 'react';
import { Flower } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Flower className="w-6 h-6 sm:w-8 sm:h-8" />
      <span className="font-display text-lg sm:text-xl font-medium">Malin</span>
    </div>
  );
}