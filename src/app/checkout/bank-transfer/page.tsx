'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Copy, CheckCircle2, Upload, Building2, ArrowLeft, AlertCircle, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import { formatPrice, generateTransactionId } from '@/lib/utils';

const BANKS = [
  {
    id: 'cbe',
    name: 'Commercial Bank of Ethiopia',
    shortName: 'CBE',
    accountNumber: '1000497823614',
    accountName: 'Ibex Shoes Ethiopia PLC',
    branch: 'Bole Branch, Addis Ababa',
    logo: '🏦',
    color: 'from-blue-700 to-blue-500',
  },
  {
    id: 'awash',
    name: 'Awash Bank',
    shortName: 'Awash',
    accountNumber: '01320145678901',
    accountName: 'Ibex Shoes Ethiopia PLC',
    branch: 'Bole Medhanealem Branch',
    logo: '🏛️',
    color: 'from-orange-700 to-orange-500',
  },
  {
    id: 'dashen',
    name: 'Dashen Bank',
    shortName: 'Dashen',
    accountNumber: '0060127839402',
    accountName: 'Ibex Shoes Ethiopia PLC',
    branch: 'Mexico Square Branch',
    logo: '🏢',
    color: 'from-green-700 to-green-500',
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-orange-50 dark:hover:bg-orange-500/10 text-zinc-500 dark:text-zinc-400 hover:text-orange-500 transition-colors text-xs font-medium"
    >
      {copied ? <CheckCircle2 size={12} className="text-green-500" /> : <Copy size={12} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

export default function BankTransferPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const { data, reset } = useCheckoutStore();

  const subtotal = getTotal();
  const shipping = data.shippingMethod === 'express' ? 500 : subtotal > 5000 ? 0 : 250;
  const tax = Math.round(subtotal * 0.15);
  const total = subtotal + shipping + tax;

  const [selectedBank, setSelectedBank] = useState(BANKS[0]);
  const [bankOpen, setBankOpen] = useState(false);
  const [txRef, setTxRef] = useState('');
  const [fileName, setFileName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!txRef.trim()) e.txRef = 'Transaction reference is required';
    else if (txRef.trim().length < 6) e.txRef = 'Reference must be at least 6 characters';
    return e;
  };

  const handleConfirm = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitting(true);
    setTimeout(() => {
      clearCart();
      reset();
      router.push('/checkout/success?method=bank-transfer');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-20 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-colors mt-6 mb-8"
        >
          <ArrowLeft size={14} /> Back to checkout
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-500/20 items-center justify-center text-3xl mb-4">
            🏧
          </div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Bank Transfer</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
            Transfer the exact amount and enter your transaction reference below
          </p>
        </div>

        {/* Amount Banner */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 mb-6 text-white text-center shadow-lg">
          <p className="text-sm font-medium opacity-90 mb-1">Amount to Transfer</p>
          <p className="text-4xl font-black tracking-tight">{formatPrice(total)}</p>
          <p className="text-xs opacity-75 mt-1">{items.length} item{items.length !== 1 ? 's' : ''} · includes 15% tax</p>
        </div>

        {/* Bank Selector */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 mb-4">
          <button
            onClick={() => setBankOpen(!bankOpen)}
            className="w-full flex items-center gap-4 p-5"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedBank.color} flex items-center justify-center text-white text-xl`}>
              {selectedBank.logo}
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-zinc-900 dark:text-white text-sm">{selectedBank.name}</p>
              <p className="text-xs text-zinc-500">Tap to change bank</p>
            </div>
            <motion.div animate={{ rotate: bankOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={16} className="text-zinc-400" />
            </motion.div>
          </button>

          <AnimatePresence>
            {bankOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-zinc-100 dark:border-zinc-800"
              >
                {BANKS.filter(b => b.id !== selectedBank.id).map(bank => (
                  <button
                    key={bank.id}
                    onClick={() => { setSelectedBank(bank); setBankOpen(false); }}
                    className="w-full flex items-center gap-4 px-5 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${bank.color} flex items-center justify-center text-white text-xl`}>
                      {bank.logo}
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-zinc-900 dark:text-white text-sm">{bank.name}</p>
                      <p className="text-xs text-zinc-500">{bank.branch}</p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bank Details */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-5 mb-4">
          <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">Account Details</h3>
          <div className="space-y-4">
            {[
              { label: 'Bank Name', value: selectedBank.name },
              { label: 'Account Name', value: selectedBank.accountName },
              { label: 'Account Number', value: selectedBank.accountNumber },
              { label: 'Branch', value: selectedBank.branch },
            ].map(row => (
              <div key={row.label} className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-0.5">{row.label}</p>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white font-mono">{row.value}</p>
                </div>
                <CopyButton text={row.value} />
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-500/10 rounded-xl flex gap-2.5">
            <AlertCircle size={14} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 dark:text-amber-300">
              Use your name or order number as the transfer description. Transfer must be completed within <strong>24 hours</strong>.
            </p>
          </div>
        </div>

        {/* Confirmation Form */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-5 mb-6">
          <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">Confirm Your Transfer</h3>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
              Transaction Reference Number *
            </label>
            <input
              type="text"
              placeholder="e.g. FT24123456789"
              value={txRef}
              onChange={e => { setTxRef(e.target.value); setErrors({}); }}
              className={`w-full px-4 py-3 rounded-xl border text-sm font-mono bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none transition-colors ${
                errors.txRef
                  ? 'border-red-400 focus:border-red-400'
                  : 'border-zinc-200 dark:border-zinc-700 focus:border-orange-400'
              }`}
            />
            {errors.txRef && (
              <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                <AlertCircle size={11} /> {errors.txRef}
              </p>
            )}
            <p className="text-[10px] text-zinc-400 mt-1.5">Found on your bank SMS receipt or app transaction history</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
              Upload Receipt (optional)
            </label>
            <label className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-700 cursor-pointer hover:border-orange-400 transition-colors">
              <Upload size={16} className="text-zinc-400" />
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {fileName || 'Click to upload screenshot or PDF'}
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*,.pdf"
                onChange={e => setFileName(e.target.files?.[0]?.name || '')}
              />
            </label>
          </div>
        </div>

        {/* Submit */}
        <motion.button
          onClick={handleConfirm}
          disabled={submitting}
          whileHover={{ scale: submitting ? 1 : 1.01 }}
          whileTap={{ scale: submitting ? 1 : 0.98 }}
          className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white rounded-2xl font-bold text-sm transition-colors flex items-center justify-center gap-3"
        >
          {submitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
              Verifying Transfer…
            </>
          ) : (
            <>
              <Building2 size={16} />
              Confirm Bank Transfer
            </>
          )}
        </motion.button>

        <p className="text-center text-xs text-zinc-400 mt-4">
          Your order will be confirmed once we verify your transfer (usually within 2–4 hours)
        </p>
      </div>
    </div>
  );
}
