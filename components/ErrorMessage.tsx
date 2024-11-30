import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message?: string;
  className?: string;
}

export default function ErrorMessage({ message = 'An error occurred', className = '' }: ErrorMessageProps) {
  return (
    <div className={`flex items-center justify-center p-4 bg-rose-50 text-rose-600 rounded-lg ${className}`}>
      <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
      <span className="text-sm">{message}</span>
    </div>
  );
}