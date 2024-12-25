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
}

export default function DealPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { supabase } = useAuth();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-[30vh] sm:h-[50vh] w-full">
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
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-xl sm:text-3xl font-bold flex items-center gap-2">
                {deal.destination}, {deal.country} <span>{deal.flag}</span>
              </h1>
            </div>
            <div className="space-y-1">
              <p className="text-sm sm:text-base text-gray-600">{deal.stops}</p>
              <p className="text-sm sm:text-base text-gray-600">{deal.cabin_type}</p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-2xl sm:text-3xl font-bold">€{deal.price}</p>
            <p className="text-gray-400 line-through">€{deal.original_price}</p>
            <p className="text-green-500 text-xs sm:text-sm">
              Save €{deal.original_price - deal.price} ({deal.discount}% OFF)
            </p>
          </div>
        </div>

        {/* Flight Times */}
        <div className="bg-gray-50 rounded-xl p-4 sm:p-8 mb-6 sm:mb-8">
          <div className="flex items-center justify-between">
            {/* Departure */}
            <div className="text-center flex-shrink-0">
              <p className="text-xl sm:text-3xl font-bold mb-1">{deal.departure_time}</p>
              <p className="text-sm sm:text-lg text-gray-600">{deal.departure}</p>
            </div>
            
            {/* Flight Path */}
            <div className="flex-1 mx-4 sm:mx-12 relative flex flex-col items-center">
              {/* Duration */}
              <div className="mb-2 sm:mb-4">
                <div className="bg-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-sm">
                  <span className="text-xs sm:text-sm font-medium text-gray-600">{deal.flight_duration}</span>
                </div>
              </div>
              
              {/* Line and Plane */}
              <div className="w-full relative">
                <div className="absolute w-full top-1/2 border-t-2 border-dashed border-gray-300"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 rounded-full p-1.5 sm:p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400 transform rotate-90">
                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                  </svg>
                </div>
              </div>
              
              {/* Stops */}
              <div className="mt-2 sm:mt-4">
                <div className="bg-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-sm">
                  <span className="text-xs sm:text-sm text-gray-500">{deal.stops}</span>
                </div>
              </div>
            </div>

            {/* Arrival */}
            <div className="text-center flex-shrink-0">
              <p className="text-xl sm:text-3xl font-bold mb-1">{deal.arrival_time}</p>
              <p className="text-sm sm:text-lg text-gray-600">{deal.destination}</p>
            </div>
          </div>
        </div>

        {/* Posted By */}
        <div className="mb-6 sm:mb-8">
          <p className="text-gray-600 mb-2">Posted by</p>
          <div className="flex items-center gap-3">
            <img
              src={deal.posted_by_avatar}
              alt={deal.posted_by}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{deal.posted_by}</p>
              <p className="text-sm text-gray-600">{deal.posted_by_description}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-1 text-gray-600">
            <Heart className="w-5 h-5" />
            <span>{deal.likes} likes</span>
          </div>
          <div className="text-sm text-gray-500">
            Posted {new Date(deal.created_at).toLocaleDateString()}
          </div>
        </div>

        {/* Sample Dates */}
        {deal.sample_dates && (
          <div className="mb-6 sm:mb-8">
            <p className="text-gray-600 mb-2">Sample Dates</p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm whitespace-pre-line">{deal.sample_dates}</p>
            </div>
          </div>
        )}

        {/* Deal Screenshot */}
        {deal.deal_screenshot_url && (
          <div className="mb-6 sm:mb-8">
            <p className="text-gray-600 mb-2">Deal Screenshot</p>
            <img
              src={deal.deal_screenshot_url}
              alt="Deal Screenshot"
              className="w-full rounded-lg shadow-md"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => window.open(deal.url, '_blank')}
          >
            Book Now
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              navigator.share({
                title: `Flight Deal to ${deal.destination}`,
                text: `Check out this flight deal to ${deal.destination} for €${deal.price}!`,
                url: window.location.href
              }).catch(console.error);
            }}
          >
            <Share className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
