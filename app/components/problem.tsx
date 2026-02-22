'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { TextReveal } from './ui/text-reveal';

const ease = [0.16, 1, 0.3, 1] as const;

const painPoints = [
  { number: '€5.000+', label: 'gemiddelde kosten website', icon: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
    </svg>
  )},
  { number: '6-12', label: 'weken doorlooptijd', icon: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )},
  { number: '2 jaar', label: 'voor het verouderd is', icon: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  )},
];

export function Problem({
  headline,
  body,
}: {
  headline: string;
  body: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="gradient-mesh-dark noise-overlay relative overflow-hidden py-32 lg:py-40">
      {/* Dot grid overlay */}
      <div className="dot-grid-dark pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Decorative concentric rings */}
      <div aria-hidden="true">
        <div className="pointer-events-none absolute -right-32 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full border border-white/[0.03]" />
        <div className="pointer-events-none absolute -right-20 top-1/2 h-[350px] w-[350px] -translate-y-1/2 rounded-full border border-white/[0.02]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          {/* Left: copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ease }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-primary-bright uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-bright" />
                Het probleem
              </span>
            </motion.div>

            <div className="mt-6">
              <TextReveal
                as="h2"
                className="font-heading text-4xl leading-snug text-white md:text-5xl lg:text-6xl lg:leading-snug"
                staggerSpeed={0.03}
              >
                {headline}
              </TextReveal>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease,
              }}
              className="mt-8 max-w-lg text-lg leading-relaxed text-white/60"
            >
              {body}
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.5,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="mt-8 h-px w-24 origin-left bg-gradient-to-r from-primary-bright to-warm/50"
            />
          </div>

          {/* Right: pain point stats */}
          <div className="space-y-4 lg:pt-8">
            {painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.15,
                  ease,
                }}
                className="glass-card-dark group rounded-2xl p-6 transition-all duration-500 hover:bg-white/[0.05] hover:border-primary-bright/20"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-bright/10 text-primary-bright transition-colors group-hover:bg-primary-bright/15">
                    {point.icon}
                  </div>
                  <div>
                    <p className="font-heading text-3xl text-white md:text-4xl">
                      {point.number}
                    </p>
                    <p className="mt-1 text-sm text-white/50">
                      {point.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
