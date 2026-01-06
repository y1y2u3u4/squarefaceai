'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check, Loader2, Zap, Crown, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackPaymentEvent } from '@/lib/analytics';

type UpgradeReason = 'limit_reached' | 'high_resolution' | 'commercial_use';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: UpgradeReason;
  usageCount?: number;
}

const reasonContent: Record<UpgradeReason, { icon: React.ElementType; title: string; description: string }> = {
  limit_reached: {
    icon: Zap,
    title: "You've used all 3 free generations!",
    description: "Upgrade to Pro for unlimited avatar creation and premium features.",
  },
  high_resolution: {
    icon: Download,
    title: "High Resolution is a Pro Feature",
    description: "Free users can download at 256px. Upgrade to get up to 1024px resolution.",
  },
  commercial_use: {
    icon: Crown,
    title: "Commercial License Required",
    description: "Using avatars for business? Upgrade to Pro for commercial rights.",
  },
};

const proFeatures = [
  'Unlimited avatar generations',
  'Up to 1024px resolution',
  'All styles unlocked',
  'Priority processing',
  'Commercial license',
  'Email support',
];

export default function UpgradeModal({ isOpen, onClose, reason = 'limit_reached', usageCount = 3 }: UpgradeModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const content = reasonContent[reason];
  const ReasonIcon = content.icon;

  const handleUpgrade = async () => {
    setIsLoading(true);
    trackPaymentEvent({ action: 'checkout_initiated', plan: 'pro' });

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: 'pro' }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Failed to start checkout. Please try again.');
        setIsLoading(false);
      }
    } catch {
      alert('Failed to start checkout. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
              {/* Header with gradient */}
              <div className="relative bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] px-6 py-8 text-white">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <ReasonIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm opacity-80">
                      {reason === 'limit_reached' && `${usageCount}/3 generations used`}
                      {reason === 'high_resolution' && 'Pro Feature'}
                      {reason === 'commercial_use' && 'License Required'}
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
                <p className="opacity-90">{content.description}</p>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                {/* Pro Plan Card */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-[var(--accent-primary)]" />
                    <span className="font-bold text-gray-900">Pro Plan</span>
                    <span className="ml-auto text-2xl font-bold text-gray-900">$4.99</span>
                    <span className="text-gray-500">/mo</span>
                  </div>

                  <ul className="space-y-2">
                    {proFeatures.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 text-green-600" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={handleUpgrade}
                  disabled={isLoading}
                  className="w-full py-6 text-lg font-semibold"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Upgrade to Pro
                    </>
                  )}
                </Button>

                {/* Guarantee */}
                <p className="text-center text-xs text-gray-500 mt-4">
                  30-day money-back guarantee. Cancel anytime.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
