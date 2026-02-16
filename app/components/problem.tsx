import { FadeIn } from './ui/fade-in';

export function Problem({
  headline,
  body,
}: {
  headline: string;
  body: string;
}) {
  return (
    <section className="bg-foreground py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <FadeIn>
          <h2 className="font-heading text-4xl leading-snug text-background md:text-5xl md:leading-snug">
            {headline}
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-6 text-lg leading-relaxed text-background/70">
            {body}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
