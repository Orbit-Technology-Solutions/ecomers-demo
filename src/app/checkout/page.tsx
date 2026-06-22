'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Truck, Zap, CreditCard, Smartphone, Building2 } from 'lucide-react';
import CheckoutProgress from '@/components/checkout/CheckoutProgress';
import { useCartStore } from '@/store/useCartStore';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

const inputClass = "w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-orange-400 transition-colors";
const labelClass = "block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2";

const PAYMENT_METHODS = [
  { id: 'chapa', name: 'Chapa', desc: 'Ethiopia\'s payment gateway', icon: '🟢', color: 'border-green-300 bg-green-50 dark:bg-green-500/10 dark:border-green-500/30' },
  { id: 'telebirr', name: 'Telebirr', desc: 'Ethio Telecom mobile money', icon: '📱', color: 'border-blue-300 bg-blue-50 dark:bg-blue-500/10 dark:border-blue-500/30' },
  { id: 'cbe', name: 'CBE Birr', desc: 'Commercial Bank of Ethiopia', icon: '🏦', color: 'border-orange-300 bg-orange-50 dark:bg-orange-500/10 dark:border-orange-500/30' },
  { id: 'bank-transfer', name: 'Bank Transfer', desc: 'Transfer directly to our bank account', icon: '🏧', color: 'border-amber-300 bg-amber-50 dark:bg-amber-500/10 dark:border-amber-500/30' },
  { id: 'visa', name: 'Visa', desc: 'International credit card', icon: '💳', color: 'border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900' },
  { id: 'mastercard', name: 'Mastercard', desc: 'International credit card', icon: '💳', color: 'border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal } = useCartStore();
  const { step, data, nextStep, prevStep, updateData } = useCheckoutStore();

  const subtotal = getTotal();
  const shipping = data.shippingMethod === 'express' ? 500 : subtotal > 5000 ? 0 : 250;
  const tax = Math.round(subtotal * 0.15);
  const total = subtotal + shipping + tax;

  const handleNext = () => {
    if (step < 4) {
      nextStep();
    } else {
      if (data.paymentMethod === 'chapa') {
        router.push('/chapa');
      } else if (data.paymentMethod === 'bank-transfer') {
        router.push('/checkout/bank-transfer');
      } else {
        router.push('/checkout/success');
      }
    }
  };

  const stepContent = {
    1: (
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">Customer Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>First Name</label>
            <input className={inputClass} placeholder="Yonas" value={data.firstName} onChange={e => updateData({ firstName: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>Last Name</label>
            <input className={inputClass} placeholder="Tadesse" value={data.lastName} onChange={e => updateData({ lastName: e.target.value })} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Email Address</label>
          <input className={inputClass} type="email" placeholder="you@example.com" value={data.email} onChange={e => updateData({ email: e.target.value })} />
        </div>
        <div>
          <label className={labelClass}>Phone Number</label>
          <input className={inputClass} type="tel" placeholder="+251 911 000 000" value={data.phone} onChange={e => updateData({ phone: e.target.value })} />
        </div>
      </div>
    ),
    2: (
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">Shipping Address</h2>
        <div>
          <label className={labelClass}>Country</label>
          <select className={inputClass} value={data.country} onChange={e => updateData({ country: e.target.value })}>
            <option>Ethiopia</option>
            <option>Kenya</option>
            <option>Uganda</option>
            <option>Tanzania</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>City</label>
          <input className={inputClass} placeholder="Addis Ababa" value={data.city} onChange={e => updateData({ city: e.target.value })} />
        </div>
        <div>
          <label className={labelClass}>Street Address</label>
          <input className={inputClass} placeholder="Bole Road, Near Atlas Hotel" value={data.address} onChange={e => updateData({ address: e.target.value })} />
        </div>
        <div>
          <label className={labelClass}>Apartment / Suite (optional)</label>
          <input className={inputClass} placeholder="Apt 4B, Floor 3" value={data.apartment} onChange={e => updateData({ apartment: e.target.value })} />
        </div>
        <div>
          <label className={labelClass}>Postal Code</label>
          <input className={inputClass} placeholder="1000" value={data.postalCode} onChange={e => updateData({ postalCode: e.target.value })} />
        </div>
      </div>
    ),
    3: (
      <div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">Shipping Method</h2>
        <div className="space-y-3">
          {[
            { id: 'standard', label: 'Standard Delivery', desc: '3–5 business days', price: subtotal > 5000 ? 'FREE' : 'ETB 250', icon: Truck },
            { id: 'express', label: 'Express Delivery', desc: '1–2 business days', price: 'ETB 500', icon: Zap },
          ].map((opt) => (
            <motion.button
              key={opt.id}
              onClick={() => updateData({ shippingMethod: opt.id as 'standard' | 'express' })}
              whileTap={{ scale: 0.99 }}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                data.shippingMethod === opt.id
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-500/10'
                  : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                data.shippingMethod === opt.id ? 'bg-orange-500' : 'bg-zinc-100 dark:bg-zinc-800'
              }`}>
                <opt.icon size={18} className={data.shippingMethod === opt.id ? 'text-white' : 'text-zinc-500'} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-zinc-900 dark:text-white text-sm">{opt.label}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{opt.desc}</p>
              </div>
              <span className={`font-bold text-sm ${opt.price === 'FREE' ? 'text-green-500' : 'text-zinc-900 dark:text-white'}`}>
                {opt.price}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    ),
    4: (
      <div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">Payment Method</h2>
        <div className="grid grid-cols-1 gap-3">
          {PAYMENT_METHODS.map((pm) => (
            <motion.button
              key={pm.id}
              onClick={() => updateData({ paymentMethod: pm.id as any })}
              whileTap={{ scale: 0.99 }}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                data.paymentMethod === pm.id
                  ? `border-orange-500 bg-orange-50 dark:bg-orange-500/10`
                  : `border-zinc-200 dark:border-zinc-700 hover:border-zinc-300`
              }`}
            >
              <span className="text-2xl">{pm.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-zinc-900 dark:text-white text-sm">{pm.name}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{pm.desc}</p>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                data.paymentMethod === pm.id ? 'border-orange-500' : 'border-zinc-300 dark:border-zinc-600'
              }`}>
                {data.paymentMethod === pm.id && (
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 pt-4">
          <Link href="/shop">
            <button className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:border-orange-400 transition-colors">
              <ArrowLeft size={16} className="text-zinc-600 dark:text-zinc-400" />
            </button>
          </Link>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Checkout</h1>
        </div>

        <CheckoutProgress current={step} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  {stepContent[step as keyof typeof stepContent]}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex gap-3 mt-8">
                {step > 1 && (
                  <button
                    onClick={prevStep}
                    className="flex items-center gap-2 px-5 py-3 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 transition-colors"
                  >
                    <ArrowLeft size={15} />
                    Back
                  </button>
                )}
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-semibold text-sm transition-colors"
                >
                  {step === 4
                    ? `Pay ${formatPrice(total)}`
                    : `Continue`}
                  <ArrowRight size={15} />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 p-6 sticky top-24">
              <h3 className="font-bold text-zinc-900 dark:text-white mb-5">Order Summary</h3>

              <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`} className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-800 flex-shrink-0">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="56px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-zinc-900 dark:text-white truncate">{item.product.name}</p>
                      <p className="text-[10px] text-zinc-400">EU {item.selectedSize} · {item.selectedColor.name} · Qty {item.quantity}</p>
                    </div>
                    <span className="text-xs font-semibold text-zinc-900 dark:text-white flex-shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 space-y-2.5">
                <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400">
                  <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-500' : ''}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400">
                  <span>Tax (15%)</span><span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-zinc-900 dark:text-white pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <span>Total</span><span className="text-orange-500">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
