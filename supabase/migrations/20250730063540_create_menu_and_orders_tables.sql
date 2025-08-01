create table menu_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric(10, 2) not null,
  category text not null,
  description text,
  available boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
