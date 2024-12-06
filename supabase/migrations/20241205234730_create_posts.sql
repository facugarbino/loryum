create table posts (
  id uuid primary key default uuid_generate_v4(),
  content text not null,
  user_id uuid not null references users(id) on delete cascade,
  parent_id uuid null references posts(id) on delete cascade, -- if it's a comment, refers to the main post
  created_at timestamp with time zone default current_timestamp
);

create index idx_posts_user_id_created_at on posts(user_id, created_at) where parent_id is null;
create index idx_posts_created_at on posts(parent_id, created_at);