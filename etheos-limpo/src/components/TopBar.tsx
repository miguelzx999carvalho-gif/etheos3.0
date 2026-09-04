import { Menu, Moon, Sun, LogOut, UserCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { Link } from 'react-router-dom'

export function TopBar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { user, isAdmin, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMenu}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden dark:text-gray-300 dark:hover:bg-gray-800"
          aria-label="Abrir menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="text-sm">
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            {user?.name ?? 'Visitante'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {isAdmin ? 'Administrador' : 'Colaborador'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={toggleTheme}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          aria-label="Alternar tema"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <Link
          to="/perfil"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          aria-label="Perfil"
        >
          <UserCircle className="h-6 w-6" />
        </Link>
        <button
          onClick={logout}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 dark:text-gray-300 dark:hover:bg-red-900/20 dark:hover:text-red-400"
          aria-label="Sair"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
