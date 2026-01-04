'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { staggerContainer, fadeInUp, hoverLift } from '@/lib/motion';

const examples = [
  { id: 1, src: '/avatars/hero-avatar-1.png', name: 'Pink Twintails', style: 'Kawaii' },
  { id: 2, src: '/avatars/hero-avatar-2.png', name: 'Blue Gamer', style: 'Gaming' },
  { id: 3, src: '/avatars/hero-avatar-3.png', name: 'Purple Cat', style: 'Anime' },
  { id: 4, src: '/avatars/usecase-discord.png', name: 'Cool Purple', style: 'Cool' },
  { id: 5, src: '/avatars/usecase-twitter.png', name: 'Orange Sunny', style: 'Friendly' },
  { id: 6, src: '/avatars/usecase-youtube.png', name: 'Red Creator', style: 'Bold' },
];

const styles = [
  { name: 'Kawaii', color: 'bg-pink-100 text-pink-600', activeColor: 'bg-pink-500 text-white' },
  { name: 'Gaming', color: 'bg-blue-100 text-blue-600', activeColor: 'bg-blue-500 text-white' },
  { name: 'Anime', color: 'bg-purple-100 text-purple-600', activeColor: 'bg-purple-500 text-white' },
  { name: 'Cool', color: 'bg-indigo-100 text-indigo-600', activeColor: 'bg-indigo-500 text-white' },
  { name: 'Friendly', color: 'bg-orange-100 text-orange-600', activeColor: 'bg-orange-500 text-white' },
  { name: 'Bold', color: 'bg-red-100 text-red-600', activeColor: 'bg-red-500 text-white' },
];

export default function ExampleGrid() {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const filteredExamples = selectedStyle
    ? examples.filter(example => example.style === selectedStyle)
    : examples;

  return (
    <section className="py-20 bg-white" id="examples">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            See What&apos;s <span className="gradient-mint">Possible</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Every avatar is unique, just like you. Here are some examples of what our AI can create.
          </motion.p>
        </motion.div>

        {/* Style Filter Tags */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          <button
            onClick={() => setSelectedStyle(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all hover:scale-105 ${
              selectedStyle === null
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Styles
          </button>
          {styles.map((style) => (
            <button
              key={style.name}
              onClick={() => setSelectedStyle(style.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all hover:scale-105 ${
                selectedStyle === style.name ? style.activeColor : style.color
              }`}
            >
              {style.name}
            </button>
          ))}
        </motion.div>

        {/* Avatar Grid */}
        <motion.div
          layout
          className={`grid gap-6 ${
            filteredExamples.length === 1
              ? 'grid-cols-1 max-w-[200px] mx-auto'
              : filteredExamples.length <= 3
              ? 'grid-cols-2 md:grid-cols-3 max-w-2xl mx-auto'
              : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
          }`}
        >
          <AnimatePresence mode="popLayout">
            {filteredExamples.map((example) => (
              <motion.div
                key={example.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  variants={hoverLift}
                  className="group cursor-pointer"
                >
                  <div className="pixel-avatar-frame aspect-square overflow-hidden">
                    <Image
                      src={example.src}
                      alt={`${example.name} - ${example.style} style square face avatar`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                      sizes="(max-width: 768px) 150px, 200px"
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium text-gray-700">{example.name}</p>
                    <p className="text-xs text-gray-400">{example.style}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Gallery Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="pixel-card p-4 overflow-hidden">
            <Image
              src="/avatars/gallery-grid-1.png"
              alt="Square face avatar gallery showing various styles"
              width={1200}
              height={400}
              className="w-full h-auto rounded-lg"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-gray-500 mb-4">
            Over <strong className="text-gray-700">200+ customization options</strong> available!
          </p>
          <button
            onClick={() => document.getElementById('upload-zone')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-[var(--accent-primary)] font-medium hover:underline"
          >
            Try creating your own →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
