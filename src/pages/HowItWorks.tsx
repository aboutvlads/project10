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
    <div className="min-h-screen bg-white flex flex-col items-center pt-16 p-4">
      <div className="flex flex-col items-center gap-4 px-4 sm:px-8 pt-8 pb-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">
          How it works
        </h1>
        <p className="text-sm sm:text-base text-[#757575] text-center max-w-2xl">
          We keep a close eye on prices from your airport to destinations all over the world.
          When we find new deals, you know.
        </p>
      </div>

      {/* Steps */}
      <div className="flex flex-col sm:flex-row sm:justify-between px-4 sm:px-16 md:px-24 lg:px-32 gap-12 sm:gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center sm:flex-1">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 bg-[#F5F5F5] rounded-xl sm:rounded-2xl flex items-center justify-center">
              <div className="w-6 h-6 sm:w-8 sm:h-8 text-[#1B1B1B]">
                {feature.icon}
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm sm:text-base text-[#757575]">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
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