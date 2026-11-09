import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { MochiStage, MODELS, type ModelId } from '../components/three/MochiModel'
import { Cat, CatHead } from '../components/Cat'
import { Skyline } from '../components/Skyline'
import { CafeMap } from '../components/CafeMap'
import { ArticleCard } from '../components/ArticleCard'
import { ProductCard } from '../components/ProductCard'
import { ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight } from '../components/Icons'
import { Accent, Kicker, Reveal, SectionTitle, Ticker, buttonClass } from '../components/ui'
import { articles, getArticle } from '../data/articles'
import { cafes, getCafe } from '../data/cafes'
import { img } from '../data/img'
import { moods, quotes, mochiLines, type MoodId } from '../data/misc'
import { products } from '../data/products'
import { useStore } from '../lib/store'
import { PearlBotSection } from '../components/PearlBot'

export function Home() {
  return (
    <>
      <Hero />
      <div className="border-y border-white/10 bg-espresso-950 py-5 font-display text-2xl font-semibold uppercase text-cream/80 md:text-4xl">
        <Ticker items={['Wukang', 'The Bund', 'Anfu Road', 'M50', 'West Bund', 'Tianzifang', 'Lujiazui', '梧桐', '咖啡', '弄堂']} />
      </div>
      <MapBlock />
      <MoodPicker />
      <CultureBlock />
      <Universe />
      <Ambient />
      <ShopBlock />
      <Passport />
      <PearlBotSection />
      <Letters />
    </>
  )
}

