'use client';

import Link from 'next/link';
import { SwitchTheme } from '@/components/myComponents/themeSwitch';

const navItems = [
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
  { name: 'About', href: '/about' },
];

export default function Navbar() {
  return (
    <header className="flex items-center justify-between mb-12 px-4 mono">
      {/* Left logo */}
      <Link className="relative z-10 transition-colors hover:text-foreground/60" href="/">
        ~
      </Link>

      {/* Right nav links + theme switch */}
      <div className="relative flex items-center space-x-6">
        {/* Nav Links */}
        {navItems.map(({ name, href }) => (
          <Link
            key={href}
            href={href}
            data-href={href}
            className="relative z-10 text-sm font-medium transition-colors hover:text-foreground/60"
          >
            {name}
          </Link>
        ))}

        <SwitchTheme />
      </div>
    </header>
  );
}
