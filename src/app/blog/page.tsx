import React from 'react';
import Link from 'next/link'; // for Next.js routing
import { BlogPosts } from '@/components/myComponents/posts';

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>
      <BlogPosts />
    </div>
  );
}
