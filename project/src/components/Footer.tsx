import React from 'react';
import { Instagram, Facebook, Mail, X } from 'lucide-react';
import Logo from './Logo';

const navigation = [
  { name: 'About Us', href: '#' },
  { name: 'Contact', href: '#' },
  { name: 'Privacy Policy', href: '#' }
];

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'X', icon: X, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Email', icon: Mail, href: '#' }
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column: Logo, Description, and Navigation */}
          <div className="space-y-8">
            <div className="flex flex-col items-center lg:items-start">
              <div className="mb-3">
                <Logo className="text-violet-600" />
              </div>
              <p className="text-slate-600 text-center lg:text-left max-w-md text-sm sm:text-base">
                Empowering individuals on their journey to mental wellness through 
                compassionate care and expert guidance.
              </p>
            </div>

            <nav>
              <ul className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm sm:text-base text-slate-600 hover:text-violet-600 
                        transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex justify-center lg:justify-start gap-4 sm:gap-6">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-slate-400 hover:text-violet-600 transition-colors duration-200"
                    aria-label={item.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column: Mission Statement */}
          <div className="lg:pl-8">
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8">
              <h3 className="font-display text-lg sm:text-xl font-medium text-slate-900 mb-4">
                Our Mission
              </h3>
              <p className="text-slate-600 text-sm sm:text-base mb-6">
                We're dedicated to making mental health support accessible, personalized, 
                and effective for everyone. Through innovative technology and expert guidance, 
                we help you build lasting positive change.
              </p>
              <div className="text-sm text-slate-500">
                Together, we're building a future where mental wellness is within everyone's reach.
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs sm:text-sm text-slate-500 pt-8 sm:pt-12 mt-8 
          border-t border-slate-100">
          <p>&copy; {new Date().getFullYear()} Malin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}