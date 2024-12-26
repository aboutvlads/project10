import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Clock, Share, Flame, Heart } from 'lucide-react';
import Button from '../components/Button';

interface Deal {
  id: string;
  destination: string;
  country: string;
  flag: string;
  departure: string;
  stops: string;
  dates: string;
  cabin_type: string;
  price: number;
  original_price: number;
  discount: number;
  departure_time: string;
  arrival_time: string;
  flight_duration: string;
  image_url: string;
  url: string;
  likes: number;
  posted_by: string;
  posted_by_avatar: string;
  posted_by_description: string;
  is_hot: boolean;
  created_at: string;
  sample_dates?: string;
  deal_screenshot_url?: string;
  trip_type: string;
}

export default function DealPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { supabase } = useAuth();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchDeal = async () => {
      try {
        if (!id) return;
        const { data, error } = await supabase
          .from('deals')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setDeal(data);
      } catch (error) {
        console.error('Error fetching deal:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeal();
  }, [id, supabase]);

  if (loading || !deal) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Format stops to show only "direct" or "X+ stop"
  const formattedStops = deal.stops?.toLowerCase() === 'direct' 
    ? 'Direct'
    : deal.stops ? `${deal.stops.replace(/[^0-9]/g, '')}+ stop` : 'Direct';

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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Hero Image */}
        <div className="relative h-[30vh] sm:h-[40vh] w-full">
          <button 
            onClick={() => navigate('/dashboard')}
            className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <img
            src={deal.image_url}
            alt={deal.destination}
            className="w-full h-full object-cover"
          />
          {deal.is_hot && (
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full flex items-center gap-1">
              <Flame className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">Hot Deal</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-4 py-6 sm:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-3xl font-bold flex items-center gap-2 mb-2">
                  {deal.destination}, {deal.country} <span className="text-2xl sm:text-4xl">{deal.flag}</span>
                </h1>
                <div className="flex flex-col text-sm sm:text-base text-gray-600 gap-1">
                  <div className="flex items-center">
                    <span className="font-medium">From:</span>
                    <span className="ml-1">{deal.departure}</span>
                    <span className="mx-2">•</span>
                    <span>{formatTripType(deal.trip_type)}</span>
                  </div>
                  <div className="flex items-center">
                    <span>{deal.dates}</span>
                    <span className="mx-2">•</span>
                    <span>{formattedStops}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl sm:text-4xl font-bold">€{deal.price}</p>
                <p className="text-sm sm:text-base text-gray-400 line-through">€{deal.original_price}</p>
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-6">
              {/* Sample Dates */}
              {deal.sample_dates && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">Sample Dates</h2>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                      {deal.sample_dates}
                    </p>
                  </div>
                </div>
              )}

              {/* Deal Screenshot */}
              {deal.deal_screenshot_url && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">Deal Screenshot</h2>
                  <img
                    src={deal.deal_screenshot_url}
                    alt="Deal Screenshot"
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
              )}

              {/* Found By */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Found By</h2>
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
                  <img
                    src={deal.posted_by_avatar}
                    alt={deal.posted_by}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{deal.posted_by}</p>
                    <p className="text-sm text-gray-600">{deal.posted_by_description}</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Heart className="w-5 h-5" />
                <span>{deal.likes} likes</span>
                <span className="mx-2">•</span>
                <span>Posted {new Date(deal.created_at).toLocaleDateString()}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <a
                  href={deal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <button className="w-full bg-[#FFE978] hover:bg-[#FFE045] text-black font-semibold py-3.5 rounded-full transition-colors">
                    Book Now
                  </button>
                </a>
                <button
                  onClick={() => {
                    navigator.share({
                      title: `Flight Deal to ${deal.destination}`,
                      text: `Check out this flight deal to ${deal.destination} for €${deal.price}!`,
                      url: window.location.href
                    }).catch(console.error);
                  }}
                  className="bg-gray-100 hover:bg-gray-200 rounded-full w-14 h-14 flex items-center justify-center transition-colors"
                >
                  <Share className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
