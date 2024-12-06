create table users (
  id uuid not null references auth.users on delete cascade,
  full_name text,
  username text not null, 
  avatar_url text,

  primary key (id)
);

alter table users enable row level security;
