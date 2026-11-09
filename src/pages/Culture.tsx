import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { ArticleCard } from '../components/ArticleCard'
import { CatArt } from '../components/CatArt'
import { PageHead } from '../components/PageHead'
import { ArrowUpRight, Search } from '../components/Icons'
import { Accent, Chip, Reveal } from '../components/ui'
import { articleCategories, articles, type ArticleCategory } from '../data/articles'
import { img } from '../data/img'
import { fmtDate } from '../lib/store'

export function Culture() {
  const [cat, setCat] = useState<'All' | ArticleCategory>('All')
  const [q, setQ] = useState('')
  const [sort, setSort] = useState<'new' | 'short' | 'long'>('new')
  const featured = articles[0]

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    const out = articles.filter((a) => (cat === 'All' || a.category === cat) && (!s || [a.title, a.cn, a.dek, ...a.tags].some((t) => t.toLowerCase().includes(s))))
    return out.sort((a, b) => (sort === 'new' ? b.date.localeCompare(a.date) : sort === 'short' ? a.read - b.read : b.read - a.read))
  }, [cat, q, sort])

  return (
    <>
      <PageHead crumbs={[['Home', '/'], ['Culture']]} kicker="The culture issue · 文化" cn="文化" title={<>Stories <br /> <Accent className="text-latte">by the cup.</Accent></>} intro="History, architecture, craft and the people who pour. Plus Mochi’s diary, for the softer days." />

      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <Link to={`/article/${featured.slug}`} className="group grid overflow-hidden rounded-3xl border border-white/10 bg-espresso-800 transition-colors hover:border-white/25 md:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto">
              {featured.cover ? <img src={img(featured.cover, 1400)} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /> : <CatArt art={featured.art!} className="h-full w-full" />}
              <span className="absolute left-4 top-4 rounded-full bg-tangerine px-3 py-1 font-display text-[10px] uppercase tracking-[0.2em] text-espresso-900">Cover story</span>
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="font-display text-[10px] uppercase tracking-[0.25em] text-latte">{featured.category} · {fmtDate(featured.date)} · {featured.read} min</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight transition-colors group-hover:text-tangerine md:text-5xl">{featured.title}</h2>
              <p className="mt-2 font-cn text-lg text-latte/80">{featured.cn}</p>
              <p className="mt-4 text-cream/60">{featured.dek}</p>
              <span className="mt-8 inline-flex items-center gap-2 self-start rounded-full bg-tangerine px-5 py-3 text-sm font-medium text-espresso-900 transition-colors group-hover:bg-lime">Read the cover story <ArrowUpRight className="h-4 w-4" /></span>
            </div>
          </Link>
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="sticky top-20 z-30 -mx-2 mb-10 flex flex-col gap-3 rounded-2xl bg-espresso-900/80 p-2 backdrop-blur-xl lg:flex-row lg:items-center">
            <div className="no-scrollbar flex gap-2 overflow-x-auto">
              <Chip active={cat === 'All'} onClick={() => setCat('All')}>✳ All</Chip>
              {articleCategories.map((c) => (
                <Chip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Chip>
              ))}
            </div>
            <div className="flex flex-1 gap-2 lg:justify-end">
              <label className="glass flex flex-1 items-center gap-2 rounded-full px-4 py-2 lg:max-w-xs">
                <Search className="h-4 w-4 text-latte" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search stories…" className="w-full bg-transparent text-sm placeholder:text-cream/40 focus:outline-none" />
              </label>
              <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="glass cursor-pointer rounded-full bg-espresso-900 px-4 py-2 text-sm focus:outline-none" aria-label="Sort">
                <option value="new">Newest</option>
                <option value="short">Quick reads</option>
                <option value="long">Long reads</option>
              </select>
            </div>
          </div>
          <p className="mb-6 font-display text-[10px] uppercase tracking-[0.2em] text-cream/50">{list.length} stories</p>
          {list.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-white/15 p-12 text-center text-cream/60">No story found. Maybe it’s yours to write. <Link to="/diary#letters" className="text-lime underline">Write to Mochi</Link></p>
          ) : (
            <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
              {list.map((a, i) => (
                <Reveal key={a.slug} delay={(i % 3) * 80}>
                  <ArticleCard a={a} ratio={['aspect-[4/5]', 'aspect-[4/3]', 'aspect-square'][i % 3]} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
