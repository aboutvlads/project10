import React from 'react';

interface DividerProps {
  text?: string;
}

export default function Divider({ text }: DividerProps) {
  return (
    <div className="relative w-full my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[#E5E5E5]"></div>
      </div>
      {text && (
        <div className="relative flex justify-center">
          <span className="px-4 text-sm text-[#757575] bg-white">
            {text}
          </span>
        </div>
      )}
    </div>
  );
}