'use client';

import { motion } from 'framer-motion';
import { TextReveal } from './ui/text-reveal';
import { Button } from './ui/button';
import { NumberCounter } from './ui/number-counter';

const ease = [0.16, 1, 0.3, 1] as const;

export function Pricing({
  monthlyPrice,
  ctaText,
  guarantee,
  features,
}: {
  monthlyPrice: string;
  ctaText: string;
  guarantee: string;
  features: readonly string[];
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
              className="max-w-md text-lg leading-relaxed text-muted lg:ml-auto"
            >
              Eén prijs, alles inbegrepen. Geen verborgen kosten, geen
              verrassingen achteraf.
            </motion.p>
          </div>
        </div>

        {/* Pricing card — asymmetric layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="mt-16"
        >
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg">
            <div className="grid lg:grid-cols-[1fr_1.2fr]">
              {/* Left: price */}
              <div className="flex flex-col justify-center border-b border-border/40 p-10 lg:border-b-0 lg:border-r lg:p-14">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl text-muted">&euro;</span>
                    <span className="font-heading text-7xl text-foreground md:text-8xl">
                      <NumberCounter
                        value={parseFloat(monthlyPrice)}
                        duration={1.5}
                      />
                    </span>
                  </div>
                  <p className="mt-2 text-muted">
                    per maand &middot; geen opstartkosten
                  </p>
                </div>

                <div className="mt-10">
                  <Button href="#contact" size="large" className="w-full">
                    {ctaText}
                  </Button>
                </div>
                {guarantee && (
                  <p className="mt-4 text-center text-sm text-muted">
                    {guarantee}
                  </p>
                )}
              </div>

              {/* Right: features */}
              <div className="p-10 lg:p-14">
                <p className="text-xs font-semibold tracking-widest text-foreground uppercase">
                  Wat je krijgt
                </p>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: 0.1 + i * 0.05,
                        ease,
                      }}
                      className="flex items-start gap-3"
                    >
                      <svg
                        className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-[15px] text-foreground">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
