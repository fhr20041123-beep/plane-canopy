import { Link } from 'react-router'
import type { Article } from '../data/articles'
import { img } from '../data/img'
import { useStore, fmtDate } from '../lib/store'
import { CatArt } from './CatArt'
import { ArrowUpRight, Bookmark } from './Icons'

export function ArticleCard({ a, ratio = 'aspect-[4/3]', large = false }: { a: Article; ratio?: string; large?: boolean }) {
  const { bookmarks, toggle, toast } = useStore()
  const saved = bookmarks.includes(a.slug)
  return (
    <article className="group relative mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-espresso-800 transition-all duration-500 hover:-translate-y-1 hover:border-white/25 hover:shadow-2xl hover:shadow-black/40">
      <Link to={`/article/${a.slug}`} className="block">
        <div className={`relative overflow-hidden ${ratio}`}>
          {a.cover ? (
            <img src={img(a.cover, large ? 1400 : 900)} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <CatArt art={a.art ?? 'wave'} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
          )}
          <span className="absolute left-3 top-3 rounded-full bg-espresso-900/70 px-3 py-1 font-display text-[9px] uppercase tracking-[0.2em] text-cream backdrop-blur">{a.category}</span>
        </div>
        <div className="p-6 md:p-7">
          <div className="flex items-center gap-3 font-display text-[9px] uppercase tracking-[0.2em] text-cream/50">
            <span>{fmtDate(a.date)}</span>
            <span className="h-px w-4 bg-cream/20" />
            <span>{a.read} min read</span>
          </div>
          <h3 className={`mt-4 font-serif leading-tight transition-colors group-hover:text-tangerine ${large ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>{a.title}</h3>
          <p className="mt-1 font-cn text-sm text-latte/80">{a.cn}</p>
          <p className="mt-3 text-sm leading-relaxed text-cream/60">{a.dek}</p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-medium transition-all duration-300 group-hover:border-lime group-hover:bg-lime group-hover:text-espresso-900">
            Read More <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
      <button
        onClick={() => toast(toggle('bookmarks', a.slug) ? 'Bookmarked to your profile' : 'Bookmark removed')}
        aria-label={saved ? 'Remove bookmark' : 'Bookmark'}
        className={`absolute right-3 top-3 cursor-pointer rounded-full p-2 backdrop-blur transition-colors hover:bg-lime hover:text-espresso-900 ${saved ? 'bg-tangerine text-espresso-900' : 'bg-espresso-900/60 text-cream'}`}
      >
        <Bookmark className="h-4 w-4" />
      </button>
    </article>
  )
}
