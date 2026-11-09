import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { getProduct, products, unitPrice } from '../data/products'
import { img } from '../data/img'
import { useStore, fmt } from '../lib/store'
import { MochiStage } from '../components/three/MochiModel'
import { ProductCard } from '../components/ProductCard'
import { Qty } from '../components/layout/Root'
import { Bag, ChevronDown, Heart, Truck } from '../components/Icons'
import { Breadcrumbs, Kicker, Stars, buttonClass } from '../components/ui'
import { NotFound } from './NotFound'

const brew = [
  ['Espresso', '18 g in · 36 g out · 28 s'],
  ['V60', '15 g · 250 g water · 92 °C · 2:45'],
  ['French press', '30 g · 500 g water · 4 min'],
]

export function ProductDetail() {
  const { id } = useParams()
  const p = getProduct(id)
  const store = useStore()
  const [opt, setOpt] = useState<string | undefined>(p?.options?.[0])
  const [qty, setQty] = useState(1)
  const [shot, setShot] = useState(0)
  const [open, setOpen] = useState<string | null>('Details')
  const [view3d, setView3d] = useState(true)
  if (!p) return <NotFound />

  const liked = store.wishlist.includes(p.id)
  const price = unitPrice(p, opt)
  const model = p.model ? (opt?.includes('02') ? 'cat-2' : 'cat-3') : null
  const related = products.filter((x) => x.id !== p.id && x.category === p.category).concat(products.filter((x) => x.category !== p.category)).slice(0, 4)

  const sections: [string, React.ReactNode][] = [
    ['Details', <ul className="space-y-2">{p.details.map((d) => <li key={d} className="flex gap-2"><span className="text-tangerine">✳</span>{d}</li>)}</ul>],
    ...(p.category === 'Beans' ? [['Brew guide', <ul className="space-y-2">{brew.map(([k, v]) => <li key={k} className="flex justify-between"><b>{k}</b><span className="text-cream/60">{v}</span></li>)}</ul>] as [string, React.ReactNode]] : []),
    ['Shipping & returns', <p>Roasted or packed within 48 hours. Free over ¥299, free pick-up at any café on the map. Unopened items can be returned within 14 days.</p>],
  ]

  return (
    <>
      <section className="pb-20 pt-32 md:pt-40">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <Breadcrumbs items={[['Home', '/'], ['Shop', '/shop'], [p.category, '/shop'], [p.name]]} />
          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-espresso-800">
                {model && view3d ? (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#4a2f21,#120a06_75%)]">
                    <MochiStage model={model} className="h-full w-full" cameraZ={2.3} />
                    <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-espresso-900/70 px-4 py-1.5 font-display text-[9px] uppercase tracking-[0.25em] text-latte backdrop-blur">Drag to spin · scroll to zoom</span>
                  </div>
                ) : (
                  <img key={shot} src={img(p.images[shot], 1400)} alt={p.name} className="h-full w-full animate-fade-in object-cover" />
                )}
                {p.tag && <span className="absolute left-4 top-4 rounded-full bg-tangerine px-3 py-1 font-display text-[10px] uppercase tracking-[0.2em] text-espresso-900">{p.tag}</span>}
              </div>
              <div className="mt-4 flex gap-3">
                {model && (
                  <button onClick={() => setView3d(true)} className={`flex h-20 w-20 cursor-pointer items-center justify-center rounded-xl border-2 font-display text-xs ${view3d ? 'border-tangerine' : 'border-white/10 hover:border-lime'}`}>3D ↻</button>
                )}
                {p.images.map((im, i) => (
                  <button key={im} onClick={() => { setShot(i); setView3d(false) }} className={`h-20 w-20 cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${!view3d || !model ? (shot === i ? 'border-tangerine' : 'border-transparent opacity-60 hover:opacity-100') : 'border-transparent opacity-60 hover:opacity-100'}`}>
                    <img src={img(im, 200, 200)} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <Kicker>{p.category} · {p.kind}</Kicker>
                <h1 className="mt-5 font-serif text-5xl leading-[1.02] tracking-tight">{p.name}</h1>
                <p className="mt-2 font-cn text-xl text-latte">{p.cn}</p>
                <div className="mt-4 flex items-center gap-3 text-sm text-cream/60"><Stars value={p.rating} /> {p.rating} · {p.reviews} reviews</div>
                <p className="mt-6 font-display text-4xl text-tangerine">{fmt(price)}</p>
                <p className="mt-6 leading-relaxed text-cream/70">{p.description}</p>
                {p.notes && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.notes.map((n) => <span key={n} className="rounded-full bg-latte/15 px-3 py-1 text-xs text-latte">{n}</span>)}
                  </div>
                )}
                {p.options && (
                  <div className="mt-8">
                    <p className="mb-3 font-display text-[10px] uppercase tracking-[0.2em] text-latte">{p.optionLabel}: <span className="text-cream">{opt}</span></p>
                    <div className="flex flex-wrap gap-2">
                      {p.options.map((o) => (
                        <button key={o} onClick={() => setOpt(o)} className={`cursor-pointer rounded-xl border px-4 py-2.5 text-sm transition-all active:scale-95 ${opt === o ? 'border-tangerine bg-tangerine text-espresso-900' : 'border-white/15 hover:border-lime hover:bg-lime hover:text-espresso-900'}`}>
                          {o}{p.optionPrice?.[o] ? ` (+¥${p.optionPrice[o]})` : ''}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-8 flex items-center gap-3">
                  <Qty value={qty} onChange={(n) => setQty(Math.max(1, n))} />
                  <button onClick={() => store.addToCart(p.id, opt, qty)} className={buttonClass('primary', 'flex-1')}><Bag className="h-4 w-4" /> Add to bag · {fmt(price * qty)}</button>
                  <button onClick={() => store.toast(store.toggle('wishlist', p.id) ? 'Added to wishlist' : 'Removed from wishlist')} aria-label="Wishlist" className={`cursor-pointer rounded-full border p-3.5 transition-colors hover:border-lime hover:bg-lime hover:text-espresso-900 ${liked ? 'border-tangerine bg-tangerine text-espresso-900' : 'border-white/15'}`}><Heart className="h-4 w-4" /></button>
                </div>
                <button onClick={() => { store.addToCart(p.id, opt, qty); store.setCartOpen(true) }} className="mt-3 w-full cursor-pointer rounded-full border border-white/15 py-3 text-sm transition-colors hover:border-lime hover:bg-lime hover:text-espresso-900">Add & open bag</button>
                <p className="mt-4 flex items-center gap-2 text-xs text-cream/50"><Truck className="h-4 w-4" /> Ships in 48h · free pick-up at <Link to="/map" className="underline hover:text-lime">any café</Link></p>
                <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
                  {sections.map(([title, body]) => (
                    <div key={title}>
                      <button onClick={() => setOpen(open === title ? null : title)} className="flex w-full cursor-pointer items-center justify-between py-4 text-left font-display text-xs uppercase tracking-[0.2em] hover:text-lime">
                        {title}
                        <ChevronDown className={`h-4 w-4 transition-transform ${open === title ? 'rotate-180' : ''}`} />
                      </button>
                      <div className={`grid text-sm text-cream/70 transition-all duration-300 ${open === title ? 'grid-rows-[1fr] pb-4' : 'grid-rows-[0fr]'}`}>
                        <div className="overflow-hidden">{body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <Kicker>You may also like · 猜你喜欢</Kicker>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div>
        </div>
      </section>
    </>
  )
}
