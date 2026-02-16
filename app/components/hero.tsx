'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { TextReveal } from './ui/text-reveal';
import { Button } from './ui/button';

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

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background"
    >
      {/* Parallax decorative layers */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            style={{ y: bgY, willChange: 'transform' }}
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/[0.04] to-transparent" />
            <div className="absolute -bottom-48 -left-48 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-accent/[0.06] to-transparent" />
          </motion.div>

          <motion.div
            style={{ y: layer1Y, willChange: 'transform' }}
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute right-[15%] top-[20%] h-24 w-24 rounded-full border border-primary/10" />
            <div className="absolute bottom-[25%] left-[10%] h-16 w-16 rounded-full bg-accent/[0.08]" />
          </motion.div>

          <motion.div
            style={{ y: layer2Y, willChange: 'transform' }}
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute left-[20%] top-[15%] h-2 w-2 rounded-full bg-primary/20" />
            <div className="absolute bottom-[30%] right-[25%] h-3 w-3 rounded-full bg-accent/30" />
            <div className="absolute right-[12%] top-[60%] h-1.5 w-1.5 rounded-full bg-foreground/10" />
          </motion.div>

          <motion.div
            style={{ y: layer3Y, willChange: 'transform' }}
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute left-[8%] top-[40%] h-px w-20 bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
            <div className="absolute bottom-[40%] right-[8%] h-20 w-px bg-gradient-to-b from-transparent via-accent/15 to-transparent" />
          </motion.div>
        </>
      )}

      {/* Content */}
      <motion.div
        style={
          shouldReduceMotion
            ? undefined
            : { opacity: contentOpacity, y: contentY, willChange: 'transform, opacity' }
        }
        className="relative z-10 mx-auto max-w-5xl px-6 py-28 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block rounded-full border border-primary/20 bg-primary-light px-4 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase">
            Website als Service
          </span>
        </motion.div>

        <div className="mt-8">
          <TextReveal
            as="h1"
            className="font-heading text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.08] tracking-tight text-foreground"
            delay={0.3}
          >
            {headline}
          </TextReveal>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
        >
          {subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Button href="#prijzen" size="large">
            {ctaText}
          </Button>
          <Button href="#proces" variant="secondary" size="large">
            Hoe het werkt
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      {!shouldReduceMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-medium tracking-widest text-muted/60 uppercase">
              Scroll
            </span>
            <div className="h-10 w-[1px] bg-gradient-to-b from-muted/40 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
