'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Coffee } from 'lucide-react';
import { SwitchTheme } from './themeSwitch';

const mainNavItems = [
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
];

const dropdownNavItems = [
  { name: 'Guestbook', href: '/guestbook' },
  { name: 'Stats', href: '/stats' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
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
        {/* Main Nav Links */}
        {mainNavItems.map(({ name, href }) => {
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

        {/* Desktop dropdown for additional items */}
        <div className="relative">
          <button
            onClick={() => setIsDesktopDropdownOpen(!isDesktopDropdownOpen)}
            className="relative z-10 p-1 text-sm font-medium transition-all duration-300 text-foreground/70 hover:text-foreground flex items-center"
            aria-label="More options"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isDesktopDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isDesktopDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 bg-background border border-border rounded-md p-4 shadow-lg z-20 min-w-[120px]">
              {dropdownNavItems.map(({ name, href }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    data-href={href}
                    className={`block py-2 text-sm font-medium transition-all duration-300 ${
                      isActive ? 'text-foreground' : 'text-foreground hover:text-foreground/60'
                    }`}
                    onClick={() => setIsDesktopDropdownOpen(false)}
                  >
                    {name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <SwitchTheme />
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden flex items-center space-x-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-10 p-2 transition-transform"
          aria-label="Toggle menu"
        >
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <SwitchTheme />
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full right-0 mt-2 bg-background border border-border rounded-md p-4 shadow-lg z-20">
          {[...mainNavItems, ...dropdownNavItems].map(({ name, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                data-href={href}
                className={`block py-2 text-sm font-medium transition-all duration-300 ${
                  isActive ? 'text-foreground' : 'text-foreground hover:text-foreground/60'
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
