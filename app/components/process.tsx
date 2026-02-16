'use client';

import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { TextReveal } from './ui/text-reveal';

type Step = {
  slug: string;
  entry: {
    title: string;
    description: string;
    stepNumber: number | null;
  };
};

function StepCard({ step, index }: { step: Step; index: number }) {
  const colors = ['bg-primary', 'bg-accent', 'bg-foreground'];

  return (
    <div className="flex h-full flex-col justify-between rounded-3xl bg-card p-10 shadow-lg md:p-14">
      <div>
        <div
          className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${colors[index % 3]} text-xl font-bold text-white`}
        >
          {step.entry.stepNumber ?? index + 1}
        </div>
        <h3 className="mt-8 font-heading text-3xl text-foreground md:text-4xl">
          {step.entry.title}
        </h3>
        <p className="mt-4 max-w-sm text-lg leading-relaxed text-muted">
          {step.entry.description}
        </p>
      </div>
      <div className="mt-10">
        <div className="h-1 w-16 rounded-full bg-border" />
      </div>
    </div>
  );
}

function ProgressDot({
  scrollYProgress,
  start,
  end,
}: {
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  start: number;
  end: number;
}) {
  const scale = useTransform(scrollYProgress, [start, end], [1, 1.4]);
  const opacity = useTransform(scrollYProgress, [start, end], [0.3, 1]);

  return (
    <motion.div
      style={{
        scale,
        opacity,
        willChange: 'transform, opacity',
      }}
      className="h-2 w-2 rounded-full bg-primary"
    />
  );
}

function HorizontalProcess({ sorted }: { sorted: Step[] }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const panelCount = sorted.length || 3;
  const endPercent = ((panelCount - 1) / panelCount) * 100;
  const x = useTransform(
    scrollYProgress,
    [0.1, 0.9],
    ['0%', `-${endPercent}%`],
  );

  return (
    <section
      id="proces"
      ref={sectionRef}
      className="relative h-[300vh] bg-primary-light"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="shrink-0 pt-20 pb-6">
          <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ease: [0.16, 1, 0.3, 1] }}
              className="text-xs font-semibold tracking-widest text-primary uppercase"
            >
              Het proces
            </motion.span>
            <div className="mt-3">
              <TextReveal
                as="h2"
                className="font-heading text-4xl text-foreground md:text-6xl"
              >
                Hoe het werkt
              </TextReveal>
            </div>
          </div>
        </div>

        <div className="relative flex flex-1 items-center">
          <motion.div
            style={{ x, willChange: 'transform' }}
            className="flex"
          >
            {sorted.map((step, i) => (
              <div
                key={step.slug}
                className="w-screen flex-shrink-0 px-6 md:px-16 lg:px-24"
              >
                <div className="mx-auto max-w-2xl">
                  <StepCard step={step} index={i} />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
          {sorted.map((_, i) => {
            const dotStart = i / panelCount;
            const dotEnd = (i + 0.5) / panelCount;
            return (
              <ProgressDot
                key={i}
                scrollYProgress={scrollYProgress}
                start={dotStart}
                end={dotEnd}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function VerticalProcess({ sorted }: { sorted: Step[] }) {
  return (
    <section id="proces" className="bg-primary-light py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">
            Het proces
          </span>
          <h2 className="mt-3 font-heading text-4xl text-foreground md:text-5xl">
            Hoe het werkt
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {sorted.map((step, i) => (
            <motion.div
              key={step.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <StepCard step={step} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process({ steps }: { steps: Step[] }) {
  const sorted = [...steps].sort(
    (a, b) => (a.entry.stepNumber ?? 0) - (b.entry.stepNumber ?? 0),
  );
  const shouldReduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isDesktop && !shouldReduceMotion) {
    return <HorizontalProcess sorted={sorted} />;
  }

  return <VerticalProcess sorted={sorted} />;
}
