import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CBAMtools | Free CBAM Calculator & Compliance Tools',
  description:
    'Calculate CBAM costs, check HS codes and prepare EU Carbon Border Adjustment Mechanism compliance reports.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
