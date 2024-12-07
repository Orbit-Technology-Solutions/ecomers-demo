'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getTrendingProducts } from '@/data/products';
import ProductCard from '@/components/shop/ProductCard';

export default function TrendingProducts() {
  const products = getTrendingProducts();
  const [page, setPage] = useState(0);
  const perPage = 4;
  const totalPages = Math.ceil(products.length / perPage);
  const visible = products.slice(page * perPage, page * perPage + perPage);

  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-wider mb-2">Hot Right Now</p>
            <h2 className="text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
              Trending
            </h2>
          </motion.div>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:border-orange-400 hover:text-orange-500 transition-colors disabled:opacity-30"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                disabled={page === totalPages - 1}
                className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:border-orange-400 hover:text-orange-500 transition-colors disabled:opacity-30"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        <motion.div
          key={page}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
