'use client';

import { Zap, Shield, Palette, Crown } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get your pixel avatar in just 10 seconds. No more waiting around!',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your photos are never stored. Everything is processed securely and deleted immediately.',
    },
    {
      icon: Palette,
      title: 'AI-Powered',
      description: 'Advanced AI analyzes your unique features to create a personalized avatar.',
    },
    {
      icon: Crown,
      title: 'High Quality',
      description: 'Export in multiple sizes up to 1024px for crisp, clear avatars everywhere.',
    },
  ];

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Why Choose <span className="gradient-text">SquareFaceAI</span>?
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            We&apos;re not just another avatar generator. Here&apos;s what makes us different.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="glass rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:glow-purple group"
              >
                <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-zinc-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
