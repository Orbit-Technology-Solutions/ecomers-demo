import Link from 'next/link';
import Image from 'next/image';
import { Globe, MessageSquare, Share2, Play } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-zinc-800">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 bg-white rounded-xl overflow-hidden flex-shrink-0">
                <Image src="/logo.png" alt="Ibex Shoes" fill className="object-contain p-1" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black text-white tracking-tight">IBEX</span>
                <span className="text-[10px] font-bold text-orange-500 tracking-[0.2em] uppercase">SHOES</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Premium footwear for every step of your journey. Ethiopian-made, world-class quality.
            </p>
            <div className="flex gap-3">
              {[Globe, MessageSquare, Share2, Play].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-orange-500 flex items-center justify-center transition-colors duration-200"
                >
                  <Icon size={16} className="text-zinc-400 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-3 text-sm">
              {['Running', 'Lifestyle', 'Basketball', 'Training', 'Formal', 'New Arrivals', 'Sale'].map((item) => (
                <li key={item}>
                  <Link href="/shop" className="hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-white font-semibold mb-4">Help</h4>
            <ul className="space-y-3 text-sm">
              {['Size Guide', 'Shipping Info', 'Returns & Exchanges', 'Track Order', 'Contact Us', 'FAQ', 'Store Locator'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>Bole, Addis Ababa, Ethiopia</li>
              <li>
                <a href="tel:+251911000000" className="hover:text-white transition-colors">+251 911 000 000</a>
              </li>
              <li>
                <a href="mailto:hello@ibexshoes.et" className="hover:text-white transition-colors">hello@ibexshoes.et</a>
              </li>
              <li className="pt-2">
                <span className="text-xs text-zinc-600">Mon–Sat: 9AM – 8PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © 2025 Ibex Shoes. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
