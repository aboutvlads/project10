alter table deals add column route text;

-- Add comment to the column
comment on column deals.route is 'The route of the deal (e.g., Paris – Saint Denis – Paris)';
