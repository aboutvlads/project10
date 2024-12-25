import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import type { Database } from '../lib/database.types';

type Deal = Database['public']['Tables']['deals']['Row'] & {
  tags: string[];
};

export function useDeals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { supabase } = useAuth();

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

        setDeals(dealsWithTags);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchDeals();
  }, [supabase]);

  return { deals, loading, error };
}
