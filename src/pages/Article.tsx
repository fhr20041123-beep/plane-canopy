import { useEffect, useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router'
import { articles, getArticle } from '../data/articles'
import { getCafe } from '../data/cafes'
import { img } from '../data/img'
import { useStore, fmtDate } from '../lib/store'
import { ArticleCard } from '../components/ArticleCard'
import { Avatar } from '../components/Avatar'
import { CatArt } from '../components/CatArt'
import { CatHead } from '../components/Cat'
import { ArrowRight, ArrowUpRight, Bookmark, Heart, Share } from '../components/Icons'
import { Breadcrumbs, Kicker, Textarea, buttonClass } from '../components/ui'
import { NotFound } from './NotFound'

const sizes = ['text-base', 'text-lg', 'text-xl']

export function Article() {
  const { slug } = useParams()
  const a = getArticle(slug)
  const store = useStore()
  const [progress, setProgress] = useState(0)
  const [size, setSize] = useState(1)
  const [comment, setComment] = useState('')

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? Math.min(1, window.scrollY / h) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [slug])

  if (!a) return <NotFound />
  const liked = store.likes.includes(a.slug)
  const saved = store.bookmarks.includes(a.slug)
  const comments = store.comments.filter((c) => c.slug === a.slug)
  const idx = articles.findIndex((x) => x.slug === a.slug)
  const next = articles[(idx + 1) % articles.length]
  const related = articles.filter((x) => x.slug !== a.slug && (x.category === a.category || x.cafes.some((c) => a.cafes.includes(c)))).slice(0, 3)
  const isDiary = a.category === "Mochi's Diary"

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      store.toast('Link copied')
    } catch {
      store.toast('Copy the address bar to share')
    }
  }
  const post = (e: FormEvent) => {
    e.preventDefault()
    if (comment.trim().length < 2) return
    store.addComment({ slug: a.slug, name: store.profile.name, text: comment.trim() })
    setComment('')
    store.toast('Comment posted', 'lime')
  }

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[55] h-1 bg-transparent">
        <div className="h-full bg-gradient-to-r from-tangerine to-lime" style={{ width: `${progress * 100}%` }} />
      </div>

      <header className="relative pt-36 md:pt-44">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-8">
          <div className="flex justify-center"><Breadcrumbs items={[['Home', '/'], [isDiary ? 'Diary' : 'Culture', isDiary ? '/diary' : '/culture'], [a.category]]} /></div>
          <p className="mt-8 font-display text-[10px] uppercase tracking-[0.25em] text-tangerine">{a.category}</p>
          <h1 className="mt-5 animate-rise font-serif text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[1.02] tracking-tight">{a.title}</h1>
          <p className="mt-4 font-cn text-xl text-latte">{a.cn}</p>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-cream/60">{a.dek}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-cream/60">
            <span className="flex items-center gap-2">{a.author === 'Mochi' ? <CatHead className="h-8 w-8" /> : <Avatar index={a.author.length} className="h-8 w-8" />} {a.author}</span>
            <span>·</span><span>{fmtDate(a.date)}</span><span>·</span><span>{a.read} min read</span>
            {a.weather && <><span>·</span><span>{a.weather}</span></>}
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-6xl px-6 md:px-8">
          <div className="aspect-[16/8] overflow-hidden rounded-3xl">
            {a.cover ? <img src={img(a.cover, 2000)} alt="" className="h-full w-full object-cover" /> : <CatArt art={a.art!} className="h-full w-full" />}
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:px-8 lg:grid-cols-12">
        <aside className="lg:col-span-2">
          <div className="sticky top-28 flex gap-2 lg:flex-col">
            <button onClick={() => store.toast(store.toggle('likes', a.slug) ? 'Liked ♡' : 'Unliked')} aria-label="Like" className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border transition-colors hover:border-lime hover:bg-lime hover:text-espresso-900 ${liked ? 'border-tangerine bg-tangerine text-espresso-900' : 'border-white/15'}`}><Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} /></button>
            <button onClick={() => store.toast(store.toggle('bookmarks', a.slug) ? 'Bookmarked to your profile' : 'Bookmark removed')} aria-label="Bookmark" className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border transition-colors hover:border-lime hover:bg-lime hover:text-espresso-900 ${saved ? 'border-tangerine bg-tangerine text-espresso-900' : 'border-white/15'}`}><Bookmark className="h-4 w-4" /></button>
            <button onClick={share} aria-label="Share" className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 transition-colors hover:border-lime hover:bg-lime hover:text-espresso-900"><Share className="h-4 w-4" /></button>
            <div className="flex overflow-hidden rounded-full border border-white/15 lg:flex-col">
              {sizes.map((_, i) => (
                <button key={i} onClick={() => setSize(i)} aria-label={`Text size ${i + 1}`} className={`flex h-11 w-11 cursor-pointer items-center justify-center font-serif transition-colors hover:bg-lime hover:text-espresso-900 ${size === i ? 'bg-cream text-espresso-900' : ''}`} style={{ fontSize: 12 + i * 3 }}>A</button>
              ))}
            </div>
          </div>
        </aside>

        <article className={`space-y-6 leading-relaxed text-cream/80 lg:col-span-7 ${sizes[size]}`}>
          {a.body.map((b, i) => {
            if (b.t === 'p') return <p key={i} className={i === 0 ? 'first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-7xl first-letter:leading-[0.85] first-letter:text-tangerine' : ''}>{b.text}</p>
            if (b.t === 'h') return <h2 key={i} className="pt-6 font-display text-2xl font-semibold uppercase tracking-tight text-cream">{b.text}</h2>
            if (b.t === 'quote')
              return (
                <blockquote key={i} className="relative my-10 border-l-2 border-tangerine py-2 pl-8">
                  <span className="absolute -left-2 -top-8 font-serif text-8xl text-tangerine/30">“</span>
                  <p className="font-serif text-3xl italic leading-snug text-cream">{b.text}</p>
                  {b.by && <footer className="mt-3 font-display text-[10px] uppercase tracking-[0.2em] text-latte">— {b.by}</footer>}
                </blockquote>
              )
            if (b.t === 'img')
              return (
                <figure key={i} className="my-10">
                  <img src={img(b.id, 1400)} alt={b.caption} loading="lazy" className="w-full rounded-2xl" />
                  <figcaption className="mt-3 text-sm italic text-cream/50">{b.caption}</figcaption>
                </figure>
              )
            return (
              <ul key={i} className="space-y-3">
                {b.items.map((it) => <li key={it} className="flex gap-3"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tangerine" />{it}</li>)}
              </ul>
            )
          })}
          <div className="flex flex-wrap gap-2 pt-6">
            {a.tags.map((t) => <span key={t} className="rounded-full border border-white/15 px-3 py-1 text-xs text-cream/60">#{t}</span>)}
          </div>
        </article>

        <aside className="space-y-4 lg:col-span-3">
          <div className="sticky top-28 space-y-4">
            <p className="font-display text-[10px] uppercase tracking-[0.2em] text-latte">Cafés in this story</p>
            {a.cafes.map((id) => {
              const c = getCafe(id)!
              return (
                <Link key={id} to={`/cafe/${id}`} className="group flex items-center gap-3 rounded-xl border border-white/10 p-2 transition-colors hover:border-lime hover:bg-lime hover:text-espresso-900">
                  <img src={img(c.hero, 140, 140)} alt="" className="h-14 w-14 rounded-lg object-cover" />
                  <span className="flex-1"><span className="block font-serif leading-tight">{c.name}</span><span className="text-xs opacity-60">{c.district}</span></span>
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                </Link>
              )
            })}
            {isDiary && a.mood && (
              <div className="rounded-xl bg-cream p-4 text-espresso-900">
                <p className="font-display text-[10px] uppercase tracking-[0.2em] text-tangerine">Mochi’s mood</p>
                <p className="mt-1 font-serif text-xl italic">{a.mood}</p>
              </div>
            )}
          </div>
        </aside>
      </div>

      <section className="border-t border-white/10 bg-espresso-950 py-16">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <Kicker>Conversation · {comments.length + 2} comments</Kicker>
          <form onSubmit={post} className="mt-6 flex gap-3">
            <Avatar index={store.profile.avatar} className="h-10 w-10" />
            <div className="flex-1 space-y-3">
              <Textarea rows={3} value={comment} onChange={(e) => setComment(e.target.value)} placeholder={`Comment as ${store.profile.name}…`} />
              <button className={buttonClass('primary', '!py-2.5')}>Post comment</button>
            </div>
          </form>
          <ul className="mt-8 space-y-4">
            {[...comments.map((c) => ({ ...c, avatar: store.profile.avatar })), { id: 's1', name: 'Mei', text: 'Saving this for my next weekend in Xuhui.', date: '2025-10-20', avatar: 2 }, { id: 's2', name: 'Tom', text: 'Mochi for mayor.', date: '2025-10-18', avatar: 5 }].map((c) => (
              <li key={c.id} className="flex animate-fade-in gap-3 rounded-2xl border border-white/10 p-4">
                <Avatar index={c.avatar} className="h-9 w-9" />
                <div><p className="text-sm"><b>{c.name}</b> <span className="text-xs text-cream/40">· {fmtDate(c.date)}</span></p><p className="mt-1 text-sm text-cream/70">{c.text}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <Link to={`/article/${next.slug}`} className="group mb-16 flex items-center justify-between gap-6 rounded-3xl bg-tangerine p-8 text-espresso-900 transition-colors hover:bg-lime md:p-12">
            <span>
              <span className="font-display text-[10px] uppercase tracking-[0.25em]">Up next</span>
              <span className="mt-2 block font-serif text-3xl leading-tight md:text-5xl">{next.title}</span>
            </span>
            <ArrowRight className="h-10 w-10 shrink-0 transition-transform group-hover:translate-x-2" />
          </Link>
          {related.length > 0 && (
            <>
              <Kicker>More like this</Kicker>
              <div className="mt-8 grid gap-6 md:grid-cols-3">{related.map((r) => <ArticleCard key={r.slug} a={r} />)}</div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