function Hero() {
  const { pet } = useStore()
  const [hop, setHop] = useState(0)
  const [line, setLine] = useState('Meow! 你好呀～')
  const poke = () => {
    setHop((h) => h + 1)
    pet()
    setLine(mochiLines[(hop + 1) % mochiLines.length])
  }
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-40 top-10 h-[640px] w-[640px] rounded-full bg-tangerine/25 blur-[140px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-latte/15 blur-[120px]" />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-36 md:px-8 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <div className="flex animate-rise flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs text-cream/70">
              <span className="h-2 w-2 animate-pulse rounded-full bg-lime" /> An art map of Shanghai coffee
            </span>
            <span className="font-display text-[10px] uppercase tracking-[0.25em] text-latte">Vol. 07 / 上海</span>
          </div>
          <h1 className="mt-8 animate-rise font-display text-[clamp(2.4rem,4.2vw,4.5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.03em] text-cream" style={{ animationDelay: '80ms' }}>
            Where <Accent className="text-[1.12em] text-latte">European</Accent>
            <br />
            heritage meets
            <br />
            the <span className="relative inline-block text-tangerine">
              megacity
              <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 300 16" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 10 Q80 2 150 8 T298 6" stroke="#c6ff3d" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-lime">.</span>
          </h1>
          <p className="mt-6 animate-rise font-cn text-lg tracking-[0.3em] text-latte/80" style={{ animationDelay: '160ms' }}>梧桐树下，八千杯咖啡的城市</p>
          <p className="mt-6 max-w-md animate-rise text-base leading-relaxed text-cream/70" style={{ animationDelay: '220ms' }}>
            Shanghai pours from more cafés than any city on Earth. Follow Mochi, our cream-and-cocoa head barista, through Art Deco lanes, gallery espresso bars and shikumen hideaways.
          </p>
          <div className="mt-10 flex animate-rise flex-wrap items-center gap-4" style={{ animationDelay: '300ms' }}>
            <Link to="/map" className={buttonClass('primary')}>
              Explore the map <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/mochi" className={buttonClass('ghost')}>
              Meet Mochi in 3D ↻
            </Link>
          </div>
          <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[['8,530+', 'cafés citywide'], ['1928', 'first espresso'], ['10', 'stamps to collect']].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-2xl font-semibold text-cream md:text-3xl">{n}</dt>
                <dd className="mt-1 text-[11px] uppercase tracking-[0.16em] text-cream/50">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-t-[240px] rounded-b-2xl border border-white/10 bg-gradient-to-b from-espresso-700 via-espresso-800 to-espresso-950">
            <div className="absolute left-1/2 top-14 h-40 w-40 -translate-x-1/2 rounded-full bg-gradient-to-b from-tangerine-light to-tangerine opacity-80" />
            <div className="absolute left-1/2 top-14 h-40 w-40 -translate-x-1/2 rounded-full bg-tangerine/60 blur-3xl" />
            <Skyline className="absolute inset-x-0 bottom-0 w-full opacity-80" />
            <MochiStage model="cat-3" className="absolute inset-0" autoRotate enableZoom={false} hop={hop} onPet={poke} cameraZ={2.9} />
            <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-espresso-900/70 px-3 py-1 font-display text-[9px] uppercase tracking-[0.25em] text-latte backdrop-blur">Drag to spin · tap to hop</span>
          </div>
          {/* speech sticker */}
          <button onClick={poke} className="absolute left-2 top-2 z-10 hidden -rotate-6 cursor-pointer rounded-[28px] bg-cream px-5 py-4 text-left text-espresso-900 shadow-2xl transition-transform hover:rotate-0 hover:scale-105 sm:block">
            <span key={line} className="block animate-fade-in font-serif text-lg italic leading-tight">{line}</span>
            <span className="mt-1 block font-display text-[9px] uppercase tracking-[0.2em] text-tangerine">Tap me ♥</span>
            <span className="absolute -bottom-2 right-8 h-4 w-4 rotate-45 bg-cream" />
          </button>
          {/* polaroids */}
          {[getCafe('anfu')!, getCafe('wukang')!].map((c, i) => (
            <Link
              key={c.id}
              to={`/cafe/${c.id}`}
              className={`absolute z-10 hidden w-32 bg-cream p-2 pb-6 text-espresso-900 shadow-2xl transition-all duration-500 hover:z-20 hover:rotate-0 hover:scale-110 md:block ${i === 0 ? '-right-6 top-10 rotate-6' : '-left-10 bottom-28 -rotate-[8deg]'}`}
            >
              <img src={img(c.hero, 300, 300)} alt={c.name} className="aspect-square w-full object-cover" />
              <span className="absolute bottom-1.5 left-2 right-2 truncate font-serif text-xs italic">{c.name}</span>
            </Link>
          ))}
          {/* ticket */}
          <div className="absolute -bottom-6 right-0 z-10 hidden rotate-3 rounded-xl border-2 border-dashed border-espresso-900/30 bg-lime p-4 text-espresso-900 shadow-2xl sm:block md:-right-8">
            <p className="font-display text-xs font-bold uppercase">Inside this issue</p>
            {[['10 cafés mapped', '/map'], ['9 long reads', '/culture'], ['Mochi in 3D', '/mochi'], ['Café passport', '/profile?tab=passport']].map(([t, to]) => (
              <Link key={t} to={to} className="mt-1 flex items-center gap-1.5 text-xs hover:underline"><Check className="h-3 w-3" /> {t}</Link>
            ))}
          </div>
        </div>
      </div>
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 pb-8 font-display text-[10px] uppercase tracking-[0.25em] text-cream/40 md:px-8">
        <span>Xuhui · Huangpu · Pudong</span>
        <a href="#map" className="text-cream/70 hover:text-lime">Scroll to the good stuff ↓</a>
        <span className="hidden md:block">Independent coffee journal</span>
      </div>
    </section>
  )
}

function MapBlock() {
  return (
    <section id="map" className="relative scroll-mt-20 overflow-hidden bg-espresso-950 py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-[500px] w-[700px] -translate-y-1/2 rounded-full bg-tangerine/10 blur-[160px]" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Kicker num="01">Interactive art map · 艺术地图</Kicker>
            <SectionTitle className="mt-6">
              A city drawn <br /> in <Accent className="text-tangerine">crema.</Accent>
            </SectionTitle>
          </Reveal>
          <Reveal delay={120} className="flex flex-col justify-end gap-4 lg:col-span-4 lg:col-start-9">
            <p className="text-cream/60">Ten hand-picked cafés from Puxi lanes to Pudong towers. Hover a node for its card, click to pin, click again to step inside.</p>
            <Link to="/map" className={buttonClass('ghost', 'self-start')}>Open full map <ArrowUpRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
        <div className="mt-14">
          <CafeMap />
        </div>
      </div>
    </section>
  )
}

function MoodPicker() {
  const [id, setId] = useState<MoodId>('slow')
  const m = moods.find((x) => x.id === id)!
  const cafe = getCafe(m.cafe)!
  const article = getArticle(m.article)!
  return (
    <section className="bg-paper py-24 text-espresso-900 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Kicker num="02" dark>Mood of the day · 今日心情</Kicker>
          <SectionTitle className="mt-6">
            How are you <br /> <Accent className="text-tangerine">today?</Accent>
          </SectionTitle>
          <p className="mt-6 max-w-sm text-espresso-900/70">Tell Mochi how you feel. It will pick the café, the cup and the story to match.</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {moods.map((x) => (
              <button
                key={x.id}
                onClick={() => setId(x.id)}
                aria-pressed={id === x.id}
                className={`flex cursor-pointer items-center gap-2 rounded-full border px-5 py-3 text-sm transition-all active:scale-95 ${id === x.id ? 'border-espresso-900 bg-espresso-900 text-cream' : 'border-espresso-900/20 hover:border-lime hover:bg-lime'}`}
              >
                <span className="text-tangerine">{x.icon}</span> {x.label} <span className="font-cn text-xs opacity-60">{x.cn}</span>
              </button>
            ))}
          </div>
          <p className="mt-6 font-serif text-sm italic text-espresso-900/50">P.S. Whatever the weather, there’s a seat for you.</p>
        </Reveal>
        <Reveal delay={150} className="lg:col-span-7">
          <div key={id} className="relative grid animate-fade-in overflow-hidden rounded-3xl bg-espresso-900 text-cream md:grid-cols-2">
            <div className="relative min-h-[340px] overflow-hidden bg-gradient-to-br from-tangerine to-[#c4500a]">
              <img src={img(cafe.hero, 800)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-multiply" />
              <Cat pose="hold" prop={id === 'inspire' ? 'portafilter' : id === 'rain' ? 'latte' : id === 'wake' ? 'bean' : 'book'} eyes={m.eyes} apron={id !== 'slow'} className="absolute -bottom-4 left-1/2 w-[70%] -translate-x-1/2 drop-shadow-2xl" />
              <span className="absolute left-4 top-4 animate-wiggle rounded-full bg-lime px-3 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.15em] text-espresso-900">{m.icon} {m.label}</span>
            </div>
            <div className="flex flex-col p-8">
              <p className="font-display text-[10px] uppercase tracking-[0.25em] text-latte">Picked for you</p>
              <h3 className="mt-3 font-serif text-3xl leading-tight">{m.line}</h3>
              <p className="mt-3 text-sm text-cream/60">{m.desc}</p>
              <Link to={`/cafe/${cafe.id}`} className="mt-6 flex items-center justify-between rounded-xl border border-white/10 p-4 transition-colors hover:border-lime hover:bg-lime hover:text-espresso-900">
                <span>
                  <span className="block font-display text-[9px] uppercase tracking-[0.2em] opacity-60">Go to</span>
                  <span className="font-serif text-lg">{cafe.name}</span>
                  <span className="block text-xs opacity-60">Order: {m.drink}</span>
                </span>
                <ArrowUpRight className="h-5 w-5" />
              </Link>
              <Link to={`/article/${article.slug}`} className="mt-3 flex items-center justify-between rounded-xl border border-white/10 p-4 transition-colors hover:border-lime hover:bg-lime hover:text-espresso-900">
                <span>
                  <span className="block font-display text-[9px] uppercase tracking-[0.2em] opacity-60">Read</span>
                  <span className="font-serif text-lg leading-tight">{article.title}</span>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function CultureBlock() {
  const list = articles.slice(0, 6)
  const ratios = ['aspect-[4/5]', 'aspect-[4/3]', 'aspect-square', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[4/3]']
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Kicker num="03">The culture issue · 文化专题</Kicker>
            <SectionTitle className="mt-6">
              Stories <br /> <Accent className="text-latte">by the cup.</Accent>
            </SectionTitle>
          </Reveal>
          <Reveal delay={120} className="flex items-end justify-between gap-6 lg:col-span-5 lg:col-start-8">
            <p className="max-w-sm text-cream/60">Long reads on a century of beans, from concession salons to the white cubes of the West Bund.</p>
            <Link to="/culture" className={buttonClass('ghost', 'hidden shrink-0 md:inline-flex')}>All stories</Link>
          </Reveal>
        </div>
        <div className="mt-14 columns-1 gap-6 md:columns-2 lg:columns-3">
          {list.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 100}>
              <ArticleCard a={a} ratio={ratios[i]} />
            </Reveal>
          ))}
          <Reveal>
            <Link to="/culture" className="group mb-6 block break-inside-avoid rounded-2xl bg-latte-light p-8 text-espresso-900 transition-colors hover:bg-lime">
              <p className="font-display text-[10px] uppercase tracking-[0.2em] text-espresso-600">By the numbers</p>
              <p className="mt-6 font-display text-7xl font-bold leading-none tracking-tight">8,530</p>
              <p className="mt-4 font-serif text-xl italic">cafés, more than London, Tokyo or New York.</p>
              <div className="mt-8 h-2 overflow-hidden rounded-full bg-espresso-900/10"><div className="h-full w-[88%] rounded-full bg-tangerine" /></div>
              <span className="mt-6 inline-flex items-center gap-2 font-medium">See every story <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Universe() {
  const [model, setModel] = useState<ModelId>('cat-2')
  const def = MODELS.find((m) => m.id === model)!
  const idx = MODELS.findIndex((m) => m.id === model)
  return (
    <section className="relative overflow-hidden bg-espresso-950 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <Kicker num="04">Mochi universe · 3D 宇宙</Kicker>
            <SectionTitle className="mt-6">
              Our world. <br /> <Accent className="text-tangerine">In three dimensions.</Accent>
            </SectionTitle>
          </Reveal>
          <div className="flex items-center gap-4">
            <span className="flex h-20 w-20 animate-spin-slow items-center justify-center rounded-full border border-dashed border-latte/50 font-display text-sm text-latte">360°</span>
            <p className="font-display text-xs uppercase leading-relaxed tracking-[0.2em] text-cream/60">Turn it <br /> and look</p>
          </div>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <div className="flex gap-3 lg:col-span-2 lg:flex-col">
            {MODELS.map((m) => (
              <button key={m.id} onClick={() => setModel(m.id)} className={`flex flex-1 cursor-pointer flex-col items-center gap-2 rounded-2xl border p-4 transition-all lg:flex-none ${model === m.id ? 'border-tangerine bg-tangerine/15' : 'border-white/10 hover:border-lime hover:bg-lime/10'}`}>
                <CatHead className="h-14 w-14" eyes={m.id === 'cat-2' ? 'open' : 'happy'} />
                <span className="text-center font-display text-[10px] uppercase tracking-[0.15em]">{m.label}</span>
              </button>
            ))}
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_50%_40%,#4a2f21,#120a06_75%)] lg:col-span-6">
            <div className="flex items-center justify-between px-5 pt-4 font-display text-[9px] uppercase tracking-[0.25em] text-cream/50">
              <span>Universe / Object 0{idx + 1}</span>
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" /> Live WebGL</span>
            </div>
            <MochiStage model={model} className="aspect-square w-full" enableZoom={false} />
            <span className="pointer-events-none absolute bottom-4 left-5 font-display text-[9px] uppercase tracking-[0.25em] text-cream/30">Plane Canopy / 3D</span>
          </div>
          <div className="flex flex-col justify-center lg:col-span-4">
            <p className="font-display text-xs text-latte">0{idx + 1} / 0{MODELS.length}</p>
            <h3 className="mt-3 font-serif text-4xl">{def.title}</h3>
            <p className="font-cn text-lg text-latte">{def.cn}</p>
            <p className="mt-4 text-cream/60">
              {model === 'cat-2'
                ? 'Mochi on windowsill duty: head tilted, tail curled, watching the plane-tree lane for regulars.'
                : 'Mochi with the bean from Diary No. 09, hugged tight. Do not ask for it back.'}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['GLB · Draco', 'PBR textures', 'Real-time'].map((t) => (
                <span key={t} className="rounded-full border border-white/15 px-3 py-1 font-display text-[9px] uppercase tracking-[0.2em] text-cream/60">{t}</span>
              ))}
            </div>
            <Link to="/mochi" className={buttonClass('primary', 'mt-8 self-start')}>Enter the 3D studio <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function Ambient() {
  const ref = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)
  const [q, setQ] = useState(0)
  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const p = ((window.innerHeight - r.top) / (window.innerHeight + r.height)) * 2 - 1
        setOffset(Math.max(-1, Math.min(1, p)))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  useEffect(() => {
    const t = window.setInterval(() => setQ((n) => (n + 1) % quotes.length), 7000)
    return () => window.clearInterval(t)
  }, [q])
  const quote = quotes[q]
  return (
    <section ref={ref} className="relative flex min-h-[110vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-x-0 -inset-y-[15%]" style={{ transform: `translateY(${offset * -10}%) scale(1.1)` }}>
        <img src={img('1608875004752-2fdb6a39ba4c', 1920)} alt="" className="h-full w-full object-cover blur-[6px] saturate-150" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-espresso-950 via-espresso-900/40 to-espresso-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(18,10,6,0.85)_80%)]" />
      <div className="pointer-events-none absolute bottom-0 right-[4%] w-[40vw] max-w-[480px] opacity-70 blur-[2px]" style={{ transform: `translateY(${offset * -18}%)` }} aria-hidden="true">
        <svg viewBox="0 0 400 220" className="absolute -top-[30%] left-[0%] w-[100%]">
          <path d="M20 200 Q200 -40 380 200 Q290 180 200 200 Q110 180 20 200 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
          <path d="M200 20 Q150 110 110 188 M200 20 Q250 110 290 188 M200 20 V220" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none" />
        </svg>
        <Cat pose="hold" prop="latte" eyes="happy" apron className="w-[70%]" />
      </div>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 60 }, (_, i) => (
          <span key={i} className="absolute top-0 w-px animate-rain bg-gradient-to-b from-transparent to-white/40" style={{ left: `${(i * 61) % 100}%`, height: 40 + ((i * 17) % 60), animationDelay: `${((i * 37) % 100) / 100}s`, animationDuration: `${0.6 + ((i * 13) % 50) / 100}s` }} />
        ))}
      </div>
      <figure className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <p className="font-display text-[10px] uppercase tracking-[0.32em] text-latte">05 — Voices of the lanes · 巷子里的声音</p>
        <blockquote key={q} className="mt-10 animate-fade-in font-serif text-[clamp(2rem,5vw,4.6rem)] leading-[1.08] tracking-tight text-cream">“{quote.text}”</blockquote>
        <figcaption className="mt-10 flex items-center justify-center gap-4 text-sm text-cream/60">
          <button onClick={() => setQ((q - 1 + quotes.length) % quotes.length)} aria-label="Previous quote" className="cursor-pointer rounded-full border border-white/20 p-2.5 transition-colors hover:border-lime hover:bg-lime hover:text-espresso-900"><ChevronLeft className="h-4 w-4" /></button>
          <span className="min-w-56">{quote.by} <span className="ml-2 font-display text-[10px] text-latte">0{q + 1} / 0{quotes.length}</span></span>
          <button onClick={() => setQ((q + 1) % quotes.length)} aria-label="Next quote" className="cursor-pointer rounded-full border border-white/20 p-2.5 transition-colors hover:border-lime hover:bg-lime hover:text-espresso-900"><ChevronRight className="h-4 w-4" /></button>
        </figcaption>
        <Link to="/article/diary-12-closing-shift" className={buttonClass('ghost', 'mt-10')}>Read Diary No. 12 <ArrowUpRight className="h-4 w-4" /></Link>
      </figure>
    </section>
  )
}

