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
    'Website laten maken? Rodi Sites bouwt professionele websites voor ondernemers: schilders, tandartsen, loodgieters en meer. Geen opstartkosten, alles inbegrepen vanaf €79 per maand.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Professionele Website voor je Bedrijf | Rodi Sites',
    description:
      'Een professionele website op maat, volledig onderhouden vanaf €79 per maand. Geen opstartkosten. Inclusief ontwerp, hosting, onderhoud en SEO.',
    url: 'https://rodi-sites.nl',
    siteName: 'Rodi Sites',
    locale: 'nl_NL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professionele Website voor je Bedrijf | Rodi Sites',
    description:
      'Website laten maken? Geen opstartkosten, alles inbegrepen vanaf €79/maand. Voor schilders, tandartsen, loodgieters en meer.',
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
                  areaServed: {
                    '@type': 'Country',
                    name: 'Nederland',
                  },
                  priceRange: '€79 - €149 per maand',
                  hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Website abonnementen',
                    itemListElement: [
                      {
                        '@type': 'Offer',
                        name: 'Basis',
                        price: '79',
                        priceCurrency: 'EUR',
                        description:
                          'Professionele one-pager website met hosting, onderhoud en SEO inbegrepen.',
                      },
                      {
                        '@type': 'Offer',
                        name: 'Professioneel',
                        price: '149',
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
                  '@type': 'Service',
                  name: 'Website abonnement',
                  provider: {
                    '@type': 'LocalBusiness',
                    name: 'Rodi Sites',
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
                    lowPrice: '79',
                    highPrice: '149',
                    priceCurrency: 'EUR',
                  },
                },
                {
                  '@type': 'FAQPage',
                  mainEntity: [
                    {
                      '@type': 'Question',
                      name: 'Wat krijg ik precies voor het maandbedrag?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Een volledig op maat gemaakte website, inclusief hosting, onderhoud, beveiligingsupdates en technische ondersteuning. Wij houden je website snel, veilig en up-to-date.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Zijn er opstartkosten?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Nee. Ontwerp, bouw en lancering zitten volledig in je maandtarief. Je hoeft geen grote investering vooraf te doen.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Hoe snel is mijn website klaar?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'De meeste websites zijn binnen twee weken live. Na een kort gesprek maken we een ontwerp, jij geeft feedback, en wij lanceren de site.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Zit ik vast aan een contract?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Nee. Na de eerste 6 maanden kun je maandelijks opzeggen, zonder boetes of kleine lettertjes. We bieden een 30 dagen niet-goed-geld-terug garantie.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Kan ik zelf teksten en foto\'s aanpassen?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Ja, bij de pakketten met beheertoegang pas je zelf teksten en foto\'s aan via een simpel beheerpaneel. Net zo makkelijk als een e-mail typen. Kom je er niet uit? Dan helpen wij je kosteloos.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Is hosting inbegrepen?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Ja, snelle en betrouwbare hosting zit in het maandtarief. Je hoeft niets apart af te sluiten of zelf te regelen. We gebruiken premium hosting met 99,9% uptime, zodat je website altijd bereikbaar is voor je klanten.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Kan ik later extra functies toevoegen?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Ja. Denk aan een afsprakenplanner, koppeling met je boekhoudsoftware of een meertalige website. Neem contact op en we bespreken de mogelijkheden.',
                      },
                    },
                  ],
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
