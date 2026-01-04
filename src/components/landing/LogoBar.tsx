'use client';

import { motion } from 'framer-motion';
import { fastStagger, staggerItem, sectionReveal, viewportConfig } from '@/lib/motion';

export default function LogoBar() {
  const logos = [
    { name: 'Discord', gradient: 'linear-gradient(to bottom right, var(--color-indigo-from), var(--color-indigo-to))' },
    { name: 'Twitter', gradient: 'linear-gradient(to bottom right, var(--color-blue-from), var(--color-blue-to))' },
    { name: 'Reddit', gradient: 'linear-gradient(to bottom right, var(--color-red-from), var(--color-red-to))' },
    { name: 'Product Hunt', gradient: 'linear-gradient(to bottom right, var(--color-yellow-from), var(--color-yellow-to))' },
    { name: 'Indie Hackers', gradient: 'linear-gradient(to bottom right, var(--color-gray-from), var(--color-gray-to))' },
    { name: 'Dev.to', gradient: 'linear-gradient(to bottom right, var(--color-gray-from), var(--color-gray-to))' },
  ];

  return (
    <section className="py-16 px-6 border-y border-[var(--border)]">
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionReveal}
        >
          <p className="text-center text-sm text-[var(--text-secondary)] mb-8 uppercase tracking-wide">
            Trusted by users from
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fastStagger}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {logos.map((logo) => (
            <motion.div
              key={logo.name}
              variants={staggerItem}
              className="group"
            >
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border)]/30"
                whileHover={{
                  scale: 1.05,
                  borderColor: 'var(--border)'
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity" style={{ background: logo.gradient }} />
                <span className="text-sm font-semibold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                  {logo.name}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