function ShopBlock() {
  const list = [products[0], products[3], products[4], products[5]]
  return (
    <section className="bg-paper py-24 text-espresso-900 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <Kicker num="06" dark>The Canopy store · 商店</Kicker>
            <SectionTitle className="mt-6">Take the city <Accent className="text-tangerine">home.</Accent></SectionTitle>
          </Reveal>
          <div className="flex flex-col items-start gap-4">
            <p className="max-w-xs text-espresso-900/60">Small-batch roasts and goods made with the partners on our map. Code <b className="text-tangerine">MOCHI10</b> for 10% off.</p>
            <Link to="/shop" className={buttonClass('dark')}>Shop all {products.length} <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProductCard p={p} light offset={i % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Passport() {
  const { stamps } = useStore()
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Kicker num="07">Café passport · 咖啡护照</Kicker>
          <SectionTitle className="mt-6">Collect all <br /> <Accent className="text-lime">ten stamps.</Accent></SectionTitle>
          <p className="mt-6 max-w-sm text-cream/60">Visit a café, open its page and tap “Check in”. Your passport lives on your profile.</p>
          <div className="mt-8 flex items-center gap-4">
            <span className="font-display text-6xl font-bold text-tangerine">{stamps.length}<span className="text-2xl text-cream/40">/10</span></span>
            <Link to="/profile?tab=passport" className={buttonClass('primary')}>Open my passport</Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-5 gap-3 lg:col-span-7">
          {cafes.map((c, i) => {
            const got = stamps.includes(c.id)
            return (
              <Link key={c.id} to={`/cafe/${c.id}`} title={c.name} className={`group relative flex aspect-square flex-col items-center justify-center rounded-full border-2 border-dashed p-2 text-center transition-all duration-300 hover:scale-105 ${got ? 'rotate-[-8deg] border-tangerine bg-tangerine/15 text-tangerine' : 'border-white/15 text-cream/40 hover:border-lime hover:text-lime'}`}>
                {got ? <CatHead className="h-1/2 w-1/2" eyes="happy" /> : <span className="font-display text-lg">{String(i + 1).padStart(2, '0')}</span>}
                <span className="mt-1 line-clamp-2 font-display text-[7px] uppercase leading-tight tracking-[0.1em] md:text-[8px]">{c.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Letters() {
  return (
    <section className="px-6 pb-24 md:px-8">
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 overflow-hidden rounded-[32px] bg-tangerine p-10 text-espresso-900 md:grid-cols-2 md:p-16">
        <div className="absolute -right-10 -top-10 font-display text-[16rem] leading-none text-espresso-900/10">✳</div>
        <div className="relative">
          <p className="font-display text-[10px] uppercase tracking-[0.3em]">09 — Your turn · 轮到你了</p>
          <h2 className="mt-6 font-display text-5xl font-semibold uppercase leading-[0.95] md:text-6xl">
            Know a café <br /> worth <Accent>a stamp?</Accent>
          </h2>
          <p className="mt-6 max-w-md text-espresso-900/75">Write Mochi a letter: a hidden window bar, a barista who remembers your name, a rainy-night cup. The best ones end up on the map.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/diary#letters" className={buttonClass('dark')}>Write to Mochi <ArrowUpRight className="h-4 w-4" /></Link>
            <Link to="/profile" className={buttonClass('outline-dark')}>Set up my profile</Link>
          </div>
        </div>
        <div className="relative flex justify-center">
          <Cat pose="hold" prop="heart" eyes="happy" className="w-64 animate-float drop-shadow-2xl" />
          <span className="absolute right-6 top-6 rotate-12 rounded-2xl bg-cream px-4 py-3 font-serif text-lg italic">Your story <br /> might warm <br /> someone ♡</span>
        </div>
      </div>
    </section>
  )
}
