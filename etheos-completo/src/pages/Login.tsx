import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, LogIn, ArrowLeft } from 'lucide-react'
import { Logo } from '../components/Logo'
import { useAuth } from '../contexts/AuthContext'

export function Login() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')

  if (isAuthenticated) {
    navigate('/dashboard', { replace: true })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    const result = login(email, password)
    if (result.ok) {
      navigate('/dashboard')
    } else {
      setError(result.message)
    }
  }

  function fillAdmin() {
    setEmail('admin@etheos.com')
    setPassword('admin123')
    setInfo('Preenchemos as credenciais do administrador de demonstração.')
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 px-4 dark:bg-gray-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-accent-500/15 blur-3xl" />
        <div className="absolute bottom-0 -left-24 h-96 w-96 rounded-full bg-brand-600/15 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar ao início
        </Link>

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-6 flex justify-center">
            <Logo />
          </div>
          <h1 className="text-center text-2xl font-extrabold tracking-tight">Acessar sua conta</h1>
          <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            Entre para treinar ética e acompanhar sua jornada.
          </p>

          {info && (
            <div className="mt-4 rounded-lg bg-accent-50 px-4 py-2 text-sm text-accent-800 dark:bg-accent-900/20 dark:text-accent-200">
              {info}
            </div>
          )}
          {error && (
            <div className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium" htmlFor="email">
                E-mail
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-11 pr-3 text-gray-900 outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="voce@empresa.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium" htmlFor="password">
                Senha
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-11 pr-3 text-gray-900 outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-accent-500/30 transition hover:opacity-90"
            >
              <LogIn className="h-5 w-5" /> Entrar
            </button>
          </form>

          <button
            onClick={fillAdmin}
            className="mt-3 w-full rounded-xl border border-dashed border-gray-300 py-2.5 text-sm font-medium text-gray-500 hover:border-accent-400 hover:text-accent-600 dark:border-gray-700 dark:text-gray-400"
          >
            Usar conta de demonstração (Admin)
          </button>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Não tem conta?{' '}
            <Link to="/register" className="font-semibold text-brand-600 hover:text-accent-600 dark:text-brand-300">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
