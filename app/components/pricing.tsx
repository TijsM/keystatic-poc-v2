'use client';

import { motion } from 'framer-motion';
import { TextReveal } from './ui/text-reveal';
import { Button } from './ui/button';

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

export function Pricing({
  tiers,
  guarantee,
}: {
  tiers: readonly Tier[];
  guarantee: string;
}) {

  return (
    <section id="prijzen" className="bg-primary-light py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ease }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Prijzen
              </span>
            </motion.div>
            <div className="mt-4">
              <TextReveal
                as="h2"
                className="font-heading text-4xl text-foreground md:text-5xl lg:text-6xl"
              >
                Eenvoudig en transparant.
              </TextReveal>
            </div>
          </div>
          <div className="flex items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, ease }}
              className="max-w-md text-lg leading-relaxed text-muted lg:ml-auto lg:text-right"
            >
              Geen opstartkosten, geen verborgen kosten.
            </motion.p>
          </div>
        </div>

        {/* Tier cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease,
              }}
              className={`relative flex flex-col overflow-hidden rounded-2xl border bg-card ${
                tier.highlighted
                  ? 'border-primary shadow-lg shadow-primary/10'
                  : 'border-border/60'
              }`}
            >
              {/* Highlighted badge */}
              {tier.highlighted && (
                <div className="bg-primary px-4 py-2 text-center text-xs font-semibold tracking-wider text-white uppercase">
                  Meest gekozen
                </div>
              )}

              <div className="flex flex-1 flex-col p-8 md:p-10">
                {/* Tier name + description */}
                <div>
                  <h3 className="font-heading text-2xl text-foreground">
                    {tier.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{tier.description}</p>
                </div>

                {/* Price */}
                <div className="mt-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg text-muted">&euro;</span>
                    <span className="font-heading text-5xl text-foreground md:text-6xl">
                      {tier.price}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    per maand
                  </p>
                </div>

                {/* Divider */}
                <div className="my-8 h-px bg-border/60" />

                {/* Features */}
                <ul className="flex-1 space-y-3">
                  {tier.features.map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
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
                      <span className="text-sm text-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-8">
                  <Button
                    href="#contact"
                    variant={tier.highlighted ? 'primary' : 'secondary'}
                    size="large"
                    className="w-full"
                  >
                    {tier.ctaText}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantee */}
        {guarantee && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, ease }}
            className="mt-8 text-center text-sm text-muted"
          >
            {guarantee}
          </motion.p>
        )}
      </div>
    </section>
  );
}
