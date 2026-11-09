import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router'
import { useStore, fmt, fmtDate } from '../lib/store'
import { cafes, getCafe } from '../data/cafes'
import { getArticle } from '../data/articles'
import { getProduct } from '../data/products'
import { img } from '../data/img'
import { Avatar, avatarPresets } from '../components/Avatar'
import { ArticleCard } from '../components/ArticleCard'
import { ProductCard } from '../components/ProductCard'
import { ProductThumb } from '../components/ProductThumb'
import { Cat, CatHead } from '../components/Cat'
import { MapArt } from '../components/CafeMap'
import { ArrowUpRight, Check, Edit, Logout } from '../components/Icons'
import { Accent, Field, Input, Kicker, Textarea, buttonClass, inputClass } from '../components/ui'

const tabs = [
  { id: 'overview', label: 'Overview', cn: '总览' },
  { id: 'passport', label: 'Passport', cn: '护照' },
  { id: 'saved', label: 'Saved', cn: '收藏' },
  { id: 'wishlist', label: 'Wishlist', cn: '心愿单' },
  { id: 'orders', label: 'Orders', cn: '订单' },
  { id: 'activity', label: 'Activity', cn: '动态' },
  { id: 'settings', label: 'Settings', cn: '设置' },
] as const
type Tab = (typeof tabs)[number]['id']

const levels = [
  { min: 0, name: 'Sipper', cn: '初尝者' },
  { min: 3, name: 'Regular', cn: '常客' },
  { min: 6, name: 'Connoisseur', cn: '鉴赏家' },
  { min: 10, name: 'Canopy Legend', cn: '梧桐传奇' },
]

export function Profile() {
  const s = useStore()
  const [params, setParams] = useSearchParams()
  const tab = (tabs.some((t) => t.id === params.get('tab')) ? params.get('tab') : 'overview') as Tab
  const setTab = (t: Tab) => setParams(t === 'overview' ? {} : { tab: t }, { replace: true })

  if (!s.signedIn) return <SignIn />

  const level = [...levels].reverse().find((l) => s.stamps.length >= l.min)!
  const nextLevel = levels.find((l) => l.min > s.stamps.length)
  const stats: [string, number, Tab][] = [
    ['Stamps', s.stamps.length, 'passport'],
    ['Saved cafés', s.savedCafes.length, 'saved'],
    ['Bookmarks', s.bookmarks.length, 'saved'],
    ['Wishlist', s.wishlist.length, 'wishlist'],
    ['Orders', s.orders.length, 'orders'],
    ['Mochi pets', s.pets, 'overview'],
  ]

  return (
    <>
      <section className="relative pt-28">
        <div className="relative mx-3 h-56 overflow-hidden rounded-3xl bg-gradient-to-br from-tangerine via-[#c4500a] to-espresso-700 md:mx-6 md:h-72">
          <div className="absolute inset-0 opacity-40 mix-blend-overlay"><MapArt /></div>
          <p className="absolute -bottom-6 right-6 select-none font-display text-[18vw] font-black uppercase leading-none text-espresso-900/15 md:text-[11rem]">{s.profile.handle}</p>
          <Cat pose="wave" eyes="happy" className="absolute -bottom-10 right-[8%] hidden w-44 drop-shadow-2xl md:block" />
        </div>
        <div className="relative mx-auto -mt-16 max-w-7xl px-6 md:px-8">
          <Header />
          <div className="mt-6 flex items-center gap-4 rounded-2xl border border-white/10 p-4">
            <span className="rounded-full bg-lime px-3 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.15em] text-espresso-900">{level.name} · {level.cn}</span>
            <div className="flex-1">
              <div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-tangerine to-lime" style={{ width: `${(s.stamps.length / 10) * 100}%` }} /></div>
            </div>
            <span className="text-xs text-cream/60">{nextLevel ? `${nextLevel.min - s.stamps.length} stamps to ${nextLevel.name}` : 'Max level ✳'}</span>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 md:grid-cols-6">
            {stats.map(([l, n, t]) => (
              <button key={l} onClick={() => setTab(t)} className="cursor-pointer rounded-2xl border border-white/10 p-4 text-left transition-colors hover:border-lime hover:bg-lime hover:text-espresso-900">
                <p className="font-display text-3xl">{n}</p>
                <p className="mt-1 font-display text-[9px] uppercase tracking-[0.2em] opacity-60">{l}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-28 pt-10">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="no-scrollbar sticky top-20 z-30 -mx-2 mb-10 flex gap-1 overflow-x-auto rounded-full bg-espresso-900/80 p-1.5 backdrop-blur-xl">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`shrink-0 cursor-pointer rounded-full px-5 py-2.5 text-sm transition-colors ${tab === t.id ? 'bg-cream text-espresso-900' : 'text-cream/70 hover:bg-lime hover:text-espresso-900'}`}>
                {t.label} <span className="font-cn text-xs opacity-50">{t.cn}</span>
              </button>
            ))}
          </div>
          <div key={tab} className="animate-fade-in">
            {tab === 'overview' && <Overview setTab={setTab} />}
            {tab === 'passport' && <PassportTab />}
            {tab === 'saved' && <SavedTab />}
            {tab === 'wishlist' && <WishlistTab />}
            {tab === 'orders' && <OrdersTab />}
            {tab === 'activity' && <ActivityTab />}
            {tab === 'settings' && <SettingsTab />}
          </div>
        </div>
      </section>
    </>
  )
}

