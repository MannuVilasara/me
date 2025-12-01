'use client';

import React, { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from 'next-themes';

function Github() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show skeleton until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="flex justify-center pb-2">
        <div className="w-full max-w-3xl space-y-3">
          {/* Month labels skeleton */}
          <div className="flex gap-6 pl-10">
            {[
              'Dec',
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
            ].map((_, i) => (
              <div key={i} className="h-3 w-7 animate-pulse rounded bg-muted" />
            ))}
          </div>
          {/* Calendar grid skeleton */}
          <div className="flex gap-[3px]">
            {[...Array(53)].map((_, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {[...Array(7)].map((_, dayIndex) => (
                  <div
                    key={dayIndex}
                    className="size-2.5 animate-pulse rounded-sm bg-muted"
                    style={{ animationDelay: `${(weekIndex * 7 + dayIndex) * 5}ms` }}
                  />
                ))}
              </div>
            ))}
          </div>
          {/* Footer skeleton */}
          <div className="flex justify-between items-center pt-1">
            <div className="h-3 w-48 animate-pulse rounded bg-muted" />
            <div className="flex items-center gap-1">
              <div className="h-3 w-8 animate-pulse rounded bg-muted" />
              {[...Array(5)].map((_, i) => (
                <div key={i} className="size-2.5 animate-pulse rounded-sm bg-muted" />
              ))}
              <div className="h-3 w-8 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center pb-2">
      <GitHubCalendar
        username="MannuVilasara"
        colorScheme={resolvedTheme === 'dark' ? 'dark' : 'light'}
        blockSize={7.5}
        fontSize={14}
      />
    </div>
  );
}

export default Github;
