-- ============================================================
-- ETHEOS — backend (Supabase)
-- Rode este script inteiro no SQL Editor do seu projeto Supabase
-- (Dashboard do Supabase → SQL Editor → New query → Run).
-- ============================================================

create extension if not exists "pgcrypto";

-- Tabela de denúncias (compartilhada entre todos os navegadores)
create table if not exists public.denuncias (
  id          uuid primary key default gen_random_uuid(),
  code        text not null unique,             -- ex.: ETHEOS-48291
  category    text not null,
  description text not null,
  status      text not null default 'recebida', -- recebida | em-analise | em-investigacao | resolvida
  created_at  timestamptz not null default now(),
  created_by  text,                             -- id do usuário local (protótipo)
  message     text                              -- mensagem da equipe para o denunciante
);

-- Busca por código mais rápida (case-insensitive)
create index if not exists denuncias_code_idx on public.denuncias (lower(code));

-- ============================================================
-- Segurança (Row Level Security)
-- ============================================================
alter table public.denuncias enable row level security;

-- ⚠️ ATENÇÃO — POLÍTICAS DE DEMONSTRAÇÃO:
-- Estas políticas permitem inserir, ler e atualizar denúncias de forma anônima,
-- apenas para o protótipo funcionar sem login real. Para produção, remova as
-- políticas abaixo e crie políticas por usuário autenticado (Supabase Auth),
-- para que só o administrador veja a lista e o denunciante veja a própria denúncia.

create policy "demo_insert" on public.denuncias
  for insert to anon with check (true);

create policy "demo_select" on public.denuncias
  for select to anon using (true);

create policy "demo_update" on public.denuncias
  for update to anon using (true) with check (true);
