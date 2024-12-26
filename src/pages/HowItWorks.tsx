import React from 'react';
import { ArrowRight, Plane, Zap, Timer, Link } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function HowItWorks() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Plane className="w-full h-full" />,
      title: 'Cheapest flight deals',
      description: 'We find flight deals that are up to 70% - 80% off their usual prices'
    },
    {
      icon: <Zap className="w-full h-full" />,
      title: 'Only the best airlines',
      description: 'We thoroughly analyze the airline ratings, service and prices before sending the deals to you'
    },
    {
      icon: <Timer className="w-full h-full" />,
      title: 'Save time & money',
      description: 'Plan your itinerary and pack your bags, while we find the best flight deal for you'
    },
    {
      icon: <Link className="w-full h-full" />,
      title: 'Easy booking',
      description: "You're just one click away from your dream vacation"
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-16 p-4">
      <div className="flex flex-col items-center px-4 sm:px-8 pt-12">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-4">
          How it works
        </h1>
        <p className="text-base sm:text-lg text-[#757575] text-center max-w-3xl mb-12">
          We keep a close eye on prices from your airport to destinations all over the world.
          When we find new deals, you know.
        </p>

        {/* Steps */}
        <div className="flex flex-col sm:flex-row sm:justify-between w-full px-4 sm:px-16 md:px-32 lg:px-48 gap-12 sm:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center sm:flex-1">
              <div className="w-20 h-20 sm:w-28 sm:h-28 mb-6 bg-[#F5F5F5] rounded-xl sm:rounded-2xl flex items-center justify-center p-5 sm:p-7">
                {feature.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-base sm:text-lg text-[#757575] max-w-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-12 mb-8">
        <Button
          variant="secondary"
          onClick={() => navigate('/airport-selection')}
          className="w-full sm:w-auto max-w-xs text-lg py-3 px-8"
        >
          Continue <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}