'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Coffee } from 'lucide-react';
import { SwitchTheme } from './themeSwitch';

const navItems = [
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Guestbook', href: '/guestbook' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <header className="flex items-center justify-between mb-12 px-4 mono relative">
      {/* Left logo */}
      <Link className="relative z-10 transition-all duration-300 hover:rotate-12" href="/">
        <Coffee
          className={`w-4 h-4 transition-colors duration-300 ${isHomePage ? 'text-orange-500' : 'text-foreground hover:text-foreground/60'}`}
        />
      </Link>

      {/* Desktop nav links + theme switch */}
      <div className="hidden md:flex items-center space-x-6">
        {/* Nav Links */}
        {navItems.map(({ name, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              data-href={href}
              className={`relative z-10 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'text-foreground decoration-2'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              {name}
            </Link>
          );
        })}

        <SwitchTheme />
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden flex items-center space-x-4">
        <SwitchTheme />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-10 p-2 transition-transform"
          aria-label="Toggle menu"
        >
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full right-0 mt-2 bg-background border border-border rounded-md p-4 shadow-lg z-20">
          {navItems.map(({ name, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                data-href={href}
                className={`block py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-foreground underline underline-offset-4 decoration-2'
                    : 'text-foreground hover:text-foreground/60'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
