'use client';
import { motion } from 'framer-motion';
import StarRating from '@/components/ui/StarRating';

const testimonials = [
  {
    name: 'Yonas Tadesse',
    location: 'Addis Ababa',
    avatar: 'YT',
    rating: 5,
    text: 'Absolutely love my Air Velocity Pros! They arrived next day, fit perfectly and are the most comfortable running shoes I\'ve ever owned. Stride is the only place I shop for shoes now.',
    initials: 'bg-orange-500',
  },
  {
    name: 'Hiwot Bekele',
    location: 'Hawassa',
    avatar: 'HB',
    rating: 5,
    text: 'The quality is unreal for the price. My Jordan Legacy 312s look and feel exactly as described. The checkout was super smooth and delivery was faster than expected. 10/10!',
    initials: 'bg-blue-500',
  },
  {
    name: 'Dawit Alemu',
    location: 'Dire Dawa',
    avatar: 'DA',
    rating: 4,
    text: 'Great selection and premium packaging. The shoes came with dust bags and everything. Customer service was super helpful when I had a size question. Will definitely order again.',
    initials: 'bg-green-500',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-wider mb-2">Reviews</p>
          <h2 className="text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            What Customers Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800 hover:shadow-lg transition-all duration-300"
            >
              <StarRating rating={t.rating} className="mb-4" />
              <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${t.initials} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
