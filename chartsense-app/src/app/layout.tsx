import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ParticleBackground from '@/components/ParticleBackground';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChartSense - AI Trading Assistant',
  description: 'Human-style market reasoning engine for traders',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ParticleBackground />
        {children}
      </body>
    </html>
  );
}
