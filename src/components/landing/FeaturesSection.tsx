'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Zap, Shield, Sparkles, Image, UserX, Palette } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/lib/motion';

export default function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get your pixel avatar in just 10 seconds. No more waiting around!',
      span: 'md:col-span-2',
      gradient: 'linear-gradient(to bottom right, var(--color-yellow-from), var(--color-yellow-to))',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your photos are never stored. Processed securely and deleted immediately.',
      span: 'md:col-span-1',
      gradient: 'linear-gradient(to bottom right, var(--color-blue-from), var(--color-cyan-to))',
    },
    {
      icon: Sparkles,
      title: 'AI-Powered',
      description: 'Advanced AI analyzes your unique features to create a personalized avatar.',
      span: 'md:col-span-1',
      gradient: 'linear-gradient(to bottom right, var(--color-purple-from), var(--color-purple-to))',
    },
    {
      icon: Image,
      title: 'High Quality',
      description: 'Export up to 1024px for crisp, clear avatars everywhere.',
      span: 'md:col-span-1',
      gradient: 'linear-gradient(to bottom right, var(--color-green-from), var(--color-green-to))',
    },
    {
      icon: UserX,
      title: 'No Sign-up',
      description: 'Start creating immediately. No account required for free tier.',
      span: 'md:col-span-1',
      gradient: 'linear-gradient(to bottom right, var(--color-red-from), var(--color-red-to))',
    },
    {
      icon: Palette,
      title: 'Multiple Styles',
      description: 'Choose from pixel art, cartoon, minimalist, and more styles.',
      span: 'md:col-span-1',
      gradient: 'linear-gradient(to bottom right, var(--color-indigo-from), var(--color-indigo-to))',
    },
  ];

  return (
    <section id="features" className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-4">
            Why Choose <span className="gradient-text">SquareFaceAI</span>?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            We&apos;re not just another avatar generator. Here&apos;s what makes us different.
          </motion.p>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={feature.span}
              >
                <Card
                  variant="raised"
                  className="p-8 h-full hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
                >
                  <div className={`w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_4px_12px_rgba(0,0,0,0.3)]`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)]">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
