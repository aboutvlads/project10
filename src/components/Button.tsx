import React from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'h-12 px-8 rounded-full flex items-center justify-center gap-2 font-medium text-base transition-colors',
        {
          'bg-[#1B1B1B] text-white hover:bg-[#000000]': variant === 'primary',
          'bg-[#FDF567] text-[#1B1B1B] hover:bg-[#F7EF4F]': variant === 'secondary',
          'bg-[#D6D6D6] text-[#1B1B1B] hover:bg-[#CCCCCC]': variant === 'outline',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}