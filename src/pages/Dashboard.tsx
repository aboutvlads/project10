import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DealCard from '../components/DealCard';
import { useDeals } from '../hooks/useDeals';

export default function Dashboard() {
  const navigate = useNavigate();
  const { deals, loading, error } = useDeals();
  const [sortBy] = useState('Latest');

  const handleDealSelect = (dealId: string) => {
    navigate(`/dashboard/${dealId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">Error loading deals: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Available Deals</h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Personalized flight deals based on your preferences
            </p>
          </div>
          <div className="relative">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 sm:py-1.5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-sm">
              Sort by {sortBy}
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {deals.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No deals found</h3>
            <p className="text-gray-600">
              We'll notify you when new deals matching your preferences become available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deals.map((deal) => (
              <DealCard
                key={deal.id}
                id={deal.id}
                destination={deal.destination}
                country={deal.country}
                flag={deal.flag}
                image={deal.image_url}
                price={deal.price}
                originalPrice={deal.original_price}
                discount={deal.discount}
                departure={deal.departure}
                stops={deal.stops}
                tags={[]}
                likes={deal.likes}
                isHot={deal.is_hot}
                type={deal.type}
                onSelect={() => handleDealSelect(deal.id)}
                departureTime={deal.departure_time}
                arrivalTime={deal.arrival_time}
                postedBy={deal.posted_by}
                postedByAvatar={deal.posted_by_avatar}
                postedByDescription={deal.posted_by_description}
                url={deal.url}
                created_at={deal.created_at}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
