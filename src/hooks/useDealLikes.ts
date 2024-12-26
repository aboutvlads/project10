import { useCallback, useState } from 'react';
import { useSupabase } from '../contexts/SupabaseProvider';

export function useDealLikes(dealId: string, initialLikes: number = 0) {
  const { supabase } = useSupabase();
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [isLoading, setIsLoading] = useState(false);

  // Toggle like
  const toggleLike = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        // Handle not logged in case
        return;
      }

      // Optimistically update UI
      const newCount = likesCount + 1;
      setLikesCount(newCount);

      // Update in database
      await supabase.rpc('increment_deal_likes', { deal_id: dealId });

      // Fetch updated count to ensure accuracy
      const { data: deal } = await supabase
        .from('deals')
        .select('likes')
        .eq('id', dealId)
        .single();

      if (deal) {
        setLikesCount(deal.likes);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      // Revert optimistic update on error
      setLikesCount(likesCount - 1);
    } finally {
      setIsLoading(false);
    }
  }, [dealId, likesCount, supabase]);

  return {
    likesCount,
    toggleLike,
    isLoading
  };
}
