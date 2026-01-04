'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  staggerContainer,
  staggerItem,
  sectionReveal,
  viewportConfig,
  smooth
} from '@/lib/motion';

export default function FAQ() {
  const faqs = [
    {
      question: 'How does SquareFaceAI work?',
      answer:
        'SquareFaceAI uses advanced AI algorithms to analyze your facial features and convert them into a unique pixel art avatar. Our AI identifies key facial characteristics like face shape, eyes, nose, and mouth to create a personalized representation that actually looks like you.',
    },
    {
      question: 'Is my photo stored on your servers?',
      answer:
        'No! We take your privacy seriously. Your photos are processed in real-time and immediately deleted after generation. We never store your original photos or use them for training purposes. Your data stays yours.',
    },
    {
      question: 'What image formats do you support?',
      answer:
        'We support JPG, PNG, and WEBP formats. For best results, use a clear, front-facing photo with good lighting. The recommended minimum resolution is 512x512 pixels, though higher resolution photos work even better.',
    },
    {
      question: 'Can I use the avatar commercially?',
      answer:
        'Yes! With a Pro or Team plan, you get full commercial usage rights. This means you can use your avatar for business purposes, streaming, social media profiles, merchandise, and more. Free tier avatars include a small watermark and are for personal use only.',
    },
    {
      question: 'What sizes are available?',
      answer:
        'Free users get 256x256px avatars. Pro and Team users can export up to 1024x1024px resolution for crisp, high-quality results perfect for any platform. All exports are in PNG format with transparency support.',
    },
    {
      question: 'How is this different from other avatar generators?',
      answer:
        'Unlike generic avatar creators, SquareFaceAI actually analyzes YOUR unique facial features to create a personalized pixel avatar. Most other tools use random generation or templates. We use AI to ensure your avatar truly represents you, not just a random character.',
    },
  ];

  return (
    <section id="faq" className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionReveal}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            Everything you need to know about SquareFaceAI
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={staggerItem}>
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-[var(--border)] rounded-2xl px-6 bg-[var(--bg-secondary)]/30 data-[state=open]:bg-[var(--bg-secondary)]/50 overflow-hidden"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold text-[var(--text-primary)] hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[var(--text-secondary)] leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Still have questions? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={smooth}
          className="text-center mt-12"
        >
          <p className="text-[var(--text-secondary)]">
            Still have questions?{' '}
            <a
              href="mailto:support@squarefaceai.com"
              className="text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors underline underline-offset-4"
            >
              Contact our support team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
