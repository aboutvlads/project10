import React, { useState, useMemo } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  popular?: boolean;
}

// Popular EU airports data
const airports: Airport[] = [
  {
    code: 'LHR',
    name: 'Heathrow Airport',
    city: 'London',
    country: 'United Kingdom',
    popular: true
  },
  {
    code: 'CDG',
    name: 'Charles de Gaulle Airport',
    city: 'Paris',
    country: 'France',
    popular: true
  },
  {
    code: 'AMS',
    name: 'Amsterdam Airport Schiphol',
    city: 'Amsterdam',
    country: 'Netherlands',
    popular: true
  },
  {
    code: 'FRA',
    name: 'Frankfurt Airport',
    city: 'Frankfurt',
    country: 'Germany',
    popular: true
  },
  {
    code: 'MAD',
    name: 'Adolfo Suárez Madrid–Barajas Airport',
    city: 'Madrid',
    country: 'Spain',
    popular: true
  },
  {
    code: 'FCO',
    name: 'Leonardo da Vinci International Airport',
    city: 'Rome',
    country: 'Italy',
    popular: true
  },
  {
    code: 'MUC',
    name: 'Munich Airport',
    city: 'Munich',
    country: 'Germany',
    popular: true
  },
  {
    code: 'BCN',
    name: 'Josep Tarradellas Barcelona-El Prat Airport',
    city: 'Barcelona',
    country: 'Spain',
    popular: true
  },
  {
    code: 'DUB',
    name: 'Dublin Airport',
    city: 'Dublin',
    country: 'Ireland',
    popular: true
  },
  {
    code: 'CPH',
    name: 'Copenhagen Airport',
    city: 'Copenhagen',
    country: 'Denmark',
    popular: true
  },
  {
    code: 'VIE',
    name: 'Vienna International Airport',
    city: 'Vienna',
    country: 'Austria'
  },
  {
    code: 'WAW',
    name: 'Warsaw Chopin Airport',
    city: 'Warsaw',
    country: 'Poland'
  },
  {
    code: 'BRU',
    name: 'Brussels Airport',
    city: 'Brussels',
    country: 'Belgium'
  },
  {
    code: 'LIS',
    name: 'Humberto Delgado Airport',
    city: 'Lisbon',
    country: 'Portugal'
  },
  {
    code: 'ARN',
    name: 'Stockholm Arlanda Airport',
    city: 'Stockholm',
    country: 'Sweden'
  },
  {
    code: 'HEL',
    name: 'Helsinki-Vantaa Airport',
    city: 'Helsinki',
    country: 'Finland'
  },
  {
    code: 'OSL',
    name: 'Oslo Airport, Gardermoen',
    city: 'Oslo',
    country: 'Norway'
  },
  {
    code: 'ATH',
    name: 'Athens International Airport',
    city: 'Athens',
    country: 'Greece'
  }
];

export default function HomeAirport() {
  const navigate = useNavigate();
  const { user, supabase } = useAuth();
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredAirports = useMemo(() => {
    if (!searchQuery && !showDropdown) return [];
    
    const query = searchQuery.toLowerCase();
    return airports.filter(airport => 
      !searchQuery ? airport.popular : (
        airport.city.toLowerCase().includes(query) ||
        airport.code.toLowerCase().includes(query) ||
        airport.country.toLowerCase().includes(query) ||
        airport.name.toLowerCase().includes(query)
      )
    ).sort((a, b) => {
      // Sort by popular first, then alphabetically by city
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return a.city.localeCompare(b.city);
    });
  }, [searchQuery, showDropdown]);

  const handleAirportSelect = (airport: Airport) => {
    setSelectedAirport(airport);
    setSearchQuery('');
    setShowDropdown(false);
  };

  const handleContinue = async () => {
    if (!selectedAirport) {
      setError('Please select your home airport');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          home_airport: selectedAirport,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);

      if (updateError) {
        throw updateError;
      }

      navigate('/preferences');
    } catch (err) {
      console.error('Error updating home airport:', err);
      setError('Failed to save your home airport. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] bg-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#1B1B1B] mb-2 sm:mb-4">
          Select Your Home Airport
        </h1>
        <p className="text-sm sm:text-base text-[#757575]">
          We'll send you the best flight deals from your preferred airport
        </p>
      </div>

      <Card className="w-full max-w-[600px]">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#757575] w-5 h-5" />
              <input
                type="text"
                placeholder="Search airports or select from popular ones below..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                className="w-full h-12 pl-12 pr-8 rounded-full border-2 border-[#E5E5E5] focus:border-[#1B1B1B] outline-none transition-colors"
              />
            </div>

            {(showDropdown || searchQuery) && filteredAirports.length > 0 && (
              <div className="max-h-[300px] overflow-y-auto border rounded-lg shadow-lg">
                {!searchQuery && (
                  <div className="p-2 bg-gray-50 border-b sticky top-0">
                    <p className="text-sm font-medium text-gray-500">Popular Airports</p>
                  </div>
                )}
                {filteredAirports.map((airport) => (
                  <div
                    key={airport.code}
                    onClick={() => handleAirportSelect(airport)}
                    className="p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                  >
                    <div className="font-medium">{airport.city} ({airport.code})</div>
                    <div className="text-sm text-gray-500">{airport.name}</div>
                    <div className="text-xs text-gray-400">{airport.country}</div>
                  </div>
                ))}
              </div>
            )}

            {selectedAirport && (
              <div className="p-4 border-2 border-[#1B1B1B] rounded-lg">
                <div className="font-medium">{selectedAirport.city} ({selectedAirport.code})</div>
                <div className="text-sm text-gray-500">{selectedAirport.name}</div>
                <div className="text-xs text-gray-400">{selectedAirport.country}</div>
              </div>
            )}

            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}
          </div>

          <div className="flex justify-center mt-6">
            <Button
              variant="secondary"
              onClick={handleContinue}
              className="w-full sm:w-auto"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Continue'} {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}