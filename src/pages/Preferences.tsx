import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  region: string;
}

const destinations: Destination[] = [
  {
    id: 'santorini',
    name: 'Santorini',
    description: 'Greek island paradise with white-washed buildings',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&auto=format&fit=crop',
    region: 'Europe'
  },
  {
    id: 'maldives',
    name: 'Maldives',
    description: 'Luxury overwater villas and crystal-clear waters',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&auto=format&fit=crop',
    region: 'Asia'
  },
  {
    id: 'bali',
    name: 'Bali',
    description: 'Tropical paradise with rich culture and beaches',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop',
    region: 'Asia'
  },
  {
    id: 'paris',
    name: 'Paris',
    description: 'Iconic landmarks and romantic boulevards',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop',
    region: 'Europe'
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    description: 'Futuristic cityscape meets ancient temples',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop',
    region: 'Asia'
  },
  {
    id: 'nyc',
    name: 'New York City',
    description: 'Towering skyscrapers and vibrant culture',
    image: 'https://images.unsplash.com/photo-1543716091-a840c05249ec?w=800&auto=format&fit=crop',
    region: 'North America'
  },
  {
    id: 'dubai',
    name: 'Dubai',
    description: 'Desert luxury and architectural marvels',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop',
    region: 'Middle East'
  },
  {
    id: 'rome',
    name: 'Rome',
    description: 'Timeless ruins and Italian elegance',
    image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800&auto=format&fit=crop',
    region: 'Europe'
  },
  {
    id: 'capetown',
    name: 'Cape Town',
    description: 'Dramatic coastlines and mountain vistas',
    image: 'https://images.unsplash.com/photo-1641325547688-16810956c293?w=800&auto=format&fit=crop',
    region: 'Africa'
  }
];

export default function Preferences() {
  const navigate = useNavigate();
  const { user, supabase } = useAuth();
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDestinationToggle = (destinationId: string) => {
    setSelectedDestinations(prev => {
      if (prev.includes(destinationId)) {
        return prev.filter(id => id !== destinationId);
      } else {
        return [...prev, destinationId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Convert selected destination IDs to destination names and join as text
      const selectedDestinationNames = selectedDestinations
        .map(id => destinations.find(d => d.id === id)?.name || '')
        .filter(name => name !== '')
        .join(', ');

      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          bucket_list: selectedDestinationNames, // Now storing as text
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);

      if (updateError) throw updateError;

      navigate('/notifications');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to save preferences');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] bg-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#1B1B1B] mb-2 sm:mb-4">
          What's on your bucket list?
        </h1>
        <p className="text-sm sm:text-base text-[#757575]">
          Select destinations you'd love to visit and we'll notify you about great deals
        </p>
      </div>

      <Card className="w-full max-w-4xl !max-w-4xl">
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                onClick={() => handleDestinationToggle(destination.id)}
                className={`
                  relative rounded-lg sm:rounded-xl overflow-hidden cursor-pointer group transition-transform duration-300 hover:scale-[1.02]
                  ${selectedDestinations.includes(destination.id)
                    ? 'ring-2 sm:ring-4 ring-[#1B1B1B] shadow-md sm:shadow-xl'
                    : 'hover:ring-2 hover:ring-[#1B1B1B] hover:shadow-lg'
                  }
                `}
              >
                <div className="relative pb-[100%] sm:pb-[133%]">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div 
                    className={`
                      absolute inset-0 transition-opacity duration-300
                      ${selectedDestinations.includes(destination.id)
                        ? 'bg-black bg-opacity-50'
                        : 'bg-gradient-to-t from-black via-black/50 to-transparent group-hover:bg-black/50'
                      }
                    `}
                  />
                  <div className="absolute inset-0 p-2 sm:p-6 flex flex-col justify-end transform transition-transform duration-300 group-hover:translate-y-0">
                    <div className="space-y-1 sm:space-y-2">
                      <h3 className="text-white font-bold text-sm sm:text-xl leading-tight">{destination.name}</h3>
                      <p className="text-white text-xs sm:text-sm font-medium opacity-90 line-clamp-2 sm:line-clamp-none">{destination.description}</p>
                      <span className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/20 text-white text-[10px] sm:text-xs backdrop-blur-sm">
                        {destination.region}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">
              {error}
            </p>
          )}

          <div className="flex justify-center mt-6">
            <Button
              variant="secondary"
              onClick={handleSubmit}
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