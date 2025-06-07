'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';

export function ProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.1 });
    NProgress.start();
    NProgress.done();
  }, [pathname]);

  return null;
}
