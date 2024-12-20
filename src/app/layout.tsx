import { GeistSans } from "geist/font/sans";
import { Suspense } from "react";
import { BottomNav } from "./bottom-nav";
import "./globals.css";

export const metadata = {
  title: {
    default: "Pickle Ball",
    template: "%s | Pickle Ball",
  },
  description: "fastest growing sport in amaerica...",
};

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.className} antialiased`}>
      <body className="flex flex-col min-h-screen text-black dark:text-white bg-white dark:bg-black antialiased">
        <div className="flex-grow overflow-y-scroll h-[calc(100vh_-_80px)] border-b border-gray-200 dark:border-gray-800 pb-16 md:pb-0">
          {children}
        </div>
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[80px] bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
          <Suspense fallback={null}>
            <BottomNav />
          </Suspense>
        </nav>
      </body>
    </html>
  );
}
