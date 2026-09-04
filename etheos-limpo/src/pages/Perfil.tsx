import { useState, FormEvent } from 'react'
import { UserCircle, Mail, Lock, Save, ShieldCheck } from 'lucide-react'
import { Card, CardHeader, CardContent } from '../components/Card'
import { useAuth } from '../contexts/AuthContext'
import { updateUserProfile } from '../services/auth'
import { formatDateLong } from '../utils/format'

export function Perfil() {
  const { user, refresh, isAdmin } = useAuth()
  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setMessage('')
    if (!user) return
    const data: { name?: string; email?: string; password?: string } = {}
    if (name !== user.name) data.name = name
    if (email !== user.email) data.email = email
    if (password) {
      if (password.length < 6) {
        setError('A nova senha deve ter pelo menos 6 caracteres.')
        return
      }
      data.password = password
    }
    const result = updateUserProfile(user.id, data)
    if (result.ok) {
      setPassword('')
      setMessage(result.message)
      refresh()
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">Perfil</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-300">
          Gerencie suas informações de acesso.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardContent className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-accent-600 text-white">
              <UserCircle className="h-12 w-12" />
            </div>
            <p className="mt-3 text-lg font-bold">{user?.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold text-accent-800 dark:bg-accent-900/40 dark:text-accent-200">
              <ShieldCheck className="h-3.5 w-3.5" />
              {isAdmin ? 'Administrador' : 'Colaborador'}
            </span>
            {user && (
              <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
                Membro desde {formatDateLong(user.createdAt)}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader
            title="Editar informações"
            subtitle="Atualize seus dados de conta"
            icon={<UserCircle className="h-5 w-5 text-accent-500" />}
          />
          <CardContent>
            {message && (
              <div className="mb-4 rounded-lg bg-emerald-50 px-4 py-2 text-sm text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
                {message}
              </div>
            )}
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="name">
                  Nome
                </label>
                <div className="relative">
                  <UserCircle className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-11 pr-3 text-gray-900 outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="email">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-11 pr-3 text-gray-900 outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="password">
                  Nova senha
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Deixe em branco para manter"
                    className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-11 pr-3 text-gray-900 outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-accent-500/25 transition hover:opacity-90"
              >
                <Save className="h-4 w-4" /> Salvar alterações
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
