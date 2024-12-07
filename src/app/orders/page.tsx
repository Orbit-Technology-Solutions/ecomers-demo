'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Package, Truck, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const mockOrders = [
  {
    id: 'ORD-2024-001',
    date: 'June 18, 2024',
    status: 'delivered' as const,
    total: 9750,
    items: [
      { name: 'Air Velocity Pro', brand: 'Nike', size: 42, qty: 1, price: 4500, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80' },
      { name: 'Suede Classic XXI', brand: 'Puma', size: 41, qty: 2, price: 2500, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=200&q=80' },
    ],
    tracking: 'ET-123456789',
  },
  {
    id: 'ORD-2024-002',
    date: 'June 20, 2024',
    status: 'shipped' as const,
    total: 5200,
    items: [
      { name: 'Ultraboost X Flow', brand: 'Adidas', size: 43, qty: 1, price: 5200, image: 'https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?w=200&q=80' },
    ],
    tracking: 'ET-987654321',
  },
  {
    id: 'ORD-2024-003',
    date: 'June 21, 2024',
    status: 'processing' as const,
    total: 7800,
    items: [
      { name: 'Jordan Legacy 312', brand: 'Jordan', size: 44, qty: 1, price: 7800, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&q=80' },
    ],
    tracking: null,
  },
];

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-500/10 dark:text-yellow-400', icon: Clock },
  processing: { label: 'Processing', color: 'text-blue-600 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400', icon: Package },
  shipped: { label: 'Shipped', color: 'text-orange-600 bg-orange-50 dark:bg-orange-500/10 dark:text-orange-400', icon: Truck },
  delivered: { label: 'Delivered', color: 'text-green-600 bg-green-50 dark:bg-green-500/10 dark:text-green-400', icon: CheckCircle2 },
};

const STEPS = ['pending', 'processing', 'shipped', 'delivered'];

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight">Orders</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">{mockOrders.length} orders</p>
        </div>

        <div className="space-y-5">
          {mockOrders.map((order, i) => {
            const statusConfig = STATUS_CONFIG[order.status];
            const StatusIcon = statusConfig.icon;
            const stepIdx = STEPS.indexOf(order.status);

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 overflow-hidden"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-5 border-b border-zinc-100 dark:border-zinc-800 gap-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-sm font-bold text-zinc-900 dark:text-white">{order.id}</span>
                      <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig.color}`}>
                        <StatusIcon size={12} />
                        {statusConfig.label}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-zinc-900 dark:text-white">{formatPrice(order.total)}</p>
                    {order.tracking && (
                      <p className="text-xs text-zinc-400 font-mono mt-0.5">{order.tracking}</p>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center">
                    {STEPS.map((step, idx) => {
                      const StepIcon = STATUS_CONFIG[step as keyof typeof STATUS_CONFIG].icon;
                      const isComplete = idx <= stepIdx;
                      const isActive = idx === stepIdx;
                      return (
                        <div key={step} className="flex items-center flex-1 last:flex-none">
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                              isComplete
                                ? 'bg-orange-500 text-white'
                                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                            } ${isActive ? 'ring-4 ring-orange-100 dark:ring-orange-500/20' : ''}`}>
                              <StepIcon size={14} />
                            </div>
                            <span className={`text-[10px] mt-1.5 font-medium capitalize ${
                              isComplete ? 'text-orange-500' : 'text-zinc-400'
                            }`}>
                              {step}
                            </span>
                          </div>
                          {idx < STEPS.length - 1 && (
                            <div className="flex-1 h-0.5 mx-2 mb-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-orange-500 rounded-full transition-all duration-500"
                                style={{ width: idx < stepIdx ? '100%' : '0%' }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-4">
                  <div className="space-y-3">
                    {order.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-800 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-zinc-900 dark:text-white truncate">{item.name}</p>
                          <p className="text-[10px] text-zinc-400">{item.brand} · EU {item.size} · Qty {item.qty}</p>
                        </div>
                        <span className="text-sm font-semibold text-zinc-900 dark:text-white">{formatPrice(item.price)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <button className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors">
                      View Details
                    </button>
                    {order.status === 'delivered' && (
                      <button className="flex items-center gap-1.5 text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                        Buy Again <ArrowRight size={12} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {mockOrders.length === 0 && (
          <div className="text-center py-24">
            <Package size={48} className="mx-auto text-zinc-300 mb-4" />
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No orders yet</h3>
            <p className="text-zinc-500 dark:text-zinc-400 mb-6">Your order history will appear here</p>
            <Link href="/shop">
              <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold text-sm">
                Start Shopping
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
