import Link from 'next/link';
import { Twitter, Github, MessageCircle } from 'lucide-react';
import SquareFaceLogo from './SquareFaceLogo';

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <SquareFaceLogo size={36} />
              <span className="text-xl font-bold gradient-text">SquareFaceAI</span>
            </div>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed mb-6">
              Transform your photos into unique pixel avatars with AI-powered technology. Your face, pixelated perfectly.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com/squarefaceai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[var(--accent-primary)] transition-all hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/squarefaceai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[var(--accent-primary)] transition-all hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://discord.gg/squarefaceai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[var(--accent-primary)] transition-all hover:scale-110"
                aria-label="Discord"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Product</h3>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li>
                <Link href="#how-it-works" className="hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/api-docs" className="hover:text-foreground transition-colors">
                  API Docs
                </Link>
              </li>
              <li>
                <Link href="/design-system" className="hover:text-foreground transition-colors">
                  Design System
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-foreground transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Featured On Badges */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <p className="text-center text-xs text-muted-foreground uppercase tracking-wide mb-4">
            Featured On
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://fazier.com/launches/squarefaceai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img
                src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=dark"
                alt="Launched on Fazier"
                width="160"
                height="40"
              />
            </a>
            <a
              href="https://bestofweb.site/startups/squarefaceai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img
                src="https://bestofweb.site/files/press/bestofweb-logo-blue-horizontal.svg"
                alt="Featured on Best of Web"
                height="32"
                className="h-8"
              />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} SquareFaceAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
