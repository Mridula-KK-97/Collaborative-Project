create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  role text not null,
  created_at timestamp with time zone default now()
);
