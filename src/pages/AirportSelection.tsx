import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import RegionFilter from '../components/RegionFilter';
import DealCard from '../components/DealCard';
import { dealsByRegion } from '../data/deals';
import { useNavigate } from 'react-router-dom';

interface DealData {
  id: string;
  city: string;
  country: string;
  flag: string;
  image: string;
  price: number;
  originalPrice: number;
  from: string;
  tripType: string;
  likes: number;
  isHot: boolean;
  type: string;
  postedBy: string;
  postedByAvatar: string;
  postedByDescription: string;
  url: string;
  created_at: string;
  isPastDeal?: boolean;
  isBusinessClass?: boolean;
}

export default function AirportSelection() {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState('Europe');
  const deals = dealsByRegion[selectedRegion] || dealsByRegion.Europe;

  // Transform deals data to match DealCard props
  const transformedDeals: DealData[] = deals.map((deal, index) => ({
    id: String(index),
    city: deal.city,
    country: deal.country,
    flag: '🇫🇷', // You should map this based on country
    image: deal.image,
    price: deal.price,
    originalPrice: deal.originalPrice,
    from: deal.from,
    tripType: deal.tripType,
    likes: Math.floor(Math.random() * 100) + 20, // Example random likes
    isHot: Math.random() > 0.7,
    type: 'Economy',
    postedBy: 'TripWingz Team',
    postedByAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tripwingz',
    postedByDescription: 'Finding the best deals for you',
    url: '#',
    created_at: new Date().toISOString(),
    isPastDeal: deal.isPastDeal,
    isBusinessClass: deal.isBusinessClass
  }));

  return (
    <div className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] bg-white">
      <div className="max-w-[1400px] mx-auto px-4 py-6 sm:py-12">
        <Card className="max-w-none">
          <div className="max-w-2xl mx-auto text-center mb-6 sm:mb-12">
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#1B1B1B] mb-2 sm:mb-4">
              Past deals members loved
            </h1>
            <p className="text-sm sm:text-base text-[#757575]">
              These deals won't be the last. And you can be the first to know.
            </p>
          </div>

          <div className="mb-4 sm:mb-6">
            <RegionFilter
              selectedRegion={selectedRegion}
              onRegionChange={setSelectedRegion}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-10">
            {transformedDeals.map((deal) => (
              <DealCard key={deal.id} {...deal} />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/onboarding')}
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              Back
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/home-airport')}
              className="w-full sm:w-auto order-1 sm:order-2"
            >
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}