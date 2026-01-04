'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg transition-transform group-hover:scale-110" />
            <span className="text-xl font-bold gradient-text">SquareFaceAI</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#how-it-works"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#features"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="#faq"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              FAQ
            </Link>
          </div>

          {/* CTA Button */}
          <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full font-medium hover:opacity-90 transition-opacity">
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
}
