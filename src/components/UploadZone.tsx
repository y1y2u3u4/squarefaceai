'use client';

import { useCallback, useState } from 'react';
import { Upload, X, ImageIcon, AlertCircle, RefreshCw } from 'lucide-react';

interface UploadZoneProps {
  onUpload: (file: File) => void;
  isLoading?: boolean;
  error?: string | null;
  onClearError?: () => void;
}

export default function UploadZone({ onUpload, isLoading = false, error, onClearError }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    setFileName(file.name);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Call parent handler
    onUpload(file);
  };

  const handleClear = () => {
    setPreview(null);
    setFileName('');
  };

  // Error state with elegant design
  if (error) {
    return (
      <div className="pixel-card p-8 text-center border-red-200 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800 mb-1">Generation Failed</p>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">{error}</p>
          </div>
          <button
            onClick={() => {
              onClearError?.();
              handleClear();
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="pixel-card p-12 text-center">
        <div className="flex flex-col items-center gap-4">
          {/* Pixel loading animation */}
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="bg-[var(--accent-primary)] rounded-sm animate-pulse"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    opacity: 0.3 + (i % 3) * 0.2
                  }}
                />
              ))}
            </div>
          </div>
          <p className="text-lg font-semibold text-gray-800">Creating your avatar...</p>
          <p className="text-gray-500">This may take 10-30 seconds</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        pixel-card p-6 transition-all duration-200
        ${isDragging ? 'scale-[1.02] border-[var(--accent-primary)]' : ''}
        ${preview ? '' : 'border-dashed'}
      `}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {preview ? (
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500 truncate flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              {fileName}
            </p>
            <button
              onClick={handleClear}
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div className="relative aspect-square max-w-xs mx-auto pixel-avatar-frame">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ) : (
        <label className="cursor-pointer block">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--accent-mint)] to-[var(--accent-blue)] flex items-center justify-center shadow-md border-2 border-white">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800 mb-1">
                Drop your photo here
              </p>
              <p className="text-gray-500 text-sm mb-4">
                or click to browse files
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <span className="px-2 py-1 bg-gray-100 rounded">JPG</span>
                <span className="px-2 py-1 bg-gray-100 rounded">PNG</span>
                <span className="px-2 py-1 bg-gray-100 rounded">WEBP</span>
                <span className="text-gray-300">|</span>
                <span>Max 5MB</span>
              </div>
            </div>
          </div>
        </label>
      )}
    </div>
  );
}
