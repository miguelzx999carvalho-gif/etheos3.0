import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  Scale,
  Lock,
  Users,
  ArrowLeft,
  Database,
  Server,
} from 'lucide-react'
import { Logo } from '../components/Logo'
import { Card, CardContent } from '../components/Card'
import { useAuth } from '../contexts/AuthContext'

export function Sobre() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <nav className="sticky top-0 z-30 border-b border-gray-200/70 bg-white/70 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/70">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
          <Logo />
          <Link
            to={isAuthenticated ? '/dashboard' : '/'}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-600 to-accent-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-accent-500/20"
          >
            <ArrowLeft className="h-4 w-4" /> {isAuthenticated ? 'Voltar ao app' : 'Voltar ao início'}
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-5 py-12">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 via-brand-600 to-accent-600 text-white shadow-xl shadow-accent-500/30">
            <ShieldCheck className="h-9 w-9" />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight md:text-4xl">Sobre o ETHEOS</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Uma plataforma para promover <strong>ética, justiça, confiança e transparência</strong>{' '}
            no ambiente de trabalho, com o apoio da tecnologia.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent>
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <Scale className="h-5 w-5 text-accent-500" /> Nossa missão
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Transformar valores éticos em prática cotidiana. Acreditamos que ambientes de
                trabalho mais justos e seguros começam com decisões conscientes de cada pessoa.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <Users className="h-5 w-5 text-accent-500" /> Para quem é
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Empresas que querem medir e fortalecer sua cultura ética, e colaboradores que
                buscam ferramentas para agir com integridade no dia a dia.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <Lock className="h-5 w-5 text-accent-500" /> Privacidade em primeiro lugar
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Os dados de usuários são separados dos dados de denúncias. O Radar de Ética é
                anônimo por padrão. Neste protótipo, tudo fica salvo localmente no navegador.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <Database className="h-5 w-5 text-accent-500" /> Arquitetura
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Frontend em React + TypeScript + Tailwind. Os dados utilizam o localStorage do
                navegador (demonstração), com estrutura preparada para migrar para o Supabase.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent>
            <h3 className="flex items-center gap-2 text-lg font-bold">
              <Server className="h-5 w-5 text-accent-500" /> Módulos da plataforma
            </h3>
            <ul className="mt-3 space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li>
                <strong>ÉticaCheck</strong> — situações simuladas para treinar decisões éticas,
                com pontuação e progresso.
              </li>
              <li>
                <strong>Canal de Denúncia</strong> — registro seguro de ocorrências com código
                único de acompanhamento.
              </li>
              <li>
                <strong>Radar de Ética</strong> — questionário anônimo e dashboard com gráficos
                do clima organizacional.
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
          <p className="font-bold">Aviso importante</p>
          <p className="mt-1">
            O ETHEOS é um <strong>projeto demonstrativo</strong> e não constitui um canal oficial
            de denúncia nem um serviço de emergência. Em situações de risco ou violação de
            direitos, procure a autoridade ou os canais internos adequados da sua empresa.
          </p>
        </div>
      </main>
    </div>
  )
}
