'use client';

import { motion } from 'framer-motion';
import { TextReveal } from './ui/text-reveal';
import { Button } from './ui/button';

const ease = [0.16, 1, 0.3, 1] as const;

export function CtaSection({
  headline,
  subtext,
  buttonText,
}: {
  headline: string;
  subtext: string;
  buttonText: string;
}) {
  return (
    <section id="contact" className="bg-background px-6 py-24 lg:px-8 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem]"
      >
        {/* Multi-layered gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 50%, rgba(71, 48, 198, 0.95), transparent),
              radial-gradient(ellipse 60% 50% at 80% 30%, rgba(155, 140, 255, 0.4), transparent),
              radial-gradient(ellipse 50% 40% at 50% 90%, rgba(196, 149, 106, 0.15), transparent),
              linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 40%, #5b3fd9 100%)
            `,
          }}
          aria-hidden="true"
        />

        {/* Dot grid overlay */}
        <div className="dot-grid-dark pointer-events-none absolute inset-0" aria-hidden="true" />

        {/* Decorative elements */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-24 -top-24 h-[400px] w-[400px] rounded-full border border-white/[0.06]" />
          <div className="absolute -bottom-32 -left-32 h-[300px] w-[300px] rounded-full border border-white/[0.04]" />
          {/* Floating accent dots */}
          <div className="animate-float absolute right-20 top-16 h-2 w-2 rounded-full bg-warm/40" />
          <div className="animate-float-delayed absolute left-1/4 bottom-20 h-1.5 w-1.5 rounded-full bg-white/20" />
        </div>

        <div className="relative z-10 px-8 py-20 md:px-16 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <TextReveal
              as="h2"
              className="font-heading text-4xl text-white md:text-5xl lg:text-6xl"
            >
              {headline}
            </TextReveal>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, ease }}
              className="mt-6 text-lg text-white/70"
            >
              {subtext}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, ease }}
              className="mt-10"
            >
              <Button
                href="mailto:hello@rodi-digital.com"
                variant="white"
                size="large"
              >
                {buttonText}
              </Button>
            </motion.div>

            {/* Trust line */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, ease }}
              className="mt-6 text-sm text-white/40"
            >
              Reactie binnen 24 uur
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
