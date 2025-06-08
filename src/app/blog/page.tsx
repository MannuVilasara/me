'use client'; // if using Next.js App Router

import React from 'react';
import Link from 'next/link'; // for Next.js routing

const blogs = [
  { id: 1, title: 'Understanding React Hooks', slug: 'understanding-react-hooks' },
  { id: 2, title: 'Next.js SEO Best Practices', slug: 'nextjs-seo-best-practices' },
  { id: 3, title: 'Tailwind CSS Tips & Tricks', slug: 'tailwind-css-tips-tricks' },
];

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Blog Page is Under Construction. Stay tuned for updates!
      </p>

      {/* <ul className="space-y-4">
        {blogs.map((blog, index) => (
          <li key={blog.id} className="text-lg text-gray-700 dark:text-gray-300">
            <Link
              href={`/blog/${blog.slug}`}
              className="hover:underline text-blue-500 flex items-center"
            >
              <span className="font-bold mr-2">{index + 1}.</span> {blog.title}
            </Link>
          </li>
        ))}
      </ul> */}

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
        Check out my{' '}
        <a href="https://github.com/MannuVilasara" className="text-blue-500 hover:underline">
          GitHub
        </a>{' '}
        and{' '}
        <a
          href="https://www.linkedin.com/in/mannuvilasara/"
          className="text-blue-500 hover:underline"
        >
          LinkedIn{' '}
        </a>
        in the mean time.
      </p>
    </div>
  );
}
