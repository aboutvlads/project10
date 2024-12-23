import React, { useState } from 'react';
import { Check } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Divider from '../components/Divider';

export default function Completion() {
  const [selectedPlan, setSelectedPlan] = useState<'premium' | 'elite'>('premium');

  const plans = {
    premium: {
      name: 'Premium',
      price: 4.08,
      originalPrice: 49,
      period: 'mo',
      features: ['Economy deals', 'Continental US', 'Mistake fares']
    },
    elite: {
      name: 'Elite',
      price: 16.58,
      originalPrice: 199,
      period: 'mo',
      features: ['All flight classes', 'Worldwide deals', 'Priority alerts']
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <Card className="max-w-xl">
        <h1 className="text-3xl font-bold text-[#1B1B1B] text-center mb-4">
          Try 14 days free
        </h1>
        <p className="text-[#757575] text-center mb-8">
          Cancel anytime. No commitment required.
        </p>

        <div className="grid gap-4 mb-8">
          {(['premium', 'elite'] as const).map((plan) => (
            <button
              key={plan}
              onClick={() => setSelectedPlan(plan)}
              className={`
                w-full p-6 rounded-xl border-2 text-left transition-all
                ${selectedPlan === plan
                  ? 'border-[#1B1B1B] bg-[#F8F8F8]'
                  : 'border-[#E5E5E5] hover:border-[#1B1B1B]'
                }
              `}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#1B1B1B]">
                    {plans[plan].name}
                  </h3>
                  <p className="text-[#757575]">
                    ${plans[plan].price}/{plans[plan].period}
                  </p>
                </div>
                {selectedPlan === plan && (
                  <div className="w-6 h-6 rounded-full bg-[#FFE978] flex items-center justify-center">
                    <Check className="w-4 h-4 text-[#1B1B1B]" />
                  </div>
                )}
              </div>
              <ul className="space-y-2">
                {plans[plan].features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#1B1B1B]" />
                    <span className="text-[#757575]">{feature}</span>
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        <Button variant="secondary">
          Start Free Trial
        </Button>

        <Divider text="or" />

        <Button variant="outline">
          Skip for now
        </Button>
      </Card>
    </div>
  );
}