'use client';

import React, { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from 'next-themes';

// Define ThemeInput type for explicitTheme
type ThemeInput = {
  light: string[];
  dark: string[];
};

// NOTE: USE THIS THEME LATER
const minimalTheme: ThemeInput = {
  light: ['hsl(0, 0%, 92%)', 'rebeccapurple'],
  dark: ['hsl(0, 0%, 20%)', 'rebeccapurple'],
};
function Github() {
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);

  return (
    <div className="flex justify-center pb-2">
      <GitHubCalendar
        username="MannuVilasara"
        colorScheme={isDarkMode ? 'dark' : 'light'}
        blockSize={7.5}
        fontSize={14}
      />
    </div>
  );
}

export default Github;
