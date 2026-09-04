import { useEffect, useState } from 'react'
import {
  ShieldCheck,
  Inbox,
  CheckCircle2,
  Clock,
  Activity,
  Download,
} from 'lucide-react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
  Legend,
  LineChart,
  Line,
} from 'recharts'
import { Card, CardHeader, CardContent } from '../components/Card'
import { StatCard } from '../components/StatCard'
import { listAllDenuncias } from '../services/denuncias'
import { CATEGORY_LABELS, STATUS_LABELS } from '../types'
import type { Denuncia, Category, DenunciaStatus } from '../types'

const STATUS_COLORS: Record<DenunciaStatus, string> = {
  recebida: '#f59e0b',
  'em-analise': '#3b82f6',
  'em-investigacao': '#8b5cf6',
  resolvida: '#10b981',
}

function downloadCSV(denuncias: Denuncia[]) {
  const header = ['Código', 'Categoria', 'Status', 'Data', 'Descrição']
  const rows = denuncias.map((d) => [
    d.code,
    CATEGORY_LABELS[d.category],
    STATUS_LABELS[d.status],
    new Date(d.createdAt).toLocaleString('pt-BR'),
    `"${(d.description || '').replace(/"/g, '""')}"`,
  ])
  const csv = [header, ...rows]
    .map((r) => r.join(','))
    .join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `denuncias-etheos-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export function AdminDashboard() {
  const [denuncias, setDenuncias] = useState<Denuncia[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    void listAllDenuncias().then((data) => {
      setDenuncias(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <p className="text-center text-gray-500">Carregando estatísticas…</p>
  }

  // Dados por categoria
  const byCategory = (Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => ({
    name: CATEGORY_LABELS[cat],
    value: denuncias.filter((d) => d.category === cat).length,
  })).filter((c) => c.value > 0)

  // Dados por status
  const byStatus = (Object.keys(STATUS_LABELS) as DenunciaStatus[]).map((s) => ({
    name: STATUS_LABELS[s],
    value: denuncias.filter((d) => d.status === s).length,
    color: STATUS_COLORS[s],
  })).filter((s) => s.value > 0)

  // Evolução ao longo do tempo (últimos 7 dias)
  const last7 = Array.from({ length: 7 }).map((_, i) => {
    const day = new Date()
    day.setHours(0, 0, 0, 0)
    day.setDate(day.getDate() - (6 - i))
    const next = new Date(day)
    next.setDate(next.getDate() + 1)
    const count = denuncias.filter((d) => {
      const t = new Date(d.createdAt).getTime()
      return t >= day.getTime() && t < next.getTime()
    }).length
    return {
      name: day.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      denuncias: count,
    }
  })

  const total = denuncias.length
  const resolvidas = denuncias.filter((d) => d.status === 'resolvida').length
  const emAndamento = total - resolvidas
  const resolucao = total > 0 ? Math.round((resolvidas / total) * 100) : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight md:text-3xl">
            <Activity className="h-7 w-7 text-accent-500" /> Estatísticas das Denúncias
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            Visão geral das ocorrências registradas na plataforma.
          </p>
        </div>
        <button
          onClick={() => downloadCSV(denuncias)}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Download className="h-4 w-4" /> Exportar CSV
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total de denúncias" value={total} icon={<Inbox className="h-6 w-6" />} hint="Registros no sistema" />
        <StatCard title="Em andamento" value={emAndamento} icon={<Clock className="h-6 w-6" />} hint="Aguardando conclusão" />
        <StatCard title="Resolvidas" value={resolvidas} icon={<CheckCircle2 className="h-6 w-6" />} hint="Casos concluídos" />
        <StatCard title="Taxa de resolução" value={`${resolucao}%`} icon={<ShieldCheck className="h-6 w-6" />} hint="Resolvidas / total" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Denúncias por categoria" subtitle="Distribuição por tipo de ocorrência" />
          <CardContent className="h-72">
            {byCategory.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byCategory} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#888" opacity={0.2} />
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="value" name="Denúncias" radius={[0, 6, 6, 0]}>
                    {byCategory.map((_, i) => (
                      <Cell key={i} fill={i % 2 === 0 ? '#3b64f6' : '#8b5cf6'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-400">Sem dados</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Denúncias por status" subtitle="Fase de cada ocorrência" />
          <CardContent className="h-72">
            {byStatus.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={byStatus} dataKey="value" nameKey="name" innerRadius="50%" outerRadius="75%" paddingAngle={3} label>
                    {byStatus.map((s, i) => (
                      <Cell key={i} fill={s.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-400">Sem dados</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader title="Evolução das denúncias" subtitle="Ocorrências registradas nos últimos 7 dias" />
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={last7} margin={{ top: 10, right: 20, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" opacity={0.2} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="denuncias" name="Denúncias" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
