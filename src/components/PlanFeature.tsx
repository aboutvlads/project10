import React from 'react';
import { Check, HelpCircle } from 'lucide-react';

interface PlanFeatureProps {
  feature: string;
  tooltip?: string;
  included?: boolean;
}

export default function PlanFeature({ feature, tooltip, included = true }: PlanFeatureProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <span className="text-[#1B4B43]">{feature}</span>
        {tooltip && (
          <HelpCircle className="w-4 h-4 text-gray-400" />
        )}
      </div>
      <Check className={`w-5 h-5 ${included ? 'text-[#1B4B43]' : 'text-gray-300'}`} />
    </div>
  );
}