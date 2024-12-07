'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotal } = useCartStore();

  const subtotal = getTotal();
  const shipping = subtotal > 5000 ? 0 : 250;
  const tax = Math.round(subtotal * 0.15);
  const total = subtotal + shipping + tax;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white dark:bg-zinc-950 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-zinc-700 dark:text-zinc-300" />
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Cart ({items.length})
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <X size={18} className="text-zinc-600 dark:text-zinc-400" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 py-20">
                  <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <ShoppingBag size={32} className="text-zinc-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium">Your cart is empty</p>
                    <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">Add some shoes to get started</p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="mt-2 px-6 py-2.5 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-orange-600 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex gap-4 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900"
                      >
                        {/* Image */}
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white dark:bg-zinc-800 flex-shrink-0">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-orange-500 font-medium">{item.product.brand}</p>
                          <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                            {item.product.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className="w-3 h-3 rounded-full border border-zinc-200 dark:border-zinc-700 flex-shrink-0"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">
                              {item.selectedColor.name} · EU {item.selectedSize}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-zinc-900 dark:text-white mt-1">
                            {formatPrice(item.product.price)}
                          </p>
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col items-end justify-between">
                          <button
                            onClick={() => removeItem(item.product.id, item.selectedColor.name, item.selectedSize)}
                            className="p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-zinc-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.selectedColor.name, item.selectedSize, item.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:border-orange-400 transition-colors"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="text-sm font-medium w-4 text-center text-zinc-900 dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.selectedColor.name, item.selectedSize, item.quantity + 1)}
                              className="w-6 h-6 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:border-orange-400 transition-colors"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Summary */}
            {items.length > 0 && (
              <div className="border-t border-zinc-100 dark:border-zinc-800 px-6 py-5 space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-500' : ''}>
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400">
                    <span>Tax (15%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-zinc-900 dark:text-white pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {subtotal < 5000 && (
                  <p className="text-xs text-center text-zinc-500 dark:text-zinc-400">
                    Add {formatPrice(5000 - subtotal)} more for free shipping
                  </p>
                )}

                <Link href="/checkout" onClick={closeCart}>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-semibold text-sm transition-colors mt-2"
                  >
                    Proceed to Checkout
                    <ArrowRight size={16} />
                  </motion.button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
