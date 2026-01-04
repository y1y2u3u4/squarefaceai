'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UploadZone from '@/components/UploadZone';
import AvatarPreview from '@/components/AvatarPreview';
import ExampleGrid from '@/components/ExampleGrid';

// Landing page components
import Hero from '@/components/landing/Hero';
import LogoBar from '@/components/landing/LogoBar';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HowItWorks from '@/components/landing/HowItWorks';
import Testimonials from '@/components/landing/Testimonials';
import Pricing from '@/components/landing/Pricing';
import FAQ from '@/components/landing/FAQ';
import FinalCTA from '@/components/landing/FinalCTA';
import UseCases from '@/components/landing/UseCases';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedAvatar, setGeneratedAvatar] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      // Create form data with the image
      const formData = new FormData();
      formData.append('image', file);

      // Call the avatar generation API
      const response = await fetch('/api/generate-avatar', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate avatar');
      }

      const result = await response.json();

      if (result.success && result.avatar) {
        // Convert base64 to data URL
        const dataUrl = `data:${result.avatar.mimeType};base64,${result.avatar.data}`;
        setGeneratedAvatar(dataUrl);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Avatar generation failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate avatar. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
          <UploadZone
            onUpload={handleUpload}
            isLoading={isLoading}
            error={error}
            onClearError={() => setError(null)}
          />
        )}
      </Hero>

      {/* Logo/Trust Bar */}
      <LogoBar />

      {/* Example Grid */}
      <ExampleGrid />

      {/* Use Cases - Platform specific */}
      <UseCases />

      {/* Features Section (Bento Grid) */}
      <FeaturesSection />

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <Testimonials />

      {/* Pricing */}
      <Pricing />

      {/* FAQ */}
      <FAQ />

      {/* Final CTA */}
      <FinalCTA />

      <Footer />
    </div>
  );
}
