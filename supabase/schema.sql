-- ============================================
-- Supabase Schema - אלומת שיבולים
-- ============================================
-- הרץ את הקובץ הזה ב-SQL Editor של Supabase
-- (Dashboard → SQL Editor → New query → הדבק → Run)
-- ============================================

-- טבלת לקוחות
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text not null,
  phone text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  password_hash text,
  password_salt text,
  score integer,
  form_data jsonb not null default '{}'::jsonb,
  rejection_reason text,
  created_at timestamptz not null default now(),
  approved_at timestamptz,
  rejected_at timestamptz
);

-- אינדקסים לחיפוש מהיר
create index if not exists customers_status_created_idx
  on public.customers (status, created_at desc);

create index if not exists customers_email_idx
  on public.customers (lower(email));

-- Row Level Security: אנחנו ניגשים דרך service_role key בלבד מהשרת,
-- אז RLS לא קריטי - אבל עדיף להפעיל כברירת מחדל.
alter table public.customers enable row level security;

-- מדיניות: אף אחד לא יכול לקרוא/לכתוב ישירות מהקליינט (anon key).
-- השרת שלנו משתמש ב-service_role key שעוקף RLS.
-- (אין צורך ביצירת policies אם אין גישה ציבורית)
