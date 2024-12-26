import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Clock, Share, Flame, Heart } from 'lucide-react';
import Button from '../components/Button';
import Image from 'next/image';

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
  hero_image?: string;
  flag_emoji?: string;
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
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Layout */}
      <div className="max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Left Column - Hero Image */}
          <div className="relative h-[30vh] lg:h-screen w-full">
            <Image
              src={deal.hero_image || "/default-hero.jpg"}
              alt={`${deal.destination} hero image`}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right Column - Content */}
          <div className="lg:h-screen lg:overflow-auto">
            <div className="px-4 py-6 sm:p-8 lg:p-12 space-y-6">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                      {deal.destination}
                    </h1>
                    <div className="flex items-center gap-2 mt-1 text-gray-600">
                      <span>{deal.country}</span>
                      <span>{deal.flag}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                      €{deal.price}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {formatTripType(deal.trip_type)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sample Dates */}
              {deal.sample_dates && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">Sample Dates</h2>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
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
                  <div className="bg-white rounded-xl p-2 shadow-sm">
                    <img
                      src={deal.deal_screenshot_url}
                      alt="Deal Screenshot"
                      className="w-full rounded-lg"
                    />
                  </div>
                </div>
              )}

              {/* Found By */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Found By</h2>
                <div className="flex items-center gap-3 bg-white rounded-xl p-6 shadow-sm">
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
              <div className="flex gap-2 lg:sticky lg:bottom-8">
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
