import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { useAuth } from './contexts/AuthContext'
import { AgentExplore } from './pages/AgentExplore'
import { AgentShopCheckIn } from './pages/AgentShopCheckIn'
import { Landing } from './pages/Landing'
import { Login } from './pages/Login'
import { OwnerOnboarding } from './pages/OwnerOnboarding'
import { ShopDetail } from './pages/ShopDetail'
import { ShopDirectory } from './pages/ShopDirectory'
import { SignUp } from './pages/SignUp'

function RequireRole({ role, children }: { role: 'shop_owner'; children: React.ReactNode }) {
  const { user, profile, loading } = useAuth()
  if (loading) return <div className="mx-auto max-w-3xl px-5 py-10 text-mute">Loading…</div>
  if (!user) return <Navigate to="/login" replace />
  if (profile && profile.role !== role) {
    return <div className="mx-auto max-w-lg px-5 py-10 text-mute">This page is for shop owners only.</div>
  }
  return <>{children}</>
}

/** "/" is the marketing landing page for new visitors, but a returning
 * signed-in user should never see a signup funnel again — send them
 * straight into the app. */
function RootRoute() {
  const { user, loading } = useAuth()
  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-void text-mute">Loading…</div>
  }
  if (user) return <Navigate to="/browse" replace />
  return <Landing />
}

function AppLayout() {
  return (
    <div className="min-h-screen bg-void">
      <NavBar />
      <Outlet />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRoute />} />

      <Route element={<AppLayout />}>
        <Route path="/browse" element={<ShopDirectory />} />
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
        <Route path="/agent" element={<AgentExplore />} />
        <Route path="/agent/shop/:slug" element={<AgentShopCheckIn />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
