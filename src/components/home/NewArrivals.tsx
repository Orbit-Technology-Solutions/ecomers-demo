'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getNewArrivals } from '@/data/products';
import ProductCard from '@/components/shop/ProductCard';

export default function NewArrivals() {
  const products = getNewArrivals();

  return (
    <section className="py-20 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-wider mb-2">Fresh Drops</p>
            <h2 className="text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
              New Arrivals
            </h2>
          </motion.div>

          <Link href="/shop">
            <motion.button
              whileHover={{ x: 3 }}
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-orange-500 transition-colors"
            >
              View All <ArrowRight size={16} />
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
