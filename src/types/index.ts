export interface Color {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  gender: 'men' | 'women' | 'unisex' | 'kids';
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  colors: Color[];
  sizes: number[];
  images: string[];
  description: string;
  features: string[];
  isNew: boolean;
  isTrending: boolean;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: Color;
  selectedSize: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  items: CartItem[];
  total: number;
  trackingNumber?: string;
}

export interface CheckoutData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  apartment: string;
  postalCode: string;
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'chapa' | 'telebirr' | 'cbe' | 'visa' | 'mastercard';
}
