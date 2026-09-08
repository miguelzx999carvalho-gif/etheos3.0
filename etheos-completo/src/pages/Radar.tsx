import { useState } from 'react'
import {
  Radar as RadarIcon,
  Send,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar as RechartsRadar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts'
import { Card, CardHeader, CardContent } from '../components/Card'
import { StatCard } from '../components/StatCard'
import { radarQuestions } from '../data/radarQuestions'
import { submitRadar, getRadarSummary, normalizedScore } from '../services/radar'

const scoreLabels = ['1 - Discordo', '2', '3', '4', '5 - Concordo']

export function Radar() {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [summary, setSummary] = useState(getRadarSummary())

  const answeredCount = radarQuestions.filter((q) => answers[q.id]).length
  const allAnswered = answeredCount === radarQuestions.length

  function setAnswer(id: string, score: number) {
    setAnswers((prev) => ({ ...prev, [id]: score }))
  }

  function handleSubmit() {
    if (!allAnswered) return
    const payload = radarQuestions
      .filter((q) => answers[q.id])
      .map((q) => ({
        questionId: q.id,
        question: q.question,
        score: answers[q.id],
      }))
    submitRadar(payload)
    setSummary(getRadarSummary())
    setSubmitted(true)
  }

  // Dados para os gráficos
  const radarData = radarQuestions
    .map((q) => {
      const row = summary.byQuestion.find((b) => b.id === q.id)
      return { subject: q.label, score: row ? normalizedScore(q.id, row.avg) : 0 }
    })
    .filter((d) => d.score > 0)

  const hasData = summary.submissions > 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">Radar de Ética</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-300">
          Responda anonimamente e visualize o clima ético da organização.
        </p>
      </div>

      {/* Métricas */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Respostas anônimas"
          value={summary.submissions}
          icon={<ShieldCheck className="h-6 w-6" />}
          hint="Total de participações"
        />
        <StatCard
          title="Índice geral de ética"
          value={hasData ? `${Math.round(summary.overall * 20)}%` : '—'}
          icon={<RadarIcon className="h-6 w-6" />}
          hint="Média normalizada"
        />
        <StatCard
          title="Sua participação"
          value={submitted || answeredCount > 0 ? 'Registrada' : 'Pendente'}
          icon={<Send className="h-6 w-6" />}
          hint={allAnswered ? 'Pronto para enviar' : `${answeredCount}/${radarQuestions.length} respondidas`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader
            title="Responder questionário"
            subtitle="Suas respostas são anônimas e não ficam vinculadas ao seu nome"
            icon={<RadarIcon className="h-5 w-5 text-accent-500" />}
          />
          <CardContent className="space-y-4">
            {radarQuestions.map((q) => (
              <div key={q.id} className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
                <p className="text-sm font-medium">{q.question}</p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-xs text-gray-400">{scoreLabels[0]}</span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        onClick={() => setAnswer(q.id, n)}
                        aria-label={`${q.question}: ${n}`}
                        className={
                          answers[q.id] === n
                            ? 'h-9 w-9 rounded-lg bg-gradient-to-br from-brand-600 to-accent-600 text-sm font-bold text-white shadow'
                            : 'h-9 w-9 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 transition hover:border-accent-400 dark:border-gray-600 dark:text-gray-300'
                        }
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{scoreLabels[4]}</span>
                </div>
              </div>
            ))}

            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-accent-500/25 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
              {allAnswered ? 'Enviar respostas' : `Responda todas (${answeredCount}/${radarQuestions.length})`}
            </button>

            {submitted && (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2 text-sm text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
                <CheckCircle2 className="h-5 w-5" /> Respostas registradas anonimamente. Obrigado!
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            title="Índice por dimensão"
            subtitle={hasData ? 'Resultado do Radar de Ética' : 'Ainda sem dados — envie respostas acima'}
            icon={<RadarIcon className="h-5 w-5 text-brand-500" />}
          />
          <CardContent className="h-80">
            {hasData && radarData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="75%">
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', fontSize: 12 }} />
                  <RechartsRadar
                    dataKey="score"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.35}
                  />
                  <Tooltip formatter={(v) => `${v}%`} />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-400">
                {hasData ? 'Sem dados suficientes' : 'Envie respostas para gerar o gráfico'}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Comparativo das dimensões"
          subtitle="Percentual de saúde ética por dimensão"
        />
        <CardContent className="h-72">
          {hasData && radarData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={radarData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" opacity={0.2} />
                <XAxis dataKey="subject" tick={{ fontSize: 11 }} interval={0} angle={-20} textAnchor="end" height={60} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => `${v}%`} />
                <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                  {radarData.map((_, i) => (
                    <Cell key={i} fill={i % 2 === 0 ? '#3b64f6' : '#8b5cf6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              Envie respostas para gerar o gráfico
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
