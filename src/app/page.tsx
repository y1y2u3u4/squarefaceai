'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import UploadZone from '@/components/UploadZone';
import AvatarPreview from '@/components/AvatarPreview';
import ExampleGrid from '@/components/ExampleGrid';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import FAQ from '@/components/FAQ';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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

      {/* Hero Section with Upload/Preview */}
      <Hero>
        {generatedAvatar ? (
          <AvatarPreview
            avatarUrl={generatedAvatar}
            onDownload={handleDownload}
            onReset={handleReset}
          />
        ) : (
          <UploadZone onUpload={handleUpload} isLoading={isLoading} />
        )}
      </Hero>

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
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)]/10 to-[var(--accent-secondary)]/10" />
        <div className="container mx-auto relative z-10">
          <Card variant="raised" className="max-w-3xl mx-auto text-center p-12">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Create Your <span className="gradient-text">Pixel Avatar</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who&apos;ve already created their unique avatars
            </p>
            <Button
              size="lg"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Get Started - It&apos;s Free!
            </Button>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
