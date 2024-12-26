import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import RegionFilter from '../components/RegionFilter';
import DealCard from '../components/DealCard';
import { europeanAirports } from '../data/airports';
import { useNavigate } from 'react-router-dom';
import { useScrollTop } from '../hooks/useScrollTop';

export default function AirportSelection() {
  const navigate = useNavigate();
  useScrollTop();
  const [selectedRegion, setSelectedRegion] = useState('Europe');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAirports = europeanAirports.filter(airport => 
    airport.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAirportSelect = async (code: string) => {
    navigate('/home-airport');
  };

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
            {filteredAirports.map((airport, index) => (
              <DealCard
                key={index}
                destination={airport.city}
                departure={airport.code}
                stops={airport.country}
                likes={Math.floor(Math.random() * 50) + 10}
                isHot={Math.random() > 0.7}
                created_at={new Date(Date.now() - Math.random() * 86400000 * 7).toISOString()}
                flag={airport.country === 'United Kingdom' ? '🇬🇧' : 
                      airport.country === 'France' ? '🇫🇷' :
                      airport.country === 'Italy' ? '🇮🇹' :
                      airport.country === 'Portugal' ? '🇵🇹' :
                      airport.country === 'Spain' ? '🇪🇸' :
                      ''}
                isBusinessClass={false}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              variant="secondary"
              onClick={() => navigate('/home-airport')}
              className="w-full sm:w-auto"
            >
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}