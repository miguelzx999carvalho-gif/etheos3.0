import { useState } from 'react'
import { ShieldCheck, Inbox, RefreshCw } from 'lucide-react'
import { Card, CardHeader, CardContent } from '../components/Card'
import { Badge, statusTone } from '../components/Badge'
import {
  listAllDenuncias,
  updateDenunciaStatus,
} from '../services/denuncias'
import { CATEGORY_LABELS, STATUS_LABELS } from '../types'
import type { Denuncia, DenunciaStatus } from '../types'
import { formatDate } from '../utils/format'

const statusOptions: DenunciaStatus[] = ['recebida', 'em-analise', 'em-investigacao', 'resolvida']

export function AdminDenuncias() {
  const [denuncias, setDenuncias] = useState<Denuncia[]>(() => listAllDenuncias())
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  const selected = denuncias.find((d) => d.id === selectedId) ?? null

  function refresh() {
    setDenuncias(listAllDenuncias())
  }

  function handleStatusChange(id: string, status: DenunciaStatus) {
    const updated = updateDenunciaStatus(id, status, message.trim() || undefined)
    if (updated) {
      setDenuncias(listAllDenuncias())
      setMessage('')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight md:text-3xl">
            <ShieldCheck className="h-7 w-7 text-accent-500" /> Painel do Administrador
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            Visualize e atualize o status das denúncias registradas.
          </p>
        </div>
        <button
          onClick={refresh}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <RefreshCw className="h-4 w-4" /> Atualizar
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Lista */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader
              title="Denúncias recebidas"
              subtitle={`${denuncias.length} registro(s) no total`}
              icon={<Inbox className="h-5 w-5 text-accent-500" />}
            />
            <CardContent>
              {denuncias.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  Nenhuma denúncia registrada ainda.
                </p>
              ) : (
                <ul className="space-y-3">
                  {denuncias.map((d) => (
                    <li
                      key={d.id}
                      onClick={() => setSelectedId(d.id)}
                      className={
                        selectedId === d.id
                          ? 'cursor-pointer rounded-xl border-2 border-accent-500 bg-accent-50/50 p-4 dark:bg-accent-900/10'
                          : 'cursor-pointer rounded-xl border border-gray-200 p-4 transition hover:border-accent-300 dark:border-gray-700'
                      }
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm font-bold">{d.code}</span>
                        <Badge tone={statusTone[d.status]}>{STATUS_LABELS[d.status]}</Badge>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <Badge tone="accent">{CATEGORY_LABELS[d.category]}</Badge>
                        <span>{formatDate(d.createdAt)}</span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                        {d.description}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Detalhe + ações */}
        <Card>
          <CardHeader
            title="Gerenciar denúncia"
            subtitle={selected ? selected.code : 'Selecione uma denúncia'}
          />
          <CardContent>
            {!selected ? (
              <p className="py-8 text-center text-sm text-gray-400">
                Clique em uma denúncia para gerenciar o status.
              </p>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Categoria
                  </p>
                  <Badge tone="accent" className="mt-1">{CATEGORY_LABELS[selected.category]}</Badge>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Descrição
                  </p>
                  <p className="mt-1 rounded-xl bg-gray-50 p-3 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                    {selected.description}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Novo status
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {statusOptions.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleStatusChange(selected.id, s)}
                        className={
                          selected.status === s
                            ? 'rounded-lg bg-gradient-to-r from-brand-600 to-accent-600 px-3 py-1.5 text-xs font-semibold text-white shadow'
                            : 'rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:border-accent-400 dark:border-gray-600 dark:text-gray-300'
                        }
                      >
                        {STATUS_LABELS[s]}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Mensagem para o denunciante (opcional)
                  </p>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="mt-2 w-full resize-none rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-900 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    placeholder="Ex.: Estamos avaliando o caso..."
                  />
                  <button
                    onClick={() => handleStatusChange(selected.id, selected.status)}
                    className="mt-2 w-full rounded-xl border border-gray-300 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Salvar mensagem
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border border-accent-200 bg-accent-50 p-4 text-sm text-accent-800 dark:border-accent-800 dark:bg-accent-900/20 dark:text-accent-200">
        <strong>Segurança no protótipo:</strong> somente o papel administrador pode listar e
        alterar denúncias. Em produção, isso seria reforçado com Row-Level Security no banco de
        dados. Usuários comuns jamais enxergam denúncias de outras pessoas.
      </div>
    </div>
  )
}
