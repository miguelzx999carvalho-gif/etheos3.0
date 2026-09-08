-- ============================================================
-- ETHEOS — Configuração do banco de dados Supabase
-- Como usar: abra o painel do Supabase -> SQL Editor -> New query
-- cole TODO este código -> Run.
-- ============================================================

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- TABELA: profiles (dados de perfil de cada usuário)
-- ------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  role text not null default 'user',
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- TABELA: denuncias (separada de profiles, por segurança)
-- ------------------------------------------------------------
create table if not exists public.denuncias (
  id uuid primary key default gen_random_uuid(),
  code text unique,
  category text,
  description text,
  status text not null default 'recebida',
  message text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- TABELA: radar_answers (respostas anônimas do Radar de Ética)
-- ------------------------------------------------------------
create table if not exists public.radar_answers (
  id uuid primary key default gen_random_uuid(),
  question_id text,
  question text,
  score int,
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- TABELA: eticacheck_answers (progresso do usuário no ÉticaCheck)
-- ------------------------------------------------------------
create table if not exists public.eticacheck_answers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  scenario_id text,
  selected_option int,
  points int,
  created_at timestamptz default now(),
  unique(user_id, scenario_id)
);

-- ------------------------------------------------------------
-- FUNÇÃO: is_admin() — verifica se o usuário atual é admin
-- ------------------------------------------------------------
create or replace function public.is_admin()
returns boolean language sql security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

-- ------------------------------------------------------------
-- TRIGGER: cria profile automaticamente no cadastro
-- ------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    'user'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ------------------------------------------------------------
-- HABILITAR Row-Level Security (segurança por linha)
-- ------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.denuncias enable row level security;
alter table public.radar_answers enable row level security;
alter table public.eticacheck_answers enable row level security;

-- profiles: usuário vê/edita o próprio; admin vê todos
create policy "select own profile" on public.profiles
  for select using (id = auth.uid() or public.is_admin());
create policy "update own profile" on public.profiles
  for update using (id = auth.uid());

-- denuncias: qualquer autenticado pode criar; usuário só lê a própria;
-- admin lê e atualiza todas
create policy "insert denuncia" on public.denuncias
  for insert to authenticated with check (true);
create policy "select own denuncia" on public.denuncias
  for select using (created_by = auth.uid() or public.is_admin());
create policy "update denuncia admin" on public.denuncias
  for update using (public.is_admin());

-- radar: autenticado pode responder; qualquer autenticado vê agregados
create policy "insert radar" on public.radar_answers
  for insert to authenticated with check (true);
create policy "select radar" on public.radar_answers
  for select using (true);

-- eticacheck: usuário gerencia o próprio; admin vê todos
create policy "insert eticacheck" on public.eticacheck_answers
  for insert to authenticated with check (user_id = auth.uid());
create policy "update own eticacheck" on public.eticacheck_answers
  for update using (user_id = auth.uid());
create policy "select own eticacheck" on public.eticacheck_answers
  for select using (user_id = auth.uid() or public.is_admin());

-- ------------------------------------------------------------
-- OPCIONAL — Definir um usuário como ADMIN
-- Após criar a conta com o e-mail abaixo no site, rode:
-- update public.profiles set role = 'admin' where email = 'ADMIN@EMAIL';
-- ------------------------------------------------------------
