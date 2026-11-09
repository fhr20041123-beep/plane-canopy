import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, NavLink, Outlet, ScrollRestoration, useLocation, useNavigate } from 'react-router'
import { useStore, fmt, FREE_SHIPPING } from '../../lib/store'
import { ProductThumb } from '../ProductThumb'
import { cafes } from '../../data/cafes'
import { mochiLines } from '../../data/misc'
import { Avatar } from '../Avatar'
import { CatHead, Cat } from '../Cat'
import { ArrowRight, Bag, Close, Instagram, Menu, Minus, Plus, Rednote, Send, Spotify, Telegram, Trash, Weibo } from '../Icons'
import { BOT_URL, PearlBotFooterCard } from '../PearlBot'
import { Ticker } from '../ui'

const links = [
  { label: 'Map', cn: '地图', to: '/map' },
  { label: 'Culture', cn: '文化', to: '/culture' },
  { label: 'Diary', cn: '日记', to: '/diary' },
  { label: 'Mochi 3D', cn: '麻薯', to: '/mochi', badge: true },
  { label: 'Shop', cn: '商店', to: '/shop' },
]

export function Root() {
  return (
    <div className="min-h-screen overflow-x-clip bg-espresso-900 text-cream">
      <ScrollRestoration />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <Toasts />
      <FloatingMochi />
    </div>
  )
}

