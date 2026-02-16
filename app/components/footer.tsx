'use client';

import { motion } from 'framer-motion';
import { FadeIn } from './ui/fade-in';

const navLinks = [
  { label: 'Hoe het werkt', href: '#proces' },
  { label: 'Voordelen', href: '#voordelen' },
  { label: 'Prijzen', href: '#prijzen' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
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
    <footer className="border-t border-border/50 bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            <div>
              <p className="font-heading text-3xl text-foreground">
                {brandName}
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
                  className="mt-4 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              )}
            </div>

            <div>
              <p className="text-xs font-semibold tracking-widest text-foreground uppercase">
                Navigatie
              </p>
              <ul className="mt-5 space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted transition-colors duration-300 hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

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
                  <li className="pt-3 text-xs text-muted/60">
                    BTW: {btwNumber}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </FadeIn>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="mt-16 h-px origin-left bg-border/50"
        />

        <div className="mt-8 text-center text-xs text-muted/60">
          &copy; {new Date().getFullYear()} {brandName}. Alle rechten
          voorbehouden.
        </div>
      </div>
    </footer>
  );
}
