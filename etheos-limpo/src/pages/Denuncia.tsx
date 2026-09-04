import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Megaphone, Send, ShieldCheck, Search, CheckCircle2, AlertTriangle } from 'lucide-react'
import { Card, CardHeader, CardContent } from '../components/Card'
import { useAuth } from '../contexts/AuthContext'
import { createDenuncia } from '../services/denuncias'
import { CATEGORY_LABELS } from '../types'
import type { Category, Denuncia } from '../types'

const categories = Object.entries(CATEGORY_LABELS) as [Category, string][]

export function Denuncia() {
  const { user } = useAuth()
  const [category, setCategory] = useState<Category | ''>('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState<Denuncia | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (!category) {
      setError('Selecione uma categoria para a denúncia.')
      return
    }
    if (description.trim().length < 20) {
      setError('Descreva o ocorrido com pelo menos 20 caracteres.')
      return
    }
    const denuncia = await createDenuncia(category, description.trim(), user?.id)
    setResult(denuncia)
    setCategory('')
    setDescription('')
  }

  // Tela de sucesso com código gerado
  if (result) {
    return (
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardContent className="text-center">
            <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h1 className="mt-4 text-2xl font-extrabold tracking-tight">Denúncia registrada</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Seu código de acompanhamento é:
            </p>
            <div className="mx-auto mt-4 w-fit rounded-xl border-2 border-dashed border-accent-400 bg-accent-50 px-6 py-3 dark:border-accent-600 dark:bg-accent-900/20">
              <span className="text-2xl font-extrabold tracking-widest text-accent-700 dark:text-accent-200">
                {result.code}
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Guarde este código para acompanhar o status da denúncia.
            </p>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/rastrear"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-accent-500/25 transition hover:opacity-90"
              >
                <Search className="h-4 w-4" /> Acompanhar agora
              </Link>
              <button
                onClick={() => setResult(null)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Nova denúncia
              </button>
            </div>

            <div className="mt-6 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-left text-xs text-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                <strong>Projeto demonstrativo.</strong> Este canal não é um serviço real de
                denúncia nem de emergência. Em situação de risco ou urgência, procure a
                autoridade competente.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">Canal de Denúncia</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            Registre uma ocorrência de forma segura. Um código único será gerado para
            acompanhamento.
          </p>
        </div>

        <Card className="mt-5">
          <CardHeader
            title="Registrar denúncia"
            subtitle="Preencha os dados abaixo com o máximo de detalhes que se sentir confortável"
            icon={<Megaphone className="h-5 w-5 text-accent-500" />}
          />
          <CardContent>
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">Categoria</label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {categories.map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setCategory(value)}
                      className={
                        category === value
                          ? 'rounded-xl border-2 border-accent-500 bg-accent-50 px-3 py-2 text-sm font-semibold text-accent-700 dark:bg-accent-900/20 dark:text-accent-200'
                          : 'rounded-xl border border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 hover:border-accent-300 dark:border-gray-700 dark:text-gray-300'
                      }
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium" htmlFor="desc">
                  Descrição do ocorrido
                </label>
                <textarea
                  id="desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  required
                  placeholder="Descreva o que aconteceu, quando, com quem, e o impacto..."
                  className="w-full resize-none rounded-xl border border-gray-300 bg-white p-3 text-gray-900 outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                  {description.trim().length} caracteres (mínimo 20)
                </p>
              </div>

              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <p className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  Sua identidade não é exibida na denúncia.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-accent-500/25 transition hover:opacity-90"
                >
                  <Send className="h-4 w-4" /> Enviar denúncia
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent>
            <h3 className="font-bold">Como funciona</h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-gray-600 dark:text-gray-300">
              <li>Escolha a categoria da ocorrência.</li>
              <li>Descreva o ocorrido com detalhes.</li>
              <li>Receba um código único (ex.: ETHEOS-48291).</li>
              <li>Acompanhe o status a qualquer momento.</li>
            </ol>
          </CardContent>
        </Card>

        <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>
            <strong>Demo:</strong> os dados ficam apenas no seu navegador. Não é um canal
            oficial nem de emergência. Para situações graves, acione as autoridades.
          </p>
        </div>
      </div>
    </div>
  )
}
