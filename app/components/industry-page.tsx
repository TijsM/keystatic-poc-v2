'use client';

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

export type IndustryPageData = {
  industry: string;
  heroHeadline: string;
  heroSub: string;
  introText: string;
  painPoints: readonly {
    readonly icon: string;
    readonly title: string;
    readonly description: string;
  }[];
  benefits: readonly {
    readonly title: string;
    readonly description: string;
  }[];
  features: readonly string[];
  faqs: readonly {
    readonly question: string;
    readonly answer: string;
  }[];
  tiers: readonly Tier[];
  guarantee: string;
  whatsapp: string;
};

export function IndustryPage({ data }: { data: IndustryPageData }) {
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
              {data.industry}
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
                href={whatsappUrl(data.whatsapp, `Hoi! Ik ben ${data.industry.toLowerCase()} en zoek een professionele website.`)}
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

      {/* Intro text */}
      <section className="bg-primary-light py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-3xl">
              <p className="text-lg leading-relaxed text-foreground/80 md:text-xl md:leading-relaxed">
                {data.introText}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pain points */}
      <section className="gradient-mesh-dark relative overflow-hidden py-24 lg:py-32">
        <div
          className="dot-grid-dark pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-primary-bright uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-bright" />
              Het probleem
            </span>
            <h2 className="mt-4 max-w-2xl font-heading text-3xl text-white md:text-4xl lg:text-5xl">
              Herkenbaar als {data.industry.toLowerCase()}?
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {data.painPoints.map((point, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="glass-card-dark rounded-2xl p-8">
                  <span className="text-3xl" aria-hidden="true">
                    {point.icon}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {point.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              De oplossing
            </span>
            <h2 className="mt-4 max-w-3xl font-heading text-3xl text-foreground md:text-4xl lg:text-5xl">
              Wat een professionele website jou oplevert
            </h2>
          </FadeIn>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {data.benefits.map((benefit, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="rounded-2xl border border-border/60 bg-card p-8 transition-shadow hover:shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light">
                      <svg
                        className="h-5 w-5 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {benefit.title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-muted">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-primary-light py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <FadeIn>
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Alles inbegrepen
                </span>
                <h2 className="mt-4 font-heading text-3xl text-foreground md:text-4xl lg:text-5xl">
                  Wat zit er in jouw website?
                </h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-foreground/60">
                  Geen verborgen kosten. Alles wat je nodig hebt voor een
                  professionele online aanwezigheid, voor een vast bedrag per
                  maand.
                </p>
                <div className="mt-8">
                  <Button
                    href={whatsappUrl(data.whatsapp, `Hoi! Ik ben ${data.industry.toLowerCase()} en wil graag starten met een website.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                  >
                    <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Start vandaag
                  </Button>
                </div>
              </FadeIn>
            </div>
            <div>
              <FadeIn delay={0.2}>
                <ul className="space-y-4">
                  {data.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg
                        className="mt-1 h-5 w-5 shrink-0 text-warm"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <Pricing tiers={data.tiers} guarantee={data.guarantee} whatsapp={data.whatsapp} />

      {/* FAQ */}
      <section className="bg-primary-light py-24 lg:py-32">
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
                Klaar voor een professionele website?
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/55">
                Plan een vrijblijvend gesprek en ontdek wat we voor jouw{' '}
                {data.industry.toLowerCase()} kunnen betekenen.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button
                  href={whatsappUrl(data.whatsapp, `Hoi! Ik ben ${data.industry.toLowerCase()} en wil graag een vrijblijvend gesprek plannen.`)}
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
