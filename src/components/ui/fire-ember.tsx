
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { getUserData } from '@/lib/storage';

interface FireEmberProps {
  animated?: boolean;
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export function FireEmber({ 
  animated = true, 
  size = 'default',
  className
}: FireEmberProps) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const userData = getUserData();
    if (userData) {
      setCount(userData.emberPoints);
    }
    
    // Update ember count periodically
    const interval = setInterval(() => {
      const freshUserData = getUserData();
      if (freshUserData) {
        setCount(freshUserData.emberPoints);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn(
      'flex items-center gap-1 font-pixel',
      {
        'text-sm': size === 'sm',
        'text-base': size === 'default',
        'text-lg': size === 'lg',
      },
      className
    )}>
      <span 
        className={cn(
          'text-ember',
          animated ? 'fire-effect' : ''
        )}
      >
        🔥
      </span>
      <span>{count}</span>
    </div>
  );
}
