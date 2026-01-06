'use client';

import { motion } from 'framer-motion';
import { Sparkles, Crown } from 'lucide-react';
import { FREE_GENERATION_LIMIT } from '@/hooks/useUsageLimit';

interface UsageIndicatorProps {
  usageCount: number;
  isPro: boolean;
  onUpgradeClick?: () => void;
}

export default function UsageIndicator({ usageCount, isPro, onUpgradeClick }: UsageIndicatorProps) {
  if (isPro) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[var(--accent-primary)]/10 to-[var(--accent-secondary)]/10 rounded-full">
          <Crown className="w-4 h-4 text-[var(--accent-primary)]" />
          <span className="font-medium text-[var(--accent-primary)]">Pro</span>
        </div>
      </div>
    );
  }

  const remaining = Math.max(0, FREE_GENERATION_LIMIT - usageCount);
  const isLow = remaining <= 1;
  const isEmpty = remaining === 0;

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${
        isEmpty
          ? 'bg-red-50 text-red-600'
          : isLow
            ? 'bg-amber-50 text-amber-600'
            : 'bg-gray-100 text-gray-600'
      }`}>
        <Sparkles className="w-4 h-4" />
        <span className="font-medium">
          {isEmpty ? 'No free generations left' : `${remaining}/${FREE_GENERATION_LIMIT} free`}
        </span>
      </div>

      {(isLow || isEmpty) && onUpgradeClick && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onUpgradeClick}
          className="px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full hover:shadow-md transition-shadow"
        >
          Upgrade
        </motion.button>
      )}
    </div>
  );
}
