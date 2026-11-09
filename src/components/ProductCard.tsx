import { Link } from 'react-router'
import type { Product } from '../data/products'
import { img } from '../data/img'
import { useStore, fmt } from '../lib/store'
import { CatHead } from './Cat'
import { Heart, Plus } from './Icons'

export function ProductCard({ p, light = false, offset = false }: { p: Product; light?: boolean; offset?: boolean }) {
  const { wishlist, toggle, addToCart, toast } = useStore()
  const liked = wishlist.includes(p.id)
  return (
    <article className={`group ${offset ? 'lg:mt-12' : ''}`}>
      <div className={`relative aspect-[4/5] overflow-hidden rounded-2xl ${light ? 'bg-latte-light' : 'bg-espresso-800'}`}>
        <Link to={`/product/${p.id}`} aria-label={p.name} className="absolute inset-0">
          {p.model ? (
            <div className="relative flex h-full items-center justify-center bg-[radial-gradient(circle_at_50%_40%,#4a2f21,#1a0f0a_75%)]">
              <span className="absolute h-2/3 w-2/3 animate-spin-slow rounded-full border border-dashed border-latte/30" />
              <CatHead className="w-1/2 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6" eyes="happy" />
              <span className="absolute bottom-16 font-display text-[9px] uppercase tracking-[0.3em] text-latte">Spin it in 3D ↻</span>
            </div>
          ) : (
            <img src={img(p.images[0], 800)} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
          )}
          {p.images[1] && !p.model && (
            <img src={img(p.images[1], 800)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          )}
        </Link>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-950/60 via-transparent to-transparent" />
        {p.tag && <span className="glass pointer-events-none absolute left-3 top-3 rounded-full px-3 py-1 font-display text-[9px] uppercase tracking-[0.2em] text-cream">{p.tag}</span>}
        <button
          onClick={() => toast(toggle('wishlist', p.id) ? 'Added to wishlist' : 'Removed from wishlist')}
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
          className="glass absolute right-3 top-3 cursor-pointer rounded-full p-2 text-cream transition-colors hover:border-lime hover:bg-lime hover:text-espresso-900"
        >
          <Heart className={`h-4 w-4 ${liked ? 'fill-tangerine text-tangerine' : ''}`} />
        </button>
        <button
          onClick={() => addToCart(p.id, p.options?.[0])}
          className="absolute inset-x-3 bottom-3 flex translate-y-2 cursor-pointer items-center justify-center gap-2 rounded-xl bg-cream py-3 text-sm font-medium text-espresso-900 opacity-0 transition-all duration-300 hover:bg-lime group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 max-lg:translate-y-0 max-lg:opacity-100"
        >
          <Plus className="h-4 w-4" /> Quick add{p.options?.[0] ? ` · ${p.options[0]}` : ''}
        </button>
      </div>
      <Link to={`/product/${p.id}`} className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl leading-tight transition-colors group-hover:text-tangerine">{p.name}</h3>
          <p className={`mt-1 text-xs uppercase tracking-[0.14em] ${light ? 'text-espresso-900/50' : 'text-cream/50'}`}>
            {p.kind} · <span className="font-cn normal-case tracking-normal">{p.cn}</span>
          </p>
        </div>
        <p className={`font-serif text-lg tabular-nums ${light ? 'text-espresso-700' : 'text-latte'}`}>{fmt(p.price)}</p>
      </Link>
    </article>
  )
}
