'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/motion';

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
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
        >
          <p className="text-center text-sm text-[var(--text-secondary)] mb-8 uppercase tracking-wide">
            Trusted by users from
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {logos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border)]/30 transition-all duration-300 hover:border-[var(--border)] hover:scale-105">
                  <div className="w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity" style={{ background: logo.gradient }} />
                  <span className="text-sm font-semibold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                    {logo.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
