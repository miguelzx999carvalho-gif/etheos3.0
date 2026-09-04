import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { MainLayout } from './layouts/MainLayout'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Sobre } from './pages/Sobre'
import { Dashboard } from './pages/Dashboard'
import { EticaCheck } from './pages/EticaCheck'
import { Denuncia } from './pages/Denuncia'
import { RastrearDenuncia } from './pages/RastrearDenuncia'
import { Radar } from './pages/Radar'
import { Perfil } from './pages/Perfil'
import { AdminDenuncias } from './pages/AdminDenuncias'
import { AdminDashboard } from './pages/AdminDashboard'
import { FAQ } from './pages/FAQ'
import { Contato } from './pages/Contato'
import { Privacidade } from './pages/Privacidade'
import { RequireAdmin } from './components/RequireAdmin'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          {/* Páginas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/privacidade" element={<Privacidade />} />

          {/* Páginas autenticadas */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/eticacheck" element={<EticaCheck />} />
            <Route path="/denuncia" element={<Denuncia />} />
            <Route path="/rastrear" element={<RastrearDenuncia />} />
            <Route path="/radar" element={<Radar />} />
            <Route path="/perfil" element={<Perfil />} />
            {/* Área administrativa (somente admin) */}
            <Route
              path="/admin/denuncias"
              element={
                <RequireAdmin>
                  <AdminDenuncias />
                </RequireAdmin>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <RequireAdmin>
                  <AdminDashboard />
                </RequireAdmin>
              }
            />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}
