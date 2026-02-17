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
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
});
