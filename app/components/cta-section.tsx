'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { TextReveal } from './ui/text-reveal';
import { Button } from './ui/button';

export function CtaSection({
  headline,
  subtext,
  buttonText,
}: {
  headline: string;
  subtext: string;
  buttonText: string;
}) {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);

  return (
    <section id="contact" ref={sectionRef} className="relative bg-background px-6 py-24 lg:px-8 lg:py-32">
      <motion.div
        style={
          shouldReduceMotion
            ? undefined
            : { scale: bgScale, willChange: 'transform' }
        }
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-primary px-6 py-24 md:py-32"
      >
        {/* Decorative elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-[400px] w-[400px] rounded-full bg-white/[0.04]" />
          <div className="absolute -bottom-32 -left-32 h-[300px] w-[300px] rounded-full bg-white/[0.03]" />
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.03),transparent_70%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <TextReveal
            as="h2"
            className="font-heading text-4xl text-white md:text-6xl"
          >
            {headline}
          </TextReveal>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-lg text-white/70"
          >
            {subtext}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10"
          >
            <Button
              href="mailto:info@rodidigital.nl"
              variant="white"
              size="large"
            >
              {buttonText}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
