import { Navigate, Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { useAuth } from './contexts/AuthContext'
import { AgentExplore } from './pages/AgentExplore'
import { AgentShopCheckIn } from './pages/AgentShopCheckIn'
import { Login } from './pages/Login'
import { OwnerOnboarding } from './pages/OwnerOnboarding'
import { ShopDetail } from './pages/ShopDetail'
import { ShopDirectory } from './pages/ShopDirectory'
import { SignUp } from './pages/SignUp'

function RequireRole({ role, children }: { role: 'shop_owner' | 'agent'; children: React.ReactNode }) {
  const { user, profile, loading } = useAuth()
  if (loading) return <div className="mx-auto max-w-3xl px-5 py-10 text-mute">Loading…</div>
  if (!user) return <Navigate to="/login" replace />
  if (profile && profile.role !== role) {
    return (
      <div className="mx-auto max-w-lg px-5 py-10 text-mute">
        This page is for {role === 'shop_owner' ? 'shop owners' : 'agents'} only.
      </div>
    )
  }
  return <>{children}</>
}

function App() {
  return (
    <div className="min-h-screen bg-void">
      <NavBar />
      <Routes>
        <Route path="/" element={<ShopDirectory />} />
        <Route path="/shop/:slug" element={<ShopDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/owner"
          element={
            <RequireRole role="shop_owner">
              <OwnerOnboarding />
            </RequireRole>
          }
        />
        <Route
          path="/agent"
          element={
            <RequireRole role="agent">
              <AgentExplore />
            </RequireRole>
          }
        />
        <Route
          path="/agent/shop/:slug"
          element={
            <RequireRole role="agent">
              <AgentShopCheckIn />
            </RequireRole>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
