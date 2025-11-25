'use client';

import { useEffect, useState } from 'react';
import OnekoCat from './OnekoCat';

// Extend Window interface to include oneko
declare global {
  interface Window {
    oneko?: any;
    onekoEnabled?: boolean;
  }
}

export default function Oneko() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      // Only show on screens wider than 768px
      setIsDesktop(window.matchMedia('(min-width: 768px)').matches);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    // Load saved preference
    const saved = localStorage.getItem('oneko-enabled');
    if (saved !== null) {
      setIsEnabled(saved === 'true');
      window.onekoEnabled = saved === 'true';
    } else {
      window.onekoEnabled = true;
    }

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Listen for changes from the toggle button
  useEffect(() => {
    const handleToggle = (event: CustomEvent) => {
      const newEnabled = event.detail.enabled;
      setIsEnabled(newEnabled);
      window.onekoEnabled = newEnabled;
    };

    window.addEventListener('oneko-toggle', handleToggle as EventListener);
    return () => window.removeEventListener('oneko-toggle', handleToggle as EventListener);
  }, []);

  if (!isDesktop) return null;

  return <OnekoCat enabled={isEnabled} catImage="/oneko/oneko.gif" />;
}
