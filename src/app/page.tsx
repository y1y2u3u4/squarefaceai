'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import InputSelector from '@/components/InputSelector';
import AvatarEditor from '@/components/AvatarEditor';
import ExampleGrid from '@/components/ExampleGrid';
import { RandomConfig } from '@/types/avatar';

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
import SEOContent from '@/components/landing/SEOContent';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [generatedAvatar, setGeneratedAvatar] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle photo upload generation
  const handleUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('mode', 'upload');
      formData.append('image', file);

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

  // Handle random avatar generation
  const handleRandomGenerate = async (config: RandomConfig) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('mode', 'random');
      formData.append('gender', config.gender);
      formData.append('features', JSON.stringify(config.features));
      formData.append('prompt', config.prompt);

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
        const dataUrl = `data:${result.avatar.mimeType};base64,${result.avatar.data}`;
        setGeneratedAvatar(dataUrl);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Random avatar generation failed:', err);
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
    setError(null);
  };

  // Handle avatar editing
  const handleEdit = async (editPrompt: string, features: string[]) => {
    if (!generatedAvatar) return;

    setIsEditing(true);

    try {
      const formData = new FormData();
      formData.append('mode', 'edit');
      // Extract base64 data from data URL
      const base64Data = generatedAvatar.split(',')[1];
      formData.append('baseImage', base64Data);
      formData.append('editPrompt', editPrompt);
      formData.append('editFeatures', JSON.stringify(features));

      const response = await fetch('/api/generate-avatar', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to edit avatar');
      }

      const result = await response.json();

      if (result.success && result.avatar) {
        const dataUrl = `data:${result.avatar.mimeType};base64,${result.avatar.data}`;
        setGeneratedAvatar(dataUrl);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Avatar edit failed:', err);
      throw err; // Re-throw so AvatarEditor can handle it
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <Breadcrumb items={[{ label: 'Square Face Avatar Generator' }]} />
      <main>

      {/* Hero Section with Input/Preview */}
      <Hero>
        {generatedAvatar ? (
          <AvatarEditor
            avatarUrl={generatedAvatar}
            onDownload={handleDownload}
            onReset={handleReset}
            onEdit={handleEdit}
            isEditing={isEditing}
          />
        ) : (
          <InputSelector
            onUpload={handleUpload}
            onRandomGenerate={handleRandomGenerate}
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

      {/* SEO Content */}
      <SEOContent />

      {/* FAQ */}
      <FAQ />

      {/* Final CTA */}
      <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
