import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/context/AuthContext';
import { ThemeProvider } from '@/lib/context/ThemeContext';
import { SpotlightCursor } from '@/components/ui/SpotlightCursor';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Flowmetrics — Turn Team Activity Into Actionable Insights',
  description:
    'Flowmetrics transforms team activity into clear productivity insights, helping modern engineering teams understand workload, focus, and progress.',
  keywords: [
    'engineering analytics',
    'team productivity',
    'workload intelligence',
    'focus metrics',
    'sprint velocity',
    'developer metrics',
  ],
  authors: [{ name: 'Vivek Jain' }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Flowmetrics — Turn Team Activity Into Actionable Insights',
    description:
      'Flowmetrics transforms team activity into clear productivity insights, helping modern engineering teams understand workload, focus, and progress.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#060913] dark:text-slate-100 flex flex-col antialiased transition-colors duration-300 relative">
        <SpotlightCursor />
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
