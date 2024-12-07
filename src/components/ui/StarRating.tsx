import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
  showValue?: boolean;
  count?: number;
}

export default function StarRating({ rating, size = 14, className, showValue, count }: StarRatingProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={
              star <= Math.floor(rating)
                ? 'fill-amber-400 text-amber-400'
                : star - 0.5 <= rating
                ? 'fill-amber-400/50 text-amber-400'
                : 'fill-transparent text-zinc-300 dark:text-zinc-600'
            }
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          {rating.toFixed(1)}{count !== undefined ? ` (${count})` : ''}
        </span>
      )}
    </div>
  );
}
