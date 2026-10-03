import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function NavBar() {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleSignOut() {
    setMenuOpen(false)
    await signOut()
    navigate('/')
  }

  const linkClass = 'rounded px-3 py-2 text-mute transition-colors hover:text-bone sm:text-left'

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-void/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="font-display text-xl font-bold tracking-tight text-bone" onClick={() => setMenuOpen(false)}>
          Lobby
        </Link>

        <nav className="hidden items-center gap-2 text-sm sm:flex">
          <Link to="/" className={linkClass}>
            Browse shops
          </Link>
          <Link to="/agent" className={linkClass}>
            Agent tools
          </Link>

          {!user && (
            <>
              <Link to="/login" className={linkClass}>
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
            <Link to="/owner" className={linkClass}>
              My shop
            </Link>
          )}

          {user && (
            <button onClick={handleSignOut} className={linkClass}>
              Sign out
            </button>
          )}
        </nav>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded border border-line text-bone sm:hidden"
          aria-label="Menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-line px-5 py-3 text-sm sm:hidden">
          <Link to="/" className={linkClass} onClick={() => setMenuOpen(false)}>
            Browse shops
          </Link>
          <Link to="/agent" className={linkClass} onClick={() => setMenuOpen(false)}>
            Agent tools
          </Link>

          {!user && (
            <>
              <Link to="/login" className={linkClass} onClick={() => setMenuOpen(false)}>
                Sign in
              </Link>
              <Link
                to="/signup"
                className="rounded bg-brand px-3 py-2 text-center font-medium text-bone"
                onClick={() => setMenuOpen(false)}
              >
                Sign up
              </Link>
            </>
          )}

          {user && profile?.role === 'shop_owner' && (
            <Link to="/owner" className={linkClass} onClick={() => setMenuOpen(false)}>
              My shop
            </Link>
          )}

          {user && (
            <button onClick={handleSignOut} className={`${linkClass} text-left`}>
              Sign out
            </button>
          )}
        </nav>
      )}
    </header>
  )
}
