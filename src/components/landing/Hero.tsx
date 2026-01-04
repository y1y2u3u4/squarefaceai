'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, Shield, UserX } from 'lucide-react';
import Image from 'next/image';
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

// Floating avatar component
function FloatingAvatar({
  src,
  size,
  className,
  delay = 0
}: {
  src: string;
  size: number;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -8, 0]
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay
        }
      }}
      className={`pixel-avatar-frame ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt="Square Face Avatar"
        width={size}
        height={size}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}

export default function Hero({ children }: HeroProps) {
  return (
    <section className="min-h-screen pt-28 pb-16 px-6 relative overflow-hidden flex items-center bg-gradient-to-b from-[#f0fdf4] via-white to-[#fdf4ff]">
      {/* Decorative pixel patterns */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-[var(--accent-mint)] rounded-sm opacity-60" />
      <div className="absolute top-40 left-20 w-3 h-3 bg-[var(--accent-pink)] rounded-sm opacity-50" />
      <div className="absolute top-32 right-16 w-5 h-5 bg-[var(--accent-yellow)] rounded-sm opacity-60" />
      <div className="absolute top-60 right-24 w-3 h-3 bg-[var(--accent-blue)] rounded-sm opacity-50" />
      <div className="absolute bottom-40 left-16 w-4 h-4 bg-[var(--accent-purple)] rounded-sm opacity-50" />
      <div className="absolute bottom-32 right-20 w-3 h-3 bg-[var(--accent-mint)] rounded-sm opacity-60" />

      {/* Floating Avatars - Left Side */}
      <div className="hidden lg:block absolute left-8 top-1/4">
        <FloatingAvatar src="/avatars/hero-avatar-1.png" size={100} delay={0} />
      </div>
      <div className="hidden lg:block absolute left-24 top-1/2">
        <FloatingAvatar src="/avatars/hero-avatar-2.png" size={80} delay={0.5} />
      </div>

      {/* Floating Avatars - Right Side */}
      <div className="hidden lg:block absolute right-8 top-1/3">
        <FloatingAvatar src="/avatars/hero-avatar-3.png" size={90} delay={0.3} />
      </div>
      <div className="hidden lg:block absolute right-28 top-2/3">
        <FloatingAvatar src="/avatars/hero-avatar-1.png" size={70} delay={0.7} />
      </div>

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
