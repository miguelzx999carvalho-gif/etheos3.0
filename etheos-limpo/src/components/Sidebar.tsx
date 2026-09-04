import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Scale,
  Megaphone,
  Search,
  Radar,
  UserCircle,
  Info,
  ShieldCheck,
  BarChart3,
  HelpCircle,
  Mail,
  Lock,
} from 'lucide-react'
import { Logo } from './Logo'
import { useAuth } from '../contexts/AuthContext'
import { cn } from '../utils/cn'

const baseNav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/eticacheck', label: 'ÉticaCheck', icon: Scale },
  { to: '/denuncia', label: 'Canal de Denúncia', icon: Megaphone },
  { to: '/rastrear', label: 'Acompanhar', icon: Search },
  { to: '/radar', label: 'Radar de Ética', icon: Radar },
]

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { isAdmin } = useAuth()
  const nav = isAdmin
    ? [
        ...baseNav,
        { to: '/admin/dashboard', label: 'Estatísticas', icon: BarChart3 },
        { to: '/admin/denuncias', label: 'Painel Admin', icon: ShieldCheck },
      ]
    : baseNav

  const footerNav = [
    { to: '/perfil', label: 'Perfil', icon: UserCircle },
    { to: '/sobre', label: 'Sobre o Projeto', icon: Info },
    { to: '/faq', label: 'FAQ', icon: HelpCircle },
    { to: '/contato', label: 'Contato', icon: Mail },
    { to: '/privacidade', label: 'Privacidade', icon: Lock },
  ]

  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-200 bg-white px-4 py-5 dark:border-gray-800 dark:bg-gray-900">
      <div className="px-2">
        <Logo />
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          Menu
        </p>
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-gradient-to-r from-brand-600 to-accent-600 text-white shadow-md shadow-accent-500/20'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}

        <p className="mt-6 px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          Conta
        </p>
        {footerNav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-gradient-to-r from-brand-600 to-accent-600 text-white shadow-md shadow-accent-500/20'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-4 rounded-xl border border-accent-200/60 bg-accent-50 p-3 text-xs text-accent-800 dark:border-accent-900/50 dark:bg-accent-900/20 dark:text-accent-200">
        <p className="font-semibold">Protótipo demonstrativo</p>
        <p className="mt-1">
          Não utilize como canal real de emergência ou denúncia legal.
        </p>
      </div>
    </aside>
  )
}
