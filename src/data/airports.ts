export interface Airport {
  code: string;
  city: string;
  country: string;
}

export const europeanAirports: Airport[] = [
  // Austria
  { code: 'VIE', city: 'Vienna', country: 'Austria' },
  { code: 'SZG', city: 'Salzburg', country: 'Austria' },
  
  // Germany
  { code: 'BER', city: 'Berlin', country: 'Germany' },
  { code: 'MUC', city: 'Munich', country: 'Germany' },
  { code: 'FRA', city: 'Frankfurt', country: 'Germany' },
  { code: 'DUS', city: 'Düsseldorf', country: 'Germany' },
  { code: 'HAM', city: 'Hamburg', country: 'Germany' },
  
  // France
  { code: 'CDG', city: 'Paris', country: 'France' },
  { code: 'ORY', city: 'Paris Orly', country: 'France' },
  { code: 'NCE', city: 'Nice', country: 'France' },
  
  // Italy
  { code: 'FCO', city: 'Rome', country: 'Italy' },
  { code: 'MXP', city: 'Milan', country: 'Italy' },
  { code: 'VCE', city: 'Venice', country: 'Italy' },
  
  // Spain
  { code: 'MAD', city: 'Madrid', country: 'Spain' },
  { code: 'BCN', city: 'Barcelona', country: 'Spain' },
  
  // Netherlands
  { code: 'AMS', city: 'Amsterdam', country: 'Netherlands' },
  
  // Belgium
  { code: 'BRU', city: 'Brussels', country: 'Belgium' },
  
  // Switzerland
  { code: 'ZRH', city: 'Zurich', country: 'Switzerland' },
  { code: 'GVA', city: 'Geneva', country: 'Switzerland' },
  
  // United Kingdom
  { code: 'LHR', city: 'London Heathrow', country: 'United Kingdom' },
  { code: 'LGW', city: 'London Gatwick', country: 'United Kingdom' },
  { code: 'MAN', city: 'Manchester', country: 'United Kingdom' },
  
  // Ireland
  { code: 'DUB', city: 'Dublin', country: 'Ireland' },
  
  // Sweden
  { code: 'ARN', city: 'Stockholm', country: 'Sweden' },
  
  // Denmark
  { code: 'CPH', city: 'Copenhagen', country: 'Denmark' },
  
  // Norway
  { code: 'OSL', city: 'Oslo', country: 'Norway' },
  
  // Finland
  { code: 'HEL', city: 'Helsinki', country: 'Finland' },
  
  // Poland
  { code: 'WAW', city: 'Warsaw', country: 'Poland' },
  { code: 'KRK', city: 'Krakow', country: 'Poland' },
  
  // Czech Republic
  { code: 'PRG', city: 'Prague', country: 'Czech Republic' },
  
  // Hungary
  { code: 'BUD', city: 'Budapest', country: 'Hungary' },
  
  // Portugal
  { code: 'LIS', city: 'Lisbon', country: 'Portugal' },
  { code: 'OPO', city: 'Porto', country: 'Portugal' },
  
  // Greece
  { code: 'ATH', city: 'Athens', country: 'Greece' }
];
