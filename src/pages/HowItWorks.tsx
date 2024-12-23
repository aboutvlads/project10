import React from 'react';
import { ArrowRight, Headphones, Zap, Timer, Layers } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function HowItWorks() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Headphones,
      title: 'Cheapest flight deals',
      description: 'We find flight deals that are up to 70% - 80% off their usual prices'
    },
    {
      icon: Zap,
      title: 'Only the best airlines',
      description: 'We thoroughly analyze the airline ratings, service and prices before sending the deals to you'
    },
    {
      icon: Timer,
      title: 'Save time & money',
      description: 'Plan your itinerary and pack your bags, while we find the best flight deal for you'
    },
    {
      icon: Layers,
      title: 'Easy booking',
      description: "You're just one click away from your dream vacation"
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-16 p-4">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#1B1B1B] mb-2 sm:mb-4">
          How Tripwingz Works
        </h1>
        <p className="text-sm sm:text-base text-[#757575]">
          We keep a close eye on prices from your airport to destinations all over the world.
          When the price drops, you know.
        </p>
      </div>

      <Card className="w-full max-w-[1200px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-[64px] h-[64px] mb-6 bg-[#E8E8E8] rounded-2xl flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-[#1B1B1B]" />
              </div>
              <h3 className="text-[22px] font-semibold text-[#1B1B1B] mb-3">
                {feature.title}
              </h3>
              <p className="text-[16px] leading-[1.4] text-[#1B1B1B] max-w-[280px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="w-full sm:w-auto"
          >
            Back
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/airport-selection')}
            className="w-full sm:w-auto"
          >
            Continue <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
}