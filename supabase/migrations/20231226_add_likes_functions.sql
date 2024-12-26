-- Function to increment likes
create or replace function increment_deal_likes(deal_id uuid)
returns void
language sql
security definer
as $$
  update public.deals
  set likes = likes + 1
  where id = deal_id;
$$;

-- Function to decrement likes
create or replace function decrement_deal_likes(deal_id uuid)
returns void
language sql
security definer
as $$
  update public.deals
  set likes = greatest(0, likes - 1)
  where id = deal_id;
$$;
