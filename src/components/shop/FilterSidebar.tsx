'use client';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export interface Filters {
  categories: string[];
  genders: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
}

const CATEGORIES = ['running', 'lifestyle', 'basketball', 'training', 'formal'];
const GENDERS = ['men', 'women', 'unisex', 'kids'];
const BRANDS = ['Nike', 'Adidas', 'Jordan', 'New Balance', 'Puma', 'Reebok'];
const MAX_PRICE = 15000;

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
  onClear: () => void;
}

export default function FilterSidebar({ filters, onChange, onClear }: Props) {
  const toggle = (key: 'categories' | 'genders' | 'brands', value: string) => {
    const arr = filters[key];
    onChange({
      ...filters,
      [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
    });
  };

  const activeCount =
    filters.categories.length +
    filters.genders.length +
    filters.brands.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.maxPrice < MAX_PRICE ? 1 : 0);

  return (
    <div className="w-64 flex-shrink-0">
      <div className="sticky top-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-zinc-900 dark:text-white">
            Filters
            {activeCount > 0 && (
              <span className="ml-2 px-1.5 py-0.5 bg-orange-500 text-white text-[10px] font-bold rounded-full">
                {activeCount}
              </span>
            )}
          </h3>
          {activeCount > 0 && (
            <button
              onClick={onClear}
              className="flex items-center gap-1 text-xs text-orange-500 hover:text-orange-600 font-medium"
            >
              <X size={12} />
              Clear all
            </button>
          )}
        </div>

        <div className="space-y-6">
          {/* Category */}
          <FilterGroup title="Category">
            {CATEGORIES.map((cat) => (
              <CheckItem
                key={cat}
                label={cat.charAt(0).toUpperCase() + cat.slice(1)}
                checked={filters.categories.includes(cat)}
                onChange={() => toggle('categories', cat)}
              />
            ))}
          </FilterGroup>

          {/* Gender */}
          <FilterGroup title="Gender">
            {GENDERS.map((g) => (
              <CheckItem
                key={g}
                label={g.charAt(0).toUpperCase() + g.slice(1)}
                checked={filters.genders.includes(g)}
                onChange={() => toggle('genders', g)}
              />
            ))}
          </FilterGroup>

          {/* Brand */}
          <FilterGroup title="Brand">
            {BRANDS.map((brand) => (
              <CheckItem
                key={brand}
                label={brand}
                checked={filters.brands.includes(brand)}
                onChange={() => toggle('brands', brand)}
              />
            ))}
          </FilterGroup>

          {/* Price Range */}
          <FilterGroup title="Max Price">
            <div className="space-y-3">
              <input
                type="range"
                min={0}
                max={MAX_PRICE}
                step={500}
                value={filters.maxPrice}
                onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span>ETB 0</span>
                <span className="font-medium text-orange-500">ETB {filters.maxPrice.toLocaleString()}</span>
              </div>
            </div>
          </FilterGroup>

          {/* Rating */}
          <FilterGroup title="Min Rating">
            <div className="flex gap-1.5">
              {[0, 3, 3.5, 4, 4.5].map((r) => (
                <button
                  key={r}
                  onClick={() => onChange({ ...filters, minRating: r })}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    filters.minRating === r
                      ? 'bg-orange-500 text-white'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {r === 0 ? 'All' : `${r}+`}
                </button>
              ))}
            </div>
          </FilterGroup>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
        {title}
      </p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function CheckItem({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <div
        onClick={onChange}
        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
          checked
            ? 'bg-orange-500 border-orange-500'
            : 'border-zinc-300 dark:border-zinc-600 group-hover:border-orange-400'
        }`}
      >
        {checked && (
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
            <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className="text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
        {label}
      </span>
    </label>
  );
}
