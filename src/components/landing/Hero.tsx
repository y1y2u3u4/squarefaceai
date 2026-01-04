'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Shield, Zap, UserX } from 'lucide-react';
import {
  staggerContainer,
  fadeInUp,
  hoverLift,
  smooth,
  buttonPress
} from '@/lib/motion';

interface HeroProps {
  children: React.ReactNode;
}

export default function Hero({ children }: HeroProps) {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden flex items-center">
      {/* Background gradient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--accent-primary)]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--accent-secondary)]/20 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          {/* Badge Announcement */}
          <motion.div variants={fadeInUp} className="inline-block mb-6">
            <Badge variant="default" className="gap-1.5 py-2 px-4 text-sm">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Avatar Generation
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Transform Your Photo into a{' '}
            <span className="gradient-text">Unique Pixel Avatar</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8"
          >
            Your face, pixelated perfectly. Generate a personalized avatar from your photo in just 10 seconds using advanced AI technology.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
          >
            <motion.div
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={buttonPress}
            >
              <Button
                size="lg"
                onClick={() => document.getElementById('upload-zone')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Create Your Avatar - Free
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
                onClick={() => document.getElementById('examples')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See Examples
              </Button>
            </motion.div>
          </motion.div>

          {/* Social Proof */}
          <motion.p
            variants={fadeInUp}
            className="text-sm text-[var(--text-secondary)]"
          >
            Join 10,000+ users who&apos;ve created unique avatars
          </motion.p>
        </motion.div>

        {/* Upload Zone Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={smooth}
          className="max-w-2xl mx-auto mb-12"
          id="upload-zone"
        >
          {children}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <motion.div variants={fadeInUp}>
            <motion.div
              initial="rest"
              whileHover="hover"
              variants={hoverLift}
            >
              <Card variant="flat" className="py-4 px-6 flex flex-row items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.3)]" style={{ background: 'linear-gradient(to bottom right, var(--color-green-from), var(--color-green-to))' }}>
                  <UserX className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-[var(--text-primary)]">No Sign-up Required</div>
                  <div className="text-xs text-[var(--text-secondary)]">Start immediately</div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <motion.div
              initial="rest"
              whileHover="hover"
              variants={hoverLift}
            >
              <Card variant="flat" className="py-4 px-6 flex flex-row items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.3)]" style={{ background: 'linear-gradient(to bottom right, var(--color-blue-from), var(--color-cyan-to))' }}>
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-[var(--text-primary)]">Privacy Protected</div>
                  <div className="text-xs text-[var(--text-secondary)]">Your data stays safe</div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <motion.div
              initial="rest"
              whileHover="hover"
              variants={hoverLift}
            >
              <Card variant="flat" className="py-4 px-6 flex flex-row items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-[var(--text-primary)]">10 Second Generation</div>
                  <div className="text-xs text-[var(--text-secondary)]">Lightning fast</div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
