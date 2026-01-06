'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, Loader2 } from 'lucide-react';
import RandomOptions from './RandomOptions';
import CompactUploadZone from './CompactUploadZone';
import { RandomConfig, DEFAULT_RANDOM_CONFIG } from '@/types/avatar';

interface InputSelectorProps {
  onUpload: (file: File) => void;
  onRandomGenerate: (config: RandomConfig) => void;
  isLoading: boolean;
  error: string | null;
  onClearError: () => void;
}

export default function InputSelector({
  onUpload,
  onRandomGenerate,
  isLoading,
  error,
  onClearError,
}: InputSelectorProps) {
  const [showCustomize, setShowCustomize] = useState(false);
  const [randomConfig, setRandomConfig] = useState<RandomConfig>(DEFAULT_RANDOM_CONFIG);

  // Quick generate with default config
  const handleQuickGenerate = () => {
    onClearError();
    onRandomGenerate(DEFAULT_RANDOM_CONFIG);
  };

  // Generate with customized config
  const handleCustomGenerate = () => {
    onClearError();
    onRandomGenerate(randomConfig);
  };

  const handleUpload = (file: File) => {
    onClearError();
    onUpload(file);
  };

  return (
    <div className="space-y-3 md:space-y-4">
      {/* Header - Hidden on mobile since hero already has title */}
      <div className="hidden md:block text-center">
        <h3 className="text-lg font-semibold text-gray-900">Generate Your Pixel Avatar</h3>
      </div>

      {/* Primary CTA: Quick Random Generation */}
      <motion.button
        onClick={handleQuickGenerate}
        disabled={isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 md:py-4 px-4 md:px-6 pixel-button text-base md:text-lg inline-flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate Random Avatar
          </>
        )}
      </motion.button>

      {/* Customize Toggle */}
      <button
        onClick={() => setShowCustomize(!showCustomize)}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
      >
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${showCustomize ? 'rotate-180' : ''}`}
        />
        <span>{showCustomize ? 'Hide options' : 'Customize'}</span>
      </button>

      {/* Expandable Customization Options */}
      <AnimatePresence>
        {showCustomize && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-1">
              <RandomOptions
                value={randomConfig}
                onChange={setRandomConfig}
                onGenerate={handleCustomGenerate}
                isLoading={isLoading}
                compact={true}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Divider */}
      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-gray-400">or</span>
        </div>
      </div>

      {/* Secondary: Photo Upload */}
      <CompactUploadZone
        onUpload={handleUpload}
        isLoading={isLoading}
      />

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
