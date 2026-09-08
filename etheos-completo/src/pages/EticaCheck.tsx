import { useState } from 'react'
import {
  Scale,
  CheckCircle2,
  Lightbulb,
  AlertTriangle,
  ChevronRight,
  RotateCcw,
  Lock,
} from 'lucide-react'
import { Card, CardHeader, CardContent } from '../components/Card'
import { Badge } from '../components/Badge'
import { cn } from '../utils/cn'
import {
  listScenarios,
  saveAnswer,
  getProgress,
  getAnsweredIds,
  hasAnswered,
} from '../services/eticacheck'
import { SCENARIO_CATEGORY_LABELS } from '../types'
import type { EticaScenario } from '../types'

export function EticaCheck() {
  const scenarios = listScenarios()
  const [answeredIds, setAnsweredIds] = useState<string[]>(getAnsweredIds())
  const [progress, setProgress] = useState(getProgress())
  const [current, setCurrent] = useState<EticaScenario | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)

  const unanswered = scenarios.filter((s) => !answeredIds.includes(s.id))

  function openScenario(s: EticaScenario) {
    setCurrent(s)
    setSelected(null)
    setRevealed(false)
  }

  function handleSelect(index: number) {
    if (revealed) return
    setSelected(index)
    setRevealed(true)
    saveAnswer(current!.id, index)
    setAnsweredIds(getAnsweredIds())
    setProgress(getProgress())
  }

  function nextScenario() {
    const remaining = scenarios.filter((s) => s.id !== current!.id && !answeredIds.includes(s.id))
    if (remaining.length > 0) {
      openScenario(remaining[0])
    } else {
      setCurrent(null)
    }
  }

  // Seleção de situação
  if (!current) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">ÉticaCheck</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            Decida o que você faria em situações reais do trabalho e aprenda com o resultado.
          </p>
        </div>

        <Card>
          <CardContent>
            <div className="mb-3 flex items-end justify-between">
              <span className="text-3xl font-extrabold">{progress.percentage}%</span>
              <Badge tone={progress.percentage >= 70 ? 'green' : progress.percentage >= 50 ? 'amber' : 'gray'}>
                Nível: {progress.scoreLevel}
              </Badge>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              {progress.answeredCount} de {progress.totalCount} situações concluídas ·{' '}
              {progress.totalPoints}/{progress.maxPoints} pontos
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {scenarios.map((s) => {
            const done = answeredIds.includes(s.id)
            return (
              <Card key={s.id} className={cn('transition hover:border-accent-400', done && 'opacity-80')}>
                <CardContent>
                  <div className="mb-3 flex items-center justify-between">
                    <Badge tone="accent">{SCENARIO_CATEGORY_LABELS[s.category]}</Badge>
                    {done && (
                      <Badge tone="green">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Concluída
                      </Badge>
                    )}
                  </div>
                  <p className="font-semibold">{s.title}</p>
                  <button
                    onClick={() => openScenario(s)}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-700 hover:bg-brand-100 dark:bg-brand-900/30 dark:text-brand-200 dark:hover:bg-brand-900/50"
                  >
                    {done ? 'Rever situação' : 'Responder'} <ChevronRight className="h-4 w-4" />
                  </button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {unanswered.length === 0 && (
          <Card>
            <CardContent className="text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />
              <p className="mt-3 text-lg font-bold">Parabéns! Você concluiu todas as situações.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Continue praticando para manter o hábito ético.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  const selectedOption = selected !== null ? current.options[selected] : null

  // Resolução da situação
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrent(null)}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <RotateCcw className="h-4 w-4" /> Voltar
        </button>
        <Badge tone="accent">{SCENARIO_CATEGORY_LABELS[current.category]}</Badge>
      </div>

      <Card>
        <CardHeader
          title={current.title}
          icon={<Scale className="h-5 w-5 text-accent-500" />}
        />
        <CardContent>
          <div className="rounded-xl border-l-4 border-brand-500 bg-brand-50 p-4 text-gray-800 dark:bg-brand-900/20 dark:text-gray-200">
            <p className="font-medium">{current.situation}</p>
          </div>

          <div className="mt-5 space-y-3">
            {current.options.map((opt, i) => {
              const isSelected = selected === i
              const isCorrect = opt.isBest
              const showResult = revealed && isSelected

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={revealed}
                  className={cn(
                    'flex w-full items-start gap-3 rounded-xl border p-4 text-left transition',
                    !revealed && 'hover:border-accent-400 hover:bg-accent-50/50 dark:hover:bg-accent-900/10',
                    isSelected && !isCorrect && 'border-red-400 bg-red-50 dark:border-red-700 dark:bg-red-900/20',
                    isSelected && isCorrect && 'border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-900/20',
                    !isSelected && revealed && 'opacity-60',
                  )}
                >
                  <span className="text-sm">{String.fromCharCode(65 + i)}.</span>
                  <span className="text-sm font-medium">{opt.text}</span>
                  {showResult && (
                    <span className="ml-auto">
                      {isCorrect ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      )}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {revealed && selectedOption && (
            <div className="mt-6 space-y-4">
              <div
                className={cn(
                  'rounded-xl border p-4',
                  selectedOption.isBest
                    ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20'
                    : 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-900/20',
                )}
              >
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-2 font-bold">
                    {selectedOption.isBest ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    )}
                    {selectedOption.isBest ? 'Excelente decisão!' : 'Essa não é a atitude mais ética'}
                  </p>
                  <Badge tone={selectedOption.isBest ? 'green' : 'red'}>
                    +{selectedOption.points} pontos
                  </Badge>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
                <p className="flex items-center gap-2 font-semibold">
                  <Lightbulb className="h-5 w-5 text-amber-500" /> Qual seria a atitude mais ética?
                </p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{current.explanation}</p>
              </div>

              <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
                <p className="font-semibold">Valores envolvidos</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {current.values.map((v) => (
                    <Badge key={v} tone="accent">{v}</Badge>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
                <p className="font-semibold">Possíveis consequências</p>
                <ul className="mt-2 space-y-1.5">
                  {current.consequences.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 p-4 text-white">
                <p className="flex items-center gap-2 font-semibold">
                  <Lock className="h-5 w-5" /> Privacidade do aprendizado
                </p>
                <p className="mt-1 text-sm text-white/90">
                  No protótipo, seu progresso fica salvo localmente no seu navegador.
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={nextScenario}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-accent-500/25 transition hover:opacity-90"
                >
                  {hasAnswered(current.id) ? 'Próxima situação' : 'Próxima situação'} <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
