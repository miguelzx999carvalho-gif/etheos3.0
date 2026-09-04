import { useState, FormEvent } from 'react'
import { Send, CheckCircle2, Mail, MessageSquare, User, Tag } from 'lucide-react'
import { Card, CardHeader, CardContent } from '../components/Card'
import { submitFeedback } from '../services/feedback'

const subjects = ['Dúvida', 'Sugestão', 'Problema técnico', 'Outro']

export function Contato() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('Dúvida')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Preencha nome, e-mail e mensagem.')
      return
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setError('Informe um e-mail válido.')
      return
    }
    submitFeedback({
      name: name.trim(),
      email: email.trim(),
      subject,
      message: message.trim(),
    })
    setSent(true)
  }

  if (sent) {
    return (
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardContent className="text-center">
            <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h1 className="mt-4 text-2xl font-extrabold tracking-tight">Mensagem enviada!</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Obrigado pelo contato. Sua mensagem foi registrada e nossa equipe dará atenção
              em breve.
            </p>
            <button
              onClick={() => {
                setSent(false)
                setName('')
                setEmail('')
                setMessage('')
              }}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Enviar outra mensagem
            </button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">Fale conosco</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-300">
          Envie dúvidas, sugestões ou reporte problemas. Responderemos o quanto antes.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Enviar mensagem"
            subtitle="Preencha o formulário abaixo"
            icon={<MessageSquare className="h-5 w-5 text-accent-500" />}
          />
          <CardContent>
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-1.5 text-sm font-medium">
                    <User className="h-4 w-4 text-gray-400" /> Nome
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-1.5 text-sm font-medium">
                    <Mail className="h-4 w-4 text-gray-400" /> E-mail
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="voce@exemplo.com"
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-1.5 text-sm font-medium">
                  <Tag className="h-4 w-4 text-gray-400" /> Assunto
                </label>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSubject(s)}
                      className={
                        subject === s
                          ? 'rounded-lg bg-gradient-to-r from-brand-600 to-accent-600 px-3 py-1.5 text-xs font-semibold text-white shadow'
                          : 'rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:border-accent-400 dark:border-gray-600 dark:text-gray-300'
                      }
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium" htmlFor="msg">
                  Mensagem
                </label>
                <textarea
                  id="msg"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder="Escreva sua mensagem…"
                  className="w-full resize-none rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-accent-500/25 transition hover:opacity-90"
              >
                <Send className="h-4 w-4" /> Enviar mensagem
              </button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Informações" icon={<MessageSquare className="h-5 w-5 text-brand-500" />} />
          <CardContent className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
            <p>
              <strong className="text-gray-900 dark:text-gray-100">Projeto demonstrativo.</strong>{' '}
              As mensagens enviadas ficam armazenadas apenas no seu navegador (protótipo).
            </p>
            <p>
              Para um canal real, este formulário seria conectado a um e-mail ou serviço de
              atendimento.
            </p>
            <div className="rounded-xl border border-accent-200 bg-accent-50 p-3 text-xs text-accent-800 dark:border-accent-800 dark:bg-accent-900/20 dark:text-accent-200">
              <strong>Segurança:</strong> em situações de risco ou urgência, procure a
              autoridade competente.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
