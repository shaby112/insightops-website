# Supabase Blog Setup (Production)

## 1) Required Supabase objects

### SQL: create table
```sql
create table if not exists public.blog_posts (
  id bigint generated always as identity primary key,
  slug text not null unique,
  title text not null,
  description text not null,
  author text not null,
  content text not null,
  date date not null,
  og_image text,
  draft boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_date_idx on public.blog_posts (date desc);
```

### Storage bucket
Create bucket: `blog-images`
- Public bucket: `true` (for direct public image URLs)

## 2) Vercel environment variables

Add these in Vercel project settings:

- `SUPABASE_URL` = your project URL (e.g. `https://<project-ref>.supabase.co`)
- `SUPABASE_SERVICE_ROLE_KEY` = service role key (server-side only)
- `SUPABASE_BLOG_BUCKET` = `blog-images`
- `BLOG_ADMIN_TOKEN` = secret token for /blog/publish access
- `LOOPS_API_KEY` = loops API key (waitlist emails)

## 3) Blog admin route

- Open `/blog/publish`
- Enter `BLOG_ADMIN_TOKEN`
- Create / Update / Delete posts
- Upload images (stored in Supabase bucket)

## 4) Notes

- Blog list/post APIs now read from Supabase, not markdown files.
- Keep all secrets server-side only.
- Rotate BLOG_ADMIN_TOKEN periodically.
