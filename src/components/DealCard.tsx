import React from 'react';
import { Clock, Flame, Heart } from 'lucide-react';
import { getRelativeTime } from '../utils/timeUtils';

interface DealCardProps {
  id: string;
  destination: string;
  country: string;
  flag: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  departure: string;
  stops: string;
  tags: string[];
  likes: number;
  isHot: boolean;
  type: string;
  onSelect?: (id: string) => void;
  departureTime: string;
  arrivalTime: string;
  postedBy: string;
  postedByAvatar: string;
  postedByDescription: string;
  url: string;
  created_at: string;
  isPastDeal?: boolean;
  isBusinessClass?: boolean;
  trip_type: 'oneway' | 'roundtrip';
}

export default function DealCard({
  id,
  destination,
  country,
  flag,
  image,
  price,
  originalPrice,
  discount,
  departure,
  stops,
  tags,
  likes,
  isHot,
  type,
  onSelect,
  departureTime,
  arrivalTime,
  postedBy,
  postedByAvatar,
  postedByDescription,
  url,
  created_at,
  isPastDeal,
  isBusinessClass,
  trip_type = 'roundtrip'
}) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  const formattedOriginalPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(originalPrice);

  const handleClick = () => {
    if (onSelect) {
      onSelect(id);
    }
  };

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
        isPastDeal ? 'opacity-60' : ''
      }`}
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={image}
          alt={destination}
          className="w-full h-48 object-cover"
        />
        {isHot && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
            <Flame className="w-3 h-3" />
            Hot Deal
          </div>
        )}
        {isBusinessClass && (
          <div className="absolute top-2 right-2 bg-[#1B4B43] text-white px-2 py-1 rounded-md text-xs font-medium">
            Business
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-gray-900">
              {destination} {flag}
            </h3>
            <p className="text-sm text-gray-600">{country}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-[#1B4B43]">{formattedPrice}</div>
            <div className="text-sm text-gray-500 line-through">
              {formattedOriginalPrice}
            </div>
          </div>
        </div>

        <div className="space-y-1 text-sm text-gray-600 mb-3">
          <div>From: {departure}</div>
          <div className="flex items-center gap-2">
            <span className="capitalize">{trip_type}</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span>{stops}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {getRelativeTime(created_at)}
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5" />
            {likes}
          </div>
        </div>
      </div>
    </div>
  );
}