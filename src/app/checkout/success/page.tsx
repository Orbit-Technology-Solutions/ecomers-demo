'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle2, ShoppingBag, ClipboardList, Download } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import { formatPrice, generateTransactionId } from '@/lib/utils';
import dynamic from 'next/dynamic';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

export default function SuccessPage() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(true);
  const [transactionId] = useState(generateTransactionId());

  const { items, getTotal, clearCart } = useCartStore();
  const { data, reset } = useCheckoutStore();
  const total = getTotal();

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    clearCart();
    reset();
  };

  const now = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center px-4 pt-16 pb-12">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={300}
          colors={['#f97316', '#22c55e', '#3b82f6', '#ec4899', '#a855f7']}
        />
      )}

      <div className="w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-xl"
        >
          {/* Success header */}
          <div className="bg-gradient-to-br from-green-400 to-emerald-500 px-8 py-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg mb-4"
            >
              <CheckCircle2 size={40} className="text-green-500" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-black text-white"
            >
              Payment Successful!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-green-100 mt-2"
            >
              Thank you, {data.firstName}! Your order is confirmed.
            </motion.p>
          </div>

          {/* Transaction details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="px-8 py-6"
          >
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-2xl p-5 space-y-3 mb-6">
              <DetailRow label="Transaction ID" value={transactionId} mono />
              <DetailRow label="Amount Paid" value={formatPrice(total)} bold />
              <DetailRow label="Date" value={now} />
              <DetailRow label="Payment Method" value="Chapa" />
              <DetailRow label="Status" value="Confirmed" green />
              <DetailRow label="Delivery" value={data.shippingMethod === 'express' ? 'Express (1–2 days)' : 'Standard (3–5 days)'} />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3">
              <Link href="/shop" onClick={handleContinue}>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-semibold text-sm transition-colors"
                >
                  <ShoppingBag size={16} />
                  Continue Shopping
                </motion.button>
              </Link>
              <Link href="/orders">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-4 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-2xl font-semibold text-sm hover:border-zinc-400 transition-colors"
                >
                  <ClipboardList size={16} />
                  View Orders
                </motion.button>
              </Link>
            </div>

            <p className="text-center text-xs text-zinc-400 dark:text-zinc-500 mt-4">
              A confirmation email has been sent to {data.email || 'your email'}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, mono, bold, green }: {
  label: string; value: string; mono?: boolean; bold?: boolean; green?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-zinc-500 dark:text-zinc-400">{label}</span>
      <span className={`text-sm ${
        mono ? 'font-mono text-zinc-700 dark:text-zinc-300' :
        bold ? 'font-bold text-zinc-900 dark:text-white' :
        green ? 'font-semibold text-green-500' :
        'text-zinc-700 dark:text-zinc-300'
      }`}>
        {value}
      </span>
    </div>
  );
}
