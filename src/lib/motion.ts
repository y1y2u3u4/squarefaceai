/**
 * Apple-Level Motion System for SquareFaceAI
 *
 * Philosophy: Spring physics + damping + physical inertia
 * - Natural start (not sudden)
 * - Elegant settling (not abrupt)
 * - Physical weight (like real objects)
 *
 * @see https://developer.apple.com/design/human-interface-guidelines/motion
 */

import type { Variants, Transition } from 'framer-motion';

// ============================================================================
// SPRING CONFIGURATIONS - Apple Style
// ============================================================================

/** Standard interaction - buttons, card hover */
export const snappy: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30
};

/** Gentle transition - panel expand, modal */
export const gentle: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 35
};

/** Bouncy emphasis - success feedback, key elements */
export const bouncy: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  mass: 0.8
};

/** Smooth settling - page transitions, large element moves */
export const smooth: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 40,
  mass: 1.2
};

/** Inertia slide - lists, carousels */
export const inertia: Transition = {
  type: "spring",
  stiffness: 150,
  damping: 20,
  mass: 0.5
};

// ============================================================================
// APPLE EASING CURVES (for non-Spring scenarios)
// ============================================================================

/** iOS standard curve */
export const appleEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

/** iOS popup curve */
export const appleEaseOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** iOS decelerate curve */
export const appleDecelerate: [number, number, number, number] = [0, 0, 0.2, 1];

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

/** Fade in with upward movement - Spring version */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

/** Fade in with downward movement */
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

/** Elastic scale in */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

/** Bounce scale - for emphasis */
export const bounceScale: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25,
      mass: 0.8
    }
  }
};

/** Slide in from left */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

/** Slide in from right */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

// ============================================================================
// STAGGER CONTAINERS
// ============================================================================

/** Stagger container with damping */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1
    }
  }
};

/** Stagger item - used inside staggerContainer */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 30
    }
  }
};

/** Fast stagger for lists */
export const fastStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05
    }
  }
};

/** Slow stagger for features/cards */
export const slowStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15
    }
  }
};

// ============================================================================
// HOVER & TAP VARIANTS
// ============================================================================

/** Hover lift effect - Apple Card style */
export const hoverLift: Variants = {
  rest: {
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

/** Subtle hover lift for smaller elements */
export const subtleHoverLift: Variants = {
  rest: {
    scale: 1,
    y: 0,
    transition: snappy
  },
  hover: {
    scale: 1.01,
    y: -2,
    transition: snappy
  }
};

/** Tap/press scale effect - elastic rebound */
export const tapScale: Variants = {
  rest: { scale: 1 },
  pressed: {
    scale: 0.96,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30
    }
  }
};

/** Button press with bounce back */
export const buttonPress: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: snappy
  },
  tap: {
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30
    }
  }
};

// ============================================================================
// MODAL ANIMATIONS
// ============================================================================

/** Modal overlay fade */
export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 }
  }
};

/** Modal content - elegant settling */
export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 35
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.15 }
  }
};

// ============================================================================
// PAGE TRANSITIONS
// ============================================================================

/** Page route transition */
export const pageTransition: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 40
    }
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2 }
  }
};

/** Section reveal on scroll */
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 40,
      mass: 1.2
    }
  }
};

// ============================================================================
// SPECIAL EFFECTS
// ============================================================================

/** Icon micro-interaction on hover */
export const iconHover: Variants = {
  rest: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20
    }
  }
};

/** Shake animation for errors */
export const shake: Variants = {
  rest: { x: 0 },
  shake: {
    x: [-10, 10, -10, 10, 0],
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

/** Success pulse animation */
export const successPulse: Variants = {
  rest: { scale: 1 },
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.3,
      ease: appleEaseOut
    }
  }
};

/** Floating animation for decorative elements */
export const floating: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

/** Pixel grid entrance - special for SquareFaceAI */
export const pixelGridEntrance: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      mass: 0.8
    }
  }
};

/** Card flip animation */
export const cardFlip: Variants = {
  front: { rotateY: 0 },
  back: {
    rotateY: 180,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

// ============================================================================
// VIEWPORT ANIMATION CONFIG
// ============================================================================

/** Default viewport options for scroll animations */
export const viewportConfig = {
  once: true,
  margin: "-100px",
  amount: 0.3
};

/** Viewport options for smaller elements */
export const smallViewportConfig = {
  once: true,
  margin: "-50px",
  amount: 0.5
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Create a custom spring transition
 */
export function createSpring(
  stiffness: number = 300,
  damping: number = 30,
  mass: number = 1
): Transition {
  return {
    type: "spring",
    stiffness,
    damping,
    mass
  };
}

/**
 * Create stagger children config
 */
export function createStagger(
  staggerChildren: number = 0.06,
  delayChildren: number = 0.1
): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren
      }
    }
  };
}
