'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, X, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useCartStore } from '@/store/useCartStore';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import StarRating from '@/components/ui/StarRating';

export default function WishlistPage() {
  const { ids, toggle } = useWishlistStore();
  const { addItem, openCart } = useCartStore();

  const wishlistProducts = products.filter(p => ids.includes(p.id));

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
              Wishlist
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          {wishlistProducts.length > 0 && (
            <Link href="/shop">
              <button className="hidden sm:flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                Continue Shopping <ArrowRight size={15} />
              </button>
            </Link>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-6"
            >
              <Heart size={36} className="text-red-300" />
            </motion.div>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Your wishlist is empty</h3>
            <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-sm">
              Save your favorite shoes here and come back when you&apos;re ready to buy.
            </p>
            <Link href="/shop">
              <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold text-sm transition-colors">
                Explore Shop
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            <AnimatePresence>
              {wishlistProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition-all duration-300"
                >
                  {/* Remove button */}
                  <button
                    onClick={() => toggle(product.id)}
                    className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white dark:bg-zinc-800 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <X size={14} className="text-zinc-600 dark:text-zinc-400 hover:text-red-500 transition-colors" />
                  </button>

                  {/* Product image */}
                  <Link href={`/product/${product.id}`}>
                    <div className="relative aspect-square bg-zinc-50 dark:bg-zinc-800 overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                      {product.discount > 0 && (
                        <span className="absolute top-3 left-3 px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full">
                          -{product.discount}%
                        </span>
                      )}
                    </div>
                  </Link>

                  <div className="p-4">
                    <p className="text-[11px] text-orange-500 font-semibold uppercase tracking-wider mb-1">{product.brand}</p>
                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-white hover:text-orange-500 transition-colors line-clamp-2 mb-2">
                        {product.name}
                      </h3>
                    </Link>
                    <StarRating rating={product.rating} size={12} className="mb-3" />
                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-bold text-zinc-900 dark:text-white">{formatPrice(product.price)}</span>
                      {product.discount > 0 && (
                        <span className="text-xs text-zinc-400 line-through">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        addItem(product, product.colors[0], product.sizes[2]);
                        openCart();
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-semibold transition-colors"
                    >
                      <ShoppingCart size={13} />
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
