'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, ChevronRight, Loader2 } from 'lucide-react';

interface CompactUploadZoneProps {
  onUpload: (file: File) => void;
  isLoading: boolean;
}

export default function CompactUploadZone({ onUpload, isLoading }: CompactUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
    const isValidType = validTypes.includes(file.type) ||
      file.name.toLowerCase().endsWith('.heic') ||
      file.name.toLowerCase().endsWith('.heif');

    if (!isValidType) {
      return;
    }

    onUpload(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <motion.label
      className="block cursor-pointer"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*,.heic,.heif"
        onChange={handleChange}
        disabled={isLoading}
      />
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          flex items-center gap-4 p-4 rounded-xl border-2 border-dashed transition-all
          ${isDragging
            ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/5'
            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <div className={`
          w-12 h-12 rounded-lg flex items-center justify-center transition-colors
          ${isDragging ? 'bg-[var(--accent-primary)]/10' : 'bg-gray-100'}
        `}>
          {isLoading ? (
            <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
          ) : (
            <Upload className={`w-6 h-6 ${isDragging ? 'text-[var(--accent-primary)]' : 'text-gray-400'}`} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-medium ${isDragging ? 'text-[var(--accent-primary)]' : 'text-gray-700'}`}>
            {isLoading ? 'Processing...' : 'Upload your photo'}
          </p>
          <p className="text-sm text-gray-400 truncate">
            {isDragging ? 'Drop to upload' : 'For a personalized avatar'}
          </p>
        </div>
        <ChevronRight className={`w-5 h-5 flex-shrink-0 ${isDragging ? 'text-[var(--accent-primary)]' : 'text-gray-300'}`} />
      </div>
    </motion.label>
  );
}
