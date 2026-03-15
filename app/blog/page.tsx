import type { Metadata } from 'next';
import Link from 'next/link';
import { reader } from '../reader';
import { SubpageNavbar } from '../components/subpage-navbar';
import { Footer } from '../components/footer';
import { BASE_URL } from '../lib/constants';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Tips, inzichten en nieuws over websites, webdesign en online zichtbaarheid voor het MKB.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog | Rodi Sites',
    description:
      'Tips, inzichten en nieuws over websites, webdesign en online zichtbaarheid voor het MKB.',
    url: `${BASE_URL}/blog`,
    siteName: 'Rodi Sites',
    locale: 'nl_NL',
    type: 'website',
  },
};

async function getSiteSettings() {
  const siteSettings = await reader.singletons.siteSettings.read();
  return {
    brandName: siteSettings?.brandName ?? 'Rodi Sites',
    email: siteSettings?.email ?? 'hello@rodi-digital.com',
    whatsapp: siteSettings?.whatsapp ?? '+32499721771',
    address: siteSettings?.address ?? '',
    postalCode: siteSettings?.postalCode ?? '',
    city: siteSettings?.city ?? '',
    btwNumber: siteSettings?.btwNumber ?? '',
    linkedin: siteSettings?.linkedin ?? '',
  };
}

export default async function BlogPage() {
  const [postSlugs, settings] = await Promise.all([
    reader.collections.posts.list(),
    getSiteSettings(),
  ]);

  const posts = await Promise.all(
    postSlugs.map(async (slug) => {
      const post = await reader.collections.posts.read(slug);
      return post ? { slug, ...post } : null;
    }),
  );

  const sortedPosts = posts
    .filter(Boolean)
    .sort((a, b) => {
      if (!a!.publishDate && !b!.publishDate) return 0;
      if (!a!.publishDate) return 1;
      if (!b!.publishDate) return -1;
      return b!.publishDate.localeCompare(a!.publishDate);
    });

  return (
    <>
      <SubpageNavbar brandName={settings.brandName} whatsapp={settings.whatsapp} />
      <main id="main" className="pt-20">
        <section className="bg-background py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <h1 className="font-heading text-4xl tracking-tight text-foreground md:text-5xl">
              Blog
            </h1>
            <p className="mt-4 text-lg text-muted">
              Tips, inzichten en nieuws over websites en online zichtbaarheid.
            </p>
            <div className="mt-12 space-y-8">
              {sortedPosts.map((post) => (
                <article
                  key={post!.slug}
                  className="rounded-2xl border border-border/60 bg-card p-6 transition-shadow hover:shadow-md"
                >
                  <Link href={`/${post!.slug}`} className="group block">
                    <h2 className="font-heading text-2xl text-foreground transition-colors group-hover:text-primary">
                      {post!.title}
                    </h2>
                    {post!.excerpt && (
                      <p className="mt-2 text-muted line-clamp-3">
                        {post!.excerpt}
                      </p>
                    )}
                    <div className="mt-4 flex items-center gap-4 text-sm text-muted">
                      {post!.publishDate && (
                        <time>
                          {new Date(post!.publishDate).toLocaleDateString(
                            'nl-NL',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            },
                          )}
                        </time>
                      )}
                      {post!.category && (
                        <span className="rounded-full bg-primary-light px-3 py-0.5 text-xs font-medium text-primary">
                          {post!.category}
                        </span>
                      )}
                    </div>
                  </Link>
                </article>
              ))}
              {sortedPosts.length === 0 && (
                <p className="text-muted">Nog geen artikelen gepubliceerd.</p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer {...settings} />
    </>
  );
}
