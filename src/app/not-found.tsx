import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center mt-50 mono">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl text-gray-700">Page Not Found</p>
      <p className="text-md text-gray-500 mt-2">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-6 text-blue-500 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
}