function Header() {
  const { count, setCartOpen, profile, signedIn } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  useEffect(() => setOpen(false), [loc.pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`overflow-hidden bg-tangerine font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-espresso-900 transition-all duration-500 ${scrolled ? 'h-0' : 'h-7'}`}>
        <Ticker fast className="py-1.5" items={['上海 · 8,530 cafés', 'Where heritage meets the megacity', 'Collect all 10 stamps', 'Meet Mochi in 3D', 'Code MOCHI10 = 10% off', '梧桐树下喝咖啡']} />
      </div>
      <div className="px-3 pt-3 md:px-6">
        <nav className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 ${scrolled || open || loc.pathname === '/mochi' ? 'border border-white/10 bg-espresso-900/85 shadow-2xl shadow-black/30 backdrop-blur-xl' : 'border border-transparent'}`}>
          <Link to="/" className="group flex items-center gap-2.5">
            <CatHead className="h-9 w-9 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" />
            <span className="leading-none">
              <span className="block font-serif text-xl tracking-tight text-cream">
                Plane <em className="text-tangerine">Canopy</em>
              </span>
              <span className="font-cn text-[10px] tracking-[0.4em] text-latte">梧桐咖啡地图</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `group relative overflow-hidden rounded-full px-4 py-2 text-sm transition-colors ${isActive ? 'bg-cream text-espresso-900' : 'text-cream/80 hover:bg-lime hover:text-espresso-900'}`
                }
              >
                <span className="block transition-transform duration-300 group-hover:-translate-y-[120%]">{l.label}</span>
                <span className="absolute inset-0 flex translate-y-full items-center justify-center font-cn text-sm transition-transform duration-300 group-hover:translate-y-0">{l.cn}</span>
                {l.badge && <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_10px_var(--color-lime)]" />}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link to="/profile" aria-label="Profile" className="flex items-center gap-2 rounded-full border border-white/15 p-1 pr-1 transition-colors hover:border-lime hover:bg-lime hover:text-espresso-900 sm:pr-3">
              <Avatar index={profile.avatar} className="h-7 w-7" />
              <span className="hidden text-xs sm:block">{signedIn ? profile.name.split(' ')[0] : 'Sign in'}</span>
            </Link>
            <button onClick={() => setCartOpen(true)} aria-label={`Bag, ${count} items`} className="relative flex cursor-pointer items-center gap-2 rounded-full bg-tangerine px-4 py-2 text-sm font-medium text-espresso-900 transition-colors hover:bg-lime">
              <Bag className="h-4 w-4" />
              <span className="tabular-nums">{count}</span>
            </button>
            <button className="rounded-full p-2 text-cream transition-colors hover:bg-lime hover:text-espresso-900 lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
              {open ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
        {open && (
          <div className="glass mx-auto mt-2 max-w-7xl animate-fade-in rounded-2xl bg-espresso-900/90 p-3 lg:hidden">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => `flex items-baseline justify-between rounded-xl px-4 py-3 font-display text-2xl uppercase ${isActive ? 'bg-cream text-espresso-900' : 'text-cream hover:bg-lime hover:text-espresso-900'}`}>
                {l.label}
                <span className="font-cn text-sm normal-case opacity-60">{l.cn}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

function CartDrawer() {
  const { cartOpen, setCartOpen, lines, subtotal, setQty, removeFromCart, count } = useStore()
  const navigate = useNavigate()
  const loc = useLocation()
  useEffect(() => setCartOpen(false), [loc.pathname, setCartOpen])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setCartOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setCartOpen])
  const left = Math.max(0, FREE_SHIPPING - subtotal)

  return (
    <div className={`fixed inset-0 z-[70] ${cartOpen ? '' : 'pointer-events-none'}`} aria-hidden={!cartOpen}>
      <div onClick={() => setCartOpen(false)} className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${cartOpen ? 'opacity-100' : 'opacity-0'}`} />
      <aside className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-espresso-900 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <p className="font-display text-lg uppercase">Your bag <span className="text-tangerine">({count})</span></p>
            <p className="font-cn text-xs text-latte">购物袋</p>
          </div>
          <button onClick={() => setCartOpen(false)} aria-label="Close bag" className="cursor-pointer rounded-full border border-white/15 p-2 transition-colors hover:border-lime hover:bg-lime hover:text-espresso-900">
            <Close className="h-5 w-5" />
          </button>
        </div>
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <Cat pose="idle" eyes="down" className="w-36" />
            <p className="font-serif text-2xl">Your bag is as empty as Mochi’s bowl.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-tangerine px-5 py-3 text-sm font-medium text-espresso-900 hover:bg-lime">
              Browse the store <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b border-white/10 px-6 py-4">
              <p className="text-xs text-cream/70">{left > 0 ? <>You’re <b className="text-lime">{fmt(left)}</b> away from free shipping</> : <b className="text-lime">Free shipping unlocked ✳</b>}</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-tangerine to-lime transition-all duration-700" style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING) * 100)}%` }} />
              </div>
            </div>
            <ul className="flex-1 divide-y divide-white/10 overflow-y-auto px-6">
              {lines.map((l) => (
                <li key={l.key} className="flex gap-4 py-4">
                  <Link to={`/product/${l.productId}`}>
                    <ProductThumb p={l.product} />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <Link to={`/product/${l.productId}`} className="font-serif text-lg leading-tight hover:text-lime">{l.product.name}</Link>
                      <button onClick={() => removeFromCart(l.key)} aria-label="Remove" className="cursor-pointer text-cream/40 hover:text-tangerine"><Trash className="h-4 w-4" /></button>
                    </div>
                    {l.option && <p className="text-xs text-cream/50">{l.option}</p>}
                    <div className="mt-auto flex items-center justify-between">
                      <Qty value={l.qty} onChange={(q) => setQty(l.key, q)} />
                      <span className="font-serif text-latte">{fmt(l.price * l.qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-3 border-t border-white/10 p-6">
              <div className="flex justify-between font-serif text-xl"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => navigate('/cart')} className="cursor-pointer rounded-full border border-white/15 py-3 text-sm transition-colors hover:border-lime hover:bg-lime hover:text-espresso-900">View bag</button>
                <button onClick={() => navigate('/checkout')} className="cursor-pointer rounded-full bg-tangerine py-3 text-sm font-medium text-espresso-900 transition-colors hover:bg-lime">Checkout</button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export function Qty({ value, onChange, light = false }: { value: number; onChange: (n: number) => void; light?: boolean }) {
  const b = `flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-lime hover:text-espresso-900`
  return (
    <div className={`inline-flex items-center gap-1 rounded-full border p-0.5 ${light ? 'border-espresso-900/20' : 'border-white/15'}`}>
      <button type="button" className={b} onClick={() => onChange(value - 1)} aria-label="Decrease"><Minus className="h-3.5 w-3.5" /></button>
      <span className="w-6 text-center text-sm tabular-nums">{value}</span>
      <button type="button" className={b} onClick={() => onChange(value + 1)} aria-label="Increase"><Plus className="h-3.5 w-3.5" /></button>
    </div>
  )
}

function Toasts() {
  const { toasts } = useStore()
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex flex-col items-center gap-2 px-4" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`flex animate-rise items-center gap-3 rounded-full px-5 py-3 text-sm shadow-2xl ${t.tone === 'lime' ? 'bg-lime text-espresso-900' : 'bg-cream text-espresso-900'}`}>
          <CatHead className="h-6 w-6" eyes="happy" />
          {t.text}
        </div>
      ))}
    </div>
  )
}

type Msg = { from: 'mochi' | 'me'; text: string; link?: { to: string; label: string } }

function reply(q: string): Msg {
  const s = q.toLowerCase()
  const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)]
  if (/(recommend|café|cafe|coffee|咖啡|推荐)/.test(s)) {
    const c = pick(cafes)
    return { from: 'mochi', text: `Try ${c.name} in ${c.district}. Order the ${c.signature.toLowerCase()} and tell them Mochi sent you.`, link: { to: `/cafe/${c.id}`, label: `Open ${c.name}` } }
  }
  if (/(3d|model|spin|模型|麻薯)/.test(s)) return { from: 'mochi', text: 'Come spin me around in the 3D studio! Click me there and I’ll do a flip.', link: { to: '/mochi', label: 'Enter 3D studio' } }
  if (/(order|track|delivery|订单)/.test(s)) return { from: 'mochi', text: 'Your orders live on your profile, with live roasting status.', link: { to: '/profile?tab=orders', label: 'See my orders' } }
  if (/(shop|buy|bean|merch|买|商店)/.test(s)) return { from: 'mochi', text: 'Psst: code MOCHI10 takes 10% off. The House Blend is my favourite.', link: { to: '/shop', label: 'Visit the store' } }
  if (/(new|story|article|read|文章|故事)/.test(s)) return { from: 'mochi', text: 'My newest diary entry is about a rainy closing shift. Bring tissues.', link: { to: '/article/diary-12-closing-shift', label: 'Read Diary No. 12' } }
  if (/(stamp|passport|印章)/.test(s)) return { from: 'mochi', text: 'Check in at a café page to collect its stamp. Ten stamps = legend status.', link: { to: '/profile?tab=passport', label: 'My passport' } }
  if (/(joke|funny|笑话)/.test(s)) return { from: 'mochi', text: 'Why did the cat refuse decaf? Because it already had nine lives to stay awake for.' }
  if (/(hi|hello|hey|你好|嗨)/.test(s)) return { from: 'mochi', text: 'Meow! 你好呀～ I’m Mochi, head barista. Ask me for a café, a story or a discount.' }
  return { from: 'mochi', text: pick(mochiLines) }
}

