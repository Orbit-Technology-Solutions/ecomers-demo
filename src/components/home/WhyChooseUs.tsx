'use client';
import { motion } from 'framer-motion';
import { Truck, Shield, RefreshCcw, Award } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free delivery on all orders over ETB 5,000. Fast and reliable nationwide.',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-500/10',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: 'Your payments are protected with bank-level 256-bit SSL encryption.',
    color: 'text-green-500',
    bg: 'bg-green-50 dark:bg-green-500/10',
  },
  {
    icon: RefreshCcw,
    title: 'Easy Returns',
    description: '30-day hassle-free returns. Not satisfied? We make it right.',
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-500/10',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Only authentic products from the world\'s leading shoe brands.',
    color: 'text-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-500/10',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-wider mb-2">Why Stride</p>
          <h2 className="text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            The Stride Promise
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-zinc-800 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-700 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon size={22} className={feature.color} />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
