'use client';
import { useEffect, useState } from 'react';

export default function LocationTime() {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZone: 'Asia/Kolkata',
      };
      setTimeString(now.toLocaleTimeString('en-IN', options));
    }

    updateTime(); // initial call
    const interval = setInterval(updateTime, 1000); // update every second

    return () => clearInterval(interval);
  }, []);

  return <>🇮🇳 IST — {timeString}</>;
}
