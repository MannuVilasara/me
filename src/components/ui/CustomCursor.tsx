'use client';

import React, { useEffect, useRef, useState } from 'react';

const AMOUNT = 20;
const SINE_DOTS = Math.floor(AMOUNT * 0.3);
const WIDTH = 26;
const IDLE_TIMEOUT = 150;

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]); // Array of refs for spans

  // Data state refs to persist across renders without causing re-renders
  const mousePosition = useRef({ x: 0, y: 0 });
  const dotsData = useRef<Dot[]>([]);
  const idle = useRef(false);
  const timeoutID = useRef<NodeJS.Timeout | undefined>(undefined);
  const animationFrame = useRef<number | undefined>(undefined);

  class Dot {
    index: number;
    anglespeed = 0.05;
    x = 0;
    y = 0;
    scale: number;
    range: number;
    limit: number;
    lockX = 0;
    lockY = 0;
    angleX = 0;
    angleY = 0;

    constructor(index: number) {
      this.index = index;
      this.scale = 1 - 0.05 * index;
      this.range = WIDTH / 2 - (WIDTH / 2) * this.scale + 2;
      this.limit = WIDTH * 0.75 * this.scale;
    }

    lock() {
      this.lockX = this.x;
      this.lockY = this.y;
      this.angleX = Math.PI * 2 * Math.random();
      this.angleY = Math.PI * 2 * Math.random();
    }

    update() {
      if (!idle.current || this.index <= SINE_DOTS) {
        // Follow logic handled in render loop for x/y
      } else {
        this.angleX += this.anglespeed;
        this.angleY += this.anglespeed;
        this.y = this.lockY + Math.sin(this.angleY) * this.range;
        this.x = this.lockX + Math.sin(this.angleX) * this.range;
      }
    }
  }

  useEffect(() => {
    // Media query check
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsDesktop(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    // Initialize dots data
    dotsData.current = Array.from({ length: AMOUNT }, (_, i) => new Dot(i));

    // Initialize positions to center
    const { innerWidth, innerHeight } = window;
    dotsData.current.forEach((d) => {
      d.x = innerWidth / 2;
      d.y = innerHeight / 2;
    });

    // Reset mouse position to center initially too so it doesn't fly in from 0,0
    mousePosition.current = { x: innerWidth / 2, y: innerHeight / 2 };

    const startIdleTimer = () => {
      timeoutID.current = setTimeout(goInactive, IDLE_TIMEOUT);
      idle.current = false;
    };

    const resetIdleTimer = () => {
      clearTimeout(timeoutID.current);
      startIdleTimer();
    };

    const goInactive = () => {
      idle.current = true;
      for (let dot of dotsData.current) {
        dot.lock();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current.x = e.clientX;
      mousePosition.current.y = e.clientY;
      resetIdleTimer();
    };

    const render = () => {
      let x = mousePosition.current.x;
      let y = mousePosition.current.y;

      dotsData.current.forEach((dot, index) => {
        let nextDot = dotsData.current[index + 1] || dotsData.current[0];

        dot.update();

        if (!idle.current || index <= SINE_DOTS) {
          // Exact logic from Svelte snippet
          dot.x = x;
          dot.y = y;

          const dx = (nextDot.x - x) * 0.35;
          const dy = (nextDot.y - y) * 0.35;
          x += dx;
          y += dy;
        }

        // Apply to DOM
        const dotElement = dotsRef.current[index];
        if (dotElement) {
          dotElement.style.transform = `translate(${dot.x}px, ${dot.y}px) scale(${dot.scale})`;
        }
      });

      animationFrame.current = requestAnimationFrame(render);
    };

    startIdleTimer();
    window.addEventListener('mousemove', handleMouseMove);
    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      if (timeoutID.current) clearTimeout(timeoutID.current);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className="hidden" // Tailwind 'hidden'
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div
        ref={containerRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-full w-full mix-blend-difference"
        style={{ filter: "url('#goo')" }}
      >
        {Array.from({ length: AMOUNT }).map((_, i) => (
          <span
            key={i}
            ref={(el) => {
              dotsRef.current[i] = el;
            }}
            className="absolute block h-[26px] w-[26px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white will-change-transform"
          />
        ))}
      </div>
    </>
  );
}
