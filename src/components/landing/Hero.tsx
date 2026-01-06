'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, Shield, UserX } from 'lucide-react';
import {
  staggerContainer,
  fadeInUp,
  hoverLift,
  smooth,
  buttonPress
} from '@/lib/motion';
import GalleryBackground from './GalleryBackground';

interface HeroProps {
  children: React.ReactNode;
}

export default function Hero({ children }: HeroProps) {
  return (
    <section className="min-h-screen pt-28 pb-16 px-6 relative overflow-hidden flex items-center">
      {/* Gallery Background - Shows avatar examples */}
      <GalleryBackground />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center mb-10"
        >
          {/* Badge Announcement */}
          <motion.div variants={fadeInUp} className="inline-block mb-6">
            <Badge
              variant="outline"
              className="gap-1.5 py-2 px-4 text-sm bg-white/80 backdrop-blur border-[var(--accent-primary)] text-[var(--accent-primary)]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Square Face Generator
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-gray-800"
          >
            Create Your Unique{' '}
            <span className="gradient-mint">Square Face</span>
            <br />
            <span className="text-3xl md:text-5xl lg:text-6xl">Pixel Avatar</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8"
          >
            Transform your photo into an adorable square-faced pixel avatar in seconds.
            Perfect for social media, gaming profiles, and digital identities.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <motion.div
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={buttonPress}
            >
              <button
                onClick={() => document.getElementById('upload-zone')?.scrollIntoView({ behavior: 'smooth' })}
                className="pixel-button py-3 px-8 text-lg"
              >
                🎨 Create Free Avatar
              </button>
            </motion.div>
            <motion.div
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={buttonPress}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                onClick={() => document.getElementById('examples')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Examples
              </Button>
            </motion.div>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-4 text-sm text-gray-500"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              <span>Free to use</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span>No login required</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              <span>Instant download</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Upload Zone Area - Enhanced visibility on gallery background */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={smooth}
          className="max-w-2xl mx-auto mb-12"
          id="upload-zone"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
            {children}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
        >
          {[
            { icon: UserX, title: 'No Sign-up', desc: 'Start instantly', color: 'from-emerald-400 to-green-500' },
            { icon: Shield, title: 'Privacy Safe', desc: 'Photos not stored', color: 'from-blue-400 to-cyan-500' },
            { icon: Zap, title: '10s Generation', desc: 'Super fast', color: 'from-yellow-400 to-orange-500' },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <motion.div
                initial="rest"
                whileHover="hover"
                variants={hoverLift}
                className="pixel-card py-3 px-5 flex items-center gap-3"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-gray-800">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
