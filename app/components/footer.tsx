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
  phone,
  city,
  kvkNumber,
}: {
  brandName: string;
  email: string;
  phone: string;
  city: string;
  kvkNumber: string;
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
                <li>{phone}</li>
                <li>{city}</li>
                <li className="pt-3 text-xs text-muted/60">
                  KVK: {kvkNumber}
                </li>
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
