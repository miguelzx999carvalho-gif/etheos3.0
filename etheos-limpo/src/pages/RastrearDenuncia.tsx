import { useState, FormEvent } from 'react'
import { Search, FileText, Calendar, MessageSquare } from 'lucide-react'
import { Card, CardHeader, CardContent } from '../components/Card'
import { Badge, statusTone } from '../components/Badge'
import { getDenunciaByCode } from '../services/denuncias'
import { CATEGORY_LABELS, STATUS_LABELS } from '../types'
import type { Denuncia, DenunciaStatus } from '../types'
import { formatDate } from '../utils/format'

const statusSteps = ['recebida', 'em-analise', 'em-investigacao', 'resolvida']

export function RastrearDenuncia() {
  const [code, setCode] = useState('')
  const [denuncia, setDenuncia] = useState<Denuncia | null>(null)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSearched(true)
    if (!code.trim()) {
      setError('Informe o código da denúncia.')
      setDenuncia(null)
      return
    }
    const found = await getDenunciaByCode(code)
    if (!found) {
      setError('Código não encontrado. Verifique e tente novamente.')
      setDenuncia(null)
      return
    }
    setDenuncia(found)
  }

  const currentStep = denuncia ? statusSteps.indexOf(denuncia.status) : -1

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">Acompanhar Denúncia</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-300">
          Insira o código gerado no momento do registro para ver o status.
        </p>
      </div>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Ex.: ETHEOS-48291"
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-3 font-mono text-gray-900 outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-accent-500/25 transition hover:opacity-90"
            >
              <Search className="h-4 w-4" /> Buscar
            </button>
          </form>

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {denuncia && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader
              title="Detalhes da denúncia"
              subtitle={`Código: ${denuncia.code}`}
              icon={<FileText className="h-5 w-5 text-accent-500" />}
            />
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge tone="accent">{CATEGORY_LABELS[denuncia.category]}</Badge>
                <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="h-4 w-4" /> {formatDate(denuncia.createdAt)}
                </span>
              </div>

              <div className="rounded-xl bg-gray-50 p-4 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                {denuncia.description}
              </div>

              {denuncia.message && (
                <div className="rounded-xl border border-accent-200 bg-accent-50 p-4 text-sm text-accent-800 dark:border-accent-800 dark:bg-accent-900/20 dark:text-accent-200">
                  <p className="mb-1 flex items-center gap-2 font-semibold">
                    <MessageSquare className="h-4 w-4" /> Mensagem da equipe
                  </p>
                  {denuncia.message}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Status da denúncia" />
            <CardContent>
              <div className="mb-4 flex items-center gap-2">
                <Badge tone={statusTone[denuncia.status]}>
                  {STATUS_LABELS[denuncia.status]}
                </Badge>
              </div>

              <ol className="space-y-0">
                {statusSteps.map((step, i) => {
                  const stepKey = step as DenunciaStatus
                  const done = i <= currentStep
                  const isCurrent = i === currentStep
                  return (
                    <li key={step} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={
                            done
                              ? 'flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-accent-600 text-white'
                              : 'flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-600'
                          }
                        >
                          {done && (
                            <span className="text-xs font-bold">
                              {i < statusSteps.length - 1 ? '✓' : '★'}
                            </span>
                          )}
                        </div>
                        {i < statusSteps.length - 1 && (
                          <div
                            className={
                              done
                                ? 'w-0.5 flex-1 bg-gradient-to-b from-brand-600 to-accent-600'
                                : 'w-0.5 flex-1 bg-gray-200 dark:bg-gray-700'
                            }
                            style={{ minHeight: '2rem' }}
                          />
                        )}
                      </div>
                      <div className="pb-4">
                        <p
                          className={
                            isCurrent
                              ? 'font-semibold text-brand-700 dark:text-brand-300'
                              : done
                                ? 'font-medium text-gray-900 dark:text-gray-100'
                                : 'text-gray-400 dark:text-gray-500'
                          }
                        >
                          {STATUS_LABELS[stepKey]}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </CardContent>
          </Card>
        </div>
      )}

      {searched && !denuncia && !error && (
        <p className="text-sm text-gray-500 dark:text-gray-400">Nenhum resultado.</p>
      )}
    </div>
  )
}
