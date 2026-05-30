-- Chạy toàn bộ file trong Supabase → SQL Editor → Run

alter table public.news_posts
  add column if not exists featured_image_url text;

insert into storage.buckets (id, name, public)
values ('news-images', 'news-images', true)
on conflict (id) do update set public = true;

drop policy if exists "news_images_public_read" on storage.objects;
drop policy if exists "news_images_admin_insert" on storage.objects;
drop policy if exists "news_images_admin_update" on storage.objects;
drop policy if exists "news_images_admin_delete" on storage.objects;

create policy "news_images_public_read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'news-images');

create policy "news_images_admin_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'news-images' and public.is_admin());

create policy "news_images_admin_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'news-images' and public.is_admin())
  with check (bucket_id = 'news-images' and public.is_admin());

create policy "news_images_admin_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'news-images' and public.is_admin());
