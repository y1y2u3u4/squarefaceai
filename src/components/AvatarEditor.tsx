'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, RotateCcw, Wand2, ChevronDown, Loader2, X } from 'lucide-react';

interface AvatarEditorProps {
  avatarUrl: string;
  onDownload: () => void;
  onReset: () => void;
  onEdit: (editPrompt: string, features: string[]) => Promise<void>;
  isEditing: boolean;
}

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
}: AvatarEditorProps) {
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [editPrompt, setEditPrompt] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [editError, setEditError] = useState<string | null>(null);

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
        <motion.button
          onClick={onDownload}
          disabled={isEditing}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 pixel-button disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          Download
        </motion.button>
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
