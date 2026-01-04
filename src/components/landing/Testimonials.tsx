'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';
import {
  slowStagger,
  staggerItem,
  hoverLift,
  sectionReveal,
  viewportConfig,
  iconHover
} from '@/lib/motion';

export default function Testimonials() {
  const testimonials = [
    {
      quote: 'Finally an avatar generator that actually looks like me! The AI nailed my features.',
      author: 'Alex Chen',
      role: 'Discord Moderator',
      avatar: 'A',
      gradient: 'linear-gradient(to bottom right, var(--color-purple-from), var(--color-purple-to))',
    },
    {
      quote: 'Used it for my Twitter profile. Got so many compliments! Super easy to use.',
      author: 'Sarah Kim',
      role: 'Content Creator',
      avatar: 'S',
      gradient: 'linear-gradient(to bottom right, var(--color-cyan-from), var(--color-blue-to))',
    },
    {
      quote: 'As a developer, I love the API option. Integrated it into my app in minutes.',
      author: 'Marcus Johnson',
      role: 'Indie Developer',
      avatar: 'M',
      gradient: 'linear-gradient(to bottom right, var(--color-green-from), var(--color-green-to))',
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionReveal}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            What Our Users <span className="gradient-text">Say</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            Join thousands of satisfied users creating unique pixel avatars
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={slowStagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {testimonials.map((testimonial, index) => {
            return (
              <motion.div
                key={index}
                variants={staggerItem}
              >
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  variants={hoverLift}
                >
                  <Card
                    variant="raised"
                    className="p-8 h-full group"
                  >
                    {/* Quote Icon */}
                    <div className="mb-6">
                      <motion.div
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                        initial="rest"
                        whileHover="hover"
                        variants={iconHover}
                      >
                        <Quote className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>

                    {/* Quote Text */}
                    <blockquote className="text-[var(--text-primary)] text-lg mb-6 leading-relaxed">
                      &quot;{testimonial.quote}&quot;
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12 border-2 border-[var(--border)]">
                        <AvatarFallback className="text-white font-bold" style={{ background: testimonial.gradient }}>
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-[var(--text-primary)]">
                          {testimonial.author}
                        </div>
                        <div className="text-sm text-[var(--text-secondary)]">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
