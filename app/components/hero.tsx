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
  const proofCardY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);
  const floatY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const words = headline.split(' ');
  const highlightWords = ['€100'];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-background"
    >
      {/* Background decorative elements */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            style={{ y: floatY }}
            className="pointer-events-none absolute -right-20 top-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/[0.06] to-transparent blur-3xl"
          />
          <motion.div
            style={{ y: floatY }}
            className="pointer-events-none absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-accent/[0.08] to-transparent blur-3xl"
          />
        </>
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
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-4 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Website als Service
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="mt-8 font-heading text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] tracking-tight text-foreground">
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
                  className="h-4 w-4 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right: proof card + decorative */}
        <div className="relative hidden lg:block">
          {/* Floating proof card */}
          <motion.div
            style={shouldReduceMotion ? undefined : { y: proofCardY }}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease }}
            className="relative"
          >
            {/* Main card — stylized browser mockup */}
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl shadow-foreground/[0.06]">
              {/* Browser bar */}
              <div className="flex items-center gap-2 border-b border-border/40 bg-surface px-5 py-3.5">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                </div>
                <div className="ml-3 flex-1 rounded-md bg-background px-3 py-1 text-[11px] text-muted/60">
                  jouwbedrijf.nl
                </div>
              </div>

              {/* Fake website content */}
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

                {/* Cards skeleton */}
                <div className="mt-10 grid grid-cols-3 gap-3">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="space-y-2 rounded-lg bg-surface p-4"
                    >
                      <div className="h-8 w-8 rounded-md bg-primary/15" />
                      <div className="h-2.5 w-full rounded bg-foreground/[0.06]" />
                      <div className="h-2 w-3/4 rounded bg-foreground/[0.04]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating stat card — overlapping bottom-left */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease }}
              className="absolute -bottom-6 -left-6 rounded-xl border border-border/50 bg-card px-5 py-4 shadow-xl"
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

            {/* Floating speed card — top-right */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4, ease }}
              className="absolute -right-4 -top-4 rounded-xl border border-border/50 bg-card px-5 py-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15">
                  <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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

      {/* Scroll indicator */}
      {!shouldReduceMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-medium tracking-widest text-muted/50 uppercase">
              Scroll
            </span>
            <div className="h-8 w-[1px] bg-gradient-to-b from-muted/30 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
