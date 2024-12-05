create table post_images (
  id uuid primary key default uuid_generate_v4(),
  image_url text not null,
  post_id uuid null references posts(id) on delete cascade,
  created_at timestamp with time zone default current_timestamp
);

create index idx_post_images_posts_id on post_images(post_id);