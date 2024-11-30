import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

export default function NavigationLogo() {
  return (
    <Link 
      to="/" 
      className="flex-shrink-0 group p-2 rounded-lg transition-all duration-200 
        hover:bg-violet-50"
    >
      <Logo className="text-violet-600 transition-colors duration-200 group-hover:text-violet-700" />
    </Link>
  );
}