/**
 * Unified Analytics Integration for SquareFaceAI
 *
 * Single module for tracking events across:
 * - Google Analytics 4 (GA4)
 * - Plausible Analytics (privacy-friendly)
 * - Microsoft Clarity (session recordings & heatmaps)
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Type declarations
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    plausible?: ((eventName: string, options?: { props?: Record<string, string | number | boolean> }) => void) & {
      q?: unknown[];
    };
    clarity?: (action: string, ...args: (string | number | string[])[]) => void;
  }
}

// ============================================================
// SERVICE AVAILABILITY CHECKS
// ============================================================

export const isGAEnabled = (): boolean => {
  return typeof window !== 'undefined' && !!GA_MEASUREMENT_ID;
};

export const isPlausibleEnabled = (): boolean => {
  return typeof window !== 'undefined' && typeof window.plausible === 'function';
};

export const isClarityEnabled = (): boolean => {
  return typeof window !== 'undefined' && typeof window.clarity === 'function';
};

// ============================================================
// INTERNAL HELPERS
// ============================================================

const trackPlausible = (eventName: string, props?: Record<string, string | number | boolean>): void => {
  if (!isPlausibleEnabled()) return;
  try {
    window.plausible?.(eventName, props ? { props } : undefined);
  } catch (error) {
    console.error('Error tracking Plausible event:', error);
  }
};

const trackClarity = (eventName: string): void => {
  if (!isClarityEnabled()) return;
  try {
    window.clarity?.('event', eventName);
  } catch (error) {
    console.error('Error tracking Clarity event:', error);
  }
};

const upgradeClarity = (reason: string): void => {
  if (!isClarityEnabled()) return;
  try {
    window.clarity?.('upgrade', reason);
  } catch (error) {
    console.error('Error upgrading Clarity session:', error);
  }
};

// ============================================================
// CORE GA TRACKING
// ============================================================

export const trackPageview = (url: string): void => {
  if (!isGAEnabled()) return;
  try {
    window.gtag?.('config', GA_MEASUREMENT_ID!, {
      page_path: url,
    });
  } catch (error) {
    console.error('Error tracking pageview:', error);
  }
};

export const trackEvent = (action: string, params?: Record<string, unknown>): void => {
  if (!isGAEnabled()) return;
  try {
    window.gtag?.('event', action, params);
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

// ============================================================
// AVATAR GENERATION EVENTS
// ============================================================

/**
 * Track avatar generation events
 */
export const trackAvatarGeneration = (params: {
  action: 'upload_started' | 'upload_completed' | 'generation_started' | 'generation_completed' | 'generation_failed';
  style?: string;
  fileSize?: number;
  processingTime?: number;
  errorMessage?: string;
}): void => {
  // GA4
  trackEvent('avatar_generation', {
    avatar_action: params.action,
    style: params.style,
    file_size: params.fileSize,
    processing_time: params.processingTime,
    error_message: params.errorMessage,
  });

  // Plausible
  if (params.action === 'upload_started') {
    trackPlausible('Upload Started');
  } else if (params.action === 'generation_completed') {
    trackPlausible('Avatar Generated', {
      style: params.style || 'default',
      processing_time: params.processingTime || 0,
    });
  } else if (params.action === 'generation_failed') {
    trackPlausible('Generation Failed');
  }

  // Clarity - upgrade session for generation events
  if (params.action === 'upload_started') {
    trackClarity('upload_started');
  } else if (params.action === 'generation_completed') {
    trackClarity('avatar_generated');
    upgradeClarity('avatar_generation_completed');
  } else if (params.action === 'generation_failed') {
    trackClarity('generation_failed');
    upgradeClarity('generation_error');
  }
};

/**
 * Track avatar download events
 */
export const trackAvatarDownload = (params: {
  format: 'png' | 'jpg' | 'svg';
  size?: number;
  style?: string;
}): void => {
  // GA4
  trackEvent('avatar_download', {
    format: params.format,
    size: params.size,
    style: params.style,
  });

  // Plausible
  trackPlausible('Avatar Downloaded', {
    format: params.format,
    size: params.size || 256,
  });

  // Clarity
  trackClarity('avatar_downloaded');
};

// ============================================================
// USER INTERACTION EVENTS
// ============================================================

/**
 * Track CTA button clicks
 */
