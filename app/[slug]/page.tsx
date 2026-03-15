import React from 'react';
import type { Metadata } from 'next';
import Markdoc from '@markdoc/markdoc';
import { notFound } from 'next/navigation';
import { reader } from '../reader';
import { markdocConfig } from '../../keystatic.config';
import { BASE_URL } from '../lib/constants';
import { SubpageNavbar } from '../components/subpage-navbar';
import { Footer } from '../components/footer';
import { IndustryPage } from '../components/industry-page';
import { LocationPage } from '../components/location-page';

async function getSiteSettings() {
  const siteSettings = await reader.singletons.siteSettings.read();
  return {
    brandName: siteSettings?.brandName ?? 'Rodi Sites',
    email: siteSettings?.email ?? 'hello@rodi-digital.com',
    whatsapp: siteSettings?.whatsapp ?? '+32499721771',
    address: siteSettings?.address ?? '',
    postalCode: siteSettings?.postalCode ?? '',
    city: siteSettings?.city ?? '',
    btwNumber: siteSettings?.btwNumber ?? '',
    linkedin: siteSettings?.linkedin ?? '',
  };
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;

  const page = await reader.collections.pages.read(slug);
  if (page) {
    return {
      title: page.metaTitle,
      description: page.metaDescription,
      alternates: { canonical: `/${slug}` },
      openGraph: {
        title: page.metaTitle,
        description: page.metaDescription,
        url: `${BASE_URL}/${slug}`,
        siteName: 'Rodi Sites',
        locale: 'nl_NL',
        type: 'website',
      },
    };
  }

  const locationPage = await reader.collections.locationPages.read(slug);
  if (locationPage) {
    return {
      title: locationPage.metaTitle,
      description: locationPage.metaDescription,
      alternates: { canonical: `/${slug}` },
      openGraph: {
        title: locationPage.metaTitle,
        description: locationPage.metaDescription,
        url: `${BASE_URL}/${slug}`,
        siteName: 'Rodi Sites',
        locale: 'nl_NL',
        type: 'website',
      },
    };
  }

  const post = await reader.collections.posts.read(slug);
  if (post) {
    return {
      title: post.title,
      description: post.metaDescription || undefined,
      alternates: { canonical: `/${slug}` },
      openGraph: {
        title: post.title,
        description: post.metaDescription || undefined,
        url: `${BASE_URL}/${slug}`,
        siteName: 'Rodi Sites',
        locale: 'nl_NL',
        type: 'article',
      },
    };
  }

  return {};
}

export default async function SlugPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  // Try pages collection first
  const page = await reader.collections.pages.read(slug);
  if (page) {
    const [settings, pricing] = await Promise.all([
      getSiteSettings(),
      reader.singletons.pricing.read(),
    ]);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: `Website voor ${page.industry}`,
          provider: { '@id': `${BASE_URL}/#business` },
          serviceType: `Webdesign voor ${page.industry}`,
          description: page.metaDescription,
          areaServed: { '@type': 'Country', name: 'Nederland' },
          offers: {
            '@type': 'AggregateOffer',
            lowPrice: '75',
            highPrice: '129',
            priceCurrency: 'EUR',
          },
        },
        {
          '@type': 'FAQPage',
          mainEntity: page.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: BASE_URL,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: `Website voor ${page.industry}`,
              item: `${BASE_URL}/${slug}`,
            },
          ],
        },
      ],
    };

    return (
      <>
        <SubpageNavbar brandName={settings.brandName} whatsapp={settings.whatsapp} />
        <main id="main" className="pt-20">
          <IndustryPage
            data={{
              industry: page.industry,
              heroHeadline: page.heroHeadline,
              heroSub: page.heroSub,
              introText: page.introText,
              painPoints: page.painPoints,
              benefits: page.benefits,
              features: page.features,
              faqs: page.faqs,
              tiers: pricing?.tiers ?? [],
              guarantee: pricing?.guarantee ?? '',
              whatsapp: settings.whatsapp,
            }}
          />
        </main>
        <Footer {...settings} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </>
    );
  }

  // Try location pages collection
  const locationPage = await reader.collections.locationPages.read(slug);
  if (locationPage) {
    const [settings, pricing] = await Promise.all([
      getSiteSettings(),
      reader.singletons.pricing.read(),
    ]);

    const { node } = await locationPage.body();
    const errors = Markdoc.validate(node, markdocConfig);
    if (errors.length) {
      console.error(errors);
      throw new Error('Invalid content');
    }
    const renderable = Markdoc.transform(node, markdocConfig);
    const bodyContent = Markdoc.renderers.react(renderable, React);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: `Webdesign in ${locationPage.targetLocation}`,
          provider: { '@id': `${BASE_URL}/#business` },
          serviceType: 'Webdesign',
          description: locationPage.metaDescription,
          areaServed: {
            '@type': 'City',
            name: locationPage.targetLocation,
          },
          offers: {
            '@type': 'AggregateOffer',
            lowPrice: '75',
            highPrice: '129',
            priceCurrency: 'EUR',
          },
        },
        ...(locationPage.faqs.length > 0
          ? [
              {
                '@type': 'FAQPage',
                mainEntity: locationPage.faqs.map((faq) => ({
                  '@type': 'Question',
                  name: faq.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                  },
                })),
              },
            ]
          : []),
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: BASE_URL,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: locationPage.heroHeadline,
              item: `${BASE_URL}/${slug}`,
            },
          ],
        },
      ],
    };

    return (
      <>
        <SubpageNavbar brandName={settings.brandName} whatsapp={settings.whatsapp} />
        <main id="main" className="pt-20">
          <LocationPage
            data={{
              heroHeadline: locationPage.heroHeadline,
              heroSub: locationPage.heroSub,
              targetLocation: locationPage.targetLocation,
              bodyContent,
              faqs: locationPage.faqs,
              tiers: pricing?.tiers ?? [],
              guarantee: pricing?.guarantee ?? '',
              whatsapp: settings.whatsapp,
            }}
          />
        </main>
        <Footer {...settings} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </>
    );
  }

  // Fall back to posts collection
  const post = await reader.collections.posts.read(slug);
  if (!post) notFound();

  const settings = await getSiteSettings();
  const { node } = await post.content();
  const errors = Markdoc.validate(node, markdocConfig);
  if (errors.length) {
    console.error(errors);
    throw new Error('Invalid content');
  }
  const renderable = Markdoc.transform(node, markdocConfig);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription || undefined,
    datePublished: post.publishDate || undefined,
    author: {
      '@id': `${BASE_URL}/#organization`,
    },
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    url: `${BASE_URL}/${slug}`,
  };

  return (
    <>
      <SubpageNavbar brandName={settings.brandName} whatsapp={settings.whatsapp} />
      <main id="main" className="pt-20">
        <article className="py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <h1 className="font-heading text-4xl tracking-tight text-foreground md:text-5xl">
              {post.title}
            </h1>
            {post.publishDate && (
              <p className="mt-4 text-sm text-muted">
                {new Date(post.publishDate).toLocaleDateString('nl-NL', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            )}
            <div className="prose prose-lg mt-12 max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-li:text-muted">
              {Markdoc.renderers.react(renderable, React)}
            </div>
          </div>
        </article>
      </main>
      <Footer {...settings} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
    </>
  );
}

export async function generateStaticParams() {
  const [pageSlugs, locationPageSlugs, postSlugs] = await Promise.all([
    reader.collections.pages.list(),
    reader.collections.locationPages.list(),
    reader.collections.posts.list(),
  ]);

  return [...pageSlugs, ...locationPageSlugs, ...postSlugs].map((slug) => ({
    slug,
  }));
}
