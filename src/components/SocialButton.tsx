import React from 'react';

interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  children: React.ReactNode;
}

export default function SocialButton({ icon, children, className = '', ...props }: SocialButtonProps) {
  return (
    <button
      className={`
        h-12 px-6
        rounded-full
        border border-[#dadce0]
        flex items-center justify-center gap-3
        text-[#3c4043] font-medium text-[16px]
        hover:bg-[#f8f9fa] hover:border-[#1B1B1B]
        transition-colors
        shadow-[0_1px_3px_1px_rgba(60,64,67,0.08)]
        bg-white
        ${className}
      `}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}