'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Sparkles, Shield, Zap, Heart } from 'lucide-react';

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <h1 className="text-xl font-bold gradient-text">Design System</h1>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Introduction */}
        <section className="mb-16">
          <h1 className="text-5xl font-bold mb-4">
            SquareFaceAI <span className="gradient-text">Design System</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A modern neumorphic design system built with dark-mode first approach, featuring pixel-art aesthetic with purple and cyan accents.
          </p>
        </section>

        {/* Color Palette */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card variant="raised">
              <CardContent className="pt-6">
                <div className="w-full h-24 rounded-2xl bg-[var(--accent-primary)] mb-4 shadow-[0_4px_12px_rgba(0,0,0,0.3)]" />
                <h3 className="font-semibold mb-1">Primary Purple</h3>
                <code className="text-xs text-muted-foreground">#8b5cf6</code>
              </CardContent>
            </Card>

            <Card variant="raised">
              <CardContent className="pt-6">
                <div className="w-full h-24 rounded-2xl bg-[var(--accent-secondary)] mb-4 shadow-[0_4px_12px_rgba(0,0,0,0.3)]" />
                <h3 className="font-semibold mb-1">Secondary Cyan</h3>
                <code className="text-xs text-muted-foreground">#06b6d4</code>
              </CardContent>
            </Card>

            <Card variant="raised">
              <CardContent className="pt-6">
                <div className="w-full h-24 rounded-2xl bg-background mb-4 border border-border/50" />
                <h3 className="font-semibold mb-1">Background</h3>
                <code className="text-xs text-muted-foreground">#0a0a0a</code>
              </CardContent>
            </Card>

            <Card variant="raised">
              <CardContent className="pt-6">
                <div className="w-full h-24 rounded-2xl bg-card mb-4 border border-border/50" />
                <h3 className="font-semibold mb-1">Card</h3>
                <code className="text-xs text-muted-foreground">#1a1a1a</code>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Typography</h2>
          <Card variant="raised">
            <CardContent className="space-y-4">
              <div>
                <h1 className="text-6xl font-bold mb-2">Heading 1</h1>
                <code className="text-xs text-muted-foreground">text-6xl font-bold</code>
              </div>
              <div>
                <h2 className="text-5xl font-bold mb-2">Heading 2</h2>
                <code className="text-xs text-muted-foreground">text-5xl font-bold</code>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2">Heading 3</h3>
                <code className="text-xs text-muted-foreground">text-3xl font-bold</code>
              </div>
              <div>
                <p className="text-xl mb-2">Large Body Text</p>
                <code className="text-xs text-muted-foreground">text-xl</code>
              </div>
              <div>
                <p className="text-base mb-2">Regular Body Text</p>
                <code className="text-xs text-muted-foreground">text-base</code>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Small Muted Text</p>
                <code className="text-xs text-muted-foreground">text-sm text-muted-foreground</code>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Buttons</h2>

          <div className="space-y-8">
            {/* Variants */}
            <Card variant="raised">
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>Different button styles with neumorphic shadows</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button variant="default">Default Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link Button</Button>
                </div>
              </CardContent>
            </Card>

            {/* Sizes */}
            <Card variant="raised">
              <CardHeader>
                <CardTitle>Button Sizes</CardTitle>
                <CardDescription>Small, default, and large button sizes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </CardContent>
            </Card>

            {/* Icons */}
            <Card variant="raised">
              <CardHeader>
                <CardTitle>Icon Buttons</CardTitle>
                <CardDescription>Buttons with icons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button>
                    <Sparkles className="w-4 h-4" />
                    With Icon
                  </Button>
                  <Button variant="secondary" size="icon">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon-sm">
                    <Zap className="w-4 h-4" />
                  </Button>
                  <Button variant="default" size="icon-lg">
                    <Shield className="w-6 h-6" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Cards</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card variant="raised">
              <CardHeader>
                <CardTitle>Raised Card</CardTitle>
                <CardDescription>Default elevated appearance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This card has a raised neumorphic effect with 3-layer shadows.
                </p>
              </CardContent>
            </Card>

            <Card variant="inset">
              <CardHeader>
                <CardTitle>Inset Card</CardTitle>
                <CardDescription>Recessed appearance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This card appears pressed into the surface.
                </p>
              </CardContent>
            </Card>

            <Card variant="flat">
              <CardHeader>
                <CardTitle>Flat Card</CardTitle>
                <CardDescription>Minimal shadows</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This card has minimal depth effects.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Inputs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Form Inputs</h2>

          <Card variant="raised">
            <CardHeader>
              <CardTitle>Input Fields</CardTitle>
              <CardDescription>Neumorphic input components with inset shadows</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Default Input</label>
                <Input type="text" placeholder="Enter your name..." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Input</label>
                <Input type="email" placeholder="email@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Disabled Input</label>
                <Input type="text" placeholder="Disabled" disabled />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Badges */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Badges</h2>

          <Card variant="raised">
            <CardHeader>
              <CardTitle>Badge Variants</CardTitle>
              <CardDescription>Small status indicators with gradient backgrounds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="default">
                  <Sparkles className="w-3 h-3" />
                  With Icon
                </Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Neumorphic Effects */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Neumorphic Effects</h2>

          <Card variant="raised">
            <CardHeader>
              <CardTitle>Shadow System</CardTitle>
              <CardDescription>3-layer shadow technique for depth</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Raised Effect</h3>
                <div className="p-6 rounded-3xl bg-card shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.1)]">
                  <p className="text-sm text-muted-foreground">
                    Outer shadow + top highlight + bottom dark edge
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Inset Effect</h3>
                <div className="p-6 rounded-3xl bg-card shadow-[inset_2px_2px_5px_rgba(0,0,0,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.1)]">
                  <p className="text-sm text-muted-foreground">
                    Directional inset shadows for recessed appearance
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Gradient Background</h3>
                <div className="p-6 rounded-3xl bg-gradient-to-br from-[color-mix(in_srgb,var(--accent-primary)_100%,white_10%)] to-[color-mix(in_srgb,var(--accent-secondary)_100%,white_10%)] shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.1)]">
                  <p className="text-sm text-white">
                    Color-mix with CSS variables for dynamic theming
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Design Principles */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Design Principles</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card variant="raised">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Do
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Use directional shadows (0 4px 12px)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Use CSS variables with color-mix</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Large border-radius (20px+)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>3-layer shadows for neumorphic effect</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Micro-interactions (scale on hover/active)</span>
                </div>
              </CardContent>
            </Card>

            <Card variant="raised">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  Don&apos;t
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  <span>No backdrop-blur (glassmorphism)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  <span>No glow/spread shadows (0 0 Npx)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  <span>No hardcoded colors</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  <span>Avoid small border-radius (&lt;16px)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  <span>No flat shadows without dimension</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
