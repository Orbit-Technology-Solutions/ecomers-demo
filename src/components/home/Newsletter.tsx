'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-zinc-900 dark:bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-orange-400 text-sm font-semibold uppercase tracking-wider mb-3">Stay in the loop</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Get Exclusive Access
          </h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto">
            Subscribe for early access to new drops, exclusive discounts, and style tips delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-orange-500/50 focus:bg-white/8 transition-all"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-semibold text-sm transition-colors whitespace-nowrap"
            >
              {submitted ? (
                <>
                  <CheckCircle2 size={16} />
                  Subscribed!
                </>
              ) : (
                <>
                  Subscribe
                  <Send size={14} />
                </>
              )}
            </motion.button>
          </form>

          <p className="text-zinc-600 text-xs mt-4">
            No spam, ever. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
