import React from 'react';
import type { Metadata } from 'next';
import Markdoc from '@markdoc/markdoc';
import { notFound } from 'next/navigation';
import { reader } from '../reader';
import { markdocConfig } from '../../keystatic.config';
import { SubpageNavbar } from '../components/subpage-navbar';
import { Footer } from '../components/footer';
import { IndustryPage } from '../components/industry-page';

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
        url: `https://rodi-sites.nl/${slug}`,
        siteName: 'Rodi Sites',
        locale: 'nl_NL',
        type: 'website',
      },
    };
  }

  const post = await reader.collections.posts.read(slug);
  if (post) {
    return { title: post.title };
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
          provider: { '@type': 'LocalBusiness', name: 'Rodi Sites' },
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
              item: 'https://rodi-sites.nl',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: `Website voor ${page.industry}`,
              item: `https://rodi-sites.nl/${slug}`,
            },
          ],
        },
      ],
    };

    return (
      <>
        <SubpageNavbar brandName={settings.brandName} />
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

  const { node } = await post.content();
  const errors = Markdoc.validate(node, markdocConfig);
  if (errors.length) {
    console.error(errors);
    throw new Error('Invalid content');
  }
  const renderable = Markdoc.transform(node, markdocConfig);

  return (
    <div>
      <h1>{post.title}</h1>
      {Markdoc.renderers.react(renderable, React)}
    </div>
  );
}

export async function generateStaticParams() {
  const [pageSlugs, postSlugs] = await Promise.all([
    reader.collections.pages.list(),
    reader.collections.posts.list(),
  ]);

  return [...pageSlugs, ...postSlugs].map((slug) => ({ slug }));
}
