'use client';

import { Download, RotateCcw } from 'lucide-react';

interface AvatarPreviewProps {
  avatarUrl: string;
  onDownload: () => void;
  onReset: () => void;
}

export default function AvatarPreview({ avatarUrl, onDownload, onReset }: AvatarPreviewProps) {
  return (
    <div className="glass rounded-2xl p-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Your Pixel Avatar is Ready!</h3>
        <p className="text-zinc-400">Looking awesome! Download or create another one.</p>
      </div>

      <div className="relative aspect-square max-w-md mx-auto mb-6 rounded-xl overflow-hidden ring-4 ring-purple-500/20">
        <img
          src={avatarUrl}
          alt="Generated avatar"
          className="w-full h-full object-cover"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onDownload}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          <Download className="w-5 h-5" />
          Download Avatar
        </button>
        <button
          onClick={onReset}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 glass rounded-xl font-semibold hover:bg-zinc-800 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Create Another
        </button>
      </div>

      <div className="mt-6 p-4 bg-zinc-900/50 rounded-lg text-sm text-zinc-400">
        <p className="flex items-start gap-2">
          <span className="text-purple-500">💡</span>
          <span>
            Your photo is processed locally and not stored on our servers. We value your privacy!
          </span>
        </p>
      </div>
    </div>
  );
}
