import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-[6px] text-s font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-[104px] text-center capitalize',
  {
    variants: {
      variant: {
        paid: 'bg-green-500 text-green-400 hover:bg-green-400 bg-opacity-5 py-[14px] text-green-400',
        pending:
          'bg-orange-500 text-orange-400 hover:bg-orange-400 bg-opacity-5 py-[14px] text-orange-400',
        draft:
          'bg-gray-500 text-black hover:bg-gray-400 bg-opacity-5 py-[14px] text-black dark:bg-gray-900 dark:text-white',
      },
    },
    defaultVariants: {
      variant: 'paid',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <div
        className={cn(
          'w-2.5 h-2.5 rounded-full mr-2',
          variant === 'paid'
            ? 'bg-green-500'
            : variant === 'pending'
            ? 'bg-orange-500'
            : 'bg-gray-500'
        )}
      />
      {/* Text */}
      <span>{props.children}</span>
    </div>
  );
}

export { Badge, badgeVariants };
