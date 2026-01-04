'use client';

import { Upload, Sparkles, Download } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Your Photo',
      description: 'Simply drag and drop or click to upload your favorite photo. We support all common image formats.',
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      icon: Sparkles,
      title: 'AI Magic Happens',
      description: 'Our advanced AI analyzes your facial features and transforms them into a unique pixel art avatar.',
      gradient: 'from-cyan-500 to-cyan-600',
    },
    {
      icon: Download,
      title: 'Download & Share',
      description: 'Get your personalized pixel avatar instantly. Use it anywhere - Discord, Twitter, or anywhere you like!',
      gradient: 'from-purple-500 to-cyan-500',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-zinc-900/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Transform your photo into a pixel avatar in just 3 simple steps. No design skills required!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector Line (hidden on mobile, shown on desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-purple-500/50 to-cyan-500/50 z-0" />
                )}

                <div className="glass rounded-2xl p-8 text-center relative z-10 hover:scale-105 transition-transform duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-zinc-400">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-zinc-300">
            ⚡ Average generation time: <span className="font-bold gradient-text">10 seconds</span>
          </p>
        </div>
      </div>
    </section>
  );
}