function Header() {
  const s = useStore()
  const [edit, setEdit] = useState(false)
  const [picker, setPicker] = useState(false)
  const [d, setD] = useState(s.profile)
  const save = (e: FormEvent) => {
    e.preventDefault()
    s.updateProfile({ ...d, handle: d.handle.replace(/[^a-z0-9_]/gi, '').toLowerCase() || s.profile.handle })
    setEdit(false)
    s.toast('Profile updated', 'lime')
  }
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end">
      <div className="relative">
        <button onClick={() => setPicker((p) => !p)} aria-label="Change avatar" className="group relative block cursor-pointer rounded-full ring-8 ring-espresso-900">
          <Avatar index={s.profile.avatar} className="h-32 w-32" />
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-espresso-900/60 opacity-0 transition-opacity group-hover:opacity-100"><Edit className="h-6 w-6" /></span>
        </button>
        {picker && (
          <div className="glass absolute left-0 top-full z-40 mt-3 grid animate-pop grid-cols-3 gap-2 rounded-2xl bg-espresso-900/90 p-3">
            {avatarPresets.map((_, i) => (
              <button key={i} onClick={() => { s.updateProfile({ avatar: i }); setPicker(false) }} className={`cursor-pointer rounded-full ring-2 transition-transform hover:scale-110 ${s.profile.avatar === i ? 'ring-lime' : 'ring-transparent'}`}><Avatar index={i} className="h-14 w-14" /></button>
            ))}
          </div>
        )}
      </div>
      {edit ? (
        <form onSubmit={save} className="glass grid flex-1 gap-3 rounded-2xl p-5 sm:grid-cols-2">
          <Field label="Name"><Input value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} /></Field>
          <Field label="Handle"><Input value={d.handle} onChange={(e) => setD({ ...d, handle: e.target.value })} /></Field>
          <Field label="Home district">
            <select value={d.district} onChange={(e) => setD({ ...d, district: e.target.value })} className={`${inputClass} bg-espresso-900`}>
              {['Xuhui', "Jing'an", 'Huangpu', 'Changning', 'Hongkou', 'Putuo', 'Pudong'].map((x) => <option key={x}>{x}</option>)}
            </select>
          </Field>
          <Field label="Go-to drink"><Input value={d.favDrink} onChange={(e) => setD({ ...d, favDrink: e.target.value })} /></Field>
          <div className="sm:col-span-2"><Field label="Bio" hint={`${d.bio.length}/140`}><Textarea rows={2} maxLength={140} value={d.bio} onChange={(e) => setD({ ...d, bio: e.target.value })} /></Field></div>
          <div className="flex gap-2 sm:col-span-2">
            <button className={buttonClass('primary', '!py-2.5')}>Save profile</button>
            <button type="button" onClick={() => { setD(s.profile); setEdit(false) }} className={buttonClass('ghost', '!py-2.5')}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-display text-4xl font-semibold uppercase md:text-5xl">{s.profile.name}</h1>
            <p className="mt-1 text-sm text-cream/50">@{s.profile.handle} · {s.profile.district} · joined {fmtDate(s.profile.joined)}</p>
            <p className="mt-3 max-w-lg font-serif text-lg italic text-cream/80">“{s.profile.bio}”</p>
            <p className="mt-2 text-sm text-latte">Go-to: {s.profile.favDrink}</p>
          </div>
          <button onClick={() => { setD(s.profile); setEdit(true) }} className={buttonClass('ghost', 'self-start md:self-end')}><Edit className="h-4 w-4" /> Edit profile</button>
        </div>
      )}
    </div>
  )
}

