import { Link } from 'react-router-dom'
import {
  Scale,
  Megaphone,
  Radar,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Lock,
  Moon,
  CheckCircle2,
} from 'lucide-react'
import { Logo } from '../components/Logo'
import { useAuth } from '../contexts/AuthContext'

const features = [
  {
    icon: Scale,
    title: 'ÉticaCheck',
    description:
      'Situações reais do dia a dia para treinar decisões éticas. Aprenda valores, consequências e pontue seu progresso.',
    to: '/eticacheck',
  },
  {
    icon: Megaphone,
    title: 'Canal de Denúncia',
    description:
      'Registre ocorrências com privacidade e acompanhe o status pelo código gerado automaticamente.',
    to: '/denuncia',
  },
  {
    icon: Radar,
    title: 'Radar de Ética',
    description:
      'Responda anonimamente e visualize o clima ético da organização em gráficos interativos.',
    to: '/radar',
  },
]

export function Home() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-30 border-b border-gray-200/70 bg-white/70 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Logo />
          <div className="flex items-center gap-2">
            <Link
              to="/sobre"
              className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 sm:block dark:text-gray-300 dark:hover:text-white"
            >
              Sobre
            </Link>
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-600 to-accent-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-accent-500/20 transition hover:opacity-90"
              >
                Entrar no app <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-600 to-accent-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-accent-500/20 transition hover:opacity-90"
                >
                  Começar agora
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" />
          <div className="absolute top-20 -left-20 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl" />
        </div>
        <div className="mx-auto max-w-6xl px-5 py-20 text-center md:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-300/60 bg-accent-50 px-4 py-1.5 text-sm font-medium text-accent-800 dark:border-accent-800/50 dark:bg-accent-900/20 dark:text-accent-200">
            <Sparkles className="h-4 w-4" />
            Cultura ética para o futuro do trabalho
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Construa um ambiente de trabalho mais{' '}
            <span className="bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent">
              ético, seguro e transparente
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            O ETHEOS ajuda empresas e colaboradores a desenvolver decisões mais justas,
            com treinamento interativo, canal de denúncia e um radar do clima ético.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to={isAuthenticated ? '/dashboard' : '/register'}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-accent-500/30 transition hover:opacity-90"
            >
              Criar conta gratuita <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/sobre"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3 text-base font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Conhecer o projeto
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-3 text-left sm:grid-cols-3">
            {[
              ['+', 'Funcionalidades éticas integradas'],
              ['100%', 'Anonimato no Radar'],
              ['🔒', 'Privacidade e segurança'],
            ].map(([a, b]) => (
              <div
                key={b}
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
              >
                <span className="text-2xl font-extrabold text-brand-600 dark:text-brand-300">{a}</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Três pilares para uma cultura ética
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600 dark:text-gray-300">
            Ferramentas práticas para treinar, proteger e medir a ética no seu ambiente.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-600 text-white shadow-md shadow-accent-500/25">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{f.description}</p>
              <Link
                to={f.to}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-accent-600 dark:text-brand-300"
              >
                Explorar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="border-t border-gray-200 bg-white py-16 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                Ética também se constrói com tecnologia
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                O ETHEOS reúne transparência, justiça, confiança e tecnologia em uma só
                plataforma, pensada para o bem-estar das pessoas e das organizações.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  { icon: ShieldCheck, t: 'Tomada de decisão guiada por valores' },
                  { icon: Lock, t: 'Privacidade e separação de dados' },
                  { icon: Moon, t: 'Interface moderna com modo escuro' },
                ].map((i) => (
                  <li key={i.t} className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                    <CheckCircle2 className="h-5 w-5 text-accent-500" />
                    <i.icon className="h-5 w-5 text-brand-500" />
                    {i.t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-brand-950 to-accent-900 p-8 text-white shadow-xl dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                  <Scale className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-bold">Índice de Ética</p>
                  <p className="text-sm text-white/70">Ambiente saudável</p>
                </div>
              </div>
              <p className="mt-6 text-5xl font-extrabold">86%</p>
              <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-white/15">
                <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-brand-400 to-accent-400" />
              </div>
              <p className="mt-3 text-sm text-white/80">
                Exemplo de resultado do Radar de Ética com gráficos interativos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-20 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Pronto para cultivar um ambiente mais ético?
        </h2>
        <Link
          to={isAuthenticated ? '/dashboard' : '/register'}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 px-8 py-3.5 text-lg font-semibold text-white shadow-lg shadow-accent-500/30 transition hover:opacity-90"
        >
          Começar agora <ArrowRight className="h-5 w-5" />
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 py-10 dark:border-gray-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
          <Logo />
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <Link to="/faq" className="hover:text-gray-900 dark:hover:text-white">FAQ</Link>
            <Link to="/contato" className="hover:text-gray-900 dark:hover:text-white">Contato</Link>
            <Link to="/privacidade" className="hover:text-gray-900 dark:hover:text-white">Privacidade</Link>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} ETHEOS — Projeto demonstrativo de cultura ética.
          </p>
        </div>
      </footer>
    </div>
  )
}