export const trackCTAClick = (params: {
  button: string;
  location: 'hero' | 'features' | 'pricing' | 'footer' | 'header';
  variant?: string;
}): void => {
  // GA4
  trackEvent('cta_click', {
    button_name: params.button,
    location: params.location,
    variant: params.variant,
  });

  // Plausible
  trackPlausible('CTA Click', {
    button: params.button,
    location: params.location,
  });

  // Clarity
  trackClarity(`cta_${params.location}_${params.button}`);
};

/**
 * Track feature section interactions
 */
export const trackFeatureInteraction = (params: {
  feature: string;
  action: 'view' | 'click' | 'hover';
}): void => {
  // GA4
  trackEvent('feature_interaction', {
    feature_name: params.feature,
    interaction_type: params.action,
  });

  // Plausible (only track clicks to reduce noise)
  if (params.action === 'click') {
    trackPlausible('Feature Clicked', { feature: params.feature });
  }
};

// ============================================================
// PAYMENT & SUBSCRIPTION EVENTS
// ============================================================

/**
 * Track pricing page view
 */
export const trackViewPricing = (): void => {
  trackEvent('view_pricing');
  trackPlausible('View Pricing');
  trackClarity('view_pricing');
  upgradeClarity('pricing_page');
};

/**
 * Track payment/checkout events
 */
export const trackPaymentEvent = (params: {
  action: 'checkout_initiated' | 'payment_success' | 'payment_cancelled';
  plan?: 'pro' | 'team';
  amount?: number;
}): void => {
  // GA4
  trackEvent('payment_event', {
    payment_action: params.action,
    plan: params.plan,
    amount: params.amount,
  });

  // Plausible
  if (params.action === 'checkout_initiated') {
    trackPlausible('Start Checkout', { plan: params.plan || 'unknown' });
  } else if (params.action === 'payment_success') {
    trackPlausible('Purchase', {
      plan: params.plan || 'unknown',
      amount: params.amount || 0,
    });
  }

  // Clarity - upgrade session for payment events
  if (params.action === 'checkout_initiated') {
    trackClarity('start_checkout');
    upgradeClarity('checkout_started');
  } else if (params.action === 'payment_success') {
    trackClarity('complete_purchase');
    upgradeClarity('purchase_completed');
  } else if (params.action === 'payment_cancelled') {
    trackClarity('payment_cancelled');
  }
};

// ============================================================
// ENGAGEMENT EVENTS
// ============================================================

/**
 * Track scroll depth
 */
export const trackScrollDepth = (depth: 25 | 50 | 75 | 100): void => {
  trackEvent('scroll_depth', { depth_percentage: depth });

  // Only track 50% and 100% in Plausible to reduce noise
  if (depth === 50 || depth === 100) {
    trackPlausible('Scroll Depth', { depth });
  }
};

/**
 * Track time on page
 */
export const trackTimeOnPage = (seconds: number): void => {
  // Only track significant time intervals
  if (seconds >= 30) {
    trackEvent('time_on_page', { seconds });

    if (seconds >= 60) {
      trackPlausible('Engaged User', { time_seconds: seconds });
      upgradeClarity('engaged_user');
    }
  }
};

/**
 * Track social share
 */
export const trackSocialShare = (platform: 'twitter' | 'facebook' | 'linkedin' | 'copy_link'): void => {
  trackEvent('social_share', { platform });
  trackPlausible('Share', { platform });
  trackClarity(`share_${platform}`);
};

// ============================================================
// CLARITY UTILITIES
// ============================================================

/**
 * Identify user in Clarity for session tracking
 */
export const identifyUserInClarity = (userId: string): void => {
  if (!isClarityEnabled()) return;
  try {
    window.clarity?.('identify', userId);
  } catch (error) {
    console.error('Error identifying user in Clarity:', error);
  }
};

/**
 * Set custom tag in Clarity
 */
export const setClarityTag = (key: string, value: string | number | string[]): void => {
  if (!isClarityEnabled()) return;
  try {
    window.clarity?.('set', key, value);
  } catch (error) {
    console.error('Error setting Clarity tag:', error);
  }
};

// ============================================================
// ERROR TRACKING
// ============================================================

/**
 * Track errors
 */
export const trackError = (params: {
  errorType: string;
  errorMessage: string;
  componentName?: string;
}): void => {
  trackEvent('error_occurred', {
    error_type: params.errorType,
    error_message: params.errorMessage,
    component: params.componentName,
  });

  trackPlausible('Error', {
    type: params.errorType,
  });

  trackClarity('error_occurred');
  upgradeClarity(`error_${params.errorType}`);
};
