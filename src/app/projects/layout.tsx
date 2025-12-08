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
  // This layout intentionally breaks out of the root "max-w" container
  // so the projects page can render full-bleed content while keeping
  // a centered inner container for the project grid.
  return (
    <div className="relative lg:left-1/2 lg:-ml-[50vw] lg:w-screen px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">{children}</div>
    </div>
  );
}
