import React from 'react';
import { BlogPosts } from '@/components/myComponents/posts';
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
    type: 'website',
  },
  alternates: {
    canonical: 'https://mannu.live/blog',
  },
};

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>
      <p className="text-muted-foreground mb-8">
        Thoughts on web development, programming, and technology.
      </p>
      <BlogPosts />
    </div>
  );
}
