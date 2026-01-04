'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UploadZone from '@/components/UploadZone';
import AvatarPreview from '@/components/AvatarPreview';
import ExampleGrid from '@/components/ExampleGrid';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import FAQ from '@/components/FAQ';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedAvatar, setGeneratedAvatar] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    setIsLoading(true);

    // Simulate AI processing with a delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Create a placeholder pixel avatar (in production, this would be the actual AI-generated image)
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Create a gradient background
      const gradient = ctx.createLinearGradient(0, 0, 256, 256);
      gradient.addColorStop(0, '#8b5cf6');
      gradient.addColorStop(1, '#06b6d4');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);

      // Add some pixel blocks for demonstration
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      const blockSize = 32;
      for (let y = 0; y < 256; y += blockSize) {
        for (let x = 0; x < 256; x += blockSize) {
          if (Math.random() > 0.5) {
            ctx.fillRect(x, y, blockSize - 2, blockSize - 2);
          }
        }
      }

      setGeneratedAvatar(canvas.toDataURL());
    }

    setIsLoading(false);
  };

  const handleDownload = () => {
    if (!generatedAvatar) return;

    const link = document.createElement('a');
    link.download = 'squareface-avatar.png';
    link.href = generatedAvatar;
    link.click();
  };

  const handleReset = () => {
    setGeneratedAvatar(null);
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 glass rounded-full text-sm font-medium">
                🚀 AI-Powered Avatar Generation
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transform Your Photo into a{' '}
              <span className="gradient-text">Unique Pixel Avatar</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
              Your face, pixelated perfectly. Generate a personalized avatar from your photo in just 10 seconds using advanced AI technology.
            </p>
          </div>

          {/* Main Upload/Preview Area */}
          <div className="max-w-2xl mx-auto mb-12">
            {generatedAvatar ? (
              <AvatarPreview
                avatarUrl={generatedAvatar}
                onDownload={handleDownload}
                onReset={handleReset}
              />
            ) : (
              <UploadZone onUpload={handleUpload} isLoading={isLoading} />
            )}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>No Sign-up Required</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Privacy Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>10 Second Generation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Example Grid */}
      <ExampleGrid />

      {/* How It Works */}
      <HowItWorks />

      {/* Features */}
      <Features />

      {/* FAQ */}
      <FAQ />

      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center glass rounded-3xl p-12">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Create Your <span className="gradient-text">Pixel Avatar</span>?
            </h2>
            <p className="text-xl text-zinc-400 mb-8">
              Join thousands of users who&apos;ve already created their unique avatars
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full font-bold text-lg hover:opacity-90 transition-opacity glow-purple"
            >
              Get Started - It&apos;s Free!
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
