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
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-primary text-white"
      >
        {/* Decorative elements */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-24 -top-24 h-[400px] w-[400px] rounded-full bg-white/[0.04]" />
          <div className="absolute -bottom-32 -left-32 h-[300px] w-[300px] rounded-full bg-white/[0.03]" />
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
          </div>
        </div>
      </motion.div>
    </section>
  );
}
