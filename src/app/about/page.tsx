import { TechStack, GitHub } from '@/components/myComponents/stats';
import React from 'react';
import { webdev, tools, database, devops } from '@/data/techstack';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Code2, Github } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About — Manpreet Singh',
  description:
    'Full Stack Developer & Platform Engineer from India. Crafting thoughtful web interfaces, automation pipelines, and scalable backend infrastructure.',
  openGraph: {
    title: 'About — Manpreet Singh',
    description:
      'Full Stack Developer & Platform Engineer from India. Crafting thoughtful web interfaces, automation pipelines, and scalable backend infrastructure.',
    url: 'https://mannu.tech/about',
    siteName: 'Manpreet Singh Portfolio',
    images: [
      {
        url: 'https://mannu.tech/og?title=About%20%E2%80%94%20Manpreet%20Singh&description=Full%20Stack%20Developer%20%26%20Platform%20Engineer',
        width: 1200,
        height: 630,
        alt: 'About Manpreet Singh',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://mannu.tech/about',
  },
};

export default function AboutPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://mannu.tech',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: 'https://mannu.tech/about',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="flex flex-col space-y-12">
        {/* Main Narrative (Oil Tone) */}
        <main className="space-y-6 w-full">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/70 bg-card/70 backdrop-blur-xs text-xs font-mono text-muted-foreground shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Full Stack & Platform Engineer</span>
              <span className="text-muted-foreground/40">•</span>
              <span>Punjab, India</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              About Me
            </h1>
          </div>

          <div className="text-sm sm:text-base text-foreground/85 leading-relaxed space-y-4">
            <p>
              I'm Manpreet Singh (known online as <strong>MannuVilasara</strong>). I build web software with an emphasis on clarity, tactile motion, and dependable engineering.
            </p>
            <p>
              My journey started with building client-side web experiments—obsessing over font sizing, layout stability, and how subtle easing curves can make an application feel human. As the systems I worked on grew, I found myself drawn toward what happens behind the screen: container lifecycles, automated testing matrixes, CI/CD pipelines, and data storage.
            </p>
            <p>
              Today, I operate across both realms: crafting responsive frontends with Next.js and TypeScript, while building reproducible platform workflows with Docker, GitHub Actions, and Linux.
            </p>
          </div>

          {/* Core Principles */}
          <div className="p-5 sm:p-6 rounded-2xl border border-border/70 bg-card/50 backdrop-blur-xs shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-border/40">
              <Code2 className="h-4 w-4 text-emerald-500" />
              <h2 className="text-sm font-semibold text-foreground font-mono">
                How I Approach Code
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-muted/40 border border-border/40 space-y-1.5">
                <span className="text-xs font-semibold text-foreground block">
                  Tactile Restraint
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Interfaces should not scream for attention. Good design reduces friction, avoids layout shift, and respects natural user flow.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-muted/40 border border-border/40 space-y-1.5">
                <span className="text-xs font-semibold text-foreground block">
                  Deterministic Automation
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  If a manual step can fail in deployment, automate it. Workflows should be testable, repeatable, and documented in code.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Technologies Breakdown */}
        <section className="border-t border-border/50 pt-8 space-y-8">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground mb-1">
              Technical Stack & Tools
            </h2>
            <p className="text-xs text-muted-foreground">
              Core technologies used in production systems and ongoing experiments.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2.5">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <span>Web & Frontend Engineering</span>
              </h3>
              <TechStack techStack={webdev} />
            </div>

            <div className="space-y-2.5">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <span>Platform, Cloud & DevOps</span>
              </h3>
              <TechStack techStack={devops} />
            </div>

            <div className="space-y-2.5">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <span>Databases & Storage</span>
              </h3>
              <TechStack techStack={database} />
            </div>

            <div className="space-y-2.5">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <span>Developer Environment & Tooling</span>
              </h3>
              <TechStack techStack={tools} />
            </div>
          </div>
        </section>

        {/* GitHub Contributions Section */}
        <section className="border-t border-border/50 pt-8">
          <div className="p-5 sm:p-6 rounded-2xl border border-border/70 bg-card/50 backdrop-blur-xs shadow-2xs overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-border/40">
              <div className="flex items-center gap-2">
                <Github size={15} className="text-muted-foreground" />
                <h2 className="text-sm font-semibold text-foreground font-mono">
                  GitHub Contribution Activity
                </h2>
              </div>
              <Link
                href="https://github.com/MannuVilasara"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                <span>@MannuVilasara</span>
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <GitHub />
          </div>
        </section>

        {/* Outside of Code */}
        <section className="border-t border-border/50 pt-8 pb-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground mb-3">
            Outside of Code
          </h2>
          <p className="text-sm text-foreground/80 leading-relaxed">
            When I'm away from the terminal, I enjoy diving into fantasy web serials like <em>Lord of the Mysteries</em>, experimenting with Linux window managers, and listening to ambient instrumental music. I'm always open to talking about platform architecture, open source projects, or good books.
          </p>
        </section>
      </div>
    </>
  );
}
