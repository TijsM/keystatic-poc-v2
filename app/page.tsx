import { reader } from './reader';
import { Navbar } from './components/navbar';
import { Hero } from './components/hero';
import { Problem } from './components/problem';
import { Process } from './components/process';
import { Features } from './components/features';
import { Testimonials } from './components/testimonials';
import { Pricing } from './components/pricing';
import { Faq } from './components/faq';
import { CtaSection } from './components/cta-section';
import { Footer } from './components/footer';

export default async function Homepage() {
  const [hero, problem, pricing, finalCta, siteSettings] = await Promise.all([
    reader.singletons.hero.read(),
    reader.singletons.problem.read(),
    reader.singletons.pricing.read(),
    reader.singletons.finalCta.read(),
    reader.singletons.siteSettings.read(),
  ]);

  const [features, processSteps, testimonials, faqs] = await Promise.all([
    reader.collections.features.all(),
    reader.collections.processSteps.all(),
    reader.collections.testimonials.all(),
    reader.collections.faqs.all(),
  ]);

  return (
    <>
      <Navbar brandName={siteSettings?.brandName ?? 'Rodi Digital'} />
      <main>
        <Hero
          headline={hero?.headline ?? ''}
          subheadline={hero?.subheadline ?? ''}
          ctaText={hero?.ctaText ?? 'Start vandaag'}
        />
        <Problem
          headline={problem?.headline ?? ''}
          body={problem?.body ?? ''}
        />
        <Process steps={processSteps} />
        <Features features={features} />
        <Testimonials testimonials={testimonials} />
        <Pricing
          monthlyPrice={pricing?.monthlyPrice ?? '100'}
          ctaText={pricing?.ctaText ?? 'Begin nu'}
          guarantee={pricing?.guarantee ?? ''}
          features={pricing?.features ?? []}
        />
        <Faq items={faqs} />
        <CtaSection
          headline={finalCta?.headline ?? ''}
          subtext={finalCta?.subtext ?? ''}
          buttonText={finalCta?.buttonText ?? 'Neem contact op'}
        />
      </main>
      <Footer
        brandName={siteSettings?.brandName ?? 'Rodi Digital'}
        email={siteSettings?.email ?? ''}
        phone={siteSettings?.phone ?? ''}
        city={siteSettings?.city ?? ''}
        kvkNumber={siteSettings?.kvkNumber ?? ''}
      />
    </>
  );
}
