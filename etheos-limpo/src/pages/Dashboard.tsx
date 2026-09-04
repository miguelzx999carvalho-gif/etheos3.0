import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Scale,
  Megaphone,
  Radar,
  TrendingUp,
  Target,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react'
import { Card, CardHeader, CardContent } from '../components/Card'
import { StatCard } from '../components/StatCard'
import { useAuth } from '../contexts/AuthContext'
import { getProgress } from '../services/eticacheck'
import { getRadarSummary } from '../services/radar'
import { listMyDenuncias } from '../services/denuncias'
import { STATUS_LABELS } from '../types'
import type { Denuncia } from '../types'
import { Badge, statusTone } from '../components/Badge'
import { formatDate } from '../utils/format'

export function Dashboard() {
  const { user } = useAuth()
  const progress = getProgress()
  const radar = getRadarSummary()
  const [denuncias, setDenuncias] = useState<Denuncia[]>([])

  useEffect(() => {
    if (user) {
      void listMyDenuncias(user.id).then(setDenuncias)
    } else {
      setDenuncias([])
    }
  }, [user])

  return (
    <div className="space-y-6">
      {/* Boas-vindas */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
          Olá, {user?.name?.split(' ')[0] ?? 'visitante'} 👋
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-300">
          Acompanhe seu progresso ético e o clima da sua organização.
        </p>
      </div>

      {/* Cards de acesso rápido */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Link
          to="/eticacheck"
          className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-600 text-white">
            <Scale className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold">ÉticaCheck</h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Treine suas decisões éticas em situações reais.
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-300">
            Começar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>

        <Link
          to="/denuncia"
          className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-600 to-fuchsia-600 text-white">
            <Megaphone className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold">Canal de Denúncia</h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Registre ocorrências com privacidade.
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent-600 dark:text-accent-300">
            Registrar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>

        <Link
          to="/radar"
          className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
            <Radar className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold">Radar de Ética</h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Responda anonimamente e veja o clima ético.
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-300">
            Responder <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </div>

      {/* Métricas */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Pontuação ÉticaCheck"
          value={`${progress.totalPoints}/${progress.maxPoints}`}
          icon={<TrendingUp className="h-6 w-6" />}
          hint={progress.scoreLevel}
        />
        <StatCard
          title="Situações concluídas"
          value={`${progress.answeredCount}/${progress.totalCount}`}
          icon={<Target className="h-6 w-6" />}
          hint={`${progress.percentage}% de progresso`}
        />
        <StatCard
          title="Índice de Ética"
          value={`${Math.round(radar.overall * 20)}%`}
          icon={<Radar className="h-6 w-6" />}
          hint={radar.submissions > 0 ? `${radar.submissions} resposta(s)` : 'Ainda sem respostas'}
        />
        <StatCard
          title="Denúncias"
          value={denuncias.length}
          icon={<ShieldAlert className="h-6 w-6" />}
          hint="Acompanhe pelo código"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Progresso */}
        <Card>
          <CardHeader title="Seu progresso no ÉticaCheck" subtitle="Continue evoluindo suas decisões éticas" />
          <CardContent>
            <div className="mb-3 flex items-end justify-between">
              <span className="text-3xl font-extrabold">{progress.percentage}%</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{progress.scoreLevel}</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
            <Link
              to="/eticacheck"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-accent-600 dark:text-brand-300"
            >
              Treinar mais <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Minhas denúncias */}
        <Card>
          <CardHeader
            title="Minhas denúncias"
            subtitle="Você só vê as denúncias que registrou (protótipo)"
            icon={<ShieldAlert className="h-5 w-5 text-accent-500" />}
          />
          <CardContent>
            {denuncias.length === 0 ? (
              <p className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                Nenhuma denúncia registrada ainda.
              </p>
            ) : (
              <ul className="space-y-3">
                {denuncias.slice(0, 5).map((d) => (
                  <li
                    key={d.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 p-3 dark:border-gray-700"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{d.code}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(d.createdAt)}
                      </p>
                    </div>
                    <Badge tone={statusTone[d.status]}>{STATUS_LABELS[d.status]}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
