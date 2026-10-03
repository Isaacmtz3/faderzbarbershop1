import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Shop, ShopQueueStats } from '../types'

export function ShopDirectory() {
  const [shops, setShops] = useState<Shop[]>([])
  const [stats, setStats] = useState<Record<string, ShopQueueStats>>({})
  const [loading, setLoading] = useState(true)

  async function loadStats() {
    const { data } = await supabase.from('shop_queue_stats').select('*')
    if (data) {
      const byShop: Record<string, ShopQueueStats> = {}
      for (const row of data as ShopQueueStats[]) byShop[row.shop_id] = row
      setStats(byShop)
    }
  }

  useEffect(() => {
    async function load() {
      setLoading(true)
      const { data } = await supabase
        .from('shops')
        .select('*')
        .eq('is_active', true)
        .order('name')
      setShops((data as Shop[]) ?? [])
      await loadStats()
      setLoading(false)
    }
    load()

    const channel = supabase
      .channel('directory-queue-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'queue' }, () => {
        loadStats()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold text-bone sm:text-4xl">
          Find your shop,
          <br />
          <span className="text-brandBright">skip the wait.</span>
        </h1>
        <p className="mt-3 max-w-lg text-mute">
          Browse shops on Lobby, see real wait times, and check in before you even walk in the
          door.
        </p>
      </div>

      {loading && <p className="text-mute">Loading shops…</p>}

      {!loading && shops.length === 0 && (
        <div className="rounded-md border border-line bg-panel p-8 text-center text-mute">
          No shops have joined Lobby yet.{' '}
          <Link to="/signup" className="text-brandBright hover:underline">
            Sign up your shop
          </Link>{' '}
          to be the first.
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {shops.map((shop) => {
          const stat = stats[shop.id]
          const waiting = stat?.waiting_count ?? 0
          return (
            <Link
              key={shop.id}
              to={`/shop/${shop.slug}`}
              className="group rounded-md border border-line bg-panel p-4 transition-colors hover:border-[var(--shop-accent)]"
              style={{ ['--shop-accent' as string]: shop.accent_color }}
            >
              <div className="mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-md bg-panel2">
                {shop.logo_url ? (
                  <img src={shop.logo_url} alt={shop.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="font-display text-xl font-bold text-mute">
                    {shop.name.slice(0, 1)}
                  </span>
                )}
              </div>
              <h3 className="font-display font-semibold text-bone">{shop.name}</h3>
              {shop.city && <p className="text-xs text-mute">{shop.city}</p>}
              <div className="mt-3 flex items-center gap-1.5 text-xs">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: waiting > 0 ? shop.accent_color : '#35d07f' }}
                />
                <span className="text-mute">
                  {waiting > 0 ? `${waiting} waiting` : 'No wait'}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
