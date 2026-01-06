import Stripe from 'stripe';
import { loadStripe, Stripe as StripeJS } from '@stripe/stripe-js';

// Server-side Stripe instance (lazy initialization for build compatibility)
let _stripe: Stripe | null = null;

export const getStripeServer = (): Stripe => {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover',
      typescript: true,
    });
  }
  return _stripe;
};

// Legacy export for backward compatibility (will throw at runtime if not configured)
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover',
      typescript: true,
    })
  : (null as unknown as Stripe);

// Client-side Stripe promise (singleton pattern)
let stripePromise: Promise<StripeJS | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

// Plan metadata
export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    priceId: null,
    features: {
      avatarsPerDay: 3,
      maxResolution: 256,
      watermark: true,
      commercialUse: false,
      priorityProcessing: false,
    },
  },
  pro: {
    name: 'Pro',
    price: 499, // $4.99 in cents
    priceId: process.env.STRIPE_PRICE_PRO_MONTHLY || 'price_pro_monthly',
    features: {
      avatarsPerDay: -1, // unlimited
      maxResolution: 1024,
      watermark: false,
      commercialUse: true,
      priorityProcessing: true,
    },
  },
} as const;

export type PlanType = keyof typeof PLANS;
