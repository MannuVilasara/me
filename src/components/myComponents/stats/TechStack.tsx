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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {techStack.map((tech, index) => (
        <motion.div
          key={index}
          className="group flex items-center gap-3.5 rounded-xl border border-border/60 bg-card/40 hover:bg-card/90 hover:border-border p-3.5 transition-all duration-200 cursor-pointer backdrop-blur-xs"
          whileHover={{ y: -2 }}
          transition={{
            type: 'spring',
            stiffness: 350,
            damping: 25,
          }}
        >
          <div className="shrink-0 p-2 rounded-lg bg-muted/50 text-foreground group-hover:scale-105 transition-transform">
            {tech.icon}
          </div>
          <div className="min-w-0">
            <h4 className="text-foreground text-sm font-semibold truncate group-hover:text-primary transition-colors">
              {tech.name}
            </h4>
            <p className="text-muted-foreground text-xs truncate">{tech.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
