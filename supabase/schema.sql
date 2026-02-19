create extension if not exists "pgcrypto";

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  username text not null unique,
  password text not null,
  logo text,
  created_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  url text not null,
  participants jsonb not null default '[]'::jsonb,
  uploaded_at timestamptz not null default now()
);

alter table public.companies enable row level security;
alter table public.documents enable row level security;

drop policy if exists "Public access companies" on public.companies;
drop policy if exists "Public access documents" on public.documents;

create policy "Public access companies"
on public.companies
for all
using (true)
with check (true);

create policy "Public access documents"
on public.documents
for all
using (true)
with check (true);
