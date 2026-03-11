'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FadeIn } from './ui/fade-in';

const navLinks = [
  { label: 'Website laten maken', href: '/website-laten-maken-den-bosch' },
  { label: 'Werkwijze', href: '/werkwijze' },
  { label: 'Prijzen', href: '/prijzen' },
  { label: 'Over ons', href: '/over-ons' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/#contact' },
];

const industryLinks = [
  { label: 'Schilders', href: '/website-voor-schilders' },
  { label: 'Tandartsen', href: '/website-voor-tandartsen' },
  { label: 'Loodgieters', href: '/website-voor-loodgieters' },
  { label: 'Kappers', href: '/website-voor-kappers' },
  { label: 'Fysiotherapeuten', href: '/website-voor-fysiotherapeuten' },
  { label: 'Restaurants', href: '/website-voor-restaurants' },
  { label: 'Makelaars', href: '/website-voor-makelaars' },
  { label: 'Personal trainers', href: '/website-voor-personal-trainers' },
  { label: 'Timmermannen', href: '/website-voor-timmermannen' },
  { label: 'Elektriciens', href: '/website-voor-elektriciens' },
  { label: 'Aannemers', href: '/website-voor-aannemers' },
  { label: 'Hoveniers', href: '/website-voor-hoveniers' },
  { label: 'Stukadoors', href: '/website-voor-stukadoors' },
  { label: 'Klusbedrijven', href: '/website-voor-klusbedrijven' },
];

const locationLinks = [
  { label: 'Website laten maken Den Bosch', href: '/website-laten-maken-den-bosch' },
  { label: 'Website bouwen Den Bosch', href: '/website-bouwen-den-bosch' },
  { label: 'Webdesign Den Bosch', href: '/webdesign-den-bosch' },
  { label: 'Website voor vakmannen', href: '/website-voor-vakmannen' },
];

export function Footer({
  brandName,
  email,
  whatsapp,
  address,
  postalCode,
  city,
  btwNumber,
  linkedin,
}: {
  brandName: string;
  email: string;
  whatsapp: string;
  address: string;
  postalCode: string;
  city: string;
  btwNumber: string;
  linkedin: string;
}) {
  return (
    <footer className="relative overflow-hidden border-t border-border/50 bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5 md:gap-8">
            <div>
              <p className="text-3xl">
                <span className="font-heading text-foreground">Rodi</span>
                <svg
                  className="relative -top-2 mx-px inline-block h-3.5 w-3.5 text-primary"
                  viewBox="0 0 30 30"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M15 0C15 0 15.52 6.48 18.16 9.11C20.8 11.75 27.27 12.27 27.27 12.27C27.27 12.27 20.8 12.79 18.16 15.43C15.52 18.07 15 24.55 15 24.55C15 24.55 14.48 18.07 11.84 15.43C9.2 12.79 2.73 12.27 2.73 12.27C2.73 12.27 9.2 11.75 11.84 9.11C14.48 6.48 15 0 15 0Z" />
                </svg>
                <span className="font-heading italic text-primary">Sites</span>
              </p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
                Professionele websites voor het MKB. Geen opstartkosten, alles
                inbegrepen voor een vast bedrag per maand.
              </p>
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Rodi Sites op LinkedIn"
                  className="mt-4 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              )}
            </div>

            <nav aria-label="Footer navigatie">
              <p className="text-xs font-semibold tracking-widest text-foreground uppercase">
                Navigatie
              </p>
              <ul className="mt-5 space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors duration-300 hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Websites per branche">
              <p className="text-xs font-semibold tracking-widest text-foreground uppercase">
                Branches
              </p>
              <ul className="mt-5 space-y-3">
                {industryLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors duration-300 hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Locaties">
              <p className="text-xs font-semibold tracking-widest text-foreground uppercase">
                Locaties
              </p>
              <ul className="mt-5 space-y-3">
                {locationLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors duration-300 hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-xs font-semibold tracking-widest text-foreground uppercase">
                Contact
              </p>
              <ul className="mt-5 space-y-3 text-sm text-muted">
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="transition-colors hover:text-foreground"
                  >
                    {email}
                  </a>
                </li>
                {whatsapp && (
                  <li>
                    <a
                      href={`https://wa.me/${whatsapp.replace(/[^0-9+]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-foreground"
                    >
                      WhatsApp
                    </a>
                  </li>
                )}
                <li>{address}</li>
                <li>{postalCode} {city}</li>
                {btwNumber && (
                  <li className="pt-3 text-xs text-muted">
                    BTW: {btwNumber}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </FadeIn>

        {/* Animated gradient divider */}
        <div className="animated-gradient-line mt-16" aria-hidden="true" />

        {/* Large wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="mt-12 select-none text-center"
          aria-hidden="true"
        >
          <span className="font-heading text-[clamp(4rem,12vw,10rem)] leading-none text-foreground/[0.03]">
            Rodi Sites
          </span>
        </motion.div>

        <div className="mt-6 text-center text-xs text-muted">
          &copy; {new Date().getFullYear()} {brandName}. Alle rechten
          voorbehouden.
        </div>
      </div>
    </footer>
  );
}
