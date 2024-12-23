export interface Deal {
  image: string;
  city: string;
  country: string;
  price: number;
  originalPrice: number;
  from: string;
  tripType: string;
  isPastDeal?: boolean;
  isBusinessClass?: boolean;
}

export const dealsByRegion: Record<string, Deal[]> = {
  Europe: [
    {
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a',
      city: 'Paris',
      country: 'France',
      price: 457,
      originalPrice: 1050,
      from: 'From Washington DC (IAD)',
      tripType: 'Roundtrip • Nonstop',
      isPastDeal: true
    },
    {
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
      city: 'London',
      country: 'United Kingdom',
      price: 498,
      originalPrice: 950,
      from: 'From Chicago (ORD)',
      tripType: 'Roundtrip • Nonstop',
      isPastDeal: true
    },
    {
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
      city: 'Rome',
      country: 'Italy',
      price: 469,
      originalPrice: 850,
      from: 'From Miami (MIA)',
      tripType: 'Roundtrip • 1-stop',
      isPastDeal: true
    },
    {
      image: 'https://images.unsplash.com/photo-1548707309-dcebeab9ea9b',
      city: 'Lisbon',
      country: 'Portugal',
      price: 1240,
      originalPrice: 4500,
      from: 'From Los Angeles (LAX)',
      tripType: 'Roundtrip • Business',
      isPastDeal: true,
      isBusinessClass: true
    }
  ],
  'North America': [
    {
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
      city: 'New York',
      country: 'USA',
      price: 198,
      originalPrice: 450,
      from: 'From Miami (MIA)',
      tripType: 'Roundtrip • Nonstop',
      isPastDeal: true
    },
    {
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29',
      city: 'Vancouver',
      country: 'Canada',
      price: 299,
      originalPrice: 680,
      from: 'From Seattle (SEA)',
      tripType: 'Roundtrip • Nonstop',
      isPastDeal: true
    },
    {
      image: 'https://images.unsplash.com/photo-1525207934214-58e69a8f8a5e',
      city: 'Toronto',
      country: 'Canada',
      price: 245,
      originalPrice: 520,
      from: 'From Chicago (ORD)',
      tripType: 'Roundtrip • Nonstop',
      isPastDeal: true
    },
    {
      image: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9',
      city: 'Los Angeles',
      country: 'USA',
      price: 890,
      originalPrice: 2800,
      from: 'From New York (JFK)',
      tripType: 'Roundtrip • Business',
      isPastDeal: true,
      isBusinessClass: true
    }
  ],
  Caribbean: [
    {
      image: 'https://images.unsplash.com/photo-1580541631971-c7f8c6a60dc2',
      city: 'Nassau',
      country: 'Bahamas',
      price: 299,
      originalPrice: 750,
      from: 'From Miami (MIA)',
      tripType: 'Roundtrip • Nonstop',
      isPastDeal: true
    },
    {
      image: 'https://images.unsplash.com/photo-1584553421349-3557471bed79',
      city: 'San Juan',
      country: 'Puerto Rico',
      price: 245,
      originalPrice: 580,
      from: 'From New York (JFK)',
      tripType: 'Roundtrip • Nonstop',
      isPastDeal: true
    },
    {
      image: 'https://images.unsplash.com/photo-1578796787744-626d6db43d6a',
      city: 'Punta Cana',
      country: 'Dominican Republic',
      price: 389,
      originalPrice: 890,
      from: 'From Chicago (ORD)',
      tripType: 'Roundtrip • 1-stop',
      isPastDeal: true
    },
    {
      image: 'https://images.unsplash.com/photo-1547150492-da7ff1742941',
      city: 'Montego Bay',
      country: 'Jamaica',
      price: 990,
      originalPrice: 3200,
      from: 'From Los Angeles (LAX)',
      tripType: 'Roundtrip • Business',
      isPastDeal: true,
      isBusinessClass: true
    }
  ],
  Oceania: [
    {
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9',
      city: 'Sydney',
      country: 'Australia',
      price: 799,
      originalPrice: 1800,
      from: 'From Los Angeles (LAX)',
      tripType: 'Roundtrip • 1-stop',
      isPastDeal: true
    },
    {
      image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad',
      city: 'Auckland',
      country: 'New Zealand',
      price: 845,
      originalPrice: 1950,
      from: 'From San Francisco (SFO)',
      tripType: 'Roundtrip • 1-stop',
      isPastDeal: true
    },
    {
      image: 'https://images.unsplash.com/photo-1578559117897-52896be5bf37',
      city: 'Fiji',
      country: 'Fiji',
      price: 699,
      originalPrice: 1600,
      from: 'From Los Angeles (LAX)',
      tripType: 'Roundtrip • 1-stop',
      isPastDeal: true
    },
    {
      image: 'https://images.unsplash.com/photo-1578432014316-48b448d14d57',
      city: 'Bora Bora',
      country: 'French Polynesia',
      price: 1890,
      originalPrice: 4500,
      from: 'From San Francisco (SFO)',
      tripType: 'Roundtrip • Business',
      isPastDeal: true,
      isBusinessClass: true
    }
  ],
  Asia: [
    {
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
      city: 'Tokyo',
      country: 'Japan',
      price: 689,
      originalPrice: 1500,
      from: 'From Los Angeles (LAX)',
      tripType: 'Roundtrip • 1-stop',
      isPastDeal: true
    },
    {
      image: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1',
      city: 'Seoul',
      country: 'South Korea',
      price: 645,
      originalPrice: 1400,
      from: 'From Seattle (SEA)',
      tripType: 'Roundtrip • 1-stop',
      isPastDeal: true
    },
    {
      image: 'https://images.unsplash.com/photo-1506158669146-619067262a00',
      city: 'Bangkok',
      country: 'Thailand',
      price: 545,
      originalPrice: 1200,
      from: 'From San Francisco (SFO)',
      tripType: 'Roundtrip • 1-stop',
      isPastDeal: true
    },
    {
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
      city: 'Singapore',
      country: 'Singapore',
      price: 1490,
      originalPrice: 3800,
      from: 'From New York (JFK)',
      tripType: 'Roundtrip • Business',
      isPastDeal: true,
      isBusinessClass: true
    }
  ],
  'Latin America': [
    {
      image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325',
      city: 'Rio de Janeiro',
      country: 'Brazil',
      price: 589,
      originalPrice: 1300,
      from: 'From Miami (MIA)',
      tripType: 'Roundtrip • 1-stop',
      isPastDeal: true
    },
    {
      image: 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542',
      city: 'Buenos Aires',
      country: 'Argentina',
      price: 645,
      originalPrice: 1400,
      from: 'From New York (JFK)',
      tripType: 'Roundtrip • 1-stop',
      isPastDeal: true
    },
    {
      image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a',
      city: 'Lima',
      country: 'Peru',
      price: 445,
      originalPrice: 950,
      from: 'From Los Angeles (LAX)',
      tripType: 'Roundtrip • 1-stop',
      isPastDeal: true
    },
    {
      image: 'https://images.unsplash.com/photo-1500759285222-a95626b934cb',
      city: 'Santiago',
      country: 'Chile',
      price: 1290,
      originalPrice: 3200,
      from: 'From Miami (MIA)',
      tripType: 'Roundtrip • Business',
      isPastDeal: true,
      isBusinessClass: true
    }
  ],
  Africa: [
    {
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5',
      city: 'Cape Town',
      country: 'South Africa',
      price: 789,
      originalPrice: 1800,
      from: 'From New York (JFK)',
      tripType: 'Roundtrip • 1-stop',
      isPastDeal: true
    },
    {
      image: 'https://images.unsplash.com/photo-1489493887464-892be6d1daae',
      city: 'Marrakech',
      country: 'Morocco',
      price: 645,
      originalPrice: 1400,
      from: 'From Boston (BOS)',
      tripType: 'Roundtrip • 1-stop',
      isPastDeal: true
    },
    {
      image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53',
      city: 'Nairobi',
      country: 'Kenya',
      price: 745,
      originalPrice: 1600,
      from: 'From Washington DC (IAD)',
      tripType: 'Roundtrip • 1-stop',
      isPastDeal: true
    },
    {
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e',
      city: 'Cairo',
      country: 'Egypt',
      price: 1590,
      originalPrice: 3800,
      from: 'From Chicago (ORD)',
      tripType: 'Roundtrip • Business',
      isPastDeal: true,
      isBusinessClass: true
    }
  ],
  'Middle East': [
    {
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
      city: 'Dubai',
      country: 'UAE',
      price: 889,
      originalPrice: 2000,
      from: 'From New York (JFK)',
      tripType: 'Roundtrip • 1-stop',
      isPastDeal: true
    },
    {
      image: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b',
      city: 'Istanbul',
      country: 'Turkey',
      price: 645,
      originalPrice: 1400,
      from: 'From Chicago (ORD)',
      tripType: 'Roundtrip • 1-stop',
      isPastDeal: true
    },
    {
      image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad',
      city: 'Tel Aviv',
      country: 'Israel',
      price: 745,
      originalPrice: 1600,
      from: 'From Miami (MIA)',
      tripType: 'Roundtrip • 1-stop',
      isPastDeal: true
    },
    {
      image: 'https://images.unsplash.com/photo-1548784765-cc47e1577111',
      city: 'Doha',
      country: 'Qatar',
      price: 1790,
      originalPrice: 4200,
      from: 'From Los Angeles (LAX)',
      tripType: 'Roundtrip • Business',
      isPastDeal: true,
      isBusinessClass: true
    }
  ]
}