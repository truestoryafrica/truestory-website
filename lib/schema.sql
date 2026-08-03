-- TrueStory Africa CMS schema
-- Run this once in your database provider's SQL editor (e.g. Supabase → SQL Editor)
-- before setting DATABASE_URL. Safe to re-run (uses IF NOT EXISTS / idempotent upserts).

create extension if not exists pgcrypto;

create table if not exists stories (
  id text primary key default ('story-' || gen_random_uuid()::text),
  type text not null default 'Article',
  title text not null,
  slug text not null unique,
  category text not null default 'Documentary',
  location text not null default 'Rwanda',
  excerpt text,
  body_html text,
  author text default 'TrueStory Africa Team',
  reading_time text default '',
  tags text[] not null default '{}',
  status text not null default 'published',
  image text default '/assets/images/story1.webp',
  alt text,
  date timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  seo_title text,
  seo_description text,
  publish_at timestamptz
);

alter table stories add column if not exists publish_at timestamptz;

create index if not exists stories_status_date_idx on stories (status, date desc);

create table if not exists insights (
  id text primary key default ('insight-' || gen_random_uuid()::text),
  title text not null,
  slug text not null unique,
  category text not null default 'Field Notes',
  excerpt text,
  body_html text,
  author text default 'TrueStory Africa Team',
  reading_time text default '',
  tags text[] not null default '{}',
  status text not null default 'published',
  image text default '/assets/images/hero-poster.webp',
  alt text,
  date timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  seo_title text,
  seo_description text,
  publish_at timestamptz,
  featured boolean not null default false
);

alter table insights add column if not exists publish_at timestamptz;
alter table insights add column if not exists featured boolean not null default false;

create index if not exists insights_status_date_idx on insights (status, date desc);

create table if not exists events (
  id text primary key default ('event-' || gen_random_uuid()::text),
  name text not null,
  slug text not null unique,
  client text default '',
  description text default '',
  category text not null default 'Event Coverage',
  images text[] not null default '{}',
  video_url text default '',
  status text not null default 'published',
  date timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  publish_at timestamptz
);

create index if not exists events_status_date_idx on events (status, date desc);

create table if not exists messages (
  id text primary key default ('msg-' || gen_random_uuid()::text),
  name text not null,
  email text not null,
  organization text default '',
  project_type text default 'Project inquiry',
  budget text default '',
  subject text,
  message text not null,
  received_at timestamptz not null default now(),
  status text not null default 'unread',
  urgent boolean not null default false
);

create index if not exists messages_received_idx on messages (received_at desc);

create table if not exists settings (
  id int primary key default 1,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint settings_singleton check (id = 1)
);

-- Admin login credentials. password_hash starts empty, meaning "fall back to
-- the ADMIN_PASSWORD environment variable" -- it's only populated once a
-- password reset actually happens, at which point it takes over as the
-- source of truth (env vars can't be changed by the running app).
create table if not exists admin_auth (
  id int primary key default 1,
  password_hash text,
  reset_token text,
  reset_token_expires timestamptz,
  updated_at timestamptz not null default now(),
  constraint admin_auth_singleton check (id = 1)
);
