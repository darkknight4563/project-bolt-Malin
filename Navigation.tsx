import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'Content Library', href: '/library' },
  { name: 'Community', href: '/community' },
  { name: 'Privacy', href: '/privacy' },
  { name: 'Mood Tracker', href: '/mood-tracker' },
];

export default function Navigation() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => location.pathname === href;

  const scrollToSection = (href: string) => {
    if (href.startsWith('/#')) {
      const element = document.querySelector(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex-shrink-0">
            <Logo className="text-violet-600" />
          </Link>
          
          <nav className="hidden sm:flex items-center gap-6">
            {navigation.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-violet-600
                    ${isActive(item.href) ? 'text-violet-600' : 'text-slate-700'}`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="hidden sm:flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-700 hover:text-violet-600 transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/get-started"
              className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-violet-600 text-white hover:bg-violet-700 -my-2.5"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden p-2 rounded-lg text-slate-600 hover:text-violet-600 hover:bg-slate-100"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-white border-b border-slate-200"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={(e) => {
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-sm font-medium ${
                      isActive(item.href) ? 'text-violet-600' : 'text-slate-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col gap-4 pt-4 border-t border-slate-200">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-slate-600"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/get-started"
                    className="px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-lg"
                  >
                    Get Started
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}