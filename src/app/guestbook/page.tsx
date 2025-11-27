import { Guestbook } from '@/components/myComponents/Contact';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guestbook — Manpreet Singh',
  description:
    'Leave a message in my digital guestbook. Share your thoughts, feedback, or just say hello! Find me on GitHub as MannuVilasara.',
  keywords: [
    'Manpreet Singh',
    'MannuVilasara',
    'Guestbook',
    'Digital Guestbook',
    'Contact',
    'Feedback',
    'Messages',
    'Portfolio Guestbook',
    'Web Developer Guestbook',
    'Full Stack Developer',
    'Leave a Message',
    'Say Hello',
  ],
  openGraph: {
    title: 'Guestbook — Manpreet Singh',
    description:
      'Leave a message in my digital guestbook. Share your thoughts or just say hello! Find me on GitHub as MannuVilasara.',
    url: 'https://mannu.live/guestbook',
    siteName: 'Manpreet Singh Portfolio',
    images: [
      {
        url: 'https://mannu.live/og?title=Guestbook%20%E2%80%94%20Manpreet%20Singh&description=Leave%20a%20message%20in%20my%20digital%20guestbook',
        width: 1200,
        height: 630,
        alt: 'Manpreet Singh Guestbook',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guestbook — Manpreet Singh',
    description: 'Leave a message in my digital guestbook. Find me on GitHub as MannuVilasara.',
    images: [
      'https://mannu.live/og?title=Guestbook%20%E2%80%94%20Manpreet%20Singh&description=Leave%20a%20message%20in%20my%20digital%20guestbook',
    ],
  },
  alternates: {
    canonical: 'https://mannu.live/guestbook',
  },
};

export default function GuestbookPage() {
  const guestbookSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Guestbook — Manpreet Singh',
    description:
      'Leave a message in my digital guestbook. Share your thoughts, feedback, or just say hello!',
    url: 'https://mannu.live/guestbook',
    author: {
      '@type': 'Person',
      name: 'Manpreet Singh',
      url: 'https://mannu.live',
    },
    mainEntity: {
      '@type': 'ContactPage',
      name: 'Guestbook',
      description: 'Digital guestbook for Manpreet Singh',
      url: 'https://mannu.live/guestbook',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guestbookSchema) }}
      />
      <div className="container mx-auto px-4 max-w-4xl">
        <Guestbook />
      </div>
    </>
  );
}
