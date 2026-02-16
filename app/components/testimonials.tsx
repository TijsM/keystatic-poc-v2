'use client';

import { motion } from 'framer-motion';
import { TextReveal } from './ui/text-reveal';

type Testimonial = {
  slug: string;
  entry: {
    name: string;
    role: string;
    company: string;
    quote: string;
  };
};

export function Testimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <section className="overflow-hidden bg-foreground py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.5fr]">
          {/* Left column - heading */}
          <div className="lg:sticky lg:top-28">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ease: [0.16, 1, 0.3, 1] }}
              className="text-xs font-semibold tracking-widest text-primary uppercase"
            >
              Ervaringen
            </motion.span>
            <div className="mt-4">
              <TextReveal
                as="h2"
                className="font-heading text-4xl text-background md:text-5xl"
              >
                Wat onze klanten zeggen
              </TextReveal>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.4,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="mt-8 h-px w-16 origin-left bg-primary"
            />
          </div>

          {/* Right column - cards with offset */}
          <div className="space-y-6">
            {testimonials.map((t, i) => {
              const isOdd = i % 2 === 1;
              return (
                <motion.div
                  key={t.slug}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`rounded-2xl bg-white/[0.06] p-8 backdrop-blur-sm md:p-10 ${isOdd ? 'lg:translate-x-8' : ''}`}
                >
                  <div className="mb-6 font-heading text-5xl text-primary/30">
                    &ldquo;
                  </div>
                  <p className="text-lg leading-relaxed text-background/80">
                    {t.entry.quote}
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                      {t.entry.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-background">
                        {t.entry.name}
                      </p>
                      <p className="text-sm text-background/50">
                        {t.entry.role}, {t.entry.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
