import { JetBrains_Mono, DM_Sans } from 'next/font/google';

import { ThemeProvider, GlobalModalProvider, Providers } from '@/components/myComponents/providers';
import '@/styles/globals.css';
import { Navbar, Footer, ProgressBar } from '@/components/myComponents/layout';
import { Toaster } from '@/components/ui/sonner';
import { Metadata } from 'next';
import { metadata as appMetadata } from '@/data/metadata';
import { Analytics } from '@vercel/analytics/next';
import { Oneko } from '../components/myComponents/Oneko';
import { CommandMenuProvider } from '@/components/CommandMenuProvider';
import FloatingTerminal from '@/components/myComponents/FloatingTerminal';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: true,
  fallback: ['monospace'],
});

export const metadata: Metadata = {
  ...appMetadata,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Manpreet Singh',
    alternateName: 'Mannu Vilasara',
    url: 'https://mannu.live',
    image: 'https://mannu.live/og.png',
    jobTitle: 'Full Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Independent',
    },
    sameAs: ['https://github.com/MannuVilasara', 'https://twitter.com/dev_mannuu'],
    knowsAbout: [
      'Web Development',
      'Full Stack Development',
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Manpreet Singh Portfolio',
    url: 'https://mannu.live',
    description:
      'Full Stack Developer & Designer portfolio featuring web apps, UI experiments, and open source contributions.',
    author: {
      '@type': 'Person',
      name: 'Manpreet Singh',
    },
    inLanguage: 'en-US',
  };

  return (
    <>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${jetbrainsMono.variable} ${dmSans.variable} overflow-scroll scrollbar-hide`}
      >
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  const theme = localStorage.getItem('theme') || 'system';
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const appliedTheme = theme === 'system' ? systemTheme : theme;
                  document.documentElement.classList.add(appliedTheme);
                } catch (e) {}
              `,
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          />
        </head>
        <body>
          <Providers>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <GlobalModalProvider>
                <CommandMenuProvider>
                  <ProgressBar />
                  <Oneko />
                  <div className="mx-auto max-w-2xl px-5 sm:px-6 lg:px-8 flex flex-col pt-12 min-h-screen">
                    <Navbar />
                    <main className="grow">{children}</main>
                    <Footer />
                  </div>
                  <FloatingTerminal />
                  <Toaster
                    position="bottom-right"
                    richColors
                    closeButton
                    toastOptions={{
                      className: 'bg-gray-800 text-white',
                      duration: 5000,
                      style: {
                        fontFamily: 'DM Sans, sans-serif',
                      },
                    }}
                  />
                </CommandMenuProvider>
              </GlobalModalProvider>
            </ThemeProvider>
          </Providers>
          <Analytics />
        </body>
      </html>
    </>
  );
}
