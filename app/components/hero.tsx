'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { Button } from './ui/button';

const ease = [0.16, 1, 0.3, 1] as const;

function AnimatedWord({
  word,
  index,
  highlight = false,
}: {
  word: string;
  index: number;
  highlight?: boolean;
}) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        className={`inline-block ${highlight ? 'text-primary' : ''}`}
        initial={{ y: '110%', rotateX: -80 }}
        animate={{ y: '0%', rotateX: 0 }}
        transition={{
          duration: 0.9,
          delay: 0.4 + index * 0.045,
          ease,
        }}
        style={{ willChange: 'transform' }}
      >
        {word}
      </motion.span>
      {'\u00A0'}
    </span>
  );
}

const trustItems = [
  'Geen contract',
  'Hosting inbegrepen',
  '30 dagen garantie',
];

export function Hero({
  headline,
  subheadline,
  ctaText,
}: {
  headline: string;
  subheadline: string;
  ctaText: string;
}) {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, 60]);
  const mockupY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);
  const floatY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const words = headline.split(' ');
  const highlightWords = ['€100'];

  return (
    <section
      ref={sectionRef}
      className="gradient-mesh-light noise-overlay relative min-h-screen overflow-hidden"
    >
      {/* Subtle dot grid */}
      <div className="dot-grid pointer-events-none absolute inset-0 z-[2]" aria-hidden="true" />

      {/* Decorative rings */}
      {!shouldReduceMotion && (
        <div aria-hidden="true">
          <motion.div
            style={{ y: floatY }}
            className="decorative-ring pointer-events-none absolute -right-32 top-24 h-[500px] w-[500px]"
          />
          <motion.div
            style={{ y: floatY }}
            className="decorative-ring-warm pointer-events-none absolute -left-20 bottom-20 h-[350px] w-[350px]"
          />
          {/* Small floating accent dot */}
          <motion.div
            className="animate-float-slow pointer-events-none absolute right-1/4 top-1/3 h-2 w-2 rounded-full bg-warm/40"
          />
          <motion.div
            className="animate-float pointer-events-none absolute left-1/3 top-2/3 h-1.5 w-1.5 rounded-full bg-primary/30"
          />
        </div>
      )}

      {/* Main content */}
      <motion.div
        style={
          shouldReduceMotion
            ? undefined
            : { opacity: contentOpacity, y: contentY, willChange: 'transform, opacity' }
        }
        className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 pt-36 pb-20 lg:min-h-screen lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-8 lg:pt-0 lg:pb-0"
      >
        {/* Left: copy */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-light px-4 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-warm" />
              Website as a Service
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="mt-8 font-heading text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.05] tracking-tight text-foreground">
            {shouldReduceMotion
              ? headline
              : words.map((word, i) => (
                <AnimatedWord
                  key={i}
                  word={word}
                  index={i}
                  highlight={highlightWords.some((hw) => word.includes(hw))}
                />
              ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-muted"
          >
            {subheadline}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button href="#contact" size="large">
              {ctaText}
            </Button>
            <a
              href="#proces"
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Hoe het werkt
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4, ease }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-border/60 pt-6"
          >
            {trustItems.map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-[13px] text-muted"
              >
                <svg
                  className="h-4 w-4 text-warm"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right: elevated browser mockup */}
        <div className="relative hidden lg:block" style={{ perspective: '1200px' }}>
          <motion.div
            style={shouldReduceMotion ? undefined : { y: mockupY }}
            initial={{ opacity: 0, y: 60, rotateY: -6, rotateX: 3 }}
            animate={{ opacity: 1, y: 0, rotateY: -3, rotateX: 1.5 }}
            transition={{ duration: 1.2, delay: 0.5, ease }}
            className="relative"
          >
            {/* Soft shadow behind mockup */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-3xl bg-primary/[0.04] blur-[40px]"
            />

            {/* Browser mockup */}
            <div
              aria-hidden="true"
              className="card-elevated relative overflow-hidden rounded-2xl"
            >
              {/* Browser bar */}
              <div className="flex items-center gap-2 border-b border-border/40 bg-surface px-5 py-3.5">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                </div>
                <div className="ml-3 flex-1 rounded-md bg-background px-3 py-1 text-[11px] text-muted">
                  jouwbedrijf.nl
                </div>
              </div>

              {/* Website content */}
              <div className="p-8">
                {/* Nav skeleton */}
                <div className="flex items-center justify-between">
                  <div className="h-3 w-24 rounded bg-foreground/10" />
                  <div className="flex gap-3">
                    <div className="h-2.5 w-12 rounded bg-foreground/[0.06]" />
                    <div className="h-2.5 w-12 rounded bg-foreground/[0.06]" />
                    <div className="h-2.5 w-12 rounded bg-foreground/[0.06]" />
                  </div>
                </div>

                {/* Hero skeleton */}
                <div className="mt-10 space-y-3">
                  <div className="h-5 w-4/5 rounded bg-foreground/10" />
                  <div className="h-5 w-3/5 rounded bg-foreground/10" />
                  <div className="mt-4 h-3 w-2/3 rounded bg-foreground/[0.06]" />
                </div>
                <div className="mt-6 h-9 w-28 rounded-full bg-primary/80" />

                {/* Bento cards skeleton */}
                <div className="mt-10 grid grid-cols-3 gap-3">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="space-y-2 rounded-lg border border-border/40 bg-surface p-4"
                    >
                      <div className="h-8 w-8 rounded-md bg-primary/15" />
                      <div className="h-2.5 w-full rounded bg-foreground/[0.06]" />
                      <div className="h-2 w-3/4 rounded bg-foreground/[0.04]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating stat — bottom-left */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease }}
              className="card-elevated animate-float-delayed absolute -bottom-6 -left-6 rounded-xl px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light">
                  <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">99.9% uptime</p>
                  <p className="text-xs text-muted">Altijd online</p>
                </div>
              </div>
            </motion.div>

            {/* Floating speed — top-right */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4, ease }}
              className="card-elevated animate-float absolute -right-4 -top-4 rounded-xl px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-light">
                  <svg className="h-5 w-5 text-warm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">&lt;2s laadtijd</p>
                  <p className="text-xs text-muted">Razendsnelle sites</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated gradient line at bottom */}
      <div className="animated-gradient-line absolute bottom-0 left-0 right-0 z-10" aria-hidden="true" />

      {/* Scroll indicator */}
      {!shouldReduceMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-medium tracking-widest text-muted uppercase">
              Scroll
            </span>
            <div className="h-8 w-[1px] bg-gradient-to-b from-muted/30 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
