import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { MainLayout } from './layouts/MainLayout'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { RecuperarSenha } from './pages/RecuperarSenha'
import { AtualizarSenha } from './pages/AtualizarSenha'
import { Sobre } from './pages/Sobre'
import { Dashboard } from './pages/Dashboard'
import { EticaCheck } from './pages/EticaCheck'
import { Denuncia } from './pages/Denuncia'
import { RastrearDenuncia } from './pages/RastrearDenuncia'
import { Radar } from './pages/Radar'
import { Perfil } from './pages/Perfil'
import { AdminDenuncias } from './pages/AdminDenuncias'
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
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route path="/atualizar-senha" element={<AtualizarSenha />} />
          <Route path="/sobre" element={<Sobre />} />

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
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}
