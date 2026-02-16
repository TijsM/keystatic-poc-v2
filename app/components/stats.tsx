'use client';

import { NumberCounter } from './ui/number-counter';
import { FadeIn } from './ui/fade-in';

type StatItem = {
  value: string;
  suffix: string;
  label: string;
};

export function Stats({ items }: { items: readonly StatItem[] }) {
  return (
    <section className="bg-primary-light py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-y-12 gap-x-8 md:grid-cols-4">
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="text-center">
                <div className="font-heading text-5xl text-foreground md:text-6xl">
                  <NumberCounter
                    value={parseFloat(item.value)}
                    suffix={item.suffix}
                    decimals={item.value.includes('.') ? 1 : 0}
                  />
                </div>
                <p className="mt-3 text-sm font-medium tracking-wide text-muted uppercase">
                  {item.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
