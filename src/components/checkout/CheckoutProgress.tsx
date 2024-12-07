'use client';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const steps = [
  { id: 1, label: 'Info' },
  { id: 2, label: 'Address' },
  { id: 3, label: 'Shipping' },
  { id: 4, label: 'Payment' },
];

export default function CheckoutProgress({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-center">
          {/* Step */}
          <div className="flex flex-col items-center">
            <motion.div
              animate={{
                backgroundColor:
                  step.id < current ? '#f97316' : step.id === current ? '#f97316' : 'transparent',
                borderColor: step.id <= current ? '#f97316' : '#d4d4d8',
                scale: step.id === current ? 1.1 : 1,
              }}
              className="w-9 h-9 rounded-full border-2 flex items-center justify-center font-bold text-sm"
            >
              {step.id < current ? (
                <Check size={16} className="text-white" />
              ) : (
                <span className={step.id <= current ? 'text-white' : 'text-zinc-400 dark:text-zinc-500'}>
                  {step.id}
                </span>
              )}
            </motion.div>
            <span
              className={`text-[10px] mt-1.5 font-medium ${
                step.id <= current ? 'text-orange-500' : 'text-zinc-400 dark:text-zinc-500'
              }`}
            >
              {step.label}
            </span>
          </div>

          {/* Connector */}
          {i < steps.length - 1 && (
            <div className="w-16 sm:w-24 h-0.5 mx-2 mb-4 bg-zinc-200 dark:bg-zinc-700 relative overflow-hidden rounded-full">
              <motion.div
                className="absolute inset-y-0 left-0 bg-orange-500 rounded-full"
                animate={{ width: step.id < current ? '100%' : '0%' }}
                transition={{ duration: 0.4 }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
