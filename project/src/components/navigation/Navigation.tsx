import React from 'react';
import { useLocation } from 'react-router-dom';
import NavigationLogo from './NavigationLogo';
import NavigationLink from './NavigationLink';
import NavigationCTA from './NavigationCTA';
import NavigationMobile from './NavigationMobile';

const navigation = [
  { name: 'Features', href: '/features', hasDropdown: true },
  { name: 'Content Library', href: '/content-library', hasDropdown: true },
  { name: 'Community', href: '/community', hasDropdown: true },
  { name: 'Mood', href: '/mood-tracker', hasDropdown: true },
  { name: 'Privacy', href: '/privacy', hasDropdown: true }
];

export default function Navigation() {
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <NavigationLogo />
          
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <NavigationLink
                key={item.name}
                item={item}
                isActive={isActive(item.href)}
              />
            ))}
          </nav>

          <NavigationCTA />
          <NavigationMobile />
        </div>
      </div>
    </header>
  );
}