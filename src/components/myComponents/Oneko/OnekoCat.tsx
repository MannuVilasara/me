'use client';

import { useEffect, useRef, useState } from 'react';
import './OnekoCat.css';

interface OnekoCatProps {
  enabled?: boolean;
  catImage?: string;
}

export default function OnekoCat({ enabled = true, catImage = '/oneko/oneko.gif' }: OnekoCatProps) {
  const catRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(enabled);

  // Cat state
  const catStateRef = useRef({
    nekoPosX: 32,
    nekoPosY: 32,
    mousePosX: 0,
    mousePosY: 0,
    frameCount: 0,
    idleTime: 0,
    idleAnimation: null as string | null,
    idleAnimationFrame: 0,
    lastFrameTimestamp: 0,
  });

  // Sprite sets (same as oneko.js)
  const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    scratchWallN: [
      [0, 0],
      [0, -1],
    ],
    scratchWallS: [
      [-7, -1],
      [-6, -2],
    ],
    scratchWallE: [
      [-2, -2],
      [-2, -3],
    ],
    scratchWallW: [
      [-4, 0],
      [-4, -1],
    ],
    tired: [[-3, -2]],
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    N: [
      [-1, -2],
      [-1, -3],
    ],
    NE: [
      [0, -2],
      [0, -3],
    ],
    E: [
      [-3, 0],
      [-3, -1],
    ],
    SE: [
      [-5, -1],
      [-5, -2],
    ],
    S: [
      [-6, -3],
      [-7, -2],
    ],
    SW: [
      [-5, -3],
      [-6, -1],
    ],
    W: [
      [-4, -2],
      [-4, -3],
    ],
    NW: [
      [-1, 0],
      [-1, -1],
    ],
  };

  const nekoSpeed = 10;

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      catStateRef.current.mousePosX = event.clientX;
      catStateRef.current.mousePosY = event.clientY;
    };

    if (enabled) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enabled]);

  // Set sprite function
  const setSprite = (name: string, frame: number) => {
    if (!catRef.current) return;
    const sprite =
      spriteSets[name as keyof typeof spriteSets][
        frame % spriteSets[name as keyof typeof spriteSets].length
      ];
    catRef.current.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  };

  // Reset idle animation
  const resetIdleAnimation = () => {
    catStateRef.current.idleAnimation = null;
    catStateRef.current.idleAnimationFrame = 0;
  };

  // Idle function
  const idle = () => {
    catStateRef.current.idleTime += 1;

    // every ~ 20 seconds
    if (
      catStateRef.current.idleTime > 10 &&
      Math.floor(Math.random() * 200) === 0 &&
      catStateRef.current.idleAnimation === null
    ) {
      const availableIdleAnimations = ['sleeping', 'scratchSelf'];
      if (catStateRef.current.nekoPosX < 32) {
        availableIdleAnimations.push('scratchWallW');
      }
      if (catStateRef.current.nekoPosY < 32) {
        availableIdleAnimations.push('scratchWallN');
      }
      if (catStateRef.current.nekoPosX > window.innerWidth - 32) {
        availableIdleAnimations.push('scratchWallE');
      }
      if (catStateRef.current.nekoPosY > window.innerHeight - 32) {
        availableIdleAnimations.push('scratchWallS');
      }
      catStateRef.current.idleAnimation =
        availableIdleAnimations[Math.floor(Math.random() * availableIdleAnimations.length)];
    }

    switch (catStateRef.current.idleAnimation) {
      case 'sleeping':
        if (catStateRef.current.idleAnimationFrame < 8) {
          setSprite('tired', 0);
          break;
        }
        setSprite('sleeping', Math.floor(catStateRef.current.idleAnimationFrame / 4));
        if (catStateRef.current.idleAnimationFrame > 192) {
          resetIdleAnimation();
        }
        break;
      case 'scratchWallN':
      case 'scratchWallS':
      case 'scratchWallE':
      case 'scratchWallW':
      case 'scratchSelf':
        setSprite(catStateRef.current.idleAnimation, catStateRef.current.idleAnimationFrame);
        if (catStateRef.current.idleAnimationFrame > 9) {
          resetIdleAnimation();
        }
        break;
      default:
        setSprite('idle', 0);
        return;
    }
    catStateRef.current.idleAnimationFrame += 1;
  };

  // Frame function
  const frame = () => {
    catStateRef.current.frameCount += 1;
    const diffX = catStateRef.current.nekoPosX - catStateRef.current.mousePosX;
    const diffY = catStateRef.current.nekoPosY - catStateRef.current.mousePosY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (distance < nekoSpeed || distance < 48) {
      idle();
      return;
    }

    catStateRef.current.idleAnimation = null;
    catStateRef.current.idleAnimationFrame = 0;

    if (catStateRef.current.idleTime > 1) {
      setSprite('alert', 0);
      // count down after being alerted before moving
      catStateRef.current.idleTime = Math.min(catStateRef.current.idleTime, 7);
      catStateRef.current.idleTime -= 1;
      return;
    }

    let direction = '';
    direction += diffY / distance > 0.5 ? 'N' : '';
    direction += diffY / distance < -0.5 ? 'S' : '';
    direction += diffX / distance > 0.5 ? 'W' : '';
    direction += diffX / distance < -0.5 ? 'E' : '';
    setSprite(direction, catStateRef.current.frameCount);

    catStateRef.current.nekoPosX -= (diffX / distance) * nekoSpeed;
    catStateRef.current.nekoPosY -= (diffY / distance) * nekoSpeed;

    catStateRef.current.nekoPosX = Math.min(
      Math.max(16, catStateRef.current.nekoPosX),
      window.innerWidth - 16
    );
    catStateRef.current.nekoPosY = Math.min(
      Math.max(16, catStateRef.current.nekoPosY),
      window.innerHeight - 16
    );

    if (catRef.current) {
      catRef.current.style.left = `${catStateRef.current.nekoPosX - 16}px`;
      catRef.current.style.top = `${catStateRef.current.nekoPosY - 16}px`;
    }
  };

  // Animation loop
  const onAnimationFrame = (timestamp: number) => {
    if (!enabled) return;

    if (!catStateRef.current.lastFrameTimestamp) {
      catStateRef.current.lastFrameTimestamp = timestamp;
    }
    if (timestamp - catStateRef.current.lastFrameTimestamp > 100) {
      catStateRef.current.lastFrameTimestamp = timestamp;
      frame();
    }
    animationRef.current = requestAnimationFrame(onAnimationFrame);
  };

  // Start/stop animation based on enabled state
  useEffect(() => {
    if (enabled) {
      setIsVisible(true);
      animationRef.current = requestAnimationFrame(onAnimationFrame);
    } else {
      setIsVisible(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [enabled]);

  // Reset position when component mounts and load saved state
  useEffect(() => {
    // Load saved state from localStorage
    const savedNeko = localStorage.getItem('oneko-cat');
    if (savedNeko) {
      try {
        const parsed = JSON.parse(savedNeko);
        catStateRef.current.nekoPosX = parsed.nekoPosX || 32;
        catStateRef.current.nekoPosY = parsed.nekoPosY || 32;
        catStateRef.current.mousePosX = parsed.mousePosX || 0;
        catStateRef.current.mousePosY = parsed.mousePosY || 0;
        catStateRef.current.frameCount = parsed.frameCount || 0;
        catStateRef.current.idleTime = parsed.idleTime || 0;
        catStateRef.current.idleAnimation = parsed.idleAnimation || null;
        catStateRef.current.idleAnimationFrame = parsed.idleAnimationFrame || 0;

        // Apply saved background position
        if (catRef.current) {
          catRef.current.style.backgroundPosition = parsed.bgPos || '0px 0px';
        }
      } catch (e) {
        console.warn('Failed to parse saved oneko state:', e);
      }
    } else {
      // Default state
      catStateRef.current.nekoPosX = 32;
      catStateRef.current.nekoPosY = 32;
      catStateRef.current.frameCount = 0;
      catStateRef.current.idleTime = 0;
      catStateRef.current.idleAnimation = null;
      catStateRef.current.idleAnimationFrame = 0;
      catStateRef.current.lastFrameTimestamp = 0;
    }
  }, []);

  // Save state to localStorage before unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (enabled && catRef.current) {
        const stateToSave = {
          nekoPosX: catStateRef.current.nekoPosX,
          nekoPosY: catStateRef.current.nekoPosY,
          mousePosX: catStateRef.current.mousePosX,
          mousePosY: catStateRef.current.mousePosY,
          frameCount: catStateRef.current.frameCount,
          idleTime: catStateRef.current.idleTime,
          idleAnimation: catStateRef.current.idleAnimation,
          idleAnimationFrame: catStateRef.current.idleAnimationFrame,
          bgPos: catRef.current.style.backgroundPosition || '0px 0px',
        };
        localStorage.setItem('oneko-cat', JSON.stringify(stateToSave));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [enabled]);

  if (!isVisible) return null;

  return (
    <div
      ref={catRef}
      id="oneko-cat"
      aria-hidden="true"
      className="oneko-cat"
      style={{
        backgroundImage: `url(${catImage})`,
        left: `${catStateRef.current.nekoPosX - 16}px`,
        top: `${catStateRef.current.nekoPosY - 16}px`,
      }}
    />
  );
}
