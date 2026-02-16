import { FadeIn } from './ui/fade-in';
import { Button } from './ui/button';

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
  return (
    <section id="prijzen" className="bg-background py-24">
      <div className="mx-auto max-w-2xl px-6">
        <FadeIn>
          <div className="rounded-3xl border-2 border-primary bg-card p-10 shadow-lg md:p-14">
            <p className="text-center text-sm font-semibold tracking-wide text-primary uppercase">
              Alles inbegrepen
            </p>
            <div className="mt-4 text-center">
              <span className="font-heading text-6xl text-foreground md:text-7xl">
                &euro;{monthlyPrice}
              </span>
              <span className="ml-2 text-muted">/maand</span>
            </div>
            <p className="mt-2 text-center text-sm text-muted">
              Geen opstartkosten
            </p>

            <ul className="mt-10 space-y-4">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
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
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 text-center">
              <Button href="#contact">{ctaText}</Button>
            </div>
            <p className="mt-4 text-center text-sm text-muted">{guarantee}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