function SignIn() {
  const s = useStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (name.trim().length < 2 || !/^\S+@\S+\.\S+$/.test(email)) return s.toast('Add your name and a valid email')
    s.signIn(name.trim(), email.trim())
    s.toast(`Welcome to the Canopy, ${name.trim().split(' ')[0]}!`, 'lime')
  }
  return (
    <section className="pb-24 pt-36 md:pt-44">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:px-8 lg:grid-cols-2">
        <div>
          <Kicker>Your profile · 个人主页</Kicker>
          <h1 className="mt-6 font-display text-[clamp(2.6rem,6vw,5rem)] font-semibold uppercase leading-[0.9]">Join the <br /><Accent className="text-tangerine">Canopy.</Accent></h1>
          <p className="mt-6 max-w-md text-cream/60">Your own page for café stamps, saved spots, bookmarked stories, wishlist and orders. Anything you saved as a guest comes with you.</p>
          <ul className="mt-8 space-y-3 text-sm text-cream/80">
            {['A café passport with 10 stamps to collect', 'Saved cafés & bookmarked stories', 'Order history with one-tap “buy again”', 'Reviews, comments and letters to Mochi'].map((t) => (
              <li key={t} className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime text-espresso-900"><Check className="h-3.5 w-3.5" /></span>{t}</li>
            ))}
          </ul>
        </div>
        <form onSubmit={submit} className="glass relative rounded-3xl p-8">
          <CatHead className="absolute -right-6 -top-10 h-24 w-24 rotate-12" eyes="wink" />
          <p className="font-serif text-3xl">Sign in or create</p>
          <p className="mt-1 text-sm text-cream/50">No password needed for this demo; your data stays in this browser.</p>
          <div className="mt-6 space-y-4">
            <Field label="Name"><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Lin Qiao" autoComplete="name" /></Field>
            <Field label="Email"><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" autoComplete="email" /></Field>
            <button className={buttonClass('primary', 'w-full')}>Enter my Canopy <ArrowUpRight className="h-4 w-4" /></button>
          </div>
          <p className="mt-6 text-center text-xs text-cream/40">Guest so far: {s.stamps.length} stamps · {s.savedCafes.length} saved · {s.orders.length} orders</p>
        </form>
      </div>
    </section>
  )
}

