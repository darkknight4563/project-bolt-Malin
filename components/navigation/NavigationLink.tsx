import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import NavigationDropdown from './NavigationDropdown';

interface NavigationLinkProps {
  item: {
    name: string;
    href: string;
    hasDropdown?: boolean;
  };
  isActive: boolean;
}

export default function NavigationLink({ item, isActive }: NavigationLinkProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const handleMouseEnter = () => {
    if (item.hasDropdown) {
      setIsDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (item.hasDropdown) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={item.href}
        className={`relative group inline-flex items-center gap-1.5 py-2.5 px-6 min-w-[120px]
          justify-center rounded-lg text-sm font-medium transition-all duration-200 ${
          isActive 
            ? 'text-violet-600 bg-violet-50' 
            : 'text-slate-600 hover:text-violet-600 hover:bg-violet-50'
        }`}
      >
        {item.name}
        {item.hasDropdown && (
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
            isDropdownOpen ? 'rotate-180 text-violet-600' : 'text-slate-400 group-hover:text-violet-600'
          }`} />
        )}
      </Link>

      {item.hasDropdown && (
        <NavigationDropdown
          isOpen={isDropdownOpen}
          category={item.name.toLowerCase().replace(/\s+/g, '-')}
          onClose={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
}