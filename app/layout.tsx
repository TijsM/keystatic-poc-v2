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
  title: 'Professionele Website voor je Bedrijf | €100/mnd | Rodi Sites',
  description:
    'Website laten maken? Rodi Sites biedt professionele websites als abonnement voor het MKB. Geen opstartkosten, alles inbegrepen voor €100 per maand. Inclusief ontwerp, hosting, onderhoud en SEO.',
  openGraph: {
    title: 'Professionele Website voor je Bedrijf | Rodi Sites',
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
                  priceRange: '€49 - €149 per maand',
                  hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Website abonnementen',
                    itemListElement: [
                      {
                        '@type': 'Offer',
                        name: 'Starter',
                        price: '59',
                        priceCurrency: 'EUR',
                        description:
                          'Een sterke one-pager om snel online te gaan.',
                      },
                      {
                        '@type': 'Offer',
                        name: 'Groei',
                        price: '99',
                        priceCurrency: 'EUR',
                        description:
                          'Meerdere pagina\'s, CMS en uitgebreide SEO.',
                      },
                      {
                        '@type': 'Offer',
                        name: 'Professioneel',
                        price: '149',
                        priceCurrency: 'EUR',
                        description:
                          'Alles uit Groei, plus meertaligheid en integraties.',
                      },
                    ],
                  },
                },
                {
                  '@type': 'FAQPage',
                  mainEntity: [
                    {
                      '@type': 'Question',
                      name: 'Wat is Website als Service (WaaS)?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Bij Website als Service betaal je geen duizenden euro\'s vooraf, maar een vast bedrag per maand. Voor dat bedrag krijg je een professioneel ontworpen website inclusief hosting, SSL-certificaat, onderhoud en technische ondersteuning.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Zijn er opstartkosten voor mijn website?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Nee. Ontwerp, ontwikkeling en lancering zitten volledig in je maandtarief. Je hebt geen grote investering vooraf nodig om online te gaan.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Hoe snel is mijn website klaar?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'De meeste websites zijn binnen 14 dagen live. Na een kort kennismakingsgesprek maken we een ontwerp, verwerken we je feedback en lanceren we de site.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Zit ik vast aan een contract?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Nee. Na de eerste 12 maanden kun je maandelijks opzeggen, zonder boetes of kleine lettertjes. We bieden bovendien een 30 dagen niet-goed-geld-terug garantie.',
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
