import React from 'react';
import { ArrowRight, Plane, Zap, Timer, Link } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function HowItWorks() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Plane />,
      title: 'Cheapest flight deals',
      description: 'We find flight deals that are up to 70% - 80% off their usual prices'
    },
    {
      icon: <Zap />,
      title: 'Only the best airlines',
      description: 'We thoroughly analyze the airline ratings, service and prices before sending the deals to you'
    },
    {
      icon: <Timer />,
      title: 'Save time & money',
      description: 'Plan your itinerary and pack your bags, while we find the best flight deal for you'
    },
    {
      icon: <Link />,
      title: 'Easy booking',
      description: "You're just one click away from your dream vacation"
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-8 sm:pt-12">
      <div className="flex flex-col items-center gap-2 sm:gap-3 px-4 sm:px-8 pb-6 sm:pb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-center">
          How it works
        </h1>
        <p className="text-sm text-[#757575] text-center max-w-2xl">
          We keep a close eye on prices from your airport to destinations all over the world.
          When we find new deals, you know.
        </p>
      </div>

      {/* Steps */}
      <div className="flex flex-col sm:flex-row sm:justify-between px-4 sm:px-12 md:px-16 lg:px-24 gap-8 sm:gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center sm:flex-1">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mb-3 bg-[#F5F5F5] rounded-xl flex items-center justify-center">
              <div className="w-5 h-5 sm:w-6 sm:h-6 text-[#1B1B1B]">
                {feature.icon}
              </div>
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-1">{feature.title}</h3>
            <p className="text-xs sm:text-sm text-[#757575]">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 sm:mt-8 px-4">
        <Button
          variant="secondary"
          onClick={() => navigate('/airport-selection')}
          className="w-full sm:w-auto max-w-xs"
        >
          Continue <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}