-- inserts a row into public.users
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.users (id, full_name, username, avatar_url)
  values (new.id, new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'user_name', new.raw_user_meta_data ->> 'avatar_url');
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
