import React from 'react';
import Navigation from './navigation/Navigation';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50/50">
      <Navigation />
      <main className="pt-16 sm:pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}