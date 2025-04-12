
import React from 'react';
import { cn } from '@/lib/utils';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'destructive';
  size?: 'sm' | 'default' | 'lg';
  children: React.ReactNode;
}

const PixelButton = React.forwardRef<HTMLButtonElement, PixelButtonProps>(
  ({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'font-pixel inline-flex items-center justify-center whitespace-nowrap text-sm transition-all',
          'active:translate-y-1 active:scale-95',
          'disabled:opacity-50 disabled:pointer-events-none',
          'pixel-border-sm',
          {
            'bg-ember text-white hover:bg-ember-dark': variant === 'default',
            'bg-stone-light text-stone-dark hover:bg-stone': variant === 'secondary',
            'bg-lava text-white hover:bg-red-800': variant === 'destructive',
            'px-2 py-1 text-xs': size === 'sm',
            'px-4 py-2': size === 'default',
            'px-6 py-3 text-base': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PixelButton.displayName = 'PixelButton';

export { PixelButton };
