import { reader } from './reader';
import { ScrollProgress } from './components/ui/scroll-progress';
import { Navbar } from './components/navbar';
import { Hero } from './components/hero';
import { Problem } from './components/problem';
import { Process } from './components/process';
import { Stats } from './components/stats';
import { Features } from './components/features';
import { Comparison } from './components/comparison';
import { Pricing } from './components/pricing';
import { Faq } from './components/faq';
import { CtaSection } from './components/cta-section';
import { Footer } from './components/footer';

export default async function Homepage() {
  const [hero, problem, pricing, finalCta, siteSettings, stats, comparison] =
    await Promise.all([
      reader.singletons.hero.read(),
      reader.singletons.problem.read(),
      reader.singletons.pricing.read(),
      reader.singletons.finalCta.read(),
      reader.singletons.siteSettings.read(),
      reader.singletons.stats.read(),
      reader.singletons.comparison.read(),
    ]);

  const [features, processSteps, faqs] = await Promise.all([
    reader.collections.features.all(),
    reader.collections.processSteps.all(),
    reader.collections.faqs.all(),
  ]);

  return (
    <>
      <ScrollProgress />
      <Navbar brandName={siteSettings?.brandName ?? 'Rodi Sites'} />
      <main id="main">
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
        <Stats
          items={
            stats?.items ?? [
              { value: '50', suffix: '+', label: 'Websites' },
              { value: '99.9', suffix: '%', label: 'Uptime' },
              { value: '2', prefix: '<', suffix: 's', label: 'Laadtijd' },
              { value: '24', suffix: '/7', label: 'Support' },
            ]
          }
        />
        <Comparison
          headline={comparison?.headline ?? 'Waarom Rodi Sites?'}
          subtitle={comparison?.subtitle ?? ''}
          cards={comparison?.cards ?? []}
        />

        <Pricing
          tiers={pricing?.tiers ?? []}
          guarantee={pricing?.guarantee ?? ''}
        />
        <Faq items={faqs} />
        <CtaSection
          headline={finalCta?.headline ?? ''}
          subtext={finalCta?.subtext ?? ''}
          buttonText={finalCta?.buttonText ?? 'Neem contact op'}
          email={siteSettings?.email ?? 'hello@rodi-digital.com'}
          whatsapp={siteSettings?.whatsapp ?? '+32499721771'}
        />
      </main>
      <Footer
        brandName={siteSettings?.brandName ?? 'Rodi Sites'}
        email={siteSettings?.email ?? 'hello@rodi-digital.com'}
        whatsapp={siteSettings?.whatsapp ?? '+32499721771'}
        address={siteSettings?.address ?? ''}
        postalCode={siteSettings?.postalCode ?? ''}
        city={siteSettings?.city ?? ''}
        btwNumber={siteSettings?.btwNumber ?? ''}
        linkedin={siteSettings?.linkedin ?? ''}
      />
    </>
  );
}
