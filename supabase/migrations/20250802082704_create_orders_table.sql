-- Create orders table
create table orders (
  id uuid primary key default gen_random_uuid(),
  table_no integer not null,
  item text not null,
  quantity integer not null,
  tot_price numeric(10, 2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  status text default 'pending'
);
