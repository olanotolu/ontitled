-- Ontitled core schema
-- Auth stays on Auth0; Supabase is the durable app database.
-- user_id values are Auth0 subject strings (e.g. google-oauth2|..., auth0|...).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Profiles (1:1 with Auth0 user)
-- ---------------------------------------------------------------------------
create table public.profiles (
  user_id text primary key,
  email text not null default '',
  display_name text not null default '',
  job_title text not null default '',
  first_name text not null default '',
  last_name text not null default '',
  phone text not null default '',
  handle text not null default '',
  account_type text check (account_type is null or account_type in ('individual', 'business')),
  onboarding_completed boolean not null default true,
  onboarding_step text not null default 'done',
  onboarding jsonb not null default '{}'::jsonb,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_email_idx on public.profiles (email);
create index profiles_handle_idx on public.profiles (handle) where handle <> '';

-- ---------------------------------------------------------------------------
-- Workspaces
-- ---------------------------------------------------------------------------
create table public.workspaces (
  id text primary key,
  owner_id text not null references public.profiles (user_id) on delete restrict,
  name text not null,
  slug text not null unique,
  timezone text not null default 'UTC',
  plan text not null default 'Pre-alpha',
  plan_status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index workspaces_owner_id_idx on public.workspaces (owner_id);

-- Default workspace pointer for a user (active workspace)
create table public.user_workspaces (
  user_id text primary key references public.profiles (user_id) on delete cascade,
  workspace_id text not null references public.workspaces (id) on delete cascade,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Team
-- ---------------------------------------------------------------------------
create table public.workspace_members (
  workspace_id text not null references public.workspaces (id) on delete cascade,
  user_id text not null references public.profiles (user_id) on delete cascade,
  email text not null default '',
  role text not null check (role in ('owner', 'admin', 'member')),
  created_at timestamptz not null default now(),
  primary key (workspace_id, user_id)
);

create index workspace_members_user_id_idx on public.workspace_members (user_id);

create table public.workspace_invites (
  id text primary key,
  workspace_id text not null references public.workspaces (id) on delete cascade,
  email text not null,
  role text not null check (role in ('admin', 'member')),
  token text not null unique,
  expires_at timestamptz not null,
  accepted_at timestamptz,
  created_at timestamptz not null default now()
);

create index workspace_invites_workspace_id_idx on public.workspace_invites (workspace_id);
create index workspace_invites_email_idx on public.workspace_invites (email);

-- ---------------------------------------------------------------------------
-- API keys (store hash only; never the full secret)
-- ---------------------------------------------------------------------------
create table public.api_keys (
  id text primary key,
  workspace_id text not null references public.workspaces (id) on delete cascade,
  name text not null,
  key_prefix text not null,
  key_hash text not null unique,
  scopes text[] not null default '{}',
  created_at timestamptz not null default now(),
  last_used_at timestamptz,
  revoked_at timestamptz
);

create index api_keys_workspace_id_idx on public.api_keys (workspace_id);
create index api_keys_active_idx on public.api_keys (workspace_id) where revoked_at is null;

-- ---------------------------------------------------------------------------
-- Usage (monthly rollups)
-- ---------------------------------------------------------------------------
create table public.usage_periods (
  workspace_id text not null references public.workspaces (id) on delete cascade,
  period text not null, -- YYYY-MM
  requests bigint not null default 0,
  tokens bigint not null default 0,
  evals bigint not null default 0,
  updated_at timestamptz not null default now(),
  primary key (workspace_id, period)
);

-- ---------------------------------------------------------------------------
-- updated_at helper
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger workspaces_set_updated_at
  before update on public.workspaces
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS: disabled for service_role path (Auth0 app uses server-side service key).
-- Tables are not exposed to anon by default grants; enable RLS so direct
-- PostgREST anon access is denied unless policies allow it.
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.workspaces enable row level security;
alter table public.user_workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.workspace_invites enable row level security;
alter table public.api_keys enable row level security;
alter table public.usage_periods enable row level security;

-- No policies for anon/authenticated: only service_role (bypasses RLS) used by Next.js API routes.
-- If you later wire Supabase Auth, add policies here.

comment on table public.profiles is 'Auth0-backed user profiles for Ontitled settings';
comment on table public.workspaces is 'Tenant workspaces';
comment on table public.api_keys is 'Hashed API keys; secret shown once at creation';
