import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `ETB ${price.toLocaleString()}`;
}

export function generateTransactionId(): string {
  return 'TXN' + Math.random().toString(36).substring(2, 10).toUpperCase();
}
