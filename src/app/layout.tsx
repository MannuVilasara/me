import { JetBrains_Mono, DM_Sans } from 'next/font/google';

import { ThemeProvider } from '@/components/themeProvider';
import '@/styles/globals.css';
import Navbar from '@/components/myComponents/Navbar';
import { ProgressBar } from '@/components/myComponents/ProgressBar';
import Footer from '@/components/myComponents/Footer';
import { Toaster } from '@/components/ui/sonner';

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
        className={`${jetbrainsMono.variable} ${dmSans.variable} overflow-scroll scrollbar-hide`}
      >
        <head />
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ProgressBar />
            <div className="mx-auto max-w-2xl px-5 sm:px-6 lg:px-8 flex flex-col pt-12 min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
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
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
