import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects — Manpreet Singh',
  description:
    'Browse my portfolio of web applications, creative experiments, and open-source contributions. Built with React, Next.js, TypeScript, and modern web technologies.',
  openGraph: {
    title: 'Projects — Manpreet Singh',
    description:
      'Browse my portfolio of web applications, creative experiments, and open-source contributions.',
    url: 'https://mannu.live/projects',
    type: 'website',
  },
  alternates: {
    canonical: 'https://mannu.live/projects',
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
