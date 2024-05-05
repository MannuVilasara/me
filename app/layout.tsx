import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { websiteMetadata } from "@/lib/data";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: websiteMetadata.title,
  description: websiteMetadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="md:max-w-3xl mx-auto md:mt-8 ">

            <Navbar />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html >
  );
}
