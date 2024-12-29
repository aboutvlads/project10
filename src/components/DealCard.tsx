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
  dates: string;
  tags: string[];
  likes: number;
  isHot: boolean;
  type: string;
  trip_type: string;
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
  dates,
  tags,
  likes,
  isHot,
  type,
  trip_type,
  onSelect,
  departureTime,
  arrivalTime,
  postedBy,
  postedByAvatar,
  postedByDescription,
  url,
  created_at,
  isPastDeal,
  isBusinessClass
}: DealCardProps) {
  const discountPercent = Math.round((1 - price / originalPrice) * 100);
  
  // Format stops to show only "direct" or "X+ stop"
  const formattedStops = stops?.toLowerCase() === 'direct' 
    ? 'Direct'
    : stops ? `${stops.replace(/[^0-9]/g, '')}+ stop` : 'Direct';

  // Format trip type
  const formatTripType = (type: string) => {
    if (!type) return 'Round trip';
    switch (type.toLowerCase()) {
      case 'oneway':
        return 'One way';
      case 'roundtrip':
        return 'Round trip';
      default:
        return 'Round trip';
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02]"
      onClick={() => onSelect?.(id)}
    >
      <div className="relative">
        <img
          src={image}
          alt={`${destination}, ${country}`}
          className="w-full h-48 object-cover"
        />
        {isPastDeal && (
          <div className="absolute top-3 left-3 flex gap-2">
            <div className="px-2 py-1 sm:px-3 bg-[#1B1B1B] text-white text-xs sm:text-sm rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Past Deal</span>
            </div>
          </div>
        )}
        {isBusinessClass && (
          <span className="absolute top-3 left-3 px-2 py-1 sm:px-3 bg-[#fdf567] text-[#1B1B1B] text-xs sm:text-sm rounded-full">
            Business
          </span>
        )}
        {isHot && !isPastDeal && !isBusinessClass && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full flex items-center gap-1">
            <Flame className="w-4 h-4" />
            <span className="text-xs font-medium">Hot Deal</span>
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-[#fdf567] text-[#1B1B1B] px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-medium">
          {discountPercent}% OFF
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <div className="flex justify-between items-start mb-2 sm:mb-3">
          <div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                <h3 className="text-lg sm:text-xl font-semibold truncate">
                  {destination}, {country} <span className="text-xl sm:text-2xl">{flag}</span>
                </h3>
              </div>
              <div className="flex flex-col text-xs sm:text-sm text-gray-600">
                <span className="flex items-center">
                  <span className="font-medium">From:</span>
                  <span className="ml-1">{departure}</span>
                  <span className="mx-2">•</span>
                  <span>{formatTripType(trip_type)}</span>
                </span>
                <span className="flex items-center">
                  <span>{dates}</span>
                  <span className="mx-2">•</span>
                  <span>{formattedStops}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="text-right flex flex-col items-end">
            <p className="text-lg sm:text-xl font-bold">€{price}</p>
            <p className="text-xs sm:text-sm text-gray-400 line-through">€{originalPrice}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
          <div className="flex items-center gap-2">
            <img
              src={postedByAvatar}
              alt={postedBy}
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full"
            />
            <span className="text-gray-600 truncate max-w-[100px] sm:max-w-none">{postedBy}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{likes}</span>
          </div>
        </div>

        <div className="flex justify-end">
          <span className="text-[10px] sm:text-xs text-gray-500">
            {getRelativeTime(created_at)}
          </span>
        </div>
      </div>
    </div>
  );
}