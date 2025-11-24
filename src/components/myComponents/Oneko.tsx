'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function Oneko() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      // Only show on screens wider than 768px
      setIsDesktop(window.matchMedia('(min-width: 768px)').matches);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (!isDesktop) return null;

  return <Script src="/oneko/oneko.js" strategy="lazyOnload" data-cat="/oneko/oneko.gif" />;
}
