import React from 'react';
import LoadingScreen from './LoadingScreen';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  className?: string;
}

export default function LoadingSpinner({ fullScreen = false, className = '' }: LoadingSpinnerProps) {
  if (fullScreen) {
    return <LoadingScreen />;
  }

  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      <div className="w-8 h-8 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
    </div>
  );
}