'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, X } from 'lucide-react';
import { RandomConfig, Gender, FEATURE_OPTIONS, DEFAULT_RANDOM_CONFIG } from '@/types/avatar';

interface RandomOptionsProps {
  value: RandomConfig;
  onChange: (config: RandomConfig) => void;
  onGenerate: () => void;
  isLoading: boolean;
  compact?: boolean; // Compact mode: hide top button, show bottom button
}

const GENDER_OPTIONS: { value: Gender; label: string; icon: string }[] = [
  { value: 'male', label: 'Male', icon: '♂' },
  { value: 'female', label: 'Female', icon: '♀' },
  { value: 'neutral', label: 'Any', icon: '⚪' },
];

export default function RandomOptions({ value, onChange, onGenerate, isLoading, compact = false }: RandomOptionsProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleGenderChange = (gender: Gender) => {
    onChange({ ...value, gender });
  };

  const handleFeatureToggle = (feature: string) => {
    const newFeatures = value.features.includes(feature)
      ? value.features.filter(f => f !== feature)
      : [...value.features, feature];
    onChange({ ...value, features: newFeatures });
  };

  const handlePromptChange = (prompt: string) => {
    onChange({ ...value, prompt });
  };

  const handleClearAll = () => {
    onChange(DEFAULT_RANDOM_CONFIG);
  };

  const hasSelections = value.features.length > 0 || value.prompt || value.gender !== 'neutral';

  return (
    <div className={compact ? "space-y-4" : "space-y-5"}>
      {/* Quick Generate Button - only in non-compact mode */}
      {!compact && (
        <>
          <div className="text-center">
            <motion.button
              onClick={onGenerate}
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pixel-button py-3 px-8 text-lg inline-flex items-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-5 h-5" />
              {isLoading ? 'Generating...' : 'Generate Random Avatar'}
            </motion.button>
            <p className="text-sm text-gray-500 mt-2">
              Click to generate instantly, or customize below
            </p>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-400">or customize</span>
            </div>
          </div>
        </>
      )}

      {/* Gender Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
        <div className="flex gap-2">
          {GENDER_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleGenderChange(option.value)}
              className={`flex-1 py-2 px-3 rounded-lg border-2 font-medium text-sm transition-all ${
                value.gender === option.value
                  ? 'border-[var(--accent-primary)] bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              <span className="mr-1">{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feature Categories */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Features
          {value.features.length > 0 && (
            <span className="ml-2 text-xs text-gray-400">({value.features.length} selected)</span>
          )}
        </label>
        <div className="space-y-2">
          {Object.entries(FEATURE_OPTIONS).map(([category, options]) => (
            <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                className="w-full px-3 py-2 flex items-center justify-between text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <span className="capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${expandedCategory === category ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {expandedCategory === category && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-3 flex flex-wrap gap-2">
                      {options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleFeatureToggle(option.label)}
                          className={`px-3 py-1 text-xs rounded-full border transition-all ${
                            value.features.includes(option.label)
                              ? 'border-[var(--accent-primary)] bg-green-50 text-green-700'
                              : 'border-gray-200 hover:border-gray-300 text-gray-600'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Prompt */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom Description <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          value={value.prompt}
          onChange={(e) => handlePromptChange(e.target.value)}
          placeholder="e.g., wearing a red scarf, cyberpunk style, with a pet cat..."
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent resize-none"
          rows={2}
        />
      </div>

      {/* Selected Features Summary & Clear */}
      {hasSelections && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg"
        >
          <div className="flex flex-wrap gap-1 flex-1">
            {value.gender !== 'neutral' && (
              <span className="inline-flex items-center px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
                {value.gender}
              </span>
            )}
            {value.features.slice(0, 3).map((feature) => (
              <span key={feature} className="inline-flex items-center px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
                {feature}
              </span>
            ))}
            {value.features.length > 3 && (
              <span className="text-xs text-gray-400">+{value.features.length - 3} more</span>
            )}
          </div>
          <button
            onClick={handleClearAll}
            className="p-1 text-gray-400 hover:text-gray-600"
            title="Clear all"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* Generate Button - only in compact mode */}
      {compact && (
        <motion.button
          onClick={onGenerate}
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full pixel-button py-3 text-sm inline-flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          {isLoading ? 'Generating...' : 'Generate with Options'}
        </motion.button>
      )}
    </div>
  );
}
