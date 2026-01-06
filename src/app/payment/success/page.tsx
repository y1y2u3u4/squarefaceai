'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { fadeInUp, bounceScale } from '@/lib/motion';

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f0fdf4] via-white to-[#fdf4ff]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="w-16 h-16 border-4 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[var(--text-secondary)]">Verifying your payment...</p>
      </motion.div>
    </div>
  );
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate verification of payment
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [sessionId]);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f0fdf4] via-white to-[#fdf4ff] px-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-md w-full text-center"
      >
        {/* Success Icon */}
        <motion.div
          variants={bounceScale}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center shadow-lg">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.h1
          variants={fadeInUp}
          className="text-3xl font-bold text-[var(--text-primary)] mb-4"
        >
          Payment Successful!
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-[var(--text-secondary)] mb-8"
        >
          Thank you for upgrading to Pro! You now have access to all premium features.
        </motion.p>

        {/* Features Unlocked */}
        <motion.div
          variants={fadeInUp}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[var(--accent-primary)]" />
            <span className="font-semibold text-[var(--text-primary)]">Features Unlocked</span>
          </div>
          <ul className="text-left space-y-3 text-sm text-[var(--text-secondary)]">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Unlimited avatar generation
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Up to 1024px resolution
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              No watermark
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Priority processing
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Commercial use license
            </li>
          </ul>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/#upload-zone">
            <Button size="lg" className="gap-2">
              Start Creating
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant="outline">
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Support Info */}
        <motion.p
          variants={fadeInUp}
          className="mt-8 text-xs text-[var(--text-secondary)]"
        >
          A confirmation email has been sent to your inbox.
          <br />
          Questions? Contact <a href="mailto:support@squarefaceai.com" className="text-[var(--accent-primary)] hover:underline">support@squarefaceai.com</a>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
