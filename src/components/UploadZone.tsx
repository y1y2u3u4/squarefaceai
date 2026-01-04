'use client';

import { useCallback, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface UploadZoneProps {
  onUpload: (file: File) => void;
  isLoading?: boolean;
}

export default function UploadZone({ onUpload, isLoading = false }: UploadZoneProps) {
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

  if (isLoading) {
    return (
      <div className="glass rounded-2xl p-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-medium">AI is working its magic...</p>
          <p className="text-zinc-400">This will only take a few seconds</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        glass rounded-2xl p-8 transition-all duration-300
        ${isDragging ? 'border-purple-500 glow-purple scale-105' : 'border-zinc-700'}
        ${preview ? 'border-solid' : 'border-dashed border-2'}
      `}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {preview ? (
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-zinc-400 truncate">{fileName}</p>
            <button
              onClick={handleClear}
              className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="relative aspect-square max-w-md mx-auto rounded-xl overflow-hidden">
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
          <div className="flex flex-col items-center gap-4 py-12">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold mb-2">
                Drop your photo here or click to upload
              </p>
              <p className="text-zinc-400">
                Supports: JPG, PNG, WEBP (Max 5MB)
              </p>
            </div>
          </div>
        </label>
      )}
    </div>
  );
}
