-- Chạy toàn bộ file trong Supabase Dashboard → SQL Editor

-- Profiles (role admin)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

-- Cài đặt site (1 dòng)
create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  mission_text text,
  faq_top_intro text,
  contact_address text,
  contact_email text,
  hotline text,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

-- Tin tức
create table if not exists public.news_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text default '',
  body text default '',
  featured_image_url text,
  date_display text,
  published boolean not null default true,
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.news_posts enable row level security;

-- Dịch vụ
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  price text not null default '$2.000',
  description text default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.services enable row level security;

-- FAQ: tab sidebar
create table if not exists public.faq_tabs (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  sort_order int not null default 0
);

alter table public.faq_tabs enable row level security;

-- FAQ: nhóm câu hỏi
create table if not exists public.faq_groups (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  sort_order int not null default 0
);

alter table public.faq_groups enable row level security;

-- FAQ: câu hỏi trong nhóm
create table if not exists public.faq_items (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.faq_groups (id) on delete cascade,
  question text not null,
  answer text default '',
  sort_order int not null default 0
);

alter table public.faq_items enable row level security;

-- FAQ: accordion đầu trang Hỗ trợ
create table if not exists public.faq_top_items (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text default '',
  sort_order int not null default 0
);

alter table public.faq_top_items enable row level security;

-- Form liên hệ
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

-- Helper: kiểm tra admin
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- RLS: đọc công khai
create policy "site_settings_public_read"
  on public.site_settings for select to anon, authenticated using (true);

create policy "news_public_read"
  on public.news_posts for select to anon, authenticated
  using (published = true or public.is_admin());

create policy "services_public_read"
  on public.services for select to anon, authenticated using (true);

create policy "faq_tabs_public_read"
  on public.faq_tabs for select to anon, authenticated using (true);

create policy "faq_groups_public_read"
  on public.faq_groups for select to anon, authenticated using (true);

create policy "faq_items_public_read"
  on public.faq_items for select to anon, authenticated using (true);

create policy "faq_top_public_read"
  on public.faq_top_items for select to anon, authenticated using (true);

create policy "contact_insert_public"
  on public.contact_submissions for insert to anon, authenticated
  with check (true);

create policy "contact_admin_read"
  on public.contact_submissions for select to authenticated
  using (public.is_admin());

-- RLS: admin ghi
create policy "site_settings_admin_write"
  on public.site_settings for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "news_admin_write"
  on public.news_posts for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "services_admin_write"
  on public.services for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "faq_tabs_admin_write"
  on public.faq_tabs for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "faq_groups_admin_write"
  on public.faq_groups for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "faq_items_admin_write"
  on public.faq_items for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "faq_top_admin_write"
  on public.faq_top_items for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Tự tạo profile khi đăng ký
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role)
  values (new.id, 'user')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Dữ liệu mẫu (chạy sau khi tạo bảng)
insert into public.site_settings (id, mission_text, faq_top_intro, contact_address, contact_email, hotline)
values (
  1,
  'Đội ngũ sáng lập của VibeZ là sự kết hợp của năm thành viên với chuyên môn bổ trợ lẫn nhau, tạo thành một bộ máy quản trị toàn diện từ chiến lược, vận hành, sản phẩm đến tài chính và truyền thông.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Hòa Lạc, Hà Nội, Việt Nam',
  'admin@fpt.vn',
  '123456789'
)
on conflict (id) do nothing;

