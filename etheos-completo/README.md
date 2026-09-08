# 🛡️ ETHEOS

Plataforma digital para promover **ética, justiça, confiança e transparência** no ambiente de trabalho.

> ⚠️ **Projeto demonstrativo (protótipo).** Não é um canal oficial de denúncia nem serviço de emergência.

## ✨ Funcionalidades

| Módulo | Descrição |
|--------|-----------|
| **ÉticaCheck** | Situações simuladas para treinar decisões éticas, com explicação, valores, consequências, pontuação e progresso. |
| **Canal de Denúncia** | Registro seguro de ocorrências com geração automática de código único (ex.: `ETHEOS-48291`). |
| **Acompanhar Denúncia** | Consulta do status pelo código. Status: Recebida → Em análise → Em investigação → Resolvida. |
| **Radar de Ética** | Questionário anônimo sobre o clima organizacional com dashboard de gráficos (Recharts). |
| **Painel Admin** | Área restrita para visualizar e alterar o status das denúncias. |

## 🧱 Stack

- **Frontend:** React + Vite + TypeScript
- **Estilo:** Tailwind CSS v4 + Lucide Icons
- **Gráficos:** Recharts
- **Roteamento:** React Router
- **Dados (protótipo):** `localStorage` do navegador — estruturado para migrar para Supabase.

## 🚀 Rodando localmente

Pré-requisito: [Node.js 20+](https://nodejs.org).

```bash
# 1. instalar dependências
npm install

# 2. rodar em desenvolvimento
npm run dev
# abra http://localhost:5173

# 3. build de produção
npm run build

# 4. preview do build
npm run preview
```

### Credenciais de demonstração

- **Admin:** `admin@etheos.com` / `admin123`
- **Usuário comum:** crie uma conta na tela de Cadastro.

## 🗂️ Estrutura de pastas

```
etheos/
├── public/                  # Arquivos estáticos (favicon)
└── src/
    ├── components/          # Componentes reutilizáveis (Logo, Sidebar, Card, Badge...)
    ├── pages/               # Uma tela por rota (Home, Login, Dashboard, ÉticaCheck...)
    ├── layouts/             # Layouts (MainLayout com sidebar + topbar)
    ├── services/            # Lógica de dados (auth, denúncias, éticacheck, radar)
    ├── hooks/               # Hooks personalizados (useLocalStorage)
    ├── contexts/            # Contextos React (Auth, Theme)
    ├── data/                # Dados estáticos (situações e perguntas)
    ├── types/               # Tipos TypeScript
    └── utils/               # Funções auxiliares
```

## 🔐 Segurança (importante)

Este é um protótipo. Para transformá-lo em um sistema real:

1. **Autenticação real** com Supabase Auth (ou Firebase) — em vez de salvar usuário no `localStorage`.
2. **Banco de dados** no Supabase (PostgreSQL) com **Row-Level Security (RLS)**: usuários só veem a própria denúncia (pelo código); somente o admin lista e altera.
3. **Separação total** entre tabelas de usuários e de denúncias.
4. **Hash de senhas** com bcrypt (Supabase já faz por padrão no Auth).
5. **HTTPS obrigatório** e variáveis de ambiente para chaves (arquivo `.env`, nunca versionado).
6. **Logs de auditoria** para rastrear alterações de status.
7. **Política de retenção** de dados e conformidade com a LGPD.

> Não invente anonimato absoluto. Se um dia for conectado a um banco real, o endereço IP e metadados podem ficar registrados. Mantenha sempre a transparência na interface.

## 🌍 Publicar gratuitamente (Vercel + GitHub)

### 1. Criar repositório no GitHub
1. Acesse [github.com/new](https://github.com/new), dê um nome (ex.: `etheos`), deixe **Public** e **não** inicialize com README.
2. Copie a URL do repositório (ex.: `https://github.com/seuusuario/etheos.git`).

### 2. Enviar o código pelo terminal
No VS Code, dentro da pasta `etheos`:

```bash
git init
git add .
git commit -m "feat: primeira versão do ETHEOS"
git branch -M main
git remote add origin https://github.com/seuusuario/etheos.git
git push -u origin main
```

### 3. Conectar ao Vercel
1. Acesse [vercel.com](https://vercel.com) e entre com sua conta (pode usar o GitHub).
2. Clique em **Add New → Project**.
3. Importe o repositório `etheos`.
4. O Vercel detecta o **Vite** automaticamente (Build: `npm run build`, Output: `dist`).
5. Clique em **Deploy**.

### 4. Receber o link público
Após o deploy, o Vercel fornece uma URL como `https://etheos.vercel.app`.

### 5. Atualizar o site após mudanças
Sempre que alterar o código, commite e envie:

```bash
git add .
git commit -m "descrição da mudança"
git push
```

O Vercel detecta o push e faz o deploy automaticamente.

## 📄 Licença

Projeto educacional. Use livremente para aprendizado.
