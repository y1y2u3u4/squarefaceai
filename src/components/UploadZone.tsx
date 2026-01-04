'use client';

import { useCallback, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
      <Card variant="inset" className="p-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-medium">AI is working its magic...</p>
          <p className="text-muted-foreground">This will only take a few seconds</p>
        </div>
      </Card>
    );
  }

  return (
    <div
      className={`
        rounded-3xl p-8 transition-all duration-300
        ${isDragging ? 'border-primary scale-105' : 'border-border/50'}
        ${preview ? 'border-solid border bg-card shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.1)]' : 'border-dashed border-2 bg-card/50'}
      `}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {preview ? (
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground truncate">{fileName}</p>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleClear}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="relative aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-[inset_2px_2px_5px_rgba(0,0,0,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.1)]">
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
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.1)]">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold mb-2">
                Drop your photo here or click to upload
              </p>
              <p className="text-muted-foreground">
                Supports: JPG, PNG, WEBP (Max 5MB)
              </p>
            </div>
          </div>
        </label>
      )}
    </div>
  );
}
