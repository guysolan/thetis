import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Reddit Bot Dashboard',
  description: 'Monitor and manage the Achilles recovery Reddit bot',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}