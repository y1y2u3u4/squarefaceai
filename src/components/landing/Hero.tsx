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
    <section className="min-h-[auto] md:min-h-screen pt-14 md:pt-28 pb-8 md:pb-16 px-4 md:px-6 relative overflow-hidden md:flex md:items-center">
      {/* Gallery Background - Hidden on mobile for cleaner look */}
      <div className="hidden md:block">
        <GalleryBackground />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center mb-4 md:mb-10"
        >
          {/* Badge Announcement - Hidden on mobile */}
          <motion.div variants={fadeInUp} className="hidden md:inline-block mb-6">
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
            className="text-2xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-6 leading-tight text-gray-800"
          >
            <span className="md:block">Create Your </span>
            <span className="gradient-mint">Square Face</span>
            <span className="block text-xl md:text-5xl lg:text-6xl mt-1 md:mt-0">Pixel Avatar</span>
          </motion.h1>

          {/* Subheadline - Shorter on mobile */}
          <motion.p
            variants={fadeInUp}
            className="text-sm md:text-xl text-gray-600 max-w-2xl mx-auto mb-4 md:mb-8"
          >
            <span className="md:hidden">Transform photos into pixel avatars in seconds.</span>
            <span className="hidden md:inline">Transform your photo into an adorable square-faced pixel avatar in seconds.
            Perfect for social media, gaming profiles, and digital identities.</span>
          </motion.p>

          {/* CTA Buttons - Hidden on mobile, input card is the CTA */}
          <motion.div
            variants={fadeInUp}
            className="hidden md:flex flex-col sm:flex-row gap-4 justify-center mb-8"
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

          {/* Feature Highlights - Simplified on mobile */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500 mb-2 md:mb-0"
          >
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-400"></span>
              <span>Free</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-400"></span>
              <span>No login</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-purple-400"></span>
              <span>Instant</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Upload Zone Area - Enhanced visibility on gallery background */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={smooth}
          className="max-w-2xl mx-auto mb-6 md:mb-12"
          id="upload-zone"
        >
          <div className="bg-white/95 md:bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg md:shadow-xl border border-gray-100 md:border-white/50">
            {children}
          </div>
        </motion.div>

        {/* Trust Indicators - Hidden on mobile, shown in compact form above */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="hidden md:flex flex-wrap items-center justify-center gap-4 md:gap-6"
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
