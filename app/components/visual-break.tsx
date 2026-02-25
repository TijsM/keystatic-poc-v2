'use client';

import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

export function VisualBreak() {
  return (
    <section className="relative overflow-hidden bg-background py-16 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
          {/* Large image — storefront / workspace */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease }}
          >
            <img
              src="/images/lifestyle-storefront.png"
              alt="Moderne Nederlandse winkel met professionele online aanwezigheid"
              className="w-full rounded-2xl object-cover"
              style={{ aspectRatio: '4/3' }}
            />
          </motion.div>

          {/* Small stacked images */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.15, ease }}
            >
              <img
                src="/images/lifestyle-phone-website.png"
                alt="Klant bekijkt website op telefoon"
                className="w-full rounded-2xl object-cover"
                style={{ aspectRatio: '4/3' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
            >
              <img
                src="/images/lifestyle-laptop-analytics.png"
                alt="Dashboard met bezoekersstatistieken"
                className="w-full rounded-2xl object-cover"
                style={{ aspectRatio: '16/9' }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
