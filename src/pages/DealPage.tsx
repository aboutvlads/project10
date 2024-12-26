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
  trip_type: 'oneway' | 'roundtrip';
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Deal not found</h2>
          <p className="text-gray-600 mb-4">The deal you're looking for doesn't exist or has expired.</p>
          <Button onClick={() => navigate('/dashboard')}>Back to Deals</Button>
        </div>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(deal.price);

  const formattedOriginalPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(deal.original_price);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Deals
        </button>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="relative">
            <img
              src={deal.image_url}
              alt={deal.destination}
              className="w-full h-64 object-cover"
            />
            {deal.is_hot && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-medium flex items-center gap-1">
                <Flame className="w-4 h-4" />
                Hot Deal
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {deal.destination} {deal.flag}
                </h1>
                <p className="text-gray-600">{deal.country}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-[#1B4B43]">{formattedPrice}</div>
                <div className="text-lg text-gray-500 line-through">
                  {formattedOriginalPrice}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <span className="font-medium">From:</span>
                  <span className="ml-2">{deal.departure}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium">Trip Type:</span>
                  <span className="ml-2 capitalize">{deal.trip_type}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium">Stops:</span>
                  <span className="ml-2">{deal.stops}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <span className="font-medium">Departure:</span>
                  <span className="ml-2">{deal.departure_time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium">Arrival:</span>
                  <span className="ml-2">{deal.arrival_time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium">Duration:</span>
                  <span className="ml-2">{deal.flight_duration}</span>
                </div>
              </div>
            </div>

            {deal.sample_dates && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Sample Dates</h3>
                <p className="text-gray-600">{deal.sample_dates}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-t pt-6">
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Posted {new Date(deal.created_at).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {deal.likes}
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.share({
                      title: `Flight Deal to ${deal.destination}`,
                      text: `Check out this flight deal to ${deal.destination} for ${formattedPrice}!`,
                      url: window.location.href,
                    }).catch(() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    });
                  }}
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button
                  onClick={() => window.open(deal.url, '_blank')}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
