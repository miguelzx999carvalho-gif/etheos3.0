import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Send, ArrowLeft, MailCheck } from 'lucide-react'
import { Logo } from '../components/Logo'
import { resetPassword } from '../services/auth'

export function RecuperarSenha() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await resetPassword(email)
    setLoading(false)
    if (result.ok) {
      setSuccess(true)
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
                <MailCheck className="h-7 w-7" />
              </div>
              <h1 className="mt-4 text-center text-2xl font-extrabold tracking-tight">
                Verifique seu e-mail
              </h1>
              <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
                Enviamos um link de redefinição de senha para{' '}
                <strong>{email}</strong>. Abra o e-mail e clique no link para definir uma nova
                senha.
              </p>
              <Link
                to="/login"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-accent-500/30 transition hover:opacity-90"
              >
                Voltar para o login
              </Link>
            </>
          ) : (
            <>
              <h1 className="text-center text-2xl font-extrabold tracking-tight">
                Recuperar senha
              </h1>
              <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                Informe seu e-mail e enviaremos um link para redefinir sua senha.
              </p>

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

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-accent-500/30 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="h-5 w-5" /> {loading ? 'Enviando...' : 'Enviar link'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
