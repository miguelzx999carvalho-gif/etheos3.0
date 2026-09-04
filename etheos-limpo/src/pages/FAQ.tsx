import { useState } from 'react'
import { HelpCircle, ChevronDown, MessageCircle, ShieldCheck } from 'lucide-react'
import { Card } from '../components/Card'
import { cn } from '../utils/cn'
import { Link } from 'react-router-dom'

const faqs = [
  {
    q: 'O que é o ETHEOS?',
    a: 'O ETHEOS é uma plataforma de cultura ética que reúne treinamento de decisões (ÉticaCheck), um canal de denúncia com acompanhamento por código e um radar anônimo do clima organizacional.',
  },
  {
    q: 'Como funciona o Canal de Denúncia?',
    a: 'Você registra uma ocorrência escolhendo a categoria e descrevendo o ocorrido. Um código único (ex.: ETHEOS-48291) é gerado e você pode acompanhar o status a qualquer momento pela tela "Acompanhar".',
  },
  {
    q: 'Minha denúncia é anônima?',
    a: 'A identidade não é exibida na denúncia. No protótipo, os dados ficam no localStorage do navegador. Para um canal real, acesse a área de Segurança no README, que explica como usar Supabase com políticas de acesso por usuário.',
  },
  {
    q: 'O que é o Radar de Ética?',
    a: 'É um questionário anônimo sobre o clima ético da organização. Suas respostas não ficam vinculadas ao seu nome e alimentam gráficos que mostram o índice geral e por dimensão.',
  },
  {
    q: 'Como funciona o ÉticaCheck?',
    a: 'Você resolve situações éticas do dia a dia, escolhe a melhor atitude e recebe uma explicação com valores, consequências e pontuação. Seu progresso é salvo automaticamente.',
  },
  {
    q: 'Posso editar meu perfil e senha?',
    a: 'Sim. Na página "Perfil" você pode atualizar seu nome, e-mail e senha.',
  },
  {
    q: 'Este é um canal oficial de denúncia ou emergência?',
    a: 'Não. Este é um projeto demonstrativo (protótipo). Para situações de risco ou urgência, procure sempre a autoridade competente ou os canais oficiais da sua organização.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight md:text-3xl">
          <HelpCircle className="h-7 w-7 text-accent-500" /> Perguntas Frequentes
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-300">
          Respostas rápidas sobre as funcionalidades do ETHEOS.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i
          return (
            <Card
              key={i}
              className={cn('cursor-pointer transition', isOpen && 'border-accent-300 dark:border-accent-700')}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
              >
                <span className="font-semibold text-gray-900 dark:text-gray-100">{f.q}</span>
                <ChevronDown
                  className={cn('h-5 w-5 shrink-0 text-accent-500 transition-transform', isOpen && 'rotate-180')}
                />
              </button>
              {isOpen && (
                <p className="px-5 pb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{f.a}</p>
              )}
            </Card>
          )
        })}
      </div>

      <Card className="flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-600 text-white">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold">Ainda tem dúvidas?</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Fale com a equipe pela página de contato.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/contato"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-accent-500/25 transition hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" /> Entrar em contato
          </Link>
          <Link
            to="/sobre"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <ShieldCheck className="h-4 w-4" /> Sobre o projeto
          </Link>
        </div>
      </Card>
    </div>
  )
}
