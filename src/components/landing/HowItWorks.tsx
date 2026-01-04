'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Upload, Cpu, Download } from 'lucide-react';
import {
  staggerContainer,
  staggerItem,
  sectionReveal,
  viewportConfig,
  hoverLift,
  smooth
} from '@/lib/motion';

export default function HowItWorks() {
  const steps = [
    {
      step: 1,
      icon: Upload,
      title: 'Upload Your Photo',
      description: 'Drag and drop or click to upload. Supports JPG, PNG, WEBP.',
      gradient: 'linear-gradient(to bottom right, var(--accent-primary), var(--color-purple-to))',
    },
    {
      step: 2,
      icon: Cpu,
      title: 'AI Magic Happens',
      description: 'Our AI analyzes your facial features and creates your unique avatar.',
      gradient: 'linear-gradient(to bottom right, var(--color-purple-from), var(--accent-secondary))',
    },
    {
      step: 3,
      icon: Download,
      title: 'Download & Share',
      description: 'Get your avatar instantly. Use it on Discord, Twitter, anywhere!',
      gradient: 'linear-gradient(to bottom right, var(--accent-secondary), var(--color-cyan-to))',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 bg-[var(--bg-secondary)]/30">
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionReveal}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            Transform your photo into a pixel avatar in just 3 simple steps. No design skills required!
          </p>
        </motion.div>

        {/* Horizontal Step Layout */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
          >
            {steps.map((stepData, index) => {
              const Icon = stepData.icon;
              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="relative"
                >
                  {/* Dashed Connector Line (desktop only) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 border-t-2 border-dashed border-[var(--accent-primary)]/30 z-0" />
                  )}

                  <motion.div
                    initial="rest"
                    whileHover="hover"
                    variants={hoverLift}
                  >
                    <Card
                      variant="raised"
                      className="p-8 text-center relative z-10 h-full group"
                    >
                      {/* Step Number Badge */}
                      <motion.div
                        className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center font-bold text-lg text-white shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                        whileHover={{ scale: 1.1 }}
                        transition={smooth}
                      >
                        {stepData.step}
                      </motion.div>

                      {/* Icon */}
                      <motion.div
                        className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                        style={{ background: stepData.gradient }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={smooth}
                      >
                        <Icon className="w-10 h-10 text-white" />
                      </motion.div>

                      {/* Content */}
                      <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)]">
                        {stepData.title}
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        {stepData.description}
                      </p>
                    </Card>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Average Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={smooth}
          className="text-center mt-12"
        >
          <p className="text-lg text-[var(--text-primary)]">
            ⚡ Average generation time: <span className="font-bold gradient-text">10 seconds</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
