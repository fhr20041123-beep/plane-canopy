import { Link, useParams } from 'react-router'
import { useStore, fmt, fmtDate } from '../lib/store'
import { getProduct } from '../data/products'
import { Cat } from '../components/Cat'
import { ProductThumb } from '../components/ProductThumb'
import { Accent, buttonClass } from '../components/ui'
import { NotFound } from './NotFound'

export function OrderDone() {
  const { id } = useParams()
  const { orders } = useStore()
  const o = orders.find((x) => x.id === id)
  if (!o) return <NotFound />
  const steps = ['Roasting', 'Shipped', 'Delivered'] as const
  const at = steps.indexOf(o.status)
  return (
    <section className="relative overflow-hidden pb-24 pt-36 md:pt-44">
      {Array.from({ length: 24 }).map((_, i) => (
        <span key={i} className="pointer-events-none absolute top-0 h-3 w-1.5 animate-rain rounded-full" style={{ left: `${(i * 41) % 100}%`, background: ['#ff7a1a', '#c6ff3d', '#c9a27a'][i % 3], animationDuration: `${2 + (i % 5) * 0.4}s`, animationDelay: `${(i % 7) * 0.3}s` }} />
      ))}
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 md:px-8 lg:grid-cols-2">
        <div>
          <p className="font-display text-[10px] uppercase tracking-[0.3em] text-lime">Order confirmed · 下单成功</p>
          <h1 className="mt-6 font-display text-[clamp(2.6rem,6vw,5rem)] font-semibold uppercase leading-[0.9]">Thank you, <br /><Accent className="text-tangerine">{o.name.split(' ')[0]}.</Accent></h1>
          <p className="mt-6 max-w-md text-cream/70">Mochi is already weighing your beans. Order <b className="text-cream">{o.id}</b> was placed on {fmtDate(o.date)}.</p>
          <div className="mt-8 flex items-center gap-2">
            {steps.map((st, i) => (
              <div key={st} className="flex flex-1 flex-col gap-2">
                <span className={`h-1.5 rounded-full ${i <= at ? 'bg-tangerine' : 'bg-white/10'}`} />
                <span className={`font-display text-[10px] uppercase tracking-[0.2em] ${i <= at ? 'text-tangerine' : 'text-cream/40'}`}>{st}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/profile?tab=orders" className={buttonClass('primary')}>View in my orders</Link>
            <Link to="/map" className={buttonClass('ghost')}>Find a café meanwhile</Link>
          </div>
        </div>
        <div className="relative lg:pt-24">
          <Cat pose="wave" eyes="happy" apron className="absolute -top-20 right-4 w-32 drop-shadow-2xl lg:top-0" />
          <div className="glass rounded-3xl p-6">
            <ul className="space-y-4">
              {o.items.map((it, i) => {
                const p = getProduct(it.productId)!
                return (
                  <li key={i} className="flex items-center gap-4">
                    <ProductThumb p={p} className="h-16 w-16" />
                    <span className="flex-1"><span className="block font-serif">{p.name}</span><span className="text-xs text-cream/50">{it.option} · ×{it.qty}</span></span>
                    <span className="text-sm">{fmt(it.price * it.qty)}</span>
                  </li>
                )
              })}
            </ul>
            <dl className="mt-6 space-y-2 border-t border-white/10 pt-4 text-sm">
              <div className="flex justify-between"><dt className="text-cream/60">Delivery</dt><dd className="text-right">{o.delivery}<br /><span className="text-cream/50">{o.address}</span></dd></div>
              <div className="flex justify-between"><dt className="text-cream/60">Payment</dt><dd>{o.payment}</dd></div>
              {o.discount > 0 && <div className="flex justify-between text-lime"><dt>Discount</dt><dd>−{fmt(o.discount)}</dd></div>}
              <div className="flex justify-between pt-3 font-serif text-2xl"><dt>Total</dt><dd>{fmt(o.total)}</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
