import React from 'react';
import { BlogPosts } from '@/components/myComponents/stats';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Manpreet Singh',
  description:
    'Read articles about web development, programming, and technology. Learn about React, Next.js, TypeScript, and modern software development practices.',
  openGraph: {
    title: 'Blog — Manpreet Singh',
    description:
      'Read articles about web development, programming, and technology by Manpreet Singh.',
    url: 'https://mannu.live/blog',
    siteName: 'Manpreet Singh Portfolio',
    images: [
      {
        url: 'https://mannu.live/og?title=Blog%20%E2%80%94%20Manpreet%20Singh&description=Read%20articles%20about%20web%20development%2C%20programming%2C%20and%20technology',
        width: 1200,
        height: 630,
        alt: 'Manpreet Singh Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Manpreet Singh',
    description: 'Read articles about web development, programming, and technology.',
    images: [
      'https://mannu.live/og?title=Blog%20%E2%80%94%20Manpreet%20Singh&description=Read%20articles%20about%20web%20development%2C%20programming%2C%20and%20technology',
    ],
  },
  alternates: {
    canonical: 'https://mannu.live/blog',
  },
};

export default function Page() {
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
        name: 'Blog',
        item: 'https://mannu.live/blog',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6">Blog</h1>
        <p className="text-muted-foreground mb-8">
          Thoughts on web development, programming, and technology.
        </p>
        <BlogPosts />
      </div>
    </>
  );
}
