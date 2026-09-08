# 🛡️ ETHEOS

Plataforma digital para promover **ética, justiça, confiança e transparência** no ambiente de trabalho.

> ⚠️ **Projeto demonstrativo.** Não é um canal oficial de denúncia nem serviço de emergência.

## ✨ Funcionalidades

| Módulo | Descrição |
|--------|-----------|
| **ÉticaCheck** | Situações simuladas para treinar decisões éticas, com explicação, valores, consequências, pontuação e progresso. |
| **Canal de Denúncia** | Registro seguro de ocorrências com geração automática de código único (ex.: `ETHEOS-48291`). |
| **Acompanhar Denúncia** | Consulta do status pelo código. Status: Recebida → Em análise → Em investigação → Resolvida. |
| **Radar de Ética** | Questionário anônimo sobre o clima organizacional com dashboard de gráficos (Recharts). |
| **Painel Admin** | Área restrita (papel admin) para visualizar e alterar o status das denúncias. |
| **Reset de senha** | Página "Esqueci minha senha" com e-mail de recuperação via Supabase. |

## 🧱 Stack

- **Frontend:** React + Vite + TypeScript
- **Estilo:** Tailwind CSS v4 + Lucide Icons
- **Gráficos:** Recharts
- **Roteamento:** React Router
- **Backend/Auth:** Supabase (PostgreSQL + Auth + Row-Level Security)

## 🚀 Rodando localmente

Pré-requisito: [Node.js 20+](https://nodejs.org).

```bash
# 1. instalar dependências
npm install

# 2. configurar variáveis de ambiente
cp .env.example .env   # preencha com suas chaves do Supabase

# 3. rodar em desenvolvimento
npm run dev
# abra http://localhost:5173

# 4. build de produção
npm run build
```

## 🗄️ Configuração do Supabase (obrigatória)

1. Crie um projeto gratuito em [supabase.com](https://supabase.com) → **New Project**.
2. Em **Settings → API**, copie a **Project URL** e a **anon / publishable key**.
3. Preencha o arquivo `.env`:
   ```
   VITE_SUPABASE_URL=SUA_URL
   VITE_SUPABASE_ANON_KEY=SUA_CHAVE
   ```
4. No painel do Supabase, abra **SQL Editor → New query**, cole **todo** o conteúdo do arquivo
   **`supabase-schema.sql`** e clique em **Run**. Isso cria as tabelas e as regras de segurança (RLS).

### Definir um usuário como ADMIN
Após criar uma conta no site com um e-mail, rode no SQL Editor:
```sql
update public.profiles set role = 'admin' where email = 'SEU_EMAIL';
```
A partir daí, essa conta acessa o **Painel Admin** e vê todas as denúncias.

### Ativar o e-mail de recuperação de senha
1. No Supabase: **Authentication → Providers → Email** → ative **"Confirm email"** (e a opção de recuperação).
2. Em **Authentication → URL Configuration**, defina **Site URL** como a URL do seu site (ex.: `https://etheos.vercel.app`).
3. O link de redefinição usa o redirect para `/atualizar-senha` já configurado no código.

## 🔐 Segurança

- Autenticação real com **Supabase Auth** (senhas com hash no servidor).
- Denúncias e dados de usuários ficam em **tabelas separadas**.
- **Row-Level Security (RLS):** usuários só leem as próprias denúncias (pelo código); apenas o
  papel `admin` lista e altera todas.
- Chaves em variáveis de ambiente (`.env`), nunca commitadas.
- Radar de Ética é **anônimo**: as respostas não são vinculadas ao usuário.

> Não invente anonimato absoluto. Se um dia conectar um serviço de denúncia real, considere que
> metadados (IP, horário) podem ficar registrados no servidor. Mantenha a transparência na interface.

## 🗂️ Estrutura de pastas

```
etheos/
├── public/                  # Arquivos estáticos (favicon)
├── supabase-schema.sql      # Script de criação do banco (rodar no Supabase)
└── src/
    ├── components/          # Componentes reutilizáveis (Logo, Sidebar, Card, Badge...)
    ├── pages/               # Uma tela por rota (Home, Login, Dashboard, ÉticaCheck...)
    ├── layouts/             # Layouts (MainLayout com sidebar + topbar)
    ├── services/            # Lógica de dados (auth, denúncias, éticacheck, radar, supabase)
    ├── hooks/               # Hooks personalizados
    ├── contexts/            # Contextos React (Auth, Theme)
    ├── data/                # Dados estáticos (situações e perguntas)
    ├── types/               # Tipos TypeScript
    └── utils/               # Funções auxiliares
```

## 🌍 Publicar gratuitamente (Vercel + GitHub)

### 1. Criar repositório no GitHub
Acesse [github.com/new](https://github.com/new), nome `etheos`, público, sem README.

### 2. Enviar o código pelo terminal (dentro da pasta do projeto)
```bash
git init
git add .
git commit -m "feat: ETHEOS completo com Supabase"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/etheos.git
git push -u origin main
```

### 3. Conectar ao Vercel e configurar as variáveis
1. [vercel.com](https://vercel.com) → **Add New → Project** → importe o repositório.
2. **Importante:** o `.env` não vai para o Git. No Vercel, vá em
   **Settings → Environment Variables** e adicione:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Clique em **Deploy**. O Vercel detecta o Vite automaticamente.

### 4. A cada mudança
```bash
git add .
git commit -m "descrição"
git push
```
O Vercel atualiza sozinho.

## 📄 Licença

Projeto educacional. Use livremente para aprendizado.
