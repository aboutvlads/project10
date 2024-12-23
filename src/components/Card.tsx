import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`
      bg-white rounded-2xl shadow-lg
      p-8 w-full max-w-md mx-auto
      ${className}
    `}>
      {children}
    </div>
  );
}