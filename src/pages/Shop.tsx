import { useMemo, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { PageHead } from '../components/PageHead'
import { Accent, Chip, Reveal } from '../components/ui'
import { productCategories, products, type ProductCategory } from '../data/products'
import { Truck } from '../components/Icons'
import { FREE_SHIPPING } from '../lib/store'

export function Shop() {
  const [cat, setCat] = useState<'All' | ProductCategory>('All')
  const [sort, setSort] = useState<'featured' | 'low' | 'high' | 'rating'>('featured')
  const [max, setMax] = useState(1300)
  const list = useMemo(() => {
    const out = products.filter((p) => (cat === 'All' || p.category === cat) && p.price <= max)
    if (sort === 'low') out.sort((a, b) => a.price - b.price)
    if (sort === 'high') out.sort((a, b) => b.price - a.price)
    if (sort === 'rating') out.sort((a, b) => b.rating - a.rating)
    return out
  }, [cat, sort, max])

  return (
    <>
      <PageHead
        crumbs={[['Home', '/'], ['Shop']]}
        kicker="The Canopy store · 商店"
        cn="商店"
        title={<>Take the city <Accent className="text-tangerine">home.</Accent></>}
        intro="Beans roasted at Wukang, goods made with the partners on our map, and Mochi in vinyl."
        aside={
          <div className="glass flex items-center gap-4 rounded-2xl p-5">
            <Truck className="h-8 w-8 text-lime" />
            <p className="text-sm text-cream/70">Free shipping over <b className="text-cream">¥{FREE_SHIPPING}</b>. Free pick-up at any café on the map. Code <b className="text-tangerine">MOCHI10</b>.</p>
          </div>
        }
      />
      <section className="pb-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="sticky top-20 z-30 -mx-2 mb-12 flex flex-col gap-3 rounded-2xl bg-espresso-900/80 p-2 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
            <div className="no-scrollbar flex gap-2 overflow-x-auto">
              <Chip active={cat === 'All'} onClick={() => setCat('All')}>All ({products.length})</Chip>
              {productCategories.map((c) => <Chip key={c} active={cat === c} onClick={() => setCat(c)}>{c} ({products.filter((p) => p.category === c).length})</Chip>)}
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs text-cream/60">
                Up to <b className="w-12 text-cream tabular-nums">¥{max}</b>
                <input type="range" min={100} max={1300} step={50} value={max} onChange={(e) => setMax(+e.target.value)} className="w-28 accent-tangerine" aria-label="Max price" />
              </label>
              <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} aria-label="Sort products" className="glass cursor-pointer rounded-full bg-espresso-900 px-4 py-2 text-sm focus:outline-none">
                <option value="featured">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </div>
          </div>
          {list.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-white/15 p-12 text-center text-cream/60">Nothing under ¥{max}. Slide the price up a little.</p>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {list.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 70}>
                  <ProductCard p={p} offset={i % 4 === 1 || i % 4 === 3} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
