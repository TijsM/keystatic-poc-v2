'use client';

import { motion } from 'framer-motion';
import { TextReveal } from './ui/text-reveal';

const ease = [0.16, 1, 0.3, 1] as const;

type AdvantageCard = {
  readonly competitor: string;
  readonly label: string;
  readonly pain: string;
  readonly benefit: string;
};

type ComparisonProps = {
  headline: string;
  subtitle: string;
  cards: readonly AdvantageCard[];
};

const palettes = [
  {
    badge: 'bg-sky-400/10 text-sky-300',
    border: 'border-sky-400/10',
  },
  {
    badge: 'bg-warm/10 text-warm',
    border: 'border-warm/10',
  },
  {
    badge: 'bg-rose-400/10 text-rose-300',
    border: 'border-rose-400/10',
  },
];

function MarqueeRow({
  cards,
  palette,
  direction = 'left',
  duration = 35,
}: {
  cards: readonly AdvantageCard[];
  palette: (competitor: string) => (typeof palettes)[number];
  direction?: 'left' | 'right';
  duration?: number;
}) {
  const doubled = [...cards, ...cards];

  return (
    <div
      className="group/marquee relative overflow-hidden"
      aria-hidden="true"
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[var(--color-dark)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[var(--color-dark)] to-transparent" />

      <div
        className="flex gap-4 group-hover/marquee:[animation-play-state:paused]"
        style={{
          animation: `marquee-${direction} ${duration}s linear infinite`,
          width: 'max-content',
        }}
      >
        {doubled.map((card, i) => {
          const colors = palette(card.competitor);
          return (
            <div
              key={`${card.label}-${i}`}
              className={`glass-card-dark relative shrink-0 overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.04] ${colors.border} w-[340px]`}
            >
              {/* Competitor badge */}
              <span
                className={`inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wide ${colors.badge}`}
              >
                vs. {card.competitor}
              </span>

              {/* Advantage heading */}
              <h3 className="mt-3 font-heading text-xl leading-snug text-white">
                {card.label}
              </h3>

              {/* Pain / Benefit */}
              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                    <svg
                      className="h-2.5 w-2.5 text-red-400/70"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <span className="text-sm leading-snug text-white/35">
                    {card.pain}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                    <svg
                      className="h-2.5 w-2.5 text-emerald-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium leading-snug text-emerald-400/90">
                    {card.benefit}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Comparison({ headline, subtitle, cards }: ComparisonProps) {
  const seen = new Map<string, number>();
  cards.forEach((c) => {
    if (!seen.has(c.competitor)) seen.set(c.competitor, seen.size);
  });
  const palette = (competitor: string) =>
    palettes[(seen.get(competitor) ?? 0) % palettes.length];

  // Split cards into two rows for opposing scroll directions
  const mid = Math.ceil(cards.length / 2);
  const row1 = cards.slice(0, mid);
  const row2 = cards.slice(mid);

  return (
    <section
      aria-label="Vergelijking"
      className="gradient-mesh-dark noise-overlay relative overflow-hidden py-32 lg:py-40"
    >
      {/* Dot grid */}
      <div
        className="dot-grid-dark pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      {/* Decorative rings */}
      <div aria-hidden="true">
        <div className="pointer-events-none absolute -left-32 top-20 h-[400px] w-[400px] rounded-full border border-white/[0.03]" />
        <div className="pointer-events-none absolute -right-20 bottom-20 h-[300px] w-[300px] rounded-full border border-white/[0.02]" />
      </div>

      <div className="relative z-10">
        {/* Header — constrained */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
                  Vergelijk
                </span>
              </motion.div>
              <div className="mt-4">
                <TextReveal
                  as="h2"
                  className="font-heading text-4xl text-white md:text-5xl lg:text-6xl"
                >
                  {headline}
                </TextReveal>
              </div>
            </div>
            <div className="flex items-end">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, ease }}
                className="max-w-md text-lg leading-relaxed text-white/50 lg:ml-auto lg:text-right"
              >
                {subtitle}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Marquee rows — full bleed */}
        <div className="mt-16 space-y-4">
          <MarqueeRow
            cards={row1}
            palette={palette}
            direction="left"
            duration={40}
          />
          <MarqueeRow
            cards={row2}
            palette={palette}
            direction="right"
            duration={45}
          />
        </div>
      </div>

      {/* Accessible content for screen readers */}
      <div className="sr-only">
        <h2>{headline}</h2>
        <ul>
          {cards.map((card) => (
            <li key={`${card.competitor}-${card.label}`}>
              vs. {card.competitor}: {card.label}. {card.pain} — {card.benefit}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
