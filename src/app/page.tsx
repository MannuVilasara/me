'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';

export default function Page() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col">
      <main className="flex-grow px-4 max-w-3xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-4">Manpreet Singh</h1>
        <h2 className="text-2xl text-gray-500 mb-6">
          <Typewriter
            options={{
              strings: ['Full Stack Developer, India', 'Tech Enthusiast', 'Open For Internships'],
              autoStart: true,
              loop: true,
              delay: 75,
              cursor: '|',
            }}
          />
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          I work with latest technologies to build scalable and efficient web applications. My
          expertise lies in full-stack development, with a focus on creating seamless user
          experiences and robust backend systems.
        </p>

        <Button asChild className="text-sm px-6 py-3 rounded-full font-bold">
          <Link
            href="/contact"
            className="flex items-center gap-1 cursor-pointer mono"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Contact{' '}
            <motion.span
              animate={{ x: isHovered ? 6 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ display: 'inline-block' }}
            >
              →
            </motion.span>
          </Link>
        </Button>

        <section className="mt-16 border-t pt-8"></section>
      </main>
    </div>
  );
}
