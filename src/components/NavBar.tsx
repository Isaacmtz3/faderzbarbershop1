import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function NavBar() {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-void/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="font-display text-xl font-bold tracking-tight text-bone">
          Lobby
        </Link>

        <nav className="flex items-center gap-2 text-sm">
          <Link to="/" className="rounded px-3 py-2 text-mute transition-colors hover:text-bone">
            Browse shops
          </Link>

          {!user && (
            <>
              <Link to="/login" className="rounded px-3 py-2 text-mute transition-colors hover:text-bone">
                Sign in
              </Link>
              <Link
                to="/signup"
                className="rounded bg-brand px-4 py-2 font-medium text-bone transition-colors hover:bg-brandBright"
              >
                Sign up
              </Link>
            </>
          )}

          {user && profile?.role === 'shop_owner' && (
            <Link to="/owner" className="rounded px-3 py-2 text-mute transition-colors hover:text-bone">
              My shop
            </Link>
          )}

          {user && profile?.role === 'agent' && (
            <Link to="/agent" className="rounded px-3 py-2 text-mute transition-colors hover:text-bone">
              Agent tools
            </Link>
          )}

          {user && (
            <button
              onClick={handleSignOut}
              className="rounded px-3 py-2 text-mute transition-colors hover:text-bone"
            >
              Sign out
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
