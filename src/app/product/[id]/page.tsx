'use client';
import { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Zap, Plus, Minus, ChevronDown, ChevronUp, ArrowLeft, Check } from 'lucide-react';
import { getProductById, getRelatedProducts } from '@/data/products';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { formatPrice } from '@/lib/utils';
import StarRating from '@/components/ui/StarRating';
import ProductCard from '@/components/shop/ProductCard';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id);

  if (!product) return notFound();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('description');
  const [added, setAdded] = useState(false);

  const { addItem, openCart } = useCartStore();
  const { toggle, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);
  const related = getRelatedProducts(id, 4);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem(product, selectedColor, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    openCart();
  };

  const accordions = [
    {
      id: 'description',
      title: 'Description',
      content: product.description,
    },
    {
      id: 'features',
      title: 'Features',
      content: (
        <ul className="space-y-2">
          {product.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'shipping',
      title: 'Shipping & Delivery',
      content: 'Standard delivery takes 3–5 business days (ETB 250). Express delivery is 1–2 business days (ETB 500). Free standard shipping on orders over ETB 5,000. We deliver nationwide across Ethiopia.',
    },
    {
      id: 'returns',
      title: 'Return Policy',
      content: 'We offer 30-day hassle-free returns on all unworn items in original packaging. Simply contact our support team, and we will arrange a free pickup and full refund.',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-8">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* LEFT: Gallery */}
          <div className="space-y-4">
            {/* Main image */}
            <motion.div
              className="relative aspect-square rounded-3xl overflow-hidden bg-zinc-50 dark:bg-zinc-900"
              layoutId={`product-image-${product.id}`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Discount badge */}
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                  -{product.discount}%
                </div>
              )}
            </motion.div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImage === i
                      ? 'border-orange-500 shadow-md'
                      : 'border-transparent hover:border-zinc-300 dark:hover:border-zinc-600'
                  }`}
                >
                  <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Info */}
          <div className="lg:pt-2">
            {/* Brand & badges */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-bold text-orange-500 uppercase tracking-wide">{product.brand}</span>
              {product.isNew && (
                <span className="px-2 py-0.5 bg-blue-500 text-white text-[10px] font-bold rounded-full">NEW</span>
              )}
            </div>

            <h1 className="text-3xl lg:text-4xl font-black text-zinc-900 dark:text-white tracking-tight mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <StarRating rating={product.rating} showValue count={product.reviewCount} size={16} />
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {product.reviewCount} reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-7">
              <span className="text-3xl font-black text-zinc-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.discount > 0 && (
                <>
                  <span className="text-xl text-zinc-400 line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="px-2 py-0.5 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-semibold rounded-full">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Color */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Color: <span className="font-normal text-zinc-600 dark:text-zinc-400">{selectedColor.name}</span>
                </p>
              </div>
              <div className="flex gap-2.5">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor.name === color.name
                        ? 'border-orange-500 scale-110 shadow-md'
                        : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-400'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-7">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">Size (EU)</p>
                <button className="text-xs text-orange-500 hover:text-orange-600 font-medium">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-xl border text-sm font-semibold transition-all ${
                      selectedSize === size
                        ? 'border-orange-500 bg-orange-500 text-white shadow-md'
                        : 'border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-orange-400 hover:text-orange-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">Please select a size to continue</p>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-7">
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">Qty</p>
              <div className="flex items-center gap-3 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus size={14} className="text-zinc-600 dark:text-zinc-400" />
                </button>
                <span className="w-6 text-center text-sm font-bold text-zinc-900 dark:text-white">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>
                  <Plus size={14} className="text-zinc-600 dark:text-zinc-400" />
                </button>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <motion.button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                whileHover={selectedSize ? { scale: 1.01 } : {}}
                whileTap={selectedSize ? { scale: 0.98 } : {}}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-sm transition-colors ${
                  selectedSize
                    ? added
                      ? 'bg-green-500 text-white'
                      : 'bg-orange-500 hover:bg-orange-600 text-white'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
                }`}
              >
                {added ? <Check size={18} /> : <ShoppingCart size={18} />}
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </motion.button>

              <Link href="/checkout" className="flex-1">
                <motion.button
                  disabled={!selectedSize}
                  whileHover={selectedSize ? { scale: 1.01 } : {}}
                  whileTap={selectedSize ? { scale: 0.98 } : {}}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-sm transition-colors ${
                    selectedSize
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-100'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
                  }`}
                >
                  <Zap size={16} />
                  Buy Now
                </motion.button>
              </Link>

              <motion.button
                onClick={() => toggle(product.id)}
                whileTap={{ scale: 0.85 }}
                className="w-14 flex items-center justify-center rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:border-red-300 transition-colors"
              >
                <Heart
                  size={18}
                  className={wishlisted ? 'fill-red-500 text-red-500' : 'text-zinc-500 dark:text-zinc-400'}
                />
              </motion.button>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {['Free Returns', 'Authentic', 'Fast Delivery'].map((label) => (
                <div key={label} className="flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-900 rounded-xl p-2.5">
                  <Check size={12} className="text-green-500 flex-shrink-0" />
                  <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">{label}</span>
                </div>
              ))}
            </div>

            {/* Accordion */}
            <div className="border-t border-zinc-100 dark:border-zinc-800 space-y-0">
              {accordions.map((acc) => (
                <div key={acc.id} className="border-b border-zinc-100 dark:border-zinc-800">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
                    className="flex items-center justify-between w-full py-4 text-left"
                  >
                    <span className="text-sm font-semibold text-zinc-900 dark:text-white">{acc.title}</span>
                    {openAccordion === acc.id ? (
                      <ChevronUp size={16} className="text-zinc-400" />
                    ) : (
                      <ChevronDown size={16} className="text-zinc-400" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openAccordion === acc.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {typeof acc.content === 'string' ? <p>{acc.content}</p> : acc.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
