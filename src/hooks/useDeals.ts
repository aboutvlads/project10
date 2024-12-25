import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import type { Database } from '../lib/database.types';

type Deal = Database['public']['Tables']['deals']['Row'] & {
  tags: string[];
  isFromHomeAirport: boolean;
};

export function useDeals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { supabase, user } = useAuth();

  useEffect(() => {
    async function fetchDeals() {
      try {
        // Fetch user's home airport
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('home_airport')
          .eq('id', user?.id)
          .single();

        if (userError) throw userError;

        // Fetch all deals
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
            .map(tag => tag.tag),
          isFromHomeAirport: deal.departure?.includes(userData?.home_airport)
        }));

        setDeals(dealsWithTags);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (user?.id) {
      fetchDeals();
    }
  }, [supabase, user?.id]);

  return { deals, loading, error };
}
