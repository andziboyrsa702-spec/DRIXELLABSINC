import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Navbar } from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';
import { MasterCanvas } from '@/components/ThreeScene/MasterCanvas';
import { CustomCursor } from '@/components/Cursor/CustomCursor';
import { AudioSynth } from '@/components/Theme/AudioSynth';
import { DetailModal } from '@/components/Cards/DetailModal';
import { JsonLd } from '@/components/SEO/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL('https://drixel.co.za'),
  title: {
    default: 'Drixel Labs Inc. — Design. Build. Elevate.',
    template: '%s | Drixel Labs Inc.',
  },
  description: 'Drixel Labs Inc. is a South African innovation company creating products, brands, technologies, and experiences through thoughtful design and engineering.',
  keywords: ['Drixel Labs', 'South Africa', 'Industrial Design', 'Engineering', 'Innovation', 'Next.js'],
  authors: [{ name: 'Drixel Labs Inc.' }],
  openGraph: {
    title: 'Drixel Labs Inc. — Design. Build. Elevate.',
    description: 'Drixel Labs Inc. develops purposeful brands, products, and technologies through exceptional design and engineering.',
    url: 'https://drixel.co.za',
    siteName: 'Drixel Labs Inc.',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <JsonLd />
      </head>
      <body className="bg-matte text-warmWhite min-h-screen relative antialiased">
        <CustomCursor />
        <MasterCanvas />
        <AudioSynth />
        <Navbar />
        <DetailModal />
        <main className="relative z-10 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
