import type { ReactNode } from 'react';
import { Unbounded, Inter } from 'next/font/google';
import './globals.css';

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['500', '700', '900'],
  variable: '--font-display',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});

export const metadata = {
  title: 'Ruleta de Mesas',
  description: 'Sistema de concursos y ruleta en tiempo real para discoteca',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${unbounded.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}