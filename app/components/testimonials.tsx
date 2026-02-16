import { FadeIn } from './ui/fade-in';
import { StaggerChildren, StaggerItem } from './ui/stagger-children';

type Testimonial = {
  slug: string;
  entry: {
    name: string;
    role: string;
    company: string;
    quote: string;
  };
};

export function Testimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <section className="bg-primary-light py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <h2 className="text-center font-heading text-4xl text-foreground md:text-5xl">
            Wat onze klanten zeggen
          </h2>
        </FadeIn>

        <StaggerChildren className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.slug}>
              <div className="rounded-2xl bg-card p-8 shadow-sm">
                <p className="text-muted leading-relaxed">
                  &ldquo;{t.entry.quote}&rdquo;
                </p>
                <div className="mt-6">
                  <p className="font-semibold text-foreground">
                    {t.entry.name}
                  </p>
                  <p className="text-sm text-muted">
                    {t.entry.role}, {t.entry.company}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
