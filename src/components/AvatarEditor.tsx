'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, RotateCcw, Wand2, ChevronDown, Loader2, X, Crown } from 'lucide-react';

interface AvatarEditorProps {
  avatarUrl: string;
  onDownload: () => void;
  onReset: () => void;
  onEdit: (editPrompt: string, features: string[]) => Promise<void>;
  isEditing: boolean;
  isPro?: boolean;
  onUpgradeClick?: () => void;
}

const DOWNLOAD_RESOLUTIONS = [
  { size: 256, label: '256px', free: true },
  { size: 512, label: '512px', free: false },
  { size: 1024, label: '1024px', free: false },
];

const QUICK_EDITS = [
  { label: 'Add Glasses', value: 'glasses' },
  { label: 'Add Hat', value: 'hat' },
  { label: 'Blue Hair', value: 'blue hair' },
  { label: 'Pink Hair', value: 'pink hair' },
  { label: 'Add Beard', value: 'beard' },
  { label: 'Add Headphones', value: 'headphones' },
  { label: 'Make Happy', value: 'happy expression' },
  { label: 'Make Cool', value: 'cool expression with sunglasses' },
];

export default function AvatarEditor({
  avatarUrl,
  onDownload,
  onReset,
  onEdit,
  isEditing,
  isPro = false,
  onUpgradeClick,
}: AvatarEditorProps) {
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [editPrompt, setEditPrompt] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [editError, setEditError] = useState<string | null>(null);
  const [showResolutionMenu, setShowResolutionMenu] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Download with specific resolution
  const handleDownloadWithSize = async (size: number) => {
    setShowResolutionMenu(false);

    // Check if Pro required
    const resolution = DOWNLOAD_RESOLUTIONS.find(r => r.size === size);
    if (resolution && !resolution.free && !isPro) {
      onUpgradeClick?.();
      return;
    }

    try {
      // Create canvas for resizing
      const img = new Image();
      img.crossOrigin = 'anonymous';

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = avatarUrl;
      });

      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Use pixelated rendering for pixel art
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, size, size);

        // Convert to blob and download
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `squareface-avatar-${size}px.png`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
          }
        }, 'image/png');
      }
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback to original download
      onDownload();
    }
  };

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const handleApplyEdit = async () => {
    if (!editPrompt && selectedFeatures.length === 0) {
      setEditError('Please enter a description or select features');
      return;
    }
    setEditError(null);
    try {
      await onEdit(editPrompt, selectedFeatures);
      // Clear inputs after successful edit
      setEditPrompt('');
      setSelectedFeatures([]);
      setShowEditPanel(false);
    } catch (err) {
      setEditError(err instanceof Error ? err.message : 'Edit failed. Please try again.');
    }
  };

  const handleClearSelections = () => {
    setEditPrompt('');
    setSelectedFeatures([]);
    setEditError(null);
  };

  const hasSelections = editPrompt || selectedFeatures.length > 0;

  return (
    <div className="pixel-card p-6">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-1">Your Pixel Avatar is Ready!</h3>
        <p className="text-sm text-gray-500">Download, edit, or create another one.</p>
      </div>

      {/* Avatar Preview */}
      <div className="relative aspect-square max-w-[280px] mx-auto mb-4 rounded-xl overflow-hidden ring-4 ring-[var(--accent-primary)]/20">
        <img
          src={avatarUrl}
          alt="Generated avatar"
          className="w-full h-full object-cover"
          style={{ imageRendering: 'pixelated' }}
        />
        {isEditing && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="flex items-center gap-2 text-white">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="font-medium">Editing...</span>
            </div>
          </div>
        )}
      </div>

      {/* Primary Actions */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <motion.button
            onClick={() => setShowResolutionMenu(!showResolutionMenu)}
            disabled={isEditing}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 pixel-button disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            Download
            <ChevronDown className={`w-3 h-3 transition-transform ${showResolutionMenu ? 'rotate-180' : ''}`} />
          </motion.button>

          {/* Resolution Menu */}
          <AnimatePresence>
            {showResolutionMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-10"
              >
                {DOWNLOAD_RESOLUTIONS.map((res) => (
                  <button
                    key={res.size}
                    onClick={() => handleDownloadWithSize(res.size)}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-700">{res.label}</span>
                    {!res.free && !isPro && (
                      <span className="flex items-center gap-1 text-xs text-[var(--accent-primary)]">
                        <Crown className="w-3 h-3" />
                        Pro
                      </span>
                    )}
                    {res.free && (
                      <span className="text-xs text-green-600">Free</span>
                    )}
                    {!res.free && isPro && (
                      <span className="text-xs text-[var(--accent-primary)]">Included</span>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.button
          onClick={onReset}
          disabled={isEditing}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
        >
          <RotateCcw className="w-4 h-4" />
          New
        </motion.button>
      </div>

      {/* Edit Toggle */}
      <button
        onClick={() => setShowEditPanel(!showEditPanel)}
        disabled={isEditing}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
      >
        <span className="flex items-center gap-2">
          <Wand2 className="w-4 h-4" />
          Edit Avatar
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${showEditPanel ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Edit Panel */}
      <AnimatePresence>
        {showEditPanel && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-4">
              {/* Quick Edit Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Edits
                </label>
                <div className="flex flex-wrap gap-2">
                  {QUICK_EDITS.map((edit) => (
                    <button
                      key={edit.value}
                      onClick={() => handleFeatureToggle(edit.value)}
                      disabled={isEditing}
                      className={`px-3 py-1 text-xs rounded-full border transition-all disabled:opacity-50 ${
                        selectedFeatures.includes(edit.value)
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                      }`}
                    >
                      {edit.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Edit Prompt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Description
                </label>
                <textarea
                  value={editPrompt}
                  onChange={(e) => setEditPrompt(e.target.value)}
                  disabled={isEditing}
                  placeholder="e.g., add a red scarf, make it cyberpunk style, add freckles..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none disabled:opacity-50 disabled:bg-gray-50"
                  rows={2}
                />
              </div>

              {/* Selection Summary */}
              {hasSelections && (
                <div className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg">
                  <div className="flex flex-wrap gap-1 flex-1">
                    {selectedFeatures.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center px-2 py-0.5 text-xs bg-purple-100 text-purple-700 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                    {selectedFeatures.length > 3 && (
                      <span className="text-xs text-gray-400">
                        +{selectedFeatures.length - 3} more
                      </span>
                    )}
                    {editPrompt && (
                      <span className="inline-flex items-center px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
                        Custom prompt
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleClearSelections}
                    disabled={isEditing}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    title="Clear all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Error Message */}
              {editError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  {editError}
                </div>
              )}

              {/* Apply Button */}
              <motion.button
                onClick={handleApplyEdit}
                disabled={isEditing || (!editPrompt && selectedFeatures.length === 0)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEditing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Applying Changes...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    Apply Changes
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Privacy Note */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-500">
        <p className="flex items-start gap-2">
          <span className="text-[var(--accent-primary)]">💡</span>
          <span>
            Your photo is processed securely. We value your privacy!
          </span>
        </p>
      </div>
    </div>
  );
}
