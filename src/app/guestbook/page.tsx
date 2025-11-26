import { Guestbook } from '@/components/myComponents/Contact';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guestbook — Manpreet Singh',
  description:
    'Leave a message in my digital guestbook. Share your thoughts, feedback, or just say hello!',
  openGraph: {
    title: 'Guestbook — Manpreet Singh',
    description: 'Leave a message in my digital guestbook. Share your thoughts or just say hello!',
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
    description: 'Leave a message in my digital guestbook.',
    images: [
      'https://mannu.live/og?title=Guestbook%20%E2%80%94%20Manpreet%20Singh&description=Leave%20a%20message%20in%20my%20digital%20guestbook',
    ],
  },
  alternates: {
    canonical: 'https://mannu.live/guestbook',
  },
};

export default function GuestbookPage() {
  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <Guestbook />
    </div>
  );
}
