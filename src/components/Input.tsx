import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#1B1B1B] mb-2">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 rounded-xl
          bg-white border-2 border-[#E5E5E5]
          text-[#1B1B1B] placeholder-[#757575]
          focus:outline-none focus:border-[#1B1B1B]
          transition-colors
          ${error ? 'border-[#FF4D4D]' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-[#FF4D4D]">{error}</p>
      )}
    </div>
  );
}