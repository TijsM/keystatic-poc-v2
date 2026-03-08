'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FadeIn } from './ui/fade-in';
import { Button } from './ui/button';
import { Pricing } from './pricing';

const ease = [0.16, 1, 0.3, 1] as const;

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
};

function FaqItem({
  item,
  index,
}: {
  item: { question: string; answer: string };
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const answerId = `faq-answer-${index}`;

  return (
    <div
      className={`border-b border-border/70 transition-colors duration-300 ${open ? 'bg-primary-light/50' : ''}`}
    >
      <h3>
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={answerId}
          className="group flex w-full items-center justify-between px-6 py-6 text-left"
        >
          <span className="flex items-center gap-4 pr-6">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-light text-xs font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-lg font-medium text-foreground transition-colors group-hover:text-primary md:text-xl">
              {item.question}
            </span>
          </span>
          <motion.div
            animate={{ rotate: open ? 135 : 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border transition-colors group-hover:border-primary group-hover:text-primary"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <line x1="7" y1="0" x2="7" y2="14" />
              <line x1="0" y1="7" x2="14" y2="7" />
            </svg>
          </motion.div>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={answerId}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="overflow-hidden"
          >
            <p
              className="max-w-2xl pb-6 pr-6 leading-relaxed text-muted"
              style={{ paddingLeft: 'calc(2rem + 2.5rem)' }}
            >
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
              <Button href="/#contact" variant="primary" size="large">
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
                  <Button href="/#contact" variant="primary">
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
      <Pricing tiers={data.tiers} guarantee={data.guarantee} />

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
                <Button href="/#contact" variant="white" size="large">
                  Neem contact op
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/35">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                  Reactie binnen 24 uur
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
