'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import FilterSidebar, { type Filters } from '@/components/shop/FilterSidebar';
import ProductCard from '@/components/shop/ProductCard';
import { products } from '@/data/products';

const defaultFilters: Filters = {
  categories: [],
  genders: [],
  brands: [],
  minPrice: 0,
  maxPrice: 15000,
  minRating: 0,
};

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
];

export default function ShopPage() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sort, setSort] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];
    if (filters.categories.length) result = result.filter((p) => filters.categories.includes(p.category));
    if (filters.genders.length) result = result.filter((p) => filters.genders.includes(p.gender));
    if (filters.brands.length) result = result.filter((p) => filters.brands.includes(p.brand));
    result = result.filter((p) => p.price <= filters.maxPrice && p.rating >= filters.minRating);

    switch (sort) {
      case 'price-asc': return result.sort((a, b) => a.price - b.price);
      case 'price-desc': return result.sort((a, b) => b.price - a.price);
      case 'rating': return result.sort((a, b) => b.rating - a.rating);
      case 'newest': return result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
      default: return result;
    }
  }, [filters, sort]);

  const activeFilters = [
    ...filters.categories,
    ...filters.genders,
    ...filters.brands,
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-20">
      {/* Page header */}
      <div className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">Shop All Shoes</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
            Showing {filtered.length} of {products.length} styles
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          {/* Active filter pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-orange-400 transition-colors"
            >
              <SlidersHorizontal size={14} />
              Filters
              {activeFilters.length > 0 && (
                <span className="w-5 h-5 bg-orange-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {activeFilters.length}
                </span>
              )}
            </button>

            {activeFilters.map((f) => (
              <motion.span
                key={f}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-medium rounded-full border border-orange-200 dark:border-orange-500/20"
              >
                {f}
                <button
                  onClick={() => {
                    const key = filters.categories.includes(f) ? 'categories' :
                      filters.genders.includes(f) ? 'genders' : 'brands';
                    setFilters({ ...filters, [key]: (filters[key] as string[]).filter(v => v !== f) });
                  }}
                >
                  <X size={10} />
                </button>
              </motion.span>
            ))}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-orange-400 cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onClear={() => setFilters(defaultFilters)}
            />
          </div>

          {/* Product grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-2xl mb-2">👟</p>
                <h3 className="font-bold text-zinc-900 dark:text-white mb-1">No products found</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Try adjusting your filters</p>
                <button
                  onClick={() => setFilters(defaultFilters)}
                  className="mt-4 px-5 py-2 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-orange-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 inset-x-0 z-50 bg-white dark:bg-zinc-950 rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-zinc-900 dark:text-white text-lg">Filters</h3>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <X size={20} className="text-zinc-500" />
                </button>
              </div>
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                onClear={() => setFilters(defaultFilters)}
              />
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="mt-6 w-full py-3 bg-orange-500 text-white rounded-2xl font-semibold text-sm"
              >
                Apply Filters ({filtered.length} results)
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
