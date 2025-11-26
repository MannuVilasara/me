import { TechStack, GitHub } from '@/components/myComponents/stats';
import React from 'react';
import { webdev, tools, database, devops } from '@/data/techstack';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me — Manpreet Singh',
  description:
    'Learn more about Manpreet Singh, a Full Stack Developer passionate about building scalable web applications with modern technologies like React, Next.js, and TypeScript.',
  openGraph: {
    title: 'About Me — Manpreet Singh',
    description:
      'Learn more about Manpreet Singh, a Full Stack Developer passionate about building scalable web applications.',
    url: 'https://mannu.live/about',
    siteName: 'Manpreet Singh Portfolio',
    images: [
      {
        url: 'https://mannu.live/og?title=About%20Me%20%E2%80%94%20Manpreet%20Singh&description=Learn%20more%20about%20Manpreet%20Singh%2C%20a%20Full%20Stack%20Developer',
        width: 1200,
        height: 630,
        alt: 'About Manpreet Singh',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Me — Manpreet Singh',
    description: 'Learn more about Manpreet Singh, a Full Stack Developer.',
    images: [
      'https://mannu.live/og?title=About%20Me%20%E2%80%94%20Manpreet%20Singh&description=Learn%20more%20about%20Manpreet%20Singh%2C%20a%20Full%20Stack%20Developer',
    ],
  },
  alternates: {
    canonical: 'https://mannu.live/about',
  },
};

export default function page() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://mannu.live',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: 'https://mannu.live/about',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="flex flex-col">
        <main className="grow px-4 max-w-3xl mx-auto py-8">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            I am a Full Stack Developer with a passion for building scalable and efficient web
            applications. My expertise lies in both frontend and backend development, allowing me to
            create seamless user experiences and robust systems.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            I enjoy working with the latest technologies and am always eager to learn new skills. I
            believe in the power of collaboration and strive to contribute positively to any team I
            am part of.
          </p>
        </main>
        <section className="mt-2 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4">🛠 Technologies and Tools</h2>
          <p className="text-lg text-muted-foreground mono mb-4 leading-relaxed">
            Web - Development 🌐
          </p>
          <TechStack techStack={webdev} />
          <p className="text-lg text-muted-foreground mono mb-4 leading-relaxed mt-6">
            Tools and Platforms 🛠️
          </p>
          <TechStack techStack={tools} />
          <p className="text-lg text-muted-foreground mono mb-4 leading-relaxed mt-6">
            Database and Storage 📦
          </p>
          <TechStack techStack={database} />
          <p className="text-lg text-muted-foreground mono mb-4 leading-relaxed mt-6">
            DevOps and Cloud ☁️
          </p>
          <TechStack techStack={devops} />
        </section>
        <section className="mt-8 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4">GitHub Contributions</h2>
          <GitHub />
        </section>
        <section className="mt-8 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4">Interests</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            In my free time, I enjoy exploring new technologies, contributing to open-source
            projects, and staying updated with the latest trends in web development. I also love to
            share my knowledge through blogging and mentoring aspiring developers.
          </p>
        </section>
      </div>
    </>
  );
}
