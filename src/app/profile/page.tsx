'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  User, ShoppingBag, Heart, MapPin, Settings, Bell, Shield,
  ChevronRight, Camera, Mail, Phone, LogOut, Edit3, Package, Star,
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { formatPrice } from '@/lib/utils';

const MOCK_USER = {
  firstName: 'Yonas',
  lastName: 'Tadesse',
  email: 'yonas.tadesse@email.com',
  phone: '+251 911 234 567',
  city: 'Addis Ababa',
  country: 'Ethiopia',
  memberSince: 'December 2024',
  tier: 'Gold Member',
};

const MOCK_RECENT_ORDERS = [
  { id: 'ORD-2025-001', name: 'Addis Oxford', date: 'Jan 7, 2025', status: 'delivered', total: 9800 },
  { id: 'ORD-2025-002', name: 'Harar Chelsea Boot', date: 'Jan 4, 2025', status: 'shipped', total: 11500 },
  { id: 'ORD-2025-003', name: 'Gondar Monk Strap', date: 'Dec 29, 2024', status: 'delivered', total: 10500 },
];

const STATUS_COLORS: Record<string, string> = {
  delivered: 'text-green-600 bg-green-50 dark:bg-green-500/10 dark:text-green-400',
  shipped: 'text-orange-600 bg-orange-50 dark:bg-orange-500/10 dark:text-orange-400',
  processing: 'text-blue-600 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400',
  pending: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-500/10 dark:text-yellow-400',
};

const QUICK_LINKS = [
  { icon: ShoppingBag, label: 'My Orders', desc: 'Track and manage orders', href: '/orders', color: 'bg-orange-50 dark:bg-orange-500/10 text-orange-500' },
  { icon: Heart, label: 'Wishlist', desc: 'Saved items', href: '/wishlist', color: 'bg-red-50 dark:bg-red-500/10 text-red-500' },
  { icon: MapPin, label: 'Addresses', desc: 'Saved delivery locations', href: '#addresses', color: 'bg-blue-50 dark:bg-blue-500/10 text-blue-500' },
  { icon: Bell, label: 'Notifications', desc: 'Manage your alerts', href: '#', color: 'bg-purple-50 dark:bg-purple-500/10 text-purple-500' },
  { icon: Shield, label: 'Security', desc: 'Password & privacy', href: '#', color: 'bg-green-50 dark:bg-green-500/10 text-green-500' },
  { icon: Settings, label: 'Settings', desc: 'App preferences', href: '#', color: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400' },
];

export default function ProfilePage() {
  const { getItemCount } = useCartStore();
  const { ids } = useWishlistStore();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(MOCK_USER);

  const initials = `${formData.firstName[0]}${formData.lastName[0]}`;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 overflow-hidden mb-6"
        >
          {/* Banner */}
          <div className="h-24 bg-gradient-to-r from-amber-700 via-orange-600 to-amber-500" />

          {/* Avatar + Info */}
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-10 mb-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 border-4 border-white dark:border-zinc-900 flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-black text-white">{initials}</span>
                </div>
                <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-900 hover:bg-orange-600 transition-colors">
                  <Camera size={10} className="text-white" />
                </button>
              </div>
              <button
                onClick={() => setEditMode(!editMode)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-orange-400 hover:text-orange-500 transition-colors"
              >
                <Edit3 size={13} />
                {editMode ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {editMode ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">First Name</label>
                    <input
                      className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-orange-400"
                      value={formData.firstName}
                      onChange={e => setFormData(p => ({ ...p, firstName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Last Name</label>
                    <input
                      className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-orange-400"
                      value={formData.lastName}
                      onChange={e => setFormData(p => ({ ...p, lastName: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-orange-400"
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-orange-400"
                    value={formData.phone}
                    onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                  />
                </div>
                <button
                  onClick={() => setEditMode(false)}
                  className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition-colors"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div>
                <h1 className="text-xl font-black text-zinc-900 dark:text-white">
                  {formData.firstName} {formData.lastName}
                </h1>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star size={11} className="text-amber-500 fill-amber-500" />
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">{formData.tier}</span>
                  <span className="text-xs text-zinc-400 ml-1">· Since {formData.memberSince}</span>
                </div>
                <div className="flex flex-wrap gap-4 mt-3">
                  <div className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    <Mail size={13} />
                    {formData.email}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    <Phone size={13} />
                    {formData.phone}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    <MapPin size={13} />
                    {formData.city}, {formData.country}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stats Row */}
          <div className="border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-3">
            {[
              { label: 'Orders', value: MOCK_RECENT_ORDERS.length.toString(), href: '/orders' },
              { label: 'Wishlist', value: ids.length.toString(), href: '/wishlist' },
              { label: 'Loyalty Pts', value: '2,450', href: '#' },
            ].map((stat, i) => (
              <Link
                key={stat.label}
                href={stat.href}
                className={`flex flex-col items-center py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${i < 2 ? 'border-r border-zinc-100 dark:border-zinc-800' : ''}`}
              >
                <span className="text-xl font-black text-zinc-900 dark:text-white">{stat.value}</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{stat.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 divide-y divide-zinc-100 dark:divide-zinc-800 mb-6"
        >
          {QUICK_LINKS.map((link) => (
            <Link key={link.label} href={link.href}>
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${link.color}`}>
                  <link.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">{link.label}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{link.desc}</p>
                </div>
                <ChevronRight size={15} className="text-zinc-400 flex-shrink-0" />
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 overflow-hidden mb-6"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="font-bold text-zinc-900 dark:text-white">Recent Orders</h2>
            <Link href="/orders" className="text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors">
              View All
            </Link>
          </div>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {MOCK_RECENT_ORDERS.map((order) => (
              <div key={order.id} className="flex items-center gap-4 px-6 py-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <Package size={18} className="text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">{order.name}</p>
                  <p className="text-xs text-zinc-400 font-mono">{order.id} · {order.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-zinc-900 dark:text-white">{formatPrice(order.total)}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${STATUS_COLORS[order.status]}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Saved Addresses */}
        <motion.div
          id="addresses"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 overflow-hidden mb-6"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="font-bold text-zinc-900 dark:text-white">Saved Addresses</h2>
            <button className="text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors">+ Add New</button>
          </div>
          <div className="p-6 space-y-3">
            {[
              { label: 'Home', address: 'Bole Road, Near Atlas Hotel, Apt 4B', city: 'Addis Ababa', default: true },
              { label: 'Office', address: 'Meskel Square, Kirkos Sub-city', city: 'Addis Ababa', default: false },
            ].map((addr) => (
              <div key={addr.label} className={`flex items-start gap-3 p-4 rounded-2xl border-2 ${addr.default ? 'border-orange-200 dark:border-orange-500/30 bg-orange-50/50 dark:bg-orange-500/5' : 'border-zinc-100 dark:border-zinc-800'}`}>
                <MapPin size={16} className={addr.default ? 'text-orange-500' : 'text-zinc-400'} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-zinc-900 dark:text-white">{addr.label}</span>
                    {addr.default && <span className="text-[9px] font-bold text-orange-500 bg-orange-100 dark:bg-orange-500/20 px-1.5 py-0.5 rounded-full uppercase tracking-wide">Default</span>}
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{addr.address}</p>
                  <p className="text-xs text-zinc-400">{addr.city}</p>
                </div>
                <button className="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors">Edit</button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sign Out */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          whileHover={{ scale: 1.01 }}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-700 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:border-red-300 hover:text-red-500 transition-colors"
        >
          <LogOut size={15} />
          Sign Out
        </motion.button>
      </div>
    </div>
  );
}
