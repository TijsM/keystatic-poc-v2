import { FadeIn } from './ui/fade-in';
import { Button } from './ui/button';

export function CtaSection({
  headline,
  subtext,
  buttonText,
}: {
  headline: string;
  subtext: string;
  buttonText: string;
}) {
  return (
    <section id="contact" className="bg-primary py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <FadeIn>
          <h2 className="font-heading text-4xl text-white md:text-5xl">
            {headline}
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-6 text-lg text-white/80">{subtext}</p>
        </FadeIn>
        <FadeIn delay={0.4}>
          <div className="mt-10">
            <Button
              href="mailto:info@rodidigital.nl"
              variant="primary"
              className="bg-white text-primary hover:bg-white/90"
            >
              {buttonText}
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
