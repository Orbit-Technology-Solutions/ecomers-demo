'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, User, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/orders', label: 'Orders' },
  { href: '/profile', label: 'Profile' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { getItemCount, openCart } = useCartStore();
  const { ids } = useWishlistStore();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = pathname === '/';
  const cartCount = getItemCount();

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isHome
            ? 'bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-sm border-b border-zinc-100 dark:border-zinc-800'
            : 'bg-transparent'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <motion.div
                whileHover={{ scale: 1.04 }}
                className="relative w-9 h-9 bg-white rounded-xl overflow-hidden shadow-sm flex-shrink-0"
              >
                <Image src="/logo.png" alt="Ibex Shoes" fill className="object-contain" />
              </motion.div>
              <div className="flex flex-col leading-none">
                <span className={`text-base font-black tracking-tight transition-colors ${scrolled || !isHome ? 'text-zinc-900 dark:text-white' : 'text-white'}`}>
                  IBEX
                </span>
                <span className="text-[9px] font-bold text-orange-500 tracking-[0.2em] uppercase">SHOES</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative group ${
                    scrolled || !isHome
                      ? 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-0.5 bg-orange-500 transition-all duration-200 ${
                      pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {/* Theme Toggle */}
              {mounted && (
                <motion.button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className={`p-2.5 rounded-full transition-colors ${
                    scrolled || !isHome
                      ? 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </motion.button>
              )}

              {/* Profile */}
              <Link href="/profile">
                <motion.button
                  className={`p-2.5 rounded-full transition-colors ${
                    scrolled || !isHome
                      ? 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  <User size={18} />
                </motion.button>
              </Link>

              {/* Wishlist */}
              <Link href="/wishlist">
                <motion.button
                  className={`p-2.5 rounded-full transition-colors relative ${
                    scrolled || !isHome
                      ? 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart size={18} />
                  {ids.length > 0 && (
                    <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {ids.length}
                    </span>
                  )}
                </motion.button>
              </Link>

              {/* Cart */}
              <motion.button
                onClick={openCart}
                className={`p-2.5 rounded-full transition-colors relative ${
                  scrolled || !isHome
                    ? 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    : 'text-white/80 hover:bg-white/10'
                }`}
                whileTap={{ scale: 0.9 }}
              >
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 w-3.5 h-3.5 bg-orange-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Mobile menu */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`md:hidden p-2.5 rounded-full transition-colors ${
                  scrolled || !isHome
                    ? 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 inset-x-0 z-40 bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800 md:hidden"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
