// app/layout.tsx
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/800.css';
import './globals.css'

import { Bricolage_Grotesque } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext';
import { ReactLenis } from 'lenis/react';
import ConditionalShell from '@/components/ConditionalShell';
import { getCurrentSession } from '@/lib/server/session';
import { GridsBg } from '@/components/GridsBg';
import ScrollToTop from '@/components/ScrollToTop';
import ScrollToTopButton from '@/components/ScrollToTopButton';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-bricolage',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { user } = await getCurrentSession();

  return (
    <html lang="en" suppressHydrationWarning className={bricolage.variable}>
      <head />
      <body>
        <ReactLenis root />
        <ThemeProvider>
          <GridsBg />
          <ScrollToTop />
          <ScrollToTopButton />
          <ConditionalShell user={user}>
            {children}
          </ConditionalShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
