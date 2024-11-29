import React from 'react';
import SupernovaCore from './SupernovaCore';
import SupernovaRays from './SupernovaRays';
import SupernovaDebris from './SupernovaDebris';
import LogoText from './LogoText';

interface LogoProps {
  className?: string;
  theme?: 'light' | 'dark';
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ 
  className = '', 
  theme = 'light', 
  showText = true,
  size = 'md'
}: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8 sm:w-10 sm:h-10',
    lg: 'w-12 h-12 sm:w-14 sm:h-14'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`relative ${sizeClasses[size]}`}>
        <SupernovaRays />
        <SupernovaCore className="w-full h-full" />
        <SupernovaDebris />
      </div>
      {showText && <LogoText theme={theme} />}
    </div>
  );
}