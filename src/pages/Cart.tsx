import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { useStore, fmt, FREE_SHIPPING, PROMOS } from '../lib/store'
import { products } from '../data/products'
import { Qty } from '../components/layout/Root'
import { Cat } from '../components/Cat'
import { ProductCard } from '../components/ProductCard'
import { ProductThumb } from '../components/ProductThumb'
import { ArrowRight, Close, Trash, Truck } from '../components/Icons'
import { Accent, Breadcrumbs, Input, Kicker, buttonClass } from '../components/ui'

export function Cart() {
  const s = useStore()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const left = Math.max(0, FREE_SHIPPING - s.subtotal)
  const apply = (e: FormEvent) => {
    e.preventDefault()
    if (s.applyPromo(code)) {
      s.toast(`Code applied: ${Math.round(PROMOS[code.trim().toUpperCase()] * 100)}% off`, 'lime')
      setCode('')
    } else s.toast('That code didn’t work. Try MOCHI10')
  }
  const suggestions = products.filter((p) => !s.cart.some((c) => c.productId === p.id)).slice(0, 4)

  return (
    <section className="pb-24 pt-36 md:pt-44">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <Breadcrumbs items={[['Home', '/'], ['Shop', '/shop'], ['Bag']]} />
        <h1 className="mt-6 font-display text-[clamp(2.6rem,6vw,5.5rem)] font-semibold uppercase leading-[0.9]">Your <Accent className="text-tangerine">bag.</Accent> <span className="align-top font-display text-2xl text-cream/40">({s.count})</span></h1>

        {s.lines.length === 0 ? (
          <div className="mt-14 flex flex-col items-center gap-6 rounded-3xl border border-dashed border-white/15 py-16 text-center">
            <Cat pose="idle" eyes="down" className="w-40" />
            <p className="font-serif text-3xl">Nothing here yet.</p>
            <Link to="/shop" className={buttonClass('primary')}>Go shopping <ArrowRight className="h-4 w-4" /></Link>
          </div>
        ) : (
          <div className="mt-14 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="mb-6 rounded-2xl border border-white/10 p-5">
                <p className="flex items-center gap-2 text-sm text-cream/70"><Truck className="h-4 w-4 text-lime" />{left > 0 ? <>Add <b className="text-lime">{fmt(left)}</b> more for free shipping</> : <b className="text-lime">You’ve unlocked free shipping</b>}</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-tangerine to-lime transition-all duration-700" style={{ width: `${Math.min(100, (s.subtotal / FREE_SHIPPING) * 100)}%` }} /></div>
              </div>
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {s.lines.map((l) => (
                  <li key={l.key} className="flex gap-5 py-6">
                    <Link to={`/product/${l.productId}`}><ProductThumb p={l.product} className="h-28 w-28" /></Link>
                    <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
                      <div className="flex-1">
                        <Link to={`/product/${l.productId}`} className="font-serif text-2xl leading-tight hover:text-lime">{l.product.name}</Link>
                        <p className="text-sm text-cream/50">{l.product.kind}{l.option ? ` · ${l.option}` : ''}</p>
                        <p className="mt-1 text-sm text-latte">{fmt(l.price)} each</p>
                      </div>
                      <Qty value={l.qty} onChange={(q) => s.setQty(l.key, q)} />
                      <p className="w-24 font-display text-lg sm:text-right">{fmt(l.price * l.qty)}</p>
                      <button onClick={() => { s.removeFromCart(l.key); s.toast('Removed from bag') }} aria-label="Remove" className="cursor-pointer self-start rounded-full p-2 text-cream/40 hover:bg-tangerine hover:text-espresso-900 sm:self-center"><Trash className="h-4 w-4" /></button>
                    </div>
                  </li>
                ))}
              </ul>
              <Link to="/shop" className="mt-6 inline-block text-sm text-cream/60 hover:text-lime">← Continue shopping</Link>
            </div>
            <aside className="lg:col-span-4">
              <div className="glass sticky top-28 rounded-3xl p-6">
                <Kicker>Summary · 订单摘要</Kicker>
                <form onSubmit={apply} className="mt-6 flex gap-2">
                  <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Promo code" aria-label="Promo code" />
                  <button className="cursor-pointer rounded-xl border border-white/15 px-4 text-sm hover:border-lime hover:bg-lime hover:text-espresso-900">Apply</button>
                </form>
                {s.promo && <p className="mt-3 flex items-center justify-between rounded-xl bg-lime/15 px-3 py-2 text-sm text-lime">{s.promo} · {Math.round(PROMOS[s.promo] * 100)}% off <button onClick={s.clearPromo} aria-label="Remove code" className="cursor-pointer"><Close className="h-4 w-4" /></button></p>}
                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between"><dt className="text-cream/60">Subtotal</dt><dd>{fmt(s.subtotal)}</dd></div>
                  {s.discount > 0 && <div className="flex justify-between text-lime"><dt>Discount</dt><dd>−{fmt(s.discount)}</dd></div>}
                  <div className="flex justify-between"><dt className="text-cream/60">Shipping</dt><dd>{left > 0 ? 'Calculated at checkout' : 'Free'}</dd></div>
                  <div className="flex justify-between border-t border-white/10 pt-4 font-serif text-2xl"><dt>Total</dt><dd>{fmt(s.subtotal - s.discount)}</dd></div>
                </dl>
                <button onClick={() => navigate('/checkout')} className={buttonClass('primary', 'mt-6 w-full')}>Checkout <ArrowRight className="h-4 w-4" /></button>
                <p className="mt-4 text-center text-xs text-cream/40">WeChat Pay · Alipay · Card</p>
              </div>
            </aside>
          </div>
        )}

        <div className="mt-24">
          <Kicker>Pairs well with</Kicker>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">{suggestions.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        </div>
      </div>
    </section>
  )
}
