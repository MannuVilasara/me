'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Command, Menu, X } from 'lucide-react';
import { SwitchTheme } from './themeSwitch';

const navItems = [
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Guestbook', href: '/guestbook' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleOpenCommandMenu = () => {
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  return (
    <header className="relative z-40 mb-12 sm:mb-16">
      <div className="mx-auto flex items-center justify-between px-3 py-2 sm:px-4 sm:py-2.5 rounded-full border border-border/80 bg-card/75 backdrop-blur-md shadow-xs transition-colors">
        {/* Left: Brand Icon + Status */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 px-2 py-1 rounded-full hover:bg-muted/50 transition-colors"
          aria-label="Home"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground/5 text-foreground group-hover:scale-105 transition-transform">
            <Coffee className="h-3.5 w-3.5 text-foreground/80 group-hover:text-foreground transition-colors" />
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            mannu
          </span>
        </Link>

        {/* Center: Desktop Navigation with animated pill */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors"
              >
                {isActive && (
                  <motion.span
                    layoutId="navbar-pill"
                    className="absolute inset-0 rounded-full bg-muted border border-border/40"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    isActive
                      ? 'text-foreground font-semibold'
                      : 'text-muted-foreground hover:text-foreground transition-colors'
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions (Command Menu, Theme Switch, Mobile Hamburger) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Command Menu Shortcut Trigger */}
          <button
            onClick={handleOpenCommandMenu}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono text-muted-foreground bg-muted/40 hover:bg-muted/80 hover:text-foreground border border-border/40 transition-all cursor-pointer"
            title="Open command menu (⌘K)"
          >
            <Command className="h-3 w-3" />
            <span className="text-[10px]">⌘K</span>
          </button>

          {/* Theme switcher */}
          <SwitchTheme />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex md:hidden h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl border border-border/80 bg-background/95 backdrop-blur-lg shadow-lg md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-muted text-foreground font-semibold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleOpenCommandMenu();
                }}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors text-left"
              >
                <span>Command Menu</span>
                <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">⌘K</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
