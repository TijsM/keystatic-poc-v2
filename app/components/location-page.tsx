'use client';

import React from 'react';
import Link from 'next/link';
import { FadeIn } from './ui/fade-in';
import { FaqItem } from './ui/faq-item';
import { Button } from './ui/button';
import { Pricing } from './pricing';
import { whatsappUrl } from '../lib/whatsapp';

type Tier = {
  name: string;
  price: string;
  yearlyPrice: string;
  description: string;
  highlighted: boolean;
  features: readonly string[];
  ctaText: string;
};

export type LocationPageData = {
  heroHeadline: string;
  heroSub: string;
  targetLocation: string;
  bodyContent: React.ReactNode;
  faqs: readonly {
    readonly question: string;
    readonly answer: string;
  }[];
  tiers: readonly Tier[];
  guarantee: string;
  whatsapp: string;
};

const tradeLinks = [
  { label: 'Schilders', href: '/website-voor-schilders' },
  { label: 'Tandartsen', href: '/website-voor-tandartsen' },
  { label: 'Loodgieters', href: '/website-voor-loodgieters' },
  { label: 'Kappers', href: '/website-voor-kappers' },
  { label: 'Fysiotherapeuten', href: '/website-voor-fysiotherapeuten' },
  { label: 'Restaurants', href: '/website-voor-restaurants' },
  { label: 'Makelaars', href: '/website-voor-makelaars' },
  { label: 'Personal trainers', href: '/website-voor-personal-trainers' },
  { label: 'Timmermannen', href: '/website-voor-timmermannen' },
  { label: 'Elektriciens', href: '/website-voor-elektriciens' },
  { label: 'Aannemers', href: '/website-voor-aannemers' },
  { label: 'Hoveniers', href: '/website-voor-hoveniers' },
  { label: 'Stukadoors', href: '/website-voor-stukadoors' },
  { label: 'Klusbedrijven', href: '/website-voor-klusbedrijven' },
];

export function LocationPage({ data }: { data: LocationPageData }) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background pb-20 pt-12 lg:pb-32 lg:pt-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(71, 48, 198, 0.06), transparent)',
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {data.targetLocation}
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-6 max-w-4xl font-heading text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl xl:text-7xl">
              {data.heroHeadline}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              {data.heroSub}
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                href={whatsappUrl(data.whatsapp, `Hoi! Ik zoek een website in ${data.targetLocation}.`)}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="large"
              >
                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Gratis adviesgesprek
              </Button>
              <Button href="/#prijzen" variant="secondary">
                Bekijk prijzen
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Body content */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="prose prose-lg mx-auto max-w-3xl prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-li:text-muted">
              {data.bodyContent}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Related trades grid */}
      <section className="bg-primary-light py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Branches
            </span>
            <h2 className="mt-4 font-heading text-3xl text-foreground md:text-4xl lg:text-5xl">
              Websites voor elke branche
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-foreground/60">
              We bouwen websites voor vakmannen en ondernemers in heel {data.targetLocation}. Bekijk onze branche-specifieke pagina&apos;s.
            </p>
          </FadeIn>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {tradeLinks.map((link, i) => (
              <FadeIn key={link.href} delay={i * 0.03}>
                <Link
                  href={link.href}
                  className="group flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-light transition-colors group-hover:bg-primary group-hover:text-white">
                    <svg
                      className="h-4 w-4 text-primary group-hover:text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {link.label}
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {data.faqs.length > 0 && (
        <section className="bg-background py-24 lg:py-32">
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <FadeIn>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                FAQ
              </span>
              <h2 className="mt-4 font-heading text-3xl text-foreground md:text-4xl lg:text-5xl">
                Veelgestelde vragen
              </h2>
            </FadeIn>
            <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
              {data.faqs.map((item, i) => (
                <FaqItem key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing */}
      <Pricing tiers={data.tiers} guarantee={data.guarantee} whatsapp={data.whatsapp} />

      {/* CTA */}
      <section className="gradient-mesh-dark relative overflow-hidden py-24 lg:py-32">
        <div
          className="dot-grid-dark pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-3xl text-white md:text-4xl lg:text-5xl">
                Klaar voor een professionele website in {data.targetLocation}?
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/55">
                Plan een vrijblijvend gesprek en ontdek wat we voor jouw bedrijf kunnen betekenen.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button
                  href={whatsappUrl(data.whatsapp, `Hoi! Ik zoek een website in ${data.targetLocation}. Kunnen we een vrijblijvend gesprek plannen?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="white"
                  size="large"
                >
                  <svg className="mr-2 h-5 w-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat via WhatsApp
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/35">
                <span className="flex items-center gap-2">
                  <span className="relative h-2 w-2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />
                    <span className="absolute inset-0 rounded-full bg-emerald-400" />
                  </span>
                  Nu beschikbaar
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                  Reactie binnen een paar minuten
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                  Vrijblijvend gesprek
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
