'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Sparkles, Loader2 } from 'lucide-react';
import {
  slowStagger,
  staggerItem,
  bounceScale,
  hoverLift,
  sectionReveal,
  viewportConfig,
  buttonPress,
  smooth
} from '@/lib/motion';
import { trackPaymentEvent } from '@/lib/analytics';

type PlanId = 'free' | 'pro';

export default function Pricing() {
  const [loadingPlan, setLoadingPlan] = useState<PlanId | null>(null);

  const handleCheckout = async (planId: PlanId) => {
    if (planId === 'free') {
      document.getElementById('upload-zone')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setLoadingPlan(planId);
    trackPaymentEvent({ action: 'checkout_initiated', plan: planId });

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Failed to start checkout. Please try again.');
      }
    } catch {
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoadingPlan(null);
    }
  };

  const plans: Array<{
    id: PlanId;
    name: string;
    price: string;
    period: string;
    description: string;
    features: Array<{ text: string; included: boolean }>;
    cta: string;
    popular: boolean;
    gradient: string;
  }> = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: '',
      description: 'Try it out, no credit card required',
      features: [
        { text: '3 avatars per day', included: true },
        { text: '256px resolution', included: true },
        { text: 'Basic styles', included: true },
        { text: 'Personal use only', included: true },
        { text: 'High resolution', included: false },
        { text: 'Priority processing', included: false },
        { text: 'Commercial use', included: false },
      ],
      cta: 'Start Free',
      popular: false,
      gradient: 'linear-gradient(to bottom right, var(--color-gray-from), var(--color-gray-to))',
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$4.99',
      period: '/mo',
      description: 'Unlimited creation for creators',
      features: [
        { text: 'Unlimited avatars', included: true },
        { text: 'Up to 1024px resolution', included: true },
        { text: 'All styles unlocked', included: true },
        { text: 'Priority processing', included: true },
        { text: 'Commercial license', included: true },
        { text: 'Email support', included: true },
      ],
      cta: 'Upgrade to Pro',
      popular: true,
      gradient: 'from-[var(--accent-primary)] to-[var(--accent-secondary)]',
    },
  ];

  return (
    <section id="pricing" className="py-20 px-6 bg-[var(--bg-secondary)]/30">
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionReveal}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Simple <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            Choose the plan that works best for you. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={slowStagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto"
        >
          {plans.map((plan, index) => {
            const isPro = plan.popular;
            const cardVariants = isPro ? bounceScale : staggerItem;
            const cardHoverVariants = isPro
              ? { ...hoverLift, hover: { ...hoverLift.hover, scale: 1.05, y: -8 } }
              : hoverLift;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="relative"
              >
                {/* Popular Badge */}
                {isPro && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <Badge className="gap-1.5 py-2 px-4 text-sm shadow-lg">
                      <Sparkles className="w-3.5 h-3.5" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <motion.div
                  initial="rest"
                  whileHover="hover"
                  variants={cardHoverVariants}
                >
                  <Card
                    variant="raised"
                    className={`p-8 h-full ${
                      isPro ? 'ring-2 ring-[var(--accent-primary)]' : ''
                    }`}
                  >
                    {/* Plan Header */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                        {plan.name}
                      </h3>
                      <div className="flex items-baseline justify-center gap-1 mb-2">
                        <span className="text-5xl font-bold gradient-text">
                          {plan.price}
                        </span>
                        <span className="text-[var(--text-secondary)] text-lg">
                          {plan.period}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {plan.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              !feature.included && 'bg-[var(--bg-tertiary)]'
                            }`}
                            style={feature.included ? { background: 'linear-gradient(to bottom right, var(--color-green-from), var(--color-green-to))' } : undefined}
                          >
                            {feature.included ? (
                              <Check className="w-3 h-3 text-white" />
                            ) : (
                              <X className="w-3 h-3 text-[var(--text-secondary)]" />
                            )}
                          </div>
                          <span
                            className={
                              feature.included
                                ? 'text-[var(--text-primary)]'
                                : 'text-[var(--text-secondary)] line-through'
                            }
                          >
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <motion.div
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      variants={buttonPress}
                    >
                      <Button
                        size="lg"
                        variant={isPro ? 'default' : 'secondary'}
                        className="w-full"
                        onClick={() => handleCheckout(plan.id)}
                        disabled={loadingPlan !== null}
                      >
                        {loadingPlan === plan.id ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          plan.cta
                        )}
                      </Button>
                    </motion.div>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Money-back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={smooth}
          className="text-center mt-12"
        >
          <p className="text-[var(--text-secondary)] text-sm">
            💰 30-day money-back guarantee on all paid plans
          </p>
        </motion.div>
      </div>
    </section>
  );
}
