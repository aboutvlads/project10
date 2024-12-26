-- Create likes table
create table public.deal_likes (
  id uuid default gen_random_uuid() primary key,
  deal_id uuid references public.deals(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(deal_id, user_id)
);

-- Add RLS policies
alter table public.deal_likes enable row level security;

create policy "Users can view all likes"
  on public.deal_likes for select
  to authenticated
  using (true);

create policy "Users can like deals"
  on public.deal_likes for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can unlike deals"
  on public.deal_likes for delete
  to authenticated
  using (auth.uid() = user_id);

-- Create function to get likes count
create or replace function get_deal_likes_count(deal_id uuid)
returns integer
language sql
security definer
as $$
  select count(*)::integer
  from public.deal_likes
  where deal_likes.deal_id = $1;
$$;
