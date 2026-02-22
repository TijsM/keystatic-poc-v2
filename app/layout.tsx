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
  title: 'Professionele Website voor je Bedrijf | Rodi Sites',
  description:
    'Website laten maken? Rodi Sites bouwt professionele websites voor ondernemers — schilders, tandartsen, loodgieters en meer. Geen opstartkosten, alles inbegrepen vanaf €99 per maand.',
  openGraph: {
    title: 'Professionele Website voor je Bedrijf | Rodi Sites',
    description:
      'Een professionele website op maat, volledig onderhouden vanaf €99 per maand. Geen opstartkosten. Inclusief ontwerp, hosting, onderhoud en SEO.',
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
                  priceRange: '€99 - €149 per maand',
                  hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Website abonnementen',
                    itemListElement: [
                      {
                        '@type': 'Offer',
                        name: 'Basis',
                        price: '99',
                        priceCurrency: 'EUR',
                        description:
                          'Een professionele website om online zichtbaar te zijn.',
                      },
                      {
                        '@type': 'Offer',
                        name: 'Professioneel',
                        price: '149',
                        priceCurrency: 'EUR',
                        description:
                          'Voor ondernemers die online willen groeien.',
                      },
                      {
                        '@type': 'Offer',
                        name: 'Op Maat',
                        description:
                          'Extra functionaliteit op aanvraag.',
                      },
                    ],
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
    </html>
  );
}
