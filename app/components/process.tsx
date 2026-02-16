import { StaggerChildren, StaggerItem } from './ui/stagger-children';
import { FadeIn } from './ui/fade-in';

type Step = {
  slug: string;
  entry: {
    title: string;
    description: string;
    stepNumber: number | null;
  };
};

export function Process({ steps }: { steps: Step[] }) {
  const sorted = [...steps].sort(
    (a, b) => (a.entry.stepNumber ?? 0) - (b.entry.stepNumber ?? 0),
  );

  return (
    <section id="proces" className="bg-primary-light py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <h2 className="text-center font-heading text-4xl text-foreground md:text-5xl">
            Hoe het werkt
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted">
            In drie simpele stappen naar een professionele website
          </p>
        </FadeIn>

        <StaggerChildren className="mt-16 grid gap-8 md:grid-cols-3">
          {sorted.map((step) => (
            <StaggerItem key={step.slug}>
              <div className="rounded-2xl bg-card p-8 shadow-sm">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                  {step.entry.stepNumber}
                </span>
                <h3 className="mt-5 font-heading text-2xl text-foreground">
                  {step.entry.title}
                </h3>
                <p className="mt-3 text-muted">{step.entry.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
