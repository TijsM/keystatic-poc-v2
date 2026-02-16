import { FadeIn } from './ui/fade-in';
import { Button } from './ui/button';

export function Hero({
  headline,
  subheadline,
  ctaText,
}: {
  headline: string;
  subheadline: string;
  ctaText: string;
}) {
  return (
    <section className="flex min-h-[90vh] items-center bg-background pt-20">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <FadeIn>
          <h1 className="font-heading text-5xl leading-tight text-foreground md:text-7xl md:leading-tight">
            {headline}
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted md:text-xl">
            {subheadline}
          </p>
        </FadeIn>
        <FadeIn delay={0.4}>
          <div className="mt-10">
            <Button href="#prijzen">{ctaText}</Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
