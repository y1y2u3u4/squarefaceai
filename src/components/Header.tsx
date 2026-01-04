'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Header() {
  const handleGetStarted = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-xl transition-transform group-hover:scale-110 shadow-[0_2px_8px_rgba(0,0,0,0.3)]" />
            <span className="text-xl font-bold gradient-text">SquareFaceAI</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#how-it-works"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              How It Works
            </Link>
            <Link
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Features
            </Link>
            <Link
              href="#faq"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              FAQ
            </Link>
            <Link
              href="/design-system"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Design System
            </Link>
          </div>

          {/* CTA Button */}
          <Button onClick={handleGetStarted} size="default">
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  );
}
