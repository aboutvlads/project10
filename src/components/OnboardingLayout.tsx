import React from 'react';
import { Plane } from 'lucide-react';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
}

export default function OnboardingLayout({ children, currentStep }: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-[#FFFCF6] flex flex-col">
      {/* Header */}
      <header className="p-6">
        <div className="flex items-center gap-2">
          <Plane className="w-8 h-8 text-[#1B4B43]" />
          <span className="text-2xl font-bold text-[#1B4B43]">Going</span>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-center gap-3">
          {[1, 2, 3, 4, 5].map((step) => (
            <React.Fragment key={step}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === currentStep
                    ? 'bg-[#1B4B43] text-white'
                    : step < currentStep
                    ? 'bg-[#1B4B43] text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step < currentStep ? '✓' : step}
              </div>
              {step < 5 && (
                <div
                  className={`w-16 h-0.5 ${
                    step < currentStep ? 'bg-[#1B4B43]' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="p-6 flex justify-between items-center text-sm text-[#1B4B43]">
        <div className="flex items-center gap-2">
          <Plane className="w-6 h-6" />
          <span className="font-bold">Going™</span>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">TERMS</a>
          <a href="#" className="hover:underline">PRIVACY</a>
          <span>© GOING 2024</span>
        </div>
      </footer>
    </div>
  );
}