import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Instrument_Serif, Inter } from 'next/font/google';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Professionele Website voor je Bedrijf | €100/mnd | Rodi Digital',
  description:
    'Website laten maken? Rodi Digital biedt professionele websites als abonnement voor het MKB. Geen opstartkosten, alles inbegrepen voor €100 per maand. Inclusief ontwerp, hosting, onderhoud en SEO.',
  openGraph: {
    title: 'Professionele Website voor je Bedrijf | Rodi Digital',
    description:
      'Een complete, moderne website voor €100 per maand. Geen opstartkosten. Inclusief ontwerp, hosting, onderhoud en SEO.',
    locale: 'nl_NL',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="nl"
      className={`${instrumentSerif.variable} ${inter.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Rodi Digital',
              description:
                'Professionele websites als abonnement voor het MKB',
              email: 'hello@rodi-digital.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Stationsweg 19',
                postalCode: '5211 TV',
                addressLocality: "'s-Hertogenbosch",
                addressCountry: 'NL',
              },
              priceRange: '€100/maand',
            }),
          }}
        />
      </body>
    </html>
  );
}
