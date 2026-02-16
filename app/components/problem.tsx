'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { TextReveal } from './ui/text-reveal';

export function Problem({
  headline,
  body,
}: {
  headline: string;
  body: string;
}) {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const clipProgress = useTransform(scrollYProgress, [0.1, 0.4], [100, 0]);
  const blockScale = useTransform(scrollYProgress, [0.1, 0.5], [0.85, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-foreground py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Text side */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                Het probleem
              </span>
            </motion.div>

            <div className="mt-6">
              <TextReveal
                as="h2"
                className="font-heading text-4xl leading-snug text-background md:text-5xl md:leading-snug"
                staggerSpeed={0.03}
              >
                {headline}
              </TextReveal>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-8 max-w-lg text-lg leading-relaxed text-background/60"
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
              className="mt-8 h-px w-24 origin-left bg-primary"
            />
          </div>

          {/* Decorative visual with clip-path reveal */}
          <div className="relative">
            <motion.div
              style={
                shouldReduceMotion
                  ? undefined
                  : { scale: blockScale, willChange: 'transform' }
              }
              className="relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <motion.div
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 1.2,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.12),transparent_60%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4 px-12">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.8 + i * 0.1,
                          duration: 0.5,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="aspect-square rounded-lg bg-white/[0.08] backdrop-blur-sm"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating accent block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-6 -left-6 h-24 w-24 rounded-xl bg-accent/20 lg:-bottom-8 lg:-left-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
