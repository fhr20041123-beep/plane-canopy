import { useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router'
import { cafes, categoryColor, getCafe } from '../data/cafes'
import { articles } from '../data/articles'
import { img } from '../data/img'
import { useStore, fmtDate } from '../lib/store'
import { Avatar } from '../components/Avatar'
import { ArticleCard } from '../components/ArticleCard'
import { CatHead } from '../components/Cat'
import { MapArt } from '../components/CafeMap'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock, Heart, Pin, Share, Stamp } from '../components/Icons'
import { Breadcrumbs, Field, Kicker, Stars, Textarea, buttonClass } from '../components/ui'
import { NotFound } from './NotFound'

const seedReviews = [
  { name: 'Wen', rating: 5, text: 'Exactly as magical as Mochi promised. Went twice in one day.', date: '2025-10-11', avatar: 1 },
  { name: 'Jules', rating: 4, text: 'Great cup, tiny seats. Go early on weekends.', date: '2025-09-27', avatar: 4 },
]

export function CafeDetail() {
  const { id } = useParams()
  const cafe = getCafe(id)
  const store = useStore()
  const [active, setActive] = useState(0)
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  if (!cafe) return <NotFound />

  const saved = store.savedCafes.includes(cafe.id)
  const stamped = store.stamps.includes(cafe.id)
  const photos = [cafe.hero, ...cafe.gallery]
  const userReviews = store.reviews.filter((r) => r.cafeId === cafe.id)
  const related = articles.filter((a) => a.cafes.includes(cafe.id)).slice(0, 3)
  const idx = cafes.findIndex((c) => c.id === cafe.id)
  const prev = cafes[(idx - 1 + cafes.length) % cafes.length]
  const next = cafes[(idx + 1) % cafes.length]

  const checkIn = () => {
    if (store.stamp(cafe.id)) store.toast(`Stamp collected: ${cafe.name} (${store.stamps.length + 1}/10)`, 'lime')
    else store.toast('Already stamped. Mochi remembers you.')
  }
  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      store.toast('Link copied to clipboard')
    } catch {
      store.toast('Copy the address bar to share')
    }
  }
  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (text.trim().length < 5) return store.toast('Tell Mochi a little more (5+ characters)')
    store.addReview({ cafeId: cafe.id, name: store.profile.name, rating, text: text.trim() })
    setText('')
    store.toast('Review posted. Thank you!', 'lime')
  }

  return (
    <>
      <section className="relative h-[86vh] min-h-[560px] overflow-hidden">
        {photos.map((p, i) => (
          <img key={p} src={img(p, 2000)} alt={i === 0 ? cafe.name : ''} className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${i === active ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-900 via-espresso-900/40 to-espresso-900/30" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-14 md:px-8">
          <Breadcrumbs items={[['Home', '/'], ['Map', '/map'], [cafe.name]]} />
          <p className="mt-6 font-display text-[10px] uppercase tracking-[0.25em]" style={{ color: categoryColor[cafe.category] }}>
            {cafe.category} · {cafe.district} · since {cafe.since}
          </p>
          <h1 className="mt-3 max-w-4xl animate-rise font-display text-[clamp(2.6rem,7vw,6rem)] font-semibold uppercase leading-[0.9] tracking-[-0.03em]">{cafe.name}</h1>
          <p className="mt-3 font-cn text-2xl text-latte">{cafe.cn}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button onClick={checkIn} className={buttonClass(stamped ? 'ghost' : 'primary')}>
              {stamped ? <><Check className="h-4 w-4" /> Stamped</> : <><Stamp className="h-4 w-4" /> Check in & collect stamp</>}
            </button>
            <button onClick={() => store.toast(store.toggle('savedCafes', cafe.id) ? 'Saved to your profile' : 'Removed from saved')} className={buttonClass('ghost', saved ? '!bg-tangerine !text-espresso-900' : '')}>
              <Heart className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} /> {saved ? 'Saved' : 'Save'}
            </button>
            <button onClick={share} className={buttonClass('ghost')}><Share className="h-4 w-4" /> Share</button>
            <span className="ml-auto flex items-center gap-2 text-sm"><Stars value={cafe.rating} /> {cafe.rating} · {cafe.price}</span>
          </div>
          <div className="mt-8 flex gap-2">
            {photos.map((p, i) => (
              <button key={p} onClick={() => setActive(i)} aria-label={`Photo ${i + 1}`} className={`h-14 w-20 cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${i === active ? 'border-tangerine' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                <img src={img(p, 200, 140)} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Kicker num="01">About · 关于</Kicker>
            <p className="mt-6 font-serif text-3xl leading-snug md:text-4xl">{cafe.note}</p>
            {cafe.about.map((p) => <p key={p.slice(0, 20)} className="mt-6 leading-relaxed text-cream/70">{p}</p>)}

            <div className="mt-14">
              <Kicker num="02">Menu · 菜单</Kicker>
              <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
                {cafe.menu.map((m) => (
                  <li key={m.name} className="group flex items-baseline gap-4 py-4">
                    <span className="font-serif text-xl transition-colors group-hover:text-tangerine">{m.name}</span>
                    {m.mochi && <span className="flex items-center gap-1 rounded-full bg-tangerine/15 px-2 py-0.5 font-display text-[9px] uppercase tracking-[0.15em] text-tangerine"><CatHead className="h-3.5 w-3.5" /> Mochi pick</span>}
                    {m.note && <span className="hidden text-xs text-cream/40 sm:inline">{m.note}</span>}
                    <span className="flex-1 border-b border-dotted border-white/15" />
                    <span className="font-display text-sm text-latte">¥{m.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-4 lg:col-span-4 lg:col-start-9">
            <div className="glass rounded-2xl p-6">
              <p className="flex items-center gap-3 text-sm"><Pin className="h-4 w-4 text-latte" /> {cafe.address}</p>
              <p className="mt-3 flex items-center gap-3 text-sm"><Clock className="h-4 w-4 text-latte" /> {cafe.hours}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {cafe.features.map((f) => <span key={f} className="rounded-full border border-white/15 px-3 py-1 text-xs text-cream/70">{f}</span>)}
              </div>
              <div className="relative mt-5 aspect-[800/560] overflow-hidden rounded-xl border border-white/10 bg-espresso-900">
                <MapArt />
                <span className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(cafe.x / 800) * 100}%`, top: `${(cafe.y / 560) * 100}%` }}>
                  <span className="absolute h-4 w-4 animate-pulse-ring rounded-full bg-tangerine" />
                  <span className="relative block h-4 w-4 rounded-full border-2 border-cream bg-tangerine shadow-[0_0_20px_4px_rgba(255,122,26,0.8)]" />
                </span>
              </div>
              <Link to="/map" className="mt-4 flex items-center justify-center gap-2 rounded-full border border-white/15 py-2.5 text-sm transition-colors hover:border-lime hover:bg-lime hover:text-espresso-900">View on the art map <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-cream p-6 text-espresso-900">
              <CatHead className="absolute -right-4 -top-4 h-24 w-24 rotate-12 opacity-90" eyes="wink" />
              <p className="font-display text-[10px] uppercase tracking-[0.2em] text-tangerine">Mochi’s tip</p>
              <p className="mt-3 max-w-[80%] font-serif text-xl italic leading-snug">“{cafe.mochiTip}”</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-white/10 bg-espresso-950 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Kicker num="03">Reviews · 评价</Kicker>
            <p className="mt-6 font-display text-6xl font-bold">{cafe.rating}<span className="text-2xl text-cream/40">/5</span></p>
            <Stars value={cafe.rating} size="h-5 w-5" />
            <form onSubmit={submit} className="mt-8 space-y-4">
              <Field label="Your rating"><Stars value={rating} onChange={setRating} size="h-6 w-6" /></Field>
              <Field label={`Write as ${store.profile.name}`} hint={`${text.length}/400`}>
                <Textarea rows={4} maxLength={400} value={text} onChange={(e) => setText(e.target.value)} placeholder="What did you order? Where did you sit?" />
              </Field>
              <button className={buttonClass('primary')}>Post review</button>
            </form>
          </div>
          <ul className="space-y-4 lg:col-span-6 lg:col-start-7">
            {[...userReviews.map((r) => ({ ...r, avatar: store.profile.avatar })), ...seedReviews].map((r, i) => (
              <li key={i} className="animate-fade-in rounded-2xl border border-white/10 p-5">
                <div className="flex items-center gap-3">
                  <Avatar index={r.avatar} className="h-9 w-9" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="text-xs text-cream/40">{fmtDate(r.date)}</p>
                  </div>
                  <Stars value={r.rating} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-cream/70">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <Kicker num="04">Read about it · 相关文章</Kicker>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((a) => <ArticleCard key={a.slug} a={a} />)}
            </div>
          </div>
        </section>
      )}

      <nav className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 pb-24 md:px-8">
        <Link to={`/cafe/${prev.id}`} className="group rounded-2xl border border-white/10 p-6 transition-colors hover:border-lime hover:bg-lime hover:text-espresso-900">
          <span className="flex items-center gap-2 font-display text-[10px] uppercase tracking-[0.2em] opacity-60"><ArrowLeft className="h-3.5 w-3.5" /> Previous café</span>
          <span className="mt-2 block font-serif text-2xl">{prev.name}</span>
        </Link>
        <Link to={`/cafe/${next.id}`} className="group rounded-2xl border border-white/10 p-6 text-right transition-colors hover:border-lime hover:bg-lime hover:text-espresso-900">
          <span className="flex items-center justify-end gap-2 font-display text-[10px] uppercase tracking-[0.2em] opacity-60">Next café <ArrowRight className="h-3.5 w-3.5" /></span>
          <span className="mt-2 block font-serif text-2xl">{next.name}</span>
        </Link>
      </nav>
    </>
  )
}
