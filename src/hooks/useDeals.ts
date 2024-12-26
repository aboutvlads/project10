import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import type { Database } from '../lib/database.types';

type Deal = Database['public']['Tables']['deals']['Row'] & {
  tags: string[];
};

export function useDeals(filterCity?: string) {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { supabase, userProfile } = useAuth();

  useEffect(() => {
    async function fetchDeals() {
      try {
        const { data: dealsData, error: dealsError } = await supabase
          .from('deals')
          .select('*')
          .order('created_at', { ascending: false });

        if (dealsError) throw dealsError;

        const { data: tagsData, error: tagsError } = await supabase
          .from('deal_tags')
          .select('*');

        if (tagsError) throw tagsError;

        const dealsWithTags = dealsData.map(deal => ({
          ...deal,
          tags: tagsData
            .filter(tag => tag.deal_id === deal.id)
            .map(tag => tag.tag)
        }));

        // Sort deals by user's home city first if no filter is applied
        const sortedDeals = dealsWithTags.sort((a, b) => {
          if (!userProfile?.home_airport) return 0;
          
          // Use the city name for comparison
          const homeCity = userProfile.home_airport.city;
          const cityToMatch = filterCity || homeCity;
          
          if (!cityToMatch) return 0;
          
          // Log values for debugging
          console.log('Comparing cities:', {
            dealDeparture: a.departure,
            cityToMatch: cityToMatch,
            homeAirport: userProfile.home_airport
          });
          
          // Compare with just the city names
          const aDepartsFromCity = a.departure.toLowerCase().includes(cityToMatch.toLowerCase());
          const bDepartsFromCity = b.departure.toLowerCase().includes(cityToMatch.toLowerCase());
          
          if (aDepartsFromCity && !bDepartsFromCity) return -1;
          if (!aDepartsFromCity && bDepartsFromCity) return 1;
          
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });

        // Filter by city if specified
        const filteredDeals = filterCity 
          ? sortedDeals.filter(deal => 
              deal.departure.toLowerCase().includes(filterCity.toLowerCase())
            )
          : sortedDeals;

        setDeals(filteredDeals);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchDeals();
  }, [supabase, userProfile?.home_airport, filterCity]);

  return { deals, loading, error };
}