function FloatingMochi() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([{ from: 'mochi', text: 'Meow! I’m Mochi 麻薯. Want a café tip, a story, or a secret discount?' }])
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(false)
  const end = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => end.current?.scrollIntoView({ behavior: 'smooth' }), [msgs, typing])

  const send = (q: string) => {
    if (!q.trim()) return
    setMsgs((m) => [...m, { from: 'me', text: q }])
    setText('')
    setTyping(true)
    window.setTimeout(() => {
      setTyping(false)
      setMsgs((m) => [...m, reply(q)])
    }, 700)
  }
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    send(text)
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      {open && (
        <div className="glass flex h-[460px] w-[min(360px,calc(100vw-2.5rem))] animate-rise flex-col overflow-hidden rounded-3xl bg-espresso-900/90 shadow-2xl">
          <div className="flex items-center gap-3 border-b border-white/10 bg-tangerine px-4 py-3 text-espresso-900">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream"><CatHead className="h-8 w-8" eyes="happy" /></span>
            <div className="flex-1">
              <p className="font-display text-sm font-semibold uppercase">Ask Mochi</p>
              <p className="flex items-center gap-1.5 text-[11px]"><span className="h-1.5 w-1.5 rounded-full bg-espresso-900" /> Head barista · online</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="cursor-pointer rounded-full p-1.5 hover:bg-espresso-900 hover:text-lime"><Close className="h-5 w-5" /></button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] animate-fade-in rounded-2xl px-4 py-2.5 text-sm ${m.from === 'me' ? 'rounded-br-sm bg-lime text-espresso-900' : 'rounded-bl-sm bg-white/10 text-cream'}`}>
                  {m.text}
                  {m.link && (
                    <button onClick={() => { navigate(m.link!.to); setOpen(false) }} className="mt-2 flex cursor-pointer items-center gap-1 rounded-full bg-tangerine px-3 py-1 text-xs font-medium text-espresso-900 hover:bg-lime">
                      {m.link.label} <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {typing && <div className="w-16 rounded-2xl bg-white/10 px-4 py-2.5 text-sm tracking-widest text-cream/60">•••</div>}
            <div ref={end} />
          </div>
          <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-2">
            {['Recommend a café', 'Show me 3D', 'Any discount?', 'New story', 'Tell a joke'].map((q) => (
              <button key={q} onClick={() => send(q)} className="shrink-0 cursor-pointer rounded-full border border-white/15 px-3 py-1.5 text-xs text-cream/80 hover:border-lime hover:bg-lime hover:text-espresso-900">{q}</button>
            ))}
          </div>
          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-white/10 p-3">
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Message Mochi…" className="flex-1 rounded-full bg-white/5 px-4 py-2.5 text-sm placeholder:text-cream/40 focus:outline-none focus:ring-1 focus:ring-lime" />
            <button aria-label="Send" className="cursor-pointer rounded-full bg-tangerine p-2.5 text-espresso-900 hover:bg-lime"><Send className="h-4 w-4" /></button>
          </form>
        </div>
      )}
      <button onClick={() => setOpen((o) => !o)} className="group flex cursor-pointer items-center gap-2" aria-label="Chat with Mochi">
        {!open && pathname !== '/mochi' && <span className="hidden rounded-full bg-cream px-4 py-2 text-xs font-medium text-espresso-900 shadow-xl transition-transform group-hover:-translate-x-1 sm:block">Ask Mochi <b className="text-tangerine">♡</b></span>}
        <span className="flex h-16 w-16 animate-float items-center justify-center rounded-full bg-tangerine shadow-[0_10px_40px_-6px_rgba(255,122,26,0.7)] ring-4 ring-espresso-900 transition-colors group-hover:bg-lime">
          <CatHead className="mt-2 h-14 w-14 transition-transform group-hover:rotate-12" eyes={open ? 'happy' : 'open'} />
        </span>
      </button>
    </div>
  )
}

function Footer() {
  const { newsletter, setNewsletter, toast } = useStore()
  const [email, setEmail] = useState('')
  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast('That email looks a bit off')
    setNewsletter(true)
    toast('Welcome in. First letter arrives Sunday.', 'lime')
  }
  const cols: [string, [string, string][]][] = [
    ['Explore', [['Art Map', '/map'], ['Culture', '/culture'], ['Mochi’s Diary', '/diary'], ['3D Studio', '/mochi']]],
    ['Store', [['All products', '/shop'], ['Your bag', '/cart'], ['Checkout', '/checkout'], ['Orders', '/profile?tab=orders']]],
    ['You', [['Profile', '/profile'], ['Café passport', '/profile?tab=passport'], ['Saved', '/profile?tab=saved'], ['Write to Mochi', '/diary#letters']]],
  ]
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-espresso-950 pt-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <div className="glass flex h-16 w-16 items-center justify-center rounded-2xl"><CatHead className="h-12 w-12" /></div>
              <p className="text-sm text-cream/60">Mochi’s Sunday Letter<br /><span className="text-cream">One new café, one story, every week.</span></p>
            </div>
            {newsletter ? (
              <p className="mt-8 font-serif text-2xl italic text-lime">You’re on the list. 周日见 ♡</p>
            ) : (
              <form onSubmit={submit} className="glass mt-8 flex max-w-md items-center rounded-full p-1.5">
                <label htmlFor="footer-email" className="sr-only">Email</label>
                <input id="footer-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="min-w-0 flex-1 bg-transparent px-5 text-sm placeholder:text-cream/40 focus:outline-none" />
                <button className="group flex cursor-pointer items-center gap-2 rounded-full bg-tangerine px-5 py-3 text-sm font-medium text-espresso-900 transition-colors hover:bg-lime">
                  Subscribe <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            )}
            <div className="mt-8 flex gap-2">
              <a href={BOT_URL} target="_blank" rel="noopener noreferrer" aria-label="Telegram bot @HeyPearlBot" className="flex h-10 w-10 items-center justify-center rounded-full bg-tangerine text-espresso-900 transition-all hover:-translate-y-1 hover:bg-lime">
                <Telegram className="h-4 w-4" />
              </a>
              {[['Instagram', Instagram], ['Weibo', Weibo], ['Rednote', Rednote], ['Spotify', Spotify]].map(([label, Icon]) => {
                const I = Icon as typeof Instagram
                return (
                  <a key={label as string} href="#" onClick={(e) => { e.preventDefault(); toast(`${label} is coming soon`) }} aria-label={label as string} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream/80 transition-all hover:-translate-y-1 hover:border-lime hover:bg-lime hover:text-espresso-900">
                    <I className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            {cols.map(([title, items]) => (
              <div key={title}>
                <p className="font-display text-[10px] uppercase tracking-[0.2em] text-latte">{title}</p>
                <ul className="mt-4 space-y-2.5 text-cream/70">
                  {items.map(([l, to]) => (
                    <li key={l}><Link to={to} className="transition-colors hover:text-lime">{l}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <PearlBotFooterCard />
        <p className="mt-16 select-none whitespace-nowrap text-center font-display text-[8.2vw] font-black uppercase leading-[0.8] tracking-tighter text-cream/[0.05] xl:text-[6.6rem]">
          Plane Canopy
        </p>
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-cream/40 md:flex-row md:pr-24">
          <p>© 2026 Plane Canopy 梧桐咖啡地图. An art map of Shanghai coffee.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="cursor-pointer hover:text-lime">Back to top ↑</button>
        </div>
      </div>
    </footer>
  )
}
