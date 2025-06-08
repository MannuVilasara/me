'use client';

import { FiArrowRight } from 'react-icons/fi';
import { useMotionValue, motion, useSpring, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

type ProjectLinkProps = {
  heading: string;
  imgSrc: string;
  subheading: string;
  href: string;
  target?: string;
};

export const ProjectLink = ({ heading, imgSrc, subheading, href, target }: ProjectLinkProps) => {
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const top = useTransform(mouseYSpring, [0.5, -0.5], ['40%', '60%']);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ['60%', '70%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      target={target}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b-2 border-neutral-700 py-6 transition-colors duration-500 hover:border-neutral-50 cursor-pointer md:py-8"
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -20 },
          }}
          transition={{
            type: 'spring',
            staggerChildren: 0.05,
            delayChildren: 0.25,
          }}
          className="relative z-10 block text-4xl font-bold text-neutral-400 transition-colors duration-500 group-hover:text-neutral-50 md:text-4xl"
        >
          {heading.split('').map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 20 },
              }}
              transition={{ type: 'spring' }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-2 block text-base text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50 max-w-lg mono">
          {subheading}
        </span>
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: '-50%',
          translateY: '-50%',
        }}
        variants={{
          initial: { scale: 0, rotate: '-10deg' },
          whileHover: { scale: 1, rotate: '10deg' },
        }}
        transition={{ type: 'spring' }}
        src={imgSrc}
        alt={`Image for project ${heading}`}
        className="absolute z-20 h-28 w-48 rounded-lg object-cover md:h-48 md:w-64"
      />

      <motion.div
        variants={{
          initial: {
            x: '30%',
            opacity: 0,
          },
          whileHover: {
            x: '0%',
            opacity: 1,
          },
        }}
        transition={{ type: 'spring' }}
        className="relative z-10 p-4"
      >
        <FiArrowRight className="text-4xl text-neutral-50" />
      </motion.div>
    </motion.a>
  );
};