insert into public.news_posts (slug, title, excerpt, body, date_display, published, featured, sort_order)
values
  ('nuoi-cuu-lai-gia-tang', 'Tiêu Đề Tin tức VibeZ 2026', 'Thị trường chăn nuôi ghi nhận nhiều tín hiệu tích cực.', 'Lorem ipsum dolor sit amet.', 'May 22, 2026', true, true, 1),
  ('vn-index-tang-diem', 'Tiêu Đề Tin tức VibeZ 2026', 'Chỉ số chứng khoán Việt Nam tăng trong phiên giao dịch.', 'Lorem ipsum dolor sit amet.', 'May 20, 2026', true, true, 2),
  ('gia-vang-bien-dong', 'Tiêu Đề Tin tức VibeZ 2026', 'Giá vàng biến động mạnh.', 'Lorem ipsum dolor sit amet.', 'May 18, 2026', true, false, 3),
  ('bitcoin-va-thi-truong-crypto', 'Tiêu Đề Tin tức VibeZ 2026', 'Thị trường crypto thu hút dòng vốn.', 'Lorem ipsum dolor sit amet.', 'May 15, 2026', true, false, 4),
  ('tin-tuc-vibez-5', 'Tiêu Đề Tin tức VibeZ 2026', 'Lorem ipsum excerpt.', 'Lorem ipsum body.', 'May 12, 2026', true, false, 5),
  ('tin-tuc-vibez-6', 'Tiêu Đề Tin tức VibeZ 2026', 'Lorem ipsum excerpt.', 'Lorem ipsum body.', 'May 10, 2026', true, false, 6)
on conflict (slug) do nothing;

insert into public.services (title, price, description, sort_order)
values
  ('MARKETING GÓI LẺ', '$2.000', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 1),
  ('THIẾT KẾ WEBSITE THEO YÊU CẦU', '$2.000', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 2),
  ('THIẾT KẾ NHẬN DIỆN THƯƠNG HIỆU', '$2.000', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 3),
  ('COMBO BASIC', '$2.000', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 4),
  ('COMBO PREMIUM', '$2.000', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 5);

insert into public.faq_top_items (question, answer, sort_order)
values
  ('QUESTIONS 1', 'Nội dung câu trả lời mẫu cho câu hỏi thường gặp.', 1),
  ('QUESTIONS 1', 'Nội dung câu trả lời mẫu cho câu hỏi thường gặp.', 2),
  ('QUESTIONS 1', 'Nội dung câu trả lời mẫu cho câu hỏi thường gặp.', 3);

insert into public.faq_tabs (label, sort_order)
values
  ('CÂU HỎI VỀ GÓI LẺ', 1),
  ('CÂU HỎI VỀ B', 2),
  ('CÂU HỎI VỀ C', 3),
  ('CÂU HỎI VỀ D', 4),
  ('CÂU HỎI VỀ E', 5),
  ('CÂU HỎI VỀ F', 6);

-- FAQ groups + items (dùng DO block để lấy id)
do $$
declare
  g1 uuid;
  g2 uuid;
begin
  insert into public.faq_groups (title, sort_order) values ('All Wedding Flowers', 1) returning id into g1;
  insert into public.faq_items (group_id, question, answer, sort_order) values
    (g1, 'What types of weddings flowers do you offer?', 'We offer a wide range of wedding flowers.', 1),
    (g1, 'Can I customize my wedding flower arrangements?', 'Yes, all arrangements can be customized.', 2),
    (g1, 'Do you offer seasonal flowers for weddings?', 'We source seasonal blooms.', 3),
    (g1, 'How do I place an order for wedding flowers?', 'Contact us via the Contact page.', 4),
    (g1, 'What is the delivery process for wedding flowers?', 'Delivered fresh on your wedding day.', 5);

  insert into public.faq_groups (title, sort_order) values ('Full-Service Weddings', 2) returning id into g2;
  insert into public.faq_items (group_id, question, answer, sort_order) values
    (g2, 'How far in advance should I order?', 'We recommend 3–6 months in advance.', 1),
    (g2, 'What is included in a full-service package?', 'Consultation, design, delivery, and setup.', 2),
    (g2, 'Can I schedule a consultation?', 'Yes, by appointment.', 3),
    (g2, 'Do you offer on-site setup?', 'Included in premium packages.', 4),
    (g2, 'How are my wedding flowers delivered?', 'Temperature-controlled transport.', 5);
end $$;

-- Storage: ảnh đại diện tin tức
insert into storage.buckets (id, name, public)
values ('news-images', 'news-images', true)
on conflict (id) do update set public = true;

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
