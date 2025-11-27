import { Metadata } from 'next';
import HomeContent from '@/components/myComponents/HomeContent';

export const metadata: Metadata = {
  title: 'Manpreet Singh - Full Stack Developer',
  description:
    'Full Stack Developer from India specializing in React, Next.js, and TypeScript. Find me on GitHub as MannuVilasara. Building scalable web applications with modern technologies.',
  openGraph: {
    title: 'Manpreet Singh - Full Stack Developer',
    description:
      'Full Stack Developer from India specializing in React, Next.js, and TypeScript. Find me on GitHub as MannuVilasara. Building scalable web applications with modern technologies.',
    url: 'https://mannu.live',
    siteName: 'Manpreet Singh Portfolio',
    images: [
      {
        url: 'https://mannu.live/og?title=Manpreet%20Singh%20-%20Full%20Stack%20Developer&description=Building%20scalable%20web%20applications%20with%20modern%20technologies',
        width: 1200,
        height: 630,
        alt: 'Manpreet Singh Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manpreet Singh - Full Stack Developer',
    description:
      'Full Stack Developer from India specializing in React, Next.js, and TypeScript. Find me on GitHub as MannuVilasara.',
    images: [
      'https://mannu.live/og?title=Manpreet%20Singh%20-%20Full%20Stack%20Developer&description=Building%20scalable%20web%20applications%20with%20modern%20technologies',
    ],
  },
};

export default function HomePage() {
  return <HomeContent />;
}
