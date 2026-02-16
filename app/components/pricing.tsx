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
import { NumberCounter } from './ui/number-counter';

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
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });
  const cardScale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], [3, 0]);

  return (
    <section id="prijzen" ref={sectionRef} className="bg-primary-light py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-semibold tracking-widest text-primary uppercase"
          >
            Prijzen
          </motion.span>
          <div className="mt-4">
            <TextReveal
              as="h2"
              className="font-heading text-4xl text-foreground md:text-6xl"
            >
              Eenvoudig en transparant
            </TextReveal>
          </div>
        </div>

        <motion.div
          style={
            shouldReduceMotion
              ? undefined
              : {
                  scale: cardScale,
                  rotateX: cardRotate,
                  willChange: 'transform',
                }
          }
          className="mx-auto mt-16 max-w-xl"
        >
          <div className="relative overflow-hidden rounded-[2rem] bg-card shadow-2xl shadow-primary/10">
            {/* Top accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />

            <div className="p-10 md:p-14">
              <div className="text-center">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-2xl text-muted">&euro;</span>
                  <span className="font-heading text-7xl text-foreground md:text-8xl">
                    <NumberCounter
                      value={parseFloat(monthlyPrice)}
                      duration={1.5}
                    />
                  </span>
                </div>
                <p className="mt-1 text-muted">per maand &middot; geen opstartkosten</p>
              </div>

              <div className="my-10 h-px bg-border" />

              <ul className="space-y-4">
                {features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
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

              <div className="mt-10 text-center">
                <Button href="#contact" size="large" className="w-full">
                  {ctaText}
                </Button>
              </div>
              <p className="mt-4 text-center text-sm text-muted">
                {guarantee}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
