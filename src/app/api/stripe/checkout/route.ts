import { NextRequest, NextResponse } from 'next/server';
import { getStripeServer, PLANS, PlanType } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan, successUrl, cancelUrl } = body as {
      plan: PlanType;
      successUrl?: string;
      cancelUrl?: string;
    };

    // Validate plan
    if (!plan || !PLANS[plan]) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      );
    }

    const selectedPlan = PLANS[plan];

    // Free plan doesn't need checkout
    if (plan === 'free' || !selectedPlan.priceId) {
      return NextResponse.json(
        { error: 'Free plan does not require payment' },
        { status: 400 }
      );
    }

    // Get base URL
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://squarefaceai.com';

    // Create Stripe Checkout Session
    const stripe = getStripeServer();
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `SquareFaceAI ${selectedPlan.name} Plan`,
              description: `${selectedPlan.name} subscription for SquareFaceAI`,
              images: [`${baseUrl}/logo.svg`],
            },
            unit_amount: selectedPlan.price,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      success_url: successUrl || `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${baseUrl}/#pricing`,
      metadata: {
        plan: plan,
      },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
