import { useState, FormEvent, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, KeyRound, ArrowLeft } from 'lucide-react'
import { Logo } from '../components/Logo'
import { updatePassword } from '../services/auth'
import { supabase } from '../services/supabase'

export function AtualizarSenha() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // O usuário chega aqui via link de redefinição (com sessão de recovery).
    supabase.auth.getSession().then(({ data }) => {
      setReady(!!data.session)
    })
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (password.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres.')
      return
    }
    if (password !== confirm) {
      setError('As senhas não conferem.')
      return
    }
    setLoading(true)
    const result = await updatePassword(password)
    setLoading(false)
    if (result.ok) {
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2000)
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 px-4 dark:bg-gray-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-accent-500/15 blur-3xl" />
        <div className="absolute bottom-0 -left-24 h-96 w-96 rounded-full bg-brand-600/15 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <Link
          to="/login"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar ao login
        </Link>

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-6 flex justify-center">
            <Logo />
          </div>

          {success ? (
            <>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300">
                <KeyRound className="h-7 w-7" />
              </div>
              <h1 className="mt-4 text-center text-2xl font-extrabold tracking-tight">
                Senha atualizada!
              </h1>
              <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
                Redirecionando para o login...
              </p>
            </>
          ) : !ready ? (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Link inválido ou expirado. Solicite um novo link de recuperação.
            </p>
          ) : (
            <>
              <h1 className="text-center text-2xl font-extrabold tracking-tight">
                Definir nova senha
              </h1>
              <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                Escolha uma nova senha para sua conta.
              </p>

              {error && (
                <div className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium" htmlFor="password">
                    Nova senha
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
                      placeholder="Mínimo 6 caracteres"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium" htmlFor="confirm">
                    Confirmar nova senha
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      id="confirm"
                      type="password"
                      required
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-11 pr-3 text-gray-900 outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                      placeholder="Repita a nova senha"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-accent-500/30 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <KeyRound className="h-5 w-5" /> {loading ? 'Salvando...' : 'Salvar nova senha'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
