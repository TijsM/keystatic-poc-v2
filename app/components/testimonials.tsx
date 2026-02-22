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

const ease = [0.16, 1, 0.3, 1] as const;

export function Testimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <section aria-label="Klantervaringen" className="gradient-mesh-dark noise-overlay relative overflow-hidden py-32 lg:py-40">
      {/* Dot grid */}
      <div className="dot-grid-dark pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Decorative rings */}
      <div aria-hidden="true">
        <div className="pointer-events-none absolute -left-32 top-20 h-[400px] w-[400px] rounded-full border border-white/[0.03]" />
        <div className="pointer-events-none absolute -right-20 bottom-20 h-[300px] w-[300px] rounded-full border border-white/[0.02]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ease }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-primary-bright uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-warm" />
                Ervaringen
              </span>
            </motion.div>
            <div className="mt-4">
              <TextReveal
                as="h2"
                className="font-heading text-4xl text-white md:text-5xl lg:text-6xl"
              >
                Wat onze klanten zeggen
              </TextReveal>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease,
              }}
              className="glass-card-dark group flex flex-col justify-between rounded-2xl p-8 transition-all duration-500 hover:bg-white/[0.05] hover:border-primary-bright/20 md:p-10"
            >
              <div>
                {/* Star rating */}
                <div className="flex gap-1" aria-hidden="true">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="h-4 w-4 text-warm" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="mt-6 text-lg leading-relaxed text-white/80">
                  &ldquo;{t.entry.quote}&rdquo;
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4 border-t border-white/[0.06] pt-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-bright/15 text-sm font-bold text-primary-bright ring-2 ring-primary-bright/10">
                  {t.entry.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <p className="font-semibold text-white">
                    {t.entry.name}
                  </p>
                  <p className="text-sm text-white/50">
                    {t.entry.role}, {t.entry.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
