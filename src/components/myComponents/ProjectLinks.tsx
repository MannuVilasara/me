import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

export function ProjectLink({
  heading,
  subheading,
  color,
  language,
  stars,
  href,
  target = '_blank',
}: any) {
  return (
    <a
      href={href}
      target={target}
      rel="noopener noreferrer"
      className="rounded-lg border mono border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-5 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800 flex flex-col justify-between"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Image
            src="/android-chrome-512x512.png"
            alt="avatar"
            width={20}
            height={20}
            className="rounded-full"
          />
          <span className="text-sm text-neutral-800 dark:text-neutral-400 font-mono">
            MannuVilasara
          </span>
        </div>
        <ExternalLink size={16} className="text-neutral-800 dark:text-neutral-500" />
      </div>

      <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
        {heading}
      </h2>
      <p className="text-sm text-neutral-500 dark:text-neutral-300 mb-4">{subheading}</p>

      <div className="flex items-center gap-4 text-sm text-neutral-400">
        <div className="flex items-center gap-1">
          <span className={`h-2 w-2 rounded-full ${color}`} />
          <span>{language}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>⭐</span>
          <span>{stars}</span>
        </div>
      </div>
    </a>
  );
}
