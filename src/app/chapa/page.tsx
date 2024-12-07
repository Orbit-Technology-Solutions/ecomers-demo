'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Lock, ArrowLeft, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

export default function ChapaPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { items, getTotal } = useCartStore();
  const { data } = useCheckoutStore();

  const subtotal = getTotal();
  const shipping = data.shippingMethod === 'express' ? 500 : subtotal > 5000 ? 0 : 250;
  const tax = Math.round(subtotal * 0.15);
  const total = subtotal + shipping + tax;

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/checkout/success');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-16 pb-12 px-4">
      <div className="w-full max-w-md">
        {/* Chapa Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1DBF73] to-[#15A862] px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <Link href="/checkout">
                <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowLeft size={15} className="text-white" />
                </button>
              </Link>
              <div className="flex items-center gap-2">
                <Lock size={14} className="text-white/80" />
                <span className="text-white/80 text-xs font-medium">Secured by Chapa</span>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white mb-3">
                <span className="text-[#1DBF73] font-black text-xl">Ch</span>
              </div>
              <p className="text-white/80 text-xs font-medium uppercase tracking-wider">Total Amount</p>
              <p className="text-white text-4xl font-black mt-1">{formatPrice(total)}</p>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-6 space-y-5">
            {/* Customer */}
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Payment For</p>
              <p className="font-semibold text-gray-900">{data.firstName} {data.lastName}</p>
              <p className="text-sm text-gray-500">{data.email}</p>
              <p className="text-sm text-gray-500">{data.phone}</p>
            </div>

            {/* Order Items */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Order Summary</p>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedColor.name}`} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-400">Qty {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 flex-shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 space-y-1.5">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Shipping</span><span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Tax</span><span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-900 pt-1 border-t border-gray-100">
                  <span>Total</span><span className="text-[#1DBF73]">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Pay button */}
            <motion.button
              onClick={handlePay}
              disabled={loading}
              whileHover={!loading ? { scale: 1.01 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className="w-full flex items-center justify-center gap-2 py-4 bg-[#1DBF73] hover:bg-[#15A862] text-white rounded-2xl font-bold text-base transition-colors disabled:opacity-80"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <Shield size={18} />
                  Pay with Chapa
                </>
              )}
            </motion.button>

            <p className="text-center text-[11px] text-gray-400 flex items-center justify-center gap-1">
              <Lock size={10} />
              Your payment is protected with 256-bit SSL encryption
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
