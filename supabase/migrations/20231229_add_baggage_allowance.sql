alter table deals add column baggage_allowance text;

-- Add comment to the column
comment on column deals.baggage_allowance is 'The baggage allowance for the deal (e.g., One cabin bag per passenger)';
