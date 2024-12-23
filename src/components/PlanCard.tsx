import React from 'react';
import { Diamond } from 'lucide-react';

interface PlanCardProps {
  title: string;
  price: number;
  originalPrice: number;
  period: string;
  discount: string;
  isPopular?: boolean;
  isSelected?: boolean;
  onSelect: () => void;
}

export default function PlanCard({
  title,
  price,
  originalPrice,
  period,
  discount,
  isPopular,
  isSelected,
  onSelect
}: PlanCardProps) {
  const discountBgColor = discount.includes('20') ? 'bg-[#DCFCE7]' : 'bg-[#FFE4E6]';
  
  return (
    <button
      onClick={onSelect}
      className={`relative w-full p-6 rounded-lg border-2 transition-all ${
        isSelected ? 'border-[#1B4B43]' : 'border-gray-200'
      }`}
    >
      {isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#DCFCE7] text-[#1B4B43] text-sm font-medium rounded-full">
          MOST POPULAR
        </span>
      )}
      
      <span className={`absolute top-4 right-4 px-2 py-1 ${discountBgColor} text-sm font-medium rounded-full`}>
        {discount}
      </span>

      <div className="flex flex-col items-center mb-4">
        <Diamond className="w-8 h-8 text-[#1B4B43] mb-2" />
        <h3 className="text-xl font-bold text-[#1B4B43]">{title}</h3>
      </div>

      <div className="text-center mb-4">
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-3xl font-bold text-[#1B4B43]">${price}</span>
          <span className="text-gray-500">/{period}</span>
        </div>
        <div className="text-sm text-gray-500">
          <span>First year: </span>
          <span className="line-through">${originalPrice}</span>
          <span> ${Math.floor(price * 12)}</span>
        </div>
        <div className="text-sm text-gray-500">
          Billed annually at ${Math.floor(price * 12)}
        </div>
      </div>

      <div className={`w-full h-6 rounded-full transition-all ${
        isSelected ? 'bg-[#1B4B43]' : 'bg-gray-200'
      }`} />
    </button>
  );
}