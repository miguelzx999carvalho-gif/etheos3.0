import { Lock, ShieldCheck, Database, Eye } from 'lucide-react'
import { Card, CardHeader, CardContent } from '../components/Card'

export function Privacidade() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight md:text-3xl">
          <Lock className="h-7 w-7 text-accent-500" /> Política de Privacidade
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-300">
          Transparência sobre como o ETHEOS trata os dados nesta versão demonstrativa.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Visão geral" icon={<ShieldCheck className="h-5 w-5 text-accent-500" />} />
          <CardContent className="space-y-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            <p>
              O ETHEOS é um <strong>projeto demonstrativo (protótipo)</strong>. Nesta versão,
              os dados são armazenados no <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs dark:bg-gray-800">localStorage</code> do seu próprio navegador,
              o que significa que não são enviados para servidores externos e ficam restritos
              ao dispositivo que você utiliza.
            </p>
            <p>
              <strong>O que coletamos:</strong> nome, e-mail e senha (para a conta de
              demonstração), denúncias por você registradas e respostas aos questionários
              (ÉticaCheck e Radar de Ética).
            </p>
            <p>
              <strong>Radar de Ética:</strong> suas respostas são anônimas e não ficam
              vinculadas ao seu nome de usuário.
            </p>
            <p>
              <strong>Seus direitos (LGPD):</strong> por serem dados locais, você pode apagar
              tudo a qualquer momento limpando os dados de navegação do seu navegador, o que
              remove contas, denúncias e respostas.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader title="Armazenamento" icon={<Database className="h-5 w-5 text-brand-500" />} />
            <CardContent className="text-sm text-gray-600 dark:text-gray-300">
              <p>
                Os dados ficam apenas no seu navegador. Se o navegador limpar os dados (ou
                você trocar de dispositivo), as informações são perdidas.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Privacidade" icon={<Eye className="h-5 w-5 text-emerald-500" />} />
            <CardContent className="text-sm text-gray-600 dark:text-gray-300">
              <p>
                Este protótipo não garante anonimato absoluto. Em uma versão com banco de
                dados real, metadados como IP podem ficar registrados. Mantemos a
                transparência neste aviso.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="rounded-xl border border-accent-200 bg-accent-50 p-4 text-sm text-accent-800 dark:border-accent-800 dark:bg-accent-900/20 dark:text-accent-200">
        <strong>Aviso:</strong> ao conectar um backend (ex.: Supabase), consulte a seção de
        Segurança do README para configurar políticas de acesso e retenção em conformidade
        com a LGPD.
      </div>
    </div>
  )
}
