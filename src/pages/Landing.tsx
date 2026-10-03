import { useNavigate } from 'react-router-dom'
import type { ProfileRole } from '../types'

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 21s7-7.1 7-12a7 7 0 1 0-14 0c0 4.9 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}

function StoreIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 10v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9" />
      <path d="M2.5 6 4 3h16l1.5 3a2.5 2.5 0 0 1-5 1 2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1-5-1Z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  )
}

function PeopleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="8" r="3" />
      <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 14.2c2.9.5 5 2.7 5 5.8" />
    </svg>
  )
}

function BarberPole() {
  return (
    <div className="h-12 w-4 shrink-0 overflow-hidden rounded-full border-2 border-slate-800 shadow-sm">
      <div
        className="h-full w-full"
        style={{
          background:
            'repeating-linear-gradient(45deg, #e8392e 0 6px, #ffffff 6px 12px, #2f6fed 12px 18px, #ffffff 18px 24px)',
        }}
      />
    </div>
  )
}

export function Landing() {
  const navigate = useNavigate()

  function goToSignUp(defaultRole: ProfileRole) {
    navigate('/signup', { state: { defaultRole } })
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-6">
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl font-extrabold tracking-tight text-brand">Lobby</span>
          <BarberPole />
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/login')} className="hidden text-sm font-medium text-slate-600 hover:text-slate-900 sm:block">
            Sign in
          </button>
          <button
            onClick={() => goToSignUp('shop_owner')}
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brandBright"
          >
            For barbershops
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-20">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand">
          The barbershop queue, made easy
        </p>
        <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          Find your next cut.
          <br />
          <span className="text-brand">Know the wait</span> before you go.
        </h1>
        <p className="mt-5 max-w-lg text-lg text-slate-600">
          Explore nearby barbershops, check live wait times, then join the queue or book with your
          barber.
        </p>

        <div className="mt-8 max-w-sm space-y-3">
          <button
            onClick={() => goToSignUp('client')}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brandBright"
          >
            <PinIcon />
            Browse shops
          </button>
          <button
            onClick={() => goToSignUp('shop_owner')}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-brand px-6 py-4 text-base font-semibold text-brand transition-colors hover:bg-brand/5"
          >
            <StoreIcon />
            I own a barbershop
          </button>
          <p className="pt-1 text-center text-sm text-slate-500 sm:hidden">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="font-medium text-brand hover:underline">
              Sign in
            </button>
          </p>
        </div>

        <div className="relative mt-16 overflow-hidden rounded-2xl bg-slate-900 shadow-xl">
          <div className="flex min-h-[320px] items-center">
            <div className="flex h-full shrink-0 items-stretch gap-4 py-10 pl-6">
              <div
                className="w-6 rounded-full"
                style={{
                  background:
                    'repeating-linear-gradient(45deg, #e8392e 0 10px, #ffffff 10px 20px, #2f6fed 20px 30px, #ffffff 30px 40px)',
                }}
              />
            </div>
            <div className="grid flex-1 gap-8 px-6 py-10 sm:grid-cols-2 sm:items-center sm:px-10">
              <div>
                <h2 className="font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
                  Your next cut, without the guesswork
                </h2>
                <div className="mt-4 h-1 w-10 rounded-full bg-brand" />
              </div>
              <div className="rounded-xl bg-white p-5 text-slate-900 shadow-lg">
                <p className="font-display text-lg font-bold">Platinum Kutz Barbershop</p>
                <div className="mt-2 flex items-center gap-1.5 text-sm text-volt">
                  <span className="h-2 w-2 rounded-full bg-volt" />
                  Live wait time
                </div>
                <p className="mt-1 text-2xl font-bold text-slate-900">8 min wait</p>
                <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                  <PeopleIcon />
                  3 barbers available
                </div>
                <button
                  onClick={() => goToSignUp('client')}
                  className="mt-4 w-full rounded-lg bg-brand py-2.5 text-sm font-semibold text-white hover:bg-brandBright"
                >
                  Join queue
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-center font-display text-3xl font-extrabold">How Lobby works</h2>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {[
              { step: 1, icon: <PinIcon />, label: 'Find a shop' },
              { step: 2, icon: <ClockIcon />, label: 'Check the wait' },
              { step: 3, icon: <CalendarIcon />, label: 'Join or book' },
            ].map(({ step, icon, label }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <span className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">
                  {step}
                </span>
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand text-brand">
                  {icon}
                </div>
                <p className="mt-3 font-semibold text-slate-900">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
