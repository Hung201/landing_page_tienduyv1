# Thiết lập Supabase cho VibeZ CMS

## 1. Tạo project Supabase

1. Vào [https://supabase.com](https://supabase.com) → **New project**
2. Lưu **Project URL** và **anon public key** (Settings → API)

## 2. Chạy SQL schema

1. Mở **SQL Editor** trong Supabase Dashboard
2. Copy toàn bộ nội dung file `supabase/schema.sql` và **Run**
3. Kiểm tra các bảng: `news_posts`, `services`, `faq_*`, `site_settings`, `profiles`, `contact_submissions`

## 3. Cấu hình biến môi trường

Tạo file `.env` ở thư mục gốc (copy từ `.env.example`):

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...
```

Trên **Vercel**: Project → Settings → Environment Variables → thêm 2 biến trên → **Redeploy**.

## 4. Tạo tài khoản admin

1. Supabase → **Authentication** → **Users** → **Add user** (email + mật khẩu)
2. SQL Editor, chạy (thay email):

```sql
update public.profiles
set role = 'admin'
where id = (
  select id from auth.users where email = 'admin@vibez.vn'
);
```

## 5. Đăng nhập quản trị

- Local: `http://localhost:5173/admin/login`
- Production: `https://your-domain.vercel.app/admin/login`

## Trang quản trị

| Đường dẫn | Chức năng |
|-----------|-----------|
| `/admin` | Tổng quan |
| `/admin/news` | Tin tức (CRUD, xuất bản, nổi bật) |
| `/admin/services` | Dịch vụ |
| `/admin/faq` | FAQ trang Hỗ trợ |
| `/admin/settings` | Sứ mệnh, liên hệ footer, intro FAQ |
| `/admin/contacts` | Tin nhắn form Liên hệ |

## Cập nhật: ảnh đại diện + editor

Nếu đã chạy `schema.sql` trước đó, chạy thêm file:

`supabase/migrations/add_news_featured_image.sql`

Tạo bucket **news-images** và cột `featured_image_url` trên bảng `news_posts`.


Nếu chưa cấu hình `.env`, website vẫn chạy với dữ liệu mẫu trong `src/data/*.js`. Trang `/admin` sẽ báo thiếu cấu hình.
