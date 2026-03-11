import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Instrument_Serif, Geist } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-heading',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rodi-sites.nl'),
  title: {
    default: 'Professionele Website voor je Bedrijf | Rodi Sites',
    template: '%s | Rodi Sites',
  },
  description:
    'Website laten maken? Rodi Sites bouwt professionele websites voor ondernemers: schilders, tandartsen, loodgieters en meer. Geen opstartkosten, alles inbegrepen vanaf €75 per maand.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Professionele Website voor je Bedrijf | Rodi Sites',
    description:
      'Een professionele website op maat, volledig onderhouden vanaf €75 per maand. Geen opstartkosten. Inclusief ontwerp, hosting, onderhoud en SEO.',
    url: 'https://rodi-sites.nl',
    siteName: 'Rodi Sites',
    locale: 'nl_NL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professionele Website voor je Bedrijf | Rodi Sites',
    description:
      'Website laten maken? Geen opstartkosten, alles inbegrepen vanaf €75/maand. Voor schilders, tandartsen, loodgieters en meer.',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="nl"
      className={`${instrumentSerif.variable} ${geist.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Ga naar inhoud
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'LocalBusiness',
                  '@id': 'https://rodi-sites.nl/#business',
                  name: 'Rodi Sites',
                  description:
                    'Professionele websites als abonnement voor het MKB',
                  url: 'https://rodi-sites.nl',
                  email: 'hello@rodi-digital.com',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Stationsweg 19',
                    postalCode: '5211 TV',
                    addressLocality: "'s-Hertogenbosch",
                    addressCountry: 'NL',
                  },
                  geo: {
                    '@type': 'GeoCoordinates',
                    latitude: 51.6978,
                    longitude: 5.3037,
                  },
                  areaServed: [
                    {
                      '@type': 'City',
                      name: "'s-Hertogenbosch",
                    },
                    {
                      '@type': 'Country',
                      name: 'Nederland',
                    },
                  ],
                  priceRange: '€75 - €129 per maand',
                  hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Website abonnementen',
                    itemListElement: [
                      {
                        '@type': 'Offer',
                        name: 'Basis',
                        price: '75',
                        priceCurrency: 'EUR',
                        description:
                          'Professionele one-pager website met hosting, onderhoud en SEO inbegrepen.',
                      },
                      {
                        '@type': 'Offer',
                        name: 'Professioneel',
                        price: '129',
                        priceCurrency: 'EUR',
                        description:
                          'Website met meerdere paginas, zelf aanpassen, contactformulier, WhatsApp-knop en uitgebreide SEO.',
                      },
                      {
                        '@type': 'Offer',
                        name: 'Op Maat',
                        description:
                          'Maatwerk website met afsprakenplanner, koppelingen met externe tools en meertalige ondersteuning.',
                      },
                    ],
                  },
                },
                {
                  '@type': 'Organization',
                  '@id': 'https://rodi-sites.nl/#organization',
                  name: 'Rodi Sites',
                  url: 'https://rodi-sites.nl',
                  email: 'hello@rodi-digital.com',
                  sameAs: [],
                },
                {
                  '@type': 'Service',
                  name: 'Website abonnement',
                  provider: {
                    '@id': 'https://rodi-sites.nl/#business',
                  },
                  serviceType: 'Webdesign als abonnement',
                  description:
                    'Professionele website op maat, volledig onderhouden. Inclusief ontwerp, hosting, onderhoud en SEO. Geen opstartkosten.',
                  areaServed: {
                    '@type': 'Country',
                    name: 'Nederland',
                  },
                  offers: {
                    '@type': 'AggregateOffer',
                    lowPrice: '75',
                    highPrice: '129',
                    priceCurrency: 'EUR',
                  },
                },
              ],
            }),
          }}
        />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
    </html>
  );
}
