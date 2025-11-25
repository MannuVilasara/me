'use client';

import { motion } from 'framer-motion';

type Tech = {
  icon: React.ReactNode;
  name: string;
  description: string;
};

type TechStackProps = {
  techStack: Tech[];
};

export default function TechStack({ techStack }: TechStackProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5">
      {techStack.map((tech, index) => (
        <motion.div
          key={index}
          className="flex items-center gap-4 rounded-lg border bg-neutral-100 dark:bg-neutral-900 p-4 transition-colors duration-300 cursor-pointer"
          whileHover={{
            scale: 1.03,
            boxShadow: '0 8px 24px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(255, 255, 255, 0.08)',
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        >
          <div className="flex-shrink-0">{tech.icon}</div>
          <div>
            <h4 className="text-foreground font-semibold">{tech.name}</h4>
            <p className="text-muted-foreground text-sm">{tech.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
