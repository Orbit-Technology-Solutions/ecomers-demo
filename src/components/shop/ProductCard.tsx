'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { formatPrice } from '@/lib/utils';
import StarRating from '@/components/ui/StarRating';
import type { Product } from '@/types';

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const { addItem, openCart } = useCartStore();
  const { toggle, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, product.colors[0], product.sizes[Math.floor(product.sizes.length / 2)]);
    openCart();
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggle(product.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Link href={`/product/${product.id}`}>
        <div className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-black/30 transition-all duration-300">
          {/* Image container */}
          <div className="relative aspect-square bg-zinc-50 dark:bg-zinc-800 overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.isNew && (
                <span className="px-2 py-0.5 bg-blue-500 text-white text-[10px] font-bold rounded-full">
                  NEW
                </span>
              )}
              {product.discount > 0 && (
                <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full">
                  -{product.discount}%
                </span>
              )}
            </div>

            {/* Wishlist */}
            <motion.button
              onClick={handleWishlist}
              whileTap={{ scale: 0.85 }}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white dark:bg-zinc-900 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Heart
                size={15}
                className={wishlisted ? 'fill-red-500 text-red-500' : 'text-zinc-600 dark:text-zinc-400'}
              />
            </motion.button>

            {/* Quick add overlay */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-3 inset-x-3 flex gap-2"
                >
                  <motion.button
                    onClick={handleAddToCart}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    <ShoppingCart size={14} />
                    Add to Cart
                  </motion.button>
                  <motion.button
                    onClick={(e) => e.preventDefault()}
                    className="w-10 flex items-center justify-center bg-white dark:bg-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <Eye size={14} className="text-zinc-600 dark:text-zinc-400" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Info */}
          <div className="p-4">
            <p className="text-[11px] text-orange-500 font-semibold uppercase tracking-wider mb-1">
              {product.brand}
            </p>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white leading-snug mb-2 line-clamp-2">
              {product.name}
            </h3>
            <StarRating rating={product.rating} showValue count={product.reviewCount} size={12} className="mb-3" />

            {/* Colors */}
            <div className="flex items-center gap-1.5 mb-3">
              {product.colors.slice(0, 4).map((color) => (
                <span
                  key={color.name}
                  title={color.name}
                  className="w-3.5 h-3.5 rounded-full border border-zinc-200 dark:border-zinc-700"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[10px] text-zinc-400">+{product.colors.length - 4}</span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-zinc-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.discount > 0 && (
                <span className="text-xs text-zinc-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
