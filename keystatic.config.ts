import { config, collection, singleton, fields } from '@keystatic/core';

export const markdocConfig = fields.markdoc.createMarkdocConfig({});

export default config({
  storage: {
    kind: 'cloud',
  },
  cloud: {
    project: 'rodi-digital/rodi-digital-poc',
  },
  singletons: {
    hero: singleton({
      label: 'Hero',
      path: 'content/hero',
      schema: {
        headline: fields.text({ label: 'Headline' }),
        subheadline: fields.text({ label: 'Subheadline' }),
        ctaText: fields.text({ label: 'CTA Button Text' }),
      },
    }),
    problem: singleton({
      label: 'Problem',
      path: 'content/problem',
      schema: {
        headline: fields.text({ label: 'Headline' }),
        body: fields.text({ label: 'Body', multiline: true }),
      },
    }),
    pricing: singleton({
      label: 'Pricing',
      path: 'content/pricing',
      schema: {
        guarantee: fields.text({ label: 'Guarantee Text' }),
        tiers: fields.array(
          fields.object({
            name: fields.text({ label: 'Tier Name' }),
            price: fields.text({ label: 'Monthly Price' }),
            yearlyPrice: fields.text({ label: 'Yearly Price (per month)' }),
            description: fields.text({ label: 'Short Description' }),
            highlighted: fields.checkbox({ label: 'Highlighted (recommended)' }),
            features: fields.array(fields.text({ label: 'Feature' }), {
              label: 'Features',
              itemLabel: (props) => props.value || 'Feature',
            }),
            ctaText: fields.text({ label: 'CTA Button Text' }),
          }),
          {
            label: 'Pricing Tiers',
            itemLabel: (props) => props.fields.name.value || 'Tier',
          },
        ),
      },
    }),
    finalCta: singleton({
      label: 'Final CTA',
      path: 'content/final-cta',
      schema: {
        headline: fields.text({ label: 'Headline' }),
        subtext: fields.text({ label: 'Subtext' }),
        buttonText: fields.text({ label: 'Button Text' }),
      },
    }),
    stats: singleton({
      label: 'Stats',
      path: 'content/stats',
      schema: {
        items: fields.array(
          fields.object({
            value: fields.text({ label: 'Value' }),
            prefix: fields.text({ label: 'Prefix (e.g. <, €)' }),
            suffix: fields.text({ label: 'Suffix (e.g. +, %)' }),
            label: fields.text({ label: 'Label' }),
          }),
          {
            label: 'Stats',
            itemLabel: (props) => props.fields.label.value || 'Stat',
          },
        ),
      },
    }),
    comparison: singleton({
      label: 'Vergelijking',
      path: 'content/comparison',
      schema: {
        headline: fields.text({ label: 'Headline' }),
        subtitle: fields.text({ label: 'Subtitle', multiline: true }),
        cards: fields.array(
          fields.object({
            competitor: fields.text({
              label: 'Concurrent (bijv. "Freelancers")',
            }),
            label: fields.text({ label: 'Voordeel titel' }),
            pain: fields.text({ label: 'Concurrent nadeel' }),
            benefit: fields.text({ label: 'Rodi Sites voordeel' }),
          }),
          {
            label: 'Voordelen',
            itemLabel: (props) =>
              props.fields.competitor.value
                ? `${props.fields.competitor.value}: ${props.fields.label.value}`
                : 'Voordeel',
          },
        ),
      },
    }),
    siteSettings: singleton({
      label: 'Site Settings',
      path: 'content/site-settings',
      schema: {
        brandName: fields.text({ label: 'Brand Name' }),
        email: fields.text({ label: 'Email Address' }),
        whatsapp: fields.text({ label: 'WhatsApp Number' }),
        address: fields.text({ label: 'Street Address' }),
        postalCode: fields.text({ label: 'Postal Code' }),
        city: fields.text({ label: 'City' }),
        btwNumber: fields.text({ label: 'BTW Number' }),
        linkedin: fields.text({ label: 'LinkedIn URL' }),
      },
    }),
  },
  collections: {
    features: collection({
      label: 'Features',
      slugField: 'title',
      path: 'content/features/*',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description' }),
        icon: fields.text({ label: 'Icon (emoji)' }),
        order: fields.integer({ label: 'Order' }),
      },
    }),
    processSteps: collection({
      label: 'Process Steps',
      slugField: 'title',
      path: 'content/process-steps/*',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description' }),
        stepNumber: fields.integer({ label: 'Step Number' }),
      },
    }),
    testimonials: collection({
      label: 'Testimonials',
      slugField: 'name',
      path: 'content/testimonials/*',
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.text({ label: 'Role' }),
        company: fields.text({ label: 'Company' }),
        quote: fields.text({ label: 'Quote', multiline: true }),
      },
    }),
    faqs: collection({
      label: 'FAQs',
      slugField: 'question',
      path: 'content/faqs/*',
      schema: {
        question: fields.slug({ name: { label: 'Question' } }),
        answer: fields.text({ label: 'Answer', multiline: true }),
        order: fields.integer({ label: 'Order' }),
      },
    }),
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        metaDescription: fields.text({
          label: 'Meta beschrijving',
          multiline: true,
        }),
        publishDate: fields.text({ label: 'Publicatiedatum (YYYY-MM-DD)' }),
        category: fields.text({ label: 'Categorie' }),
        excerpt: fields.text({ label: 'Samenvatting', multiline: true }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
    pages: collection({
      label: 'Pagina\'s',
      slugField: 'slug',
      path: 'content/pages/*',
      schema: {
        slug: fields.slug({ name: { label: 'URL slug' } }),
        metaTitle: fields.text({ label: 'Meta titel (max 60 tekens)' }),
        metaDescription: fields.text({
          label: 'Meta beschrijving (max 160 tekens)',
          multiline: true,
        }),
        industry: fields.text({ label: 'Branche naam' }),
        heroHeadline: fields.text({ label: 'Hero headline' }),
        heroSub: fields.text({ label: 'Hero subtekst', multiline: true }),
        introText: fields.text({
          label: 'Introductietekst',
          multiline: true,
        }),
        painPoints: fields.array(
          fields.object({
            icon: fields.text({ label: 'Icon (emoji)' }),
            title: fields.text({ label: 'Titel' }),
            description: fields.text({
              label: 'Beschrijving',
              multiline: true,
            }),
          }),
          {
            label: 'Pijnpunten',
            itemLabel: (props) => props.fields.title.value || 'Pijnpunt',
          },
        ),
        benefits: fields.array(
          fields.object({
            title: fields.text({ label: 'Titel' }),
            description: fields.text({
              label: 'Beschrijving',
              multiline: true,
            }),
          }),
          {
            label: 'Voordelen',
            itemLabel: (props) => props.fields.title.value || 'Voordeel',
          },
        ),
        features: fields.array(fields.text({ label: 'Feature' }), {
          label: 'Wat zit erin',
          itemLabel: (props) => props.value || 'Feature',
        }),
        faqs: fields.array(
          fields.object({
            question: fields.text({ label: 'Vraag' }),
            answer: fields.text({ label: 'Antwoord', multiline: true }),
          }),
          {
            label: 'Veelgestelde vragen',
            itemLabel: (props) => props.fields.question.value || 'Vraag',
          },
        ),
      },
    }),
    locationPages: collection({
      label: "Locatie pagina's",
      slugField: 'slug',
      path: 'content/location-pages/*',
      format: { contentField: 'body' },
      schema: {
        slug: fields.slug({ name: { label: 'URL slug' } }),
        metaTitle: fields.text({ label: 'Meta titel' }),
        metaDescription: fields.text({
          label: 'Meta beschrijving',
          multiline: true,
        }),
        heroHeadline: fields.text({ label: 'Hero headline' }),
        heroSub: fields.text({ label: 'Hero subtekst', multiline: true }),
        targetLocation: fields.text({ label: 'Doellocatie' }),
        body: fields.markdoc({ label: 'Inhoud' }),
        faqs: fields.array(
          fields.object({
            question: fields.text({ label: 'Vraag' }),
            answer: fields.text({ label: 'Antwoord', multiline: true }),
          }),
          {
            label: 'FAQs',
            itemLabel: (props) => props.fields.question.value || 'Vraag',
          },
        ),
      },
    }),
  },
});
