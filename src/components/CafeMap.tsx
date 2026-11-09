import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { cafes, categoryColor, type Cafe, type Category } from '../data/cafes'
import { img } from '../data/img'
import { useStore } from '../lib/store'
import { Cat, CatHead } from './Cat'
import { ArrowUpRight, Check, Clock, Heart, Pin, Search, Star } from './Icons'

const filters: ('All' | Category)[] = ['All', 'History', 'Modern Art', 'Cozy Alleys']
const W = 800
const H = 560

export function CafeMap({ variant = 'home' }: { variant?: 'home' | 'full' }) {
  const navigate = useNavigate()
  const { stamps, savedCafes, toggle, toast } = useStore()
  const [filter, setFilter] = useState<'All' | Category>('All')
  const [query, setQuery] = useState('')
  const [activeId, setActiveId] = useState<string>('anfu')
  const [hoverId, setHoverId] = useState<string | null>(null)

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return cafes.filter(
      (c) =>
        (filter === 'All' || c.category === filter) &&
        (!q || [c.name, c.cn, c.district, c.signature].some((s) => s.toLowerCase().includes(q))),
    )
  }, [filter, query])
  const shownId = hoverId ?? (visible.some((c) => c.id === activeId) ? activeId : null)
  const shown = cafes.find((c) => c.id === shownId)
  const active = cafes.find((c) => c.id === activeId)

  const choose = (f: 'All' | Category) => {
    setFilter(f)
    const first = cafes.find((c) => f === 'All' || c.category === f)
    if (first && f !== 'All') setActiveId(first.id)
  }
  const select = (c: Cafe) => {
    if (c.id === activeId) navigate(`/cafe/${c.id}`)
    else setActiveId(c.id)
  }

  const full = variant === 'full'

  const mapCanvas = (
    <div className="relative">
      <div className="relative aspect-[800/560] overflow-hidden rounded-2xl border border-white/10 bg-espresso-900">
        <MapArt />
        <div className="glass absolute left-3 top-3 z-20 flex flex-wrap gap-1 rounded-full p-1 md:left-5 md:top-5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => choose(f)}
              className={`cursor-pointer rounded-full px-3 py-1.5 text-[11px] font-medium tracking-wide transition-all md:px-4 md:text-xs ${
                filter === f ? 'bg-tangerine text-espresso-900 hover:bg-lime' : 'text-cream/80 hover:bg-lime hover:text-espresso-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <p className="glass absolute bottom-3 right-3 z-20 hidden rounded-full px-3 py-1.5 font-display text-[9px] uppercase tracking-[0.2em] text-cream/70 md:block">
          Click a node to pin · click again to open
        </p>

        {cafes.map((c) => {
          const isVisible = visible.includes(c)
          const isActive = c.id === shownId
          const stamped = stamps.includes(c.id)
          return (
            <button
              key={c.id}
              aria-label={`${c.name}${stamped ? ', stamped' : ''}`}
              disabled={!isVisible}
              onMouseEnter={() => setHoverId(c.id)}
              onMouseLeave={() => setHoverId(null)}
              onFocus={() => setHoverId(c.id)}
              onBlur={() => setHoverId(null)}
              onClick={() => select(c)}
              className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer p-2 transition-all duration-300 ${isVisible ? 'opacity-100' : 'pointer-events-none scale-50 opacity-15'}`}
              style={{ left: `${(c.x / W) * 100}%`, top: `${(c.y / H) * 100}%` }}
            >
              <span className="relative flex h-4 w-4 items-center justify-center">
                {isActive && (
                  <>
                    <span className="absolute h-4 w-4 animate-pulse-ring rounded-full bg-tangerine" />
                    <span className="absolute h-10 w-10 rounded-full bg-tangerine/30 blur-md" />
                  </>
                )}
                <span
                  className={`relative block rounded-full border-2 transition-all duration-300 ${
                    isActive ? 'h-4 w-4 border-cream bg-tangerine shadow-[0_0_20px_4px_rgba(255,122,26,0.8)]' : 'h-3 w-3 border-espresso-900 hover:scale-125'
                  }`}
                  style={isActive ? undefined : { background: categoryColor[c.category] }}
                />
                {stamped && (
                  <span className="absolute -right-2.5 -top-2.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-lime text-espresso-900">
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                )}
              </span>
            </button>
          )
        })}

        {shown && <Tooltip cafe={shown} interactive={shown.id === activeId} />}
      </div>
      {!full && (
        <Cat pose="point" eyes="happy" className="pointer-events-none absolute -bottom-10 -left-20 z-30 hidden w-44 drop-shadow-[0_24px_30px_rgba(0,0,0,0.6)] xl:block" />
      )}
    </div>
  )

  const list = (
    <div className="flex flex-col gap-2">
      <div className="mb-2 flex items-baseline justify-between">
        <p className="font-display text-[10px] uppercase tracking-[0.2em] text-cream/50">{visible.length} cafés</p>
        <div className="flex gap-3 text-[11px] text-cream/50">
          {(Object.keys(categoryColor) as Category[]).map((k) => (
            <span key={k} className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: categoryColor[k] }} />
              {k}
            </span>
          ))}
        </div>
      </div>
      <div className={`no-scrollbar flex flex-col gap-2 overflow-y-auto pr-1 ${full ? 'max-h-[640px]' : 'max-h-[520px]'}`}>
        {visible.length === 0 && <p className="rounded-xl border border-dashed border-white/15 p-6 text-center text-sm text-cream/50">No café matches “{query}”. Mochi suggests trying “latte”.</p>}
        {visible.map((c, i) => {
          const isActive = c.id === shownId
          return (
            <div
              key={c.id}
              onMouseEnter={() => setHoverId(c.id)}
              onMouseLeave={() => setHoverId(null)}
              className={`group flex items-center gap-3 rounded-xl border p-2 pr-3 transition-all duration-300 ${
                isActive ? 'border-tangerine/60 bg-tangerine/10' : 'border-white/5 bg-white/[0.02] hover:border-lime/60 hover:bg-lime/5'
              }`}
            >
              <button onClick={() => setActiveId(c.id)} className="flex flex-1 cursor-pointer items-center gap-3 text-left">
                {full ? (
                  <img src={img(c.hero, 160, 160)} alt="" className="h-14 w-14 rounded-lg object-cover" />
                ) : (
                  <span className="w-6 text-center font-serif text-sm italic text-cream/40">{String(i + 1).padStart(2, '0')}</span>
                )}
                <span className="flex-1">
                  <span className="block font-serif text-lg leading-tight">{c.name}</span>
                  <span className="text-xs text-cream/50">
                    {c.district} · {c.price}
                  </span>
                </span>
              </button>
              {stamps.includes(c.id) && <span className="rounded-full bg-lime/15 px-2 py-0.5 font-display text-[9px] uppercase tracking-widest text-lime">Stamped</span>}
              <Link to={`/cafe/${c.id}`} aria-label={`Open ${c.name}`} className="rounded-full p-2 text-cream/60 transition-colors hover:bg-lime hover:text-espresso-900">
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )

  if (!full)
    return (
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">{mapCanvas}</div>
        <aside className="lg:col-span-4">{list}</aside>
      </div>
    )

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <aside className="order-2 flex flex-col gap-4 lg:order-1 lg:col-span-4">
        <label className="glass flex items-center gap-3 rounded-full px-4 py-3">
          <Search className="h-4 w-4 text-latte" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search cafés, drinks, districts…" className="w-full bg-transparent text-sm placeholder:text-cream/40 focus:outline-none" />
        </label>
        {list}
      </aside>
      <div className="order-1 flex flex-col gap-4 lg:order-2 lg:col-span-8">
        {mapCanvas}
        {active && (
          <div className="glass flex flex-col gap-4 rounded-2xl p-4 sm:flex-row sm:items-center">
            <img src={img(active.hero, 300, 200)} alt="" className="h-24 w-full rounded-xl object-cover sm:w-36" />
            <div className="flex-1">
              <p className="font-display text-[10px] uppercase tracking-[0.2em]" style={{ color: categoryColor[active.category] }}>
                {active.category} · since {active.since}
              </p>
              <p className="font-serif text-2xl">{active.name} <span className="font-cn text-base text-cream/50">{active.cn}</span></p>
              <p className="text-sm text-cream/60">{active.note}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toast(toggle('savedCafes', active.id) ? `Saved ${active.name}` : 'Removed from saved')}
                aria-label="Save café"
                className={`cursor-pointer rounded-full border p-3 transition-colors hover:border-lime hover:bg-lime hover:text-espresso-900 ${savedCafes.includes(active.id) ? 'border-tangerine bg-tangerine text-espresso-900' : 'border-white/15'}`}
              >
                <Heart className="h-4 w-4" />
              </button>
              <Link to={`/cafe/${active.id}`} className="inline-flex items-center gap-2 rounded-full bg-tangerine px-5 py-3 text-sm font-medium text-espresso-900 transition-colors hover:bg-lime">
                Open café <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Tooltip({ cafe, interactive }: { cafe: Cafe; interactive: boolean }) {
  const px = (cafe.x / W) * 100
  const py = (cafe.y / H) * 100
  const right = px > 55
  const below = py < 40
  return (
    <div
      key={cafe.id}
      className={`absolute z-20 hidden w-64 animate-fade-in sm:block ${interactive ? '' : 'pointer-events-none'}`}
      style={{ left: `${px}%`, top: `${py}%`, transform: `translate(${right ? 'calc(-100% - 22px)' : '22px'}, ${below ? '-10%' : '-90%'})` }}
    >
      <div className="glass overflow-hidden rounded-2xl bg-espresso-900/60 shadow-2xl shadow-black/40">
        <div className="relative h-20">
          <img src={img(cafe.hero, 520, 160)} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/90 to-transparent" />
          <div className="absolute -bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cream ring-2 ring-tangerine">
            <CatHead className="h-8 w-8" eyes="happy" />
          </div>
        </div>
        <div className="p-4 pt-6">
          <p className="font-display text-[9px] font-medium uppercase tracking-[0.2em]" style={{ color: categoryColor[cafe.category] }}>
            {cafe.category}
          </p>
          <p className="font-serif text-lg leading-tight text-cream">{cafe.name}</p>
          <p className="mt-2 text-xs leading-relaxed text-cream/70">{cafe.note}</p>
          <div className="mt-3 space-y-1.5 border-t border-white/10 pt-3 text-xs text-cream/70">
            <p className="flex items-center gap-2"><Pin className="h-3.5 w-3.5 text-latte" /> {cafe.district}</p>
            <p className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-latte" /> {cafe.hours}</p>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-cream/80">{cafe.signature}</span>
            <span className="flex items-center gap-1 text-xs text-tangerine"><Star className="h-3.5 w-3.5" /> {cafe.rating}</span>
          </div>
          {interactive && (
            <Link to={`/cafe/${cafe.id}`} className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-tangerine py-2 text-xs font-medium text-espresso-900 transition-colors hover:bg-lime">
              Open café page <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

/** Illustrated, stylized map of central Shanghai. */
export function MapArt() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#c9a27a" opacity="0.12" />
        </pattern>
        <linearGradient id="river" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#ff7a1a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#c9a27a" stopOpacity="0.35" />
        </linearGradient>
        <filter id="soft"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>
      <rect width={W} height={H} fill="url(#dots)" />
      <g stroke="#c9a27a" strokeOpacity="0.18" strokeWidth="1" fill="#c9a27a">
        <path d="M60 240 L200 220 L300 250 L330 340 L260 420 L120 400 L50 320 Z" fillOpacity="0.05" />
        <path d="M300 250 L410 230 L440 300 L400 380 L330 340 Z" fillOpacity="0.07" />
        <path d="M200 120 L360 90 L410 180 L300 210 L200 220 Z" fillOpacity="0.04" />
        <path d="M260 420 L330 340 L400 380 L390 520 L250 540 Z" fillOpacity="0.05" />
        <path d="M520 160 L700 140 L760 320 L640 420 L520 330 L540 260 Z" fillOpacity="0.06" />
      </g>
      <g stroke="#e8d3b8" strokeOpacity="0.1" strokeWidth="1" fill="none">
        <path d="M40 300 Q240 270 440 285" /><path d="M80 360 Q250 340 400 360" /><path d="M120 200 Q260 240 300 420" />
        <path d="M200 140 Q230 300 210 520" /><path d="M300 120 Q330 300 300 540" /><path d="M60 440 Q260 420 380 460" />
        <path d="M540 170 L640 440 M600 150 L560 420 M520 280 L760 260 M540 360 L740 340" /><path d="M110 160 Q300 170 420 120" />
      </g>
      <path d="M120 180 Q100 420 300 470 Q460 500 470 320" fill="none" stroke="#c9a27a" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="1 6" strokeLinecap="round" />
      <path d="M0 232 C120 196 200 238 290 206 C360 184 395 218 430 206" fill="none" stroke="#c9a27a" strokeOpacity="0.4" strokeWidth="6" strokeLinecap="round" />
      <path d="M410 560 C430 480 370 420 420 360 C455 315 525 300 505 250 C485 200 400 210 420 150 C435 105 520 70 560 0" fill="none" stroke="#ff7a1a" strokeOpacity="0.18" strokeWidth="50" filter="url(#soft)" />
      <path d="M410 560 C430 480 370 420 420 360 C455 315 525 300 505 250 C485 200 400 210 420 150 C435 105 520 70 560 0" fill="none" stroke="url(#river)" strokeWidth="22" strokeLinecap="round" />
      <path d="M410 560 C430 480 370 420 420 360 C455 315 525 300 505 250 C485 200 400 210 420 150 C435 105 520 70 560 0" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 10" />
      <g fill="#c6ff3d" fillOpacity="0.08" stroke="#c6ff3d" strokeOpacity="0.25">
        <ellipse cx="380" cy="280" rx="20" ry="12" /><ellipse cx="150" cy="330" rx="16" ry="10" /><ellipse cx="660" cy="300" rx="34" ry="20" />
      </g>
      <g stroke="#ff7a1a" strokeWidth="1.5" fill="none" opacity="0.8">
        <circle cx="560" cy="210" r="6" /><path d="M560 216 V236 M560 204 V190" /><path d="M590 250 L596 196 L602 250" stroke="#c6ff3d" />
      </g>
      <g fontFamily="Playfair Display, serif" fontStyle="italic" fill="#e8d3b8" fillOpacity="0.45" fontSize="15">
        <text x="92" y="268">Changning</text><text x="150" y="430">Xuhui</text><text x="230" y="168">Jing&apos;an</text>
        <text x="336" y="112">Hongkou</text><text x="640" y="200">Pudong</text><text x="610" y="252" fontSize="12">Lujiazui</text><text x="330" y="320" fontSize="12">Huangpu</text>
      </g>
      <g fontFamily="Noto Serif SC, serif" fill="#e8d3b8" fillOpacity="0.18" fontSize="44" fontWeight="900">
        <text x="70" y="520">浦西</text><text x="640" y="500">浦东</text>
      </g>
      <g fontFamily="Inter, sans-serif" fill="#ff7a1a" fillOpacity="0.6" fontSize="9" letterSpacing="3">
        <text x="470" y="430" transform="rotate(-70 470 430)">HUANGPU RIVER</text>
        <text x="40" y="214" fill="#c9a27a">SUZHOU CREEK</text>
      </g>
      <g transform="translate(740 500)" stroke="#c9a27a" strokeOpacity="0.6" fill="none">
        <circle r="22" /><path d="M0 -16 L5 0 L0 16 L-5 0 Z" fill="#ff7a1a" fillOpacity="0.7" stroke="none" />
        <text y="-28" textAnchor="middle" fontSize="10" fill="#c9a27a" stroke="none" fontFamily="Inter">N</text>
      </g>
    </svg>
  )
}
