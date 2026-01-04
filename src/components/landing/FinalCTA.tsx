'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, ArrowRight } from 'lucide-react';
import {
  bounceScale,
  buttonPress,
  floating,
  viewportConfig,
  smooth
} from '@/lib/motion';

export default function FinalCTA() {
  const handleGetStarted = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)]/10 via-[var(--accent-secondary)]/10 to-[var(--accent-primary)]/10" />

      {/* Animated Gradient Blobs */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-96 h-96 bg-[var(--accent-primary)]/20 rounded-full blur-3xl"
        variants={floating}
        animate="animate"
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-96 h-96 bg-[var(--accent-secondary)]/20 rounded-full blur-3xl"
        variants={floating}
        animate="animate"
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={bounceScale}
        >
          <Card variant="raised" className="max-w-4xl mx-auto text-center p-12 md:p-16 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle, var(--accent-primary) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }} />
            </div>

            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={viewportConfig}
                transition={smooth}
                variants={floating}
                animate="animate"
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] mb-6 shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={smooth}
                className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              >
                Ready to Create Your{' '}
                <span className="gradient-text">Pixel Avatar</span>?
              </motion.h2>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ ...smooth, delay: 0.1 }}
                className="text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto"
              >
                Join thousands of users who&apos;ve already created their unique avatars.
                Get started in seconds, no credit card required.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ ...smooth, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonPress}
                >
                  <Button
                    size="lg"
                    onClick={handleGetStarted}
                    className="gap-2 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    Get Started - It&apos;s Free!
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>

                <motion.div
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonPress}
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={handleViewPricing}
                    className="shadow-md hover:shadow-lg transition-shadow"
                  >
                    View Pricing
                  </Button>
                </motion.div>
              </motion.div>

              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewportConfig}
                transition={{ ...smooth, delay: 0.3 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--text-secondary)]"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-green-from)' }} />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-blue-from)' }} />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-purple-from)' }} />
                  <span>10,000+ happy users</span>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