function Overview({ setTab }: { setTab: (t: Tab) => void }) {
  const s = useStore()
  const nextCafe = cafes.find((c) => !s.stamps.includes(c.id))
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-3xl bg-cream p-6 text-espresso-900 lg:col-span-2">
        <div className="flex items-center justify-between">
          <p className="font-display text-[10px] uppercase tracking-[0.2em] text-tangerine">Passport progress</p>
          <button onClick={() => setTab('passport')} className="cursor-pointer text-sm underline hover:text-tangerine">Open passport</button>
        </div>
        <div className="mt-6 grid grid-cols-5 gap-3">
          {cafes.map((c) => (
            <Link key={c.id} to={`/cafe/${c.id}`} title={c.name} className={`flex aspect-square items-center justify-center rounded-full border-2 border-dashed transition-transform hover:scale-110 ${s.stamps.includes(c.id) ? '-rotate-12 border-tangerine bg-tangerine/15' : 'border-espresso-900/20'}`}>
              {s.stamps.includes(c.id) ? <CatHead className="h-1/2 w-1/2" eyes="happy" /> : <span className="font-display text-xs text-espresso-900/30">{c.name.slice(0, 2)}</span>}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-between rounded-3xl bg-tangerine p-6 text-espresso-900">
        <p className="font-display text-[10px] uppercase tracking-[0.2em]">Mochi suggests next</p>
        {nextCafe ? (
          <>
            <p className="mt-3 font-serif text-3xl leading-tight">{nextCafe.name}</p>
            <p className="text-sm opacity-70">{nextCafe.district} · {nextCafe.signature}</p>
            <Link to={`/cafe/${nextCafe.id}`} className={buttonClass('dark', 'mt-6 self-start')}>Go & check in</Link>
          </>
        ) : (
          <p className="mt-3 font-serif text-3xl">All ten stamped. You are a legend.</p>
        )}
      </div>
      <div className="rounded-3xl border border-white/10 p-6 lg:col-span-3">
        <p className="font-display text-[10px] uppercase tracking-[0.2em] text-latte">Recent orders</p>
        {s.orders.length === 0 ? (
          <p className="mt-4 text-cream/60">No orders yet. <Link to="/shop" className="text-lime underline">Visit the store</Link></p>
        ) : (
          <ul className="mt-4 divide-y divide-white/10">
            {s.orders.slice(0, 3).map((o) => (
              <li key={o.id} className="flex items-center justify-between py-3 text-sm">
                <Link to={`/order/${o.id}`} className="font-display hover:text-lime">{o.id}</Link>
                <span className="text-cream/60">{fmtDate(o.date)}</span>
                <span className="rounded-full bg-tangerine/15 px-3 py-1 text-xs text-tangerine">{o.status}</span>
                <span>{fmt(o.total)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function PassportTab() {
  const s = useStore()
  return (
    <div className="rounded-3xl bg-paper p-6 text-espresso-900 md:p-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="font-display text-[10px] uppercase tracking-[0.25em] text-tangerine">Plane Canopy café passport · No. {s.profile.handle.toUpperCase()}</p>
          <p className="mt-2 font-display text-5xl font-bold">{s.stamps.length}<span className="text-2xl opacity-40">/10</span></p>
        </div>
        <Link to="/map" className={buttonClass('dark')}>Find more cafés</Link>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {cafes.map((c, i) => {
          const got = s.stamps.includes(c.id)
          return (
            <Link key={c.id} to={`/cafe/${c.id}`} className={`group relative flex flex-col items-center rounded-2xl border p-4 text-center transition-all hover:-translate-y-1 ${got ? 'border-tangerine/40 bg-white' : 'border-dashed border-espresso-900/20 hover:border-lime hover:bg-lime'}`}>
              <span className={`flex h-24 w-24 items-center justify-center rounded-full border-4 border-double ${got ? 'border-tangerine text-tangerine' : 'border-espresso-900/15 text-espresso-900/30'}`} style={{ transform: got ? `rotate(${(i % 3) * 8 - 8}deg)` : undefined }}>
                {got ? <CatHead className="h-14 w-14" eyes="happy" /> : <span className="font-display text-xl">{String(i + 1).padStart(2, '0')}</span>}
              </span>
              <span className="mt-3 font-serif leading-tight">{c.name}</span>
              <span className="font-cn text-xs opacity-60">{c.cn}</span>
              <span className={`mt-2 font-display text-[9px] uppercase tracking-[0.2em] ${got ? 'text-tangerine' : 'opacity-50'}`}>{got ? 'Stamped ✓' : 'Visit →'}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function SavedTab() {
  const s = useStore()
  return (
    <div className="space-y-14">
      <div>
        <Kicker>Saved cafés · {s.savedCafes.length}</Kicker>
        {s.savedCafes.length === 0 ? <Empty text="No saved cafés yet." to="/map" cta="Browse the map" /> : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.savedCafes.map((id) => {
              const c = getCafe(id)
              if (!c) return null
              return (
                <Link key={id} to={`/cafe/${id}`} className="group overflow-hidden rounded-2xl border border-white/10 transition-colors hover:border-lime">
                  <div className="aspect-[16/10] overflow-hidden"><img src={img(c.hero, 800)} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                  <div className="flex items-center justify-between p-4"><span><span className="block font-serif text-xl">{c.name}</span><span className="text-xs text-cream/50">{c.district}</span></span><ArrowUpRight className="h-5 w-5" /></div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
      <div>
        <Kicker>Bookmarked stories · {s.bookmarks.length}</Kicker>
        {s.bookmarks.length === 0 ? <Empty text="No bookmarks yet." to="/culture" cta="Read the culture issue" /> : (
          <div className="mt-6 grid gap-6 md:grid-cols-3">{s.bookmarks.map((slug) => { const a = getArticle(slug); return a ? <ArticleCard key={slug} a={a} /> : null })}</div>
        )}
      </div>
    </div>
  )
}

function WishlistTab() {
  const s = useStore()
  if (s.wishlist.length === 0) return <Empty text="Your wishlist is empty." to="/shop" cta="Explore the store" />
  return <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">{s.wishlist.map((id) => { const p = getProduct(id); return p ? <ProductCard key={id} p={p} /> : null })}</div>
}

function OrdersTab() {
  const s = useStore()
  if (s.orders.length === 0) return <Empty text="No orders yet." to="/shop" cta="Start shopping" />
  return (
    <ul className="space-y-4">
      {s.orders.map((o) => (
        <li key={o.id} className="rounded-2xl border border-white/10 p-5">
          <div className="flex flex-wrap items-center gap-3">
            <Link to={`/order/${o.id}`} className="font-display text-lg hover:text-lime">{o.id}</Link>
            <span className="text-sm text-cream/50">{fmtDate(o.date)} · {o.delivery}</span>
            <span className="rounded-full bg-tangerine/15 px-3 py-1 text-xs text-tangerine">{o.status}</span>
            <span className="ml-auto font-serif text-xl">{fmt(o.total)}</span>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {o.items.map((it, i) => { const p = getProduct(it.productId); return p ? <Link key={i} to={`/product/${p.id}`} title={p.name}><ProductThumb p={p} className="h-14 w-14" /></Link> : null })}
            <div className="ml-auto flex gap-2">
              <button onClick={() => o.items.forEach((it) => s.addToCart(it.productId, it.option, it.qty))} className="cursor-pointer rounded-full border border-white/15 px-4 py-2 text-sm hover:border-lime hover:bg-lime hover:text-espresso-900">Buy again</button>
              <Link to={`/order/${o.id}`} className="rounded-full bg-cream px-4 py-2 text-sm text-espresso-900 hover:bg-lime">Details</Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

function ActivityTab() {
  const s = useStore()
  const items = [
    ...s.reviews.map((r) => ({ date: r.date, kind: 'Review', text: r.text, to: `/cafe/${r.cafeId}`, where: getCafe(r.cafeId)?.name })),
    ...s.comments.map((c) => ({ date: c.date, kind: 'Comment', text: c.text, to: `/article/${c.slug}`, where: getArticle(c.slug)?.title })),
    ...s.letters.map((l) => ({ date: l.date, kind: 'Letter', text: l.text, to: '/diary#letters', where: 'Letters to Mochi' })),
  ].sort((a, b) => b.date.localeCompare(a.date))
  if (items.length === 0) return <Empty text="No activity yet. Review a café or comment on a story." to="/culture" cta="Find a story" />
  return (
    <ul className="space-y-3">
      {items.map((it, i) => (
        <li key={i}>
          <Link to={it.to} className="flex gap-4 rounded-2xl border border-white/10 p-5 transition-colors hover:border-lime">
            <span className="h-fit rounded-full bg-lime/15 px-3 py-1 font-display text-[9px] uppercase tracking-[0.2em] text-lime">{it.kind}</span>
            <span className="flex-1"><span className="block text-xs text-cream/50">{fmtDate(it.date)} · {it.where}</span><span className="mt-1 block font-serif text-lg italic">“{it.text}”</span></span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

function SettingsTab() {
  const s = useStore()
  const [confirm, setConfirm] = useState(false)
  return (
    <div className="grid max-w-3xl gap-4">
      <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 p-5">
        <span><span className="block font-serif text-xl">Mochi’s Sunday Letter</span><span className="text-sm text-cream/50">One café and one story every week.</span></span>
        <button onClick={() => { s.setNewsletter(!s.newsletter); s.toast(s.newsletter ? 'Unsubscribed' : 'Subscribed ♡') }} role="switch" aria-checked={s.newsletter} className={`relative h-7 w-12 cursor-pointer rounded-full transition-colors ${s.newsletter ? 'bg-lime' : 'bg-white/15'}`}>
          <span className={`absolute top-1 h-5 w-5 rounded-full bg-espresso-900 transition-all ${s.newsletter ? 'left-6' : 'left-1'}`} />
        </button>
      </label>
      <div className="rounded-2xl border border-white/10 p-5">
        <p className="font-serif text-xl">Account</p>
        <p className="text-sm text-cream/50">{s.profile.email || 'No email'}</p>
        <button onClick={() => { s.signOut(); s.toast('Signed out. See you soon!') }} className={buttonClass('ghost', 'mt-4')}><Logout className="h-4 w-4" /> Sign out</button>
      </div>
      <div className="rounded-2xl border border-tangerine/30 p-5">
        <p className="font-serif text-xl">Reset everything</p>
        <p className="text-sm text-cream/50">Clears stamps, saves, bag, orders and activity in this browser.</p>
        {confirm ? (
          <div className="mt-4 flex gap-2">
            <button onClick={() => { s.resetAll(); s.toast('All data cleared') }} className="cursor-pointer rounded-full bg-tangerine px-5 py-3 text-sm font-medium text-espresso-900 hover:bg-lime">Yes, clear it</button>
            <button onClick={() => setConfirm(false)} className={buttonClass('ghost')}>Cancel</button>
          </div>
        ) : (
          <button onClick={() => setConfirm(true)} className={buttonClass('ghost', 'mt-4')}>Reset data</button>
        )}
      </div>
    </div>
  )
}

function Empty({ text, to, cta }: { text: string; to: string; cta: string }) {
  return (
    <div className="mt-6 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-white/15 py-12 text-center">
      <Cat pose="idle" eyes="down" className="w-28" />
      <p className="font-serif text-2xl">{text}</p>
      <Link to={to} className={buttonClass('primary')}>{cta}</Link>
    </div>
  )
}
