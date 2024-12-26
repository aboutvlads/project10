import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DealCard from '../components/DealCard';
import { useDeals } from '../hooks/useDeals';
import { airports } from './HomeAirport';

export default function Dashboard() {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const { deals, loading, error } = useDeals(selectedCity);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredAirports = useMemo(() => {
    if (!searchQuery) return airports;
    const query = searchQuery.toLowerCase();
    return airports.filter(
      airport => 
        airport.city.toLowerCase().includes(query) ||
        airport.code.toLowerCase().includes(query) ||
        airport.country.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDealSelect = (dealId: string) => {
    navigate(`/dashboard/${dealId}`);
  };

  const handleCitySelect = (airport: typeof airports[0] | null) => {
    setSelectedCity(airport ? `${airport.code}, ${airport.city}` : null);
    setSearchQuery('');
    setShowDropdown(false);
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
              {selectedCity 
                ? `Showing deals from ${selectedCity}`
                : `Showing all deals, prioritizing deals from ${userProfile?.home_airport?.city || 'your home city'}`}
            </p>
          </div>
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search departure city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                className="w-full sm:w-64 h-10 pl-12 pr-4 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors"
              />
              {(showDropdown || searchQuery) && (
                <div 
                  ref={dropdownRef}
                  className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto"
                >
                  <div 
                    className="p-2 hover:bg-gray-50 cursor-pointer border-b"
                    onClick={() => handleCitySelect(null)}
                  >
                    Show all cities
                  </div>
                  {filteredAirports.map((airport, index) => (
                    <div
                      key={airport.code}
                      className="p-2 hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleCitySelect(airport)}
                    >
                      <div className="font-medium">{airport.city}, {airport.country}</div>
                      <div className="text-sm text-gray-500">{airport.code} - {airport.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {deals.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No deals found</h3>
            <p className="text-gray-600">
              {selectedCity 
                ? `No deals available from ${selectedCity} at the moment.`
                : "We'll notify you when new deals matching your preferences become available."}
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
                dates={deal.dates}
                tags={[]}
                likes={deal.likes}
                isHot={deal.is_hot}
                type={deal.type}
                trip_type={deal.trip_type}
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
