# CLAUDE.md - SquareFaceAI

This file provides guidance for Claude Code when working with this repository.

## Project Overview

**SquareFaceAI** - AI-powered pixel avatar generator. Transform photos into unique pixel avatars.

- **Tech Stack**: Next.js 14, TypeScript, Tailwind CSS 4, shadcn/ui, Framer Motion
- **Design**: Neumorphic style with Apple-level animations
- **Production URL**: https://squarefaceai.com

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── landing/           # Landing page sections
│   ├── providers/         # Context providers (MotionProvider)
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── motion.ts          # Apple-level animation system
│   └── utils.ts           # Utility functions
```

## Animation System

### Motion Library (`src/lib/motion.ts`)

Apple-level animation system using Spring physics.

#### Spring Configurations

| Config | Use Case | Stiffness | Damping |
|--------|----------|-----------|---------|
| `snappy` | Buttons, hover | 400 | 30 |
| `gentle` | Panels, modals | 300 | 35 |
| `bouncy` | Success feedback | 500 | 25 |
| `smooth` | Page transitions | 200 | 40 |
| `inertia` | Lists, carousels | 150 | 20 |

#### Animation Variants

**Entry Animations**:
- `fadeInUp` / `fadeInDown` - Fade with vertical movement
- `scaleIn` / `bounceScale` - Scale entrance
- `slideInLeft` / `slideInRight` - Horizontal slide

**Stagger Patterns**:
- `fastStagger` - 0.04s interval (logos)
- `staggerContainer` / `staggerItem` - 0.06s interval (lists)
- `slowStagger` - 0.1s interval (cards)

**Hover/Tap Interactions**:
- `hoverLift` - Card lift effect (scale: 1.02, y: -4)
- `subtleHoverLift` - Subtle lift (scale: 1.01, y: -2)
- `buttonPress` - Button press (hover: 1.02, tap: 0.98)
- `iconHover` - Icon interaction (scale: 1.1, rotate: 5)

**Scroll Animations**:
- `sectionReveal` - Section entrance on scroll
- `viewportConfig` - Default viewport options

#### Usage Example

```tsx
import { motion } from 'framer-motion';
import { fadeInUp, hoverLift, viewportConfig } from '@/lib/motion';

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={viewportConfig}
  variants={fadeInUp}
>
  Content
</motion.div>

<motion.div
  initial="rest"
  whileHover="hover"
  variants={hoverLift}
>
  Hoverable Card
</motion.div>
```

### Accessibility

The app uses `MotionConfig` with `reducedMotion="user"` to respect user's prefers-reduced-motion setting.

## Design System

### CSS Variables

All colors use CSS variables from `globals.css`:
- `--bg-primary`, `--bg-secondary`, `--bg-tertiary`
- `--accent-primary`, `--accent-secondary`
- `--text-primary`, `--text-secondary`
- `--color-*-from`, `--color-*-to` for gradients

### Neumorphic Shadows

```css
--neu-raised: 0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
--neu-raised-hover: 0 6px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
```

## Common Commands

```bash
# Development
npm run dev

# Build
npm run build

# Type check
npx tsc --noEmit

# Deploy (auto via Vercel Git integration)
git push origin master
```

## Landing Page Components

| Component | Animation | Key Features |
|-----------|-----------|--------------|
| Hero | `staggerContainer` + `fadeInUp` | Badge, headline, CTA buttons |
| LogoBar | `fastStagger` | Trust strip with social icons |
| FeaturesSection | `slowStagger` + `hoverLift` | Bento grid layout |
| HowItWorks | `staggerItem` | 3-step process |
| Testimonials | `slowStagger` + `hoverLift` | User testimonials |
| Pricing | `slowStagger` + `bounceScale` | Free/Pro/Team tiers |
| FAQ | `staggerContainer` | Accordion with smooth animation |
| FinalCTA | `bounceScale` + `floating` | Final call to action |

## Important Notes

- All colors must use CSS variables (no hardcoded hex)
- Prefer Spring physics over duration-based animations
- Maximum 3 simultaneous animations
- Always add `whileInView` for scroll-triggered animations
