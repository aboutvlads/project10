import React from 'react';

interface RegionFilterProps {
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}

const regions = [
  'Europe',
  'North America',
  'Caribbean',
  'Oceania',
  'Asia',
  'Latin America',
  'Africa',
  'Middle East'
];

export default function RegionFilter({ selectedRegion, onRegionChange }: RegionFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {regions.map((region) => (
        <button
          key={region}
          onClick={() => onRegionChange(region)}
          className={`
            px-4 py-2 rounded-full text-sm transition-all
            ${selectedRegion === region
              ? 'bg-[#1B1B1B] text-white'
              : 'bg-white text-[#1B1B1B] border-2 border-[#E5E5E5] hover:border-[#1B1B1B]'
            }
          `}
        >
          {region}
        </button>
      ))}
    </div>
  );
}