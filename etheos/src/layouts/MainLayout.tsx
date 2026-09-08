import { useState } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { TopBar } from '../components/TopBar'
import { useAuth } from '../contexts/AuthContext'

/**
 * Layout principal das páginas autenticadas.
 * Possui sidebar fixa (desktop) + menu deslizante (mobile).
 */
export function MainLayout() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Sidebar desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Sidebar mobile (deslizante) */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 shadow-xl">
            <Sidebar onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar onOpenMenu={() => setMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
