'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const navLinks = [
  { label: 'Hoe het werkt', href: '#proces' },
  { label: 'Voordelen', href: '#voordelen' },
  { label: 'Prijzen', href: '#prijzen' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar({ brandName }: { brandName: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      aria-label="Hoofdnavigatie"
      initial={shouldReduceMotion ? false : { y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/90 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <a
          href="#"
          className="group relative inline-flex items-baseline gap-0 transition-opacity hover:opacity-70"
        >
          <span className="font-heading text-2xl text-foreground">Rodi</span>
          {/* Sparkle mark */}
          <svg
            className="relative -top-2 mx-px h-3 w-3 text-primary"
            viewBox="0 0 30 30"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M15 0C15 0 15.52 6.48 18.16 9.11C20.8 11.75 27.27 12.27 27.27 12.27C27.27 12.27 20.8 12.79 18.16 15.43C15.52 18.07 15 24.55 15 24.55C15 24.55 14.48 18.07 11.84 15.43C9.2 12.79 2.73 12.27 2.73 12.27C2.73 12.27 9.2 11.75 11.84 9.11C14.48 6.48 15 0 15 0Z" />
          </svg>
          <span className="font-heading text-2xl italic text-primary">Sites</span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium tracking-wide text-foreground/70 uppercase transition-colors duration-300 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-foreground px-6 py-2.5 text-[13px] font-semibold text-background transition-all duration-300 hover:bg-foreground/85"
          >
            Contact
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          aria-label={mobileOpen ? 'Menu sluiten' : 'Menu openen'}
          aria-expanded={mobileOpen}
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-5 bg-foreground"
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            className="block h-0.5 w-5 bg-foreground"
            transition={{ duration: 0.2 }}
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-5 bg-foreground"
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
          />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full border-t border-border/50 bg-background/95 px-6 pb-8 pt-4 backdrop-blur-xl md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="block py-3 text-lg text-foreground"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navLinks.length * 0.05 }}
              className="mt-4 inline-block rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background"
            >
              Contact
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
