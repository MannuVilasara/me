import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { getBlogPosts } from '@/lib/getBlogs';

export function BlogPosts() {
  const allBlogs = getBlogPosts().sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  );

  return (
    <div>
      <ul className="space-y-3">
        {allBlogs.map((post, index) => (
          <li
            key={post.slug}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-base text-neutral-700 dark:text-neutral-300"
          >
            <Link
              href={`/blog/${post.slug}`}
              className="flex items-center space-x-2 hover:underline text-blue-600 dark:text-blue-400"
            >
              <span className="font-mono text-neutral-500 w-6 text-right">{index + 1}.</span>
              <span className="truncate">{post.metadata.title}</span>
            </Link>
            <span className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 sm:mt-0 sm:ml-4 shrink-0 whitespace-nowrap">
              {formatDate(post.metadata.publishedAt, false)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
