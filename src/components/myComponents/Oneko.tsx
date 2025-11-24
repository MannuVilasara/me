'use client';
import Script from 'next/script';

export default function Oneko() {
  return <Script src="/oneko/oneko.js" strategy="lazyOnload" data-cat="/oneko/oneko.gif" />;
}
