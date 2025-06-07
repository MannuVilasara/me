import { Inter, JetBrains_Mono, DM_Sans } from 'next/font/google';

import { ThemeProvider } from '@/components/themeProvider';
import '@/styles/globals.css';
import Navbar from '@/components/myComponents/Navbar';
import { ProgressBar } from '@/components/myComponents/ProgressBar';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${jetbrainsMono.variable} ${dmSans.variable}`}
      >
        <head />
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ProgressBar />
            <div className="mx-auto max-w-2xl px-5 sm:px-6 lg:px-8 flex flex-col pt-12 min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <footer className="py-6 text-sm text-muted-foreground flex justify-between items-center w-full mono">
                <div>© 2025 Manpreet Singh</div>
                <Link
                  href="https://github.com/MannuVilasara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  <FaGithub className="text-xl" /> GitHub
                </Link>
              </footer>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
