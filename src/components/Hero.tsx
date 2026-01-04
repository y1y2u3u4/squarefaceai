'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Shield, Zap } from 'lucide-react';

interface HeroProps {
  children: React.ReactNode;
}

export default function Hero({ children }: HeroProps) {
  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--accent-primary)]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--accent-secondary)]/20 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block mb-6">
            <Badge variant="default">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Avatar Generation
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transform Your Photo into a{' '}
            <span className="gradient-text">Unique Pixel Avatar</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Your face, pixelated perfectly. Generate a personalized avatar from your photo in just 10 seconds using advanced AI technology.
          </p>
        </div>

        {/* Upload Zone Area */}
        <div className="max-w-2xl mx-auto mb-12">
          {children}
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Card variant="flat" className="py-4 px-6 flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-foreground">No Sign-up Required</div>
              <div className="text-xs text-muted-foreground">Start immediately</div>
            </div>
          </Card>

          <Card variant="flat" className="py-4 px-6 flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-foreground">Privacy Protected</div>
              <div className="text-xs text-muted-foreground">Your data stays safe</div>
            </div>
          </Card>

          <Card variant="flat" className="py-4 px-6 flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-foreground">10 Second Generation</div>
              <div className="text-xs text-muted-foreground">Lightning fast</div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
