create table menu_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric(10, 2) not null,
  category text not null,
  description text,
  available boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
create table orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text,
  table_number integer,
  status text default 'pending', -- pending, preparing, served, cancelled
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create join table for ordered menu items
create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  menu_item_id uuid references menu_items(id) on delete cascade,
  quantity integer not null,
  special_request text
);