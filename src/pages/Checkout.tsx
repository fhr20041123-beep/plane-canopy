import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { useStore, fmt, FREE_SHIPPING, deliveryOptions } from '../lib/store'
import { cafes } from '../data/cafes'
import { ProductThumb } from '../components/ProductThumb'
import { ArrowLeft, ArrowRight, Check } from '../components/Icons'
import { Accent, Breadcrumbs, Field, Input, Kicker, buttonClass, inputClass } from '../components/ui'

const payments = [
  { id: 'wechat', label: 'WeChat Pay', sub: '微信支付' },
  { id: 'alipay', label: 'Alipay', sub: '支付宝' },
  { id: 'card', label: 'Card', sub: 'Visa · Mastercard · UnionPay' },
]

export function Checkout() {
  const s = useStore()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ name: s.signedIn ? s.profile.name : '', email: s.profile.email, phone: '', address: '', district: 'Xuhui' })
  const [delivery, setDelivery] = useState('standard')
  const [pickup, setPickup] = useState('anfu')
  const [payment, setPayment] = useState('wechat')
  const [card, setCard] = useState('')
  const [placing, setPlacing] = useState(false)

  if (s.lines.length === 0)
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 pt-32 text-center">
        <p className="font-serif text-4xl">Your bag is empty.</p>
        <Link to="/shop" className={buttonClass('primary')}>Visit the store</Link>
      </section>
    )

  const opt = deliveryOptions.find((d) => d.id === delivery)!
  const shipping = delivery === 'standard' && s.subtotal >= FREE_SHIPPING ? 0 : opt.price
  const total = s.subtotal - s.discount + shipping
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({ ...form, [k]: e.target.value })

  const next = (e: FormEvent) => {
    e.preventDefault()
    if (step === 0) {
      if (!form.name || !/^\S+@\S+\.\S+$/.test(form.email) || form.phone.length < 6) return s.toast('Please fill in name, a valid email and phone')
      if (delivery !== 'pickup' && form.address.length < 5) return s.toast('Please add a delivery address')
    }
    if (step === 2) {
      if (payment === 'card' && card.replace(/\s/g, '').length < 12) return s.toast('Enter a test card number (any 12+ digits)')
      setPlacing(true)
      window.setTimeout(() => {
        const pick = cafes.find((c) => c.id === pickup)!
        const id = s.placeOrder({
          name: form.name,
          address: delivery === 'pickup' ? `Pick-up at ${pick.name}` : `${form.address}, ${form.district}`,
          delivery: opt.label,
          payment: payments.find((p) => p.id === payment)!.label,
          shipping,
        })
        navigate(`/order/${id}`)
      }, 1200)
      return
    }
    setStep(step + 1)
  }

  const steps = ['Details', 'Delivery', 'Payment']
  return (
    <section className="pb-24 pt-36 md:pt-44">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <Breadcrumbs items={[['Home', '/'], ['Bag', '/cart'], ['Checkout']]} />
        <h1 className="mt-6 font-display text-[clamp(2.4rem,5vw,4.5rem)] font-semibold uppercase leading-[0.9]">Check<Accent className="text-tangerine">out.</Accent></h1>
        <ol className="mt-10 flex items-center gap-3">
          {steps.map((t, i) => (
            <li key={t} className="flex items-center gap-3">
              <button type="button" onClick={() => i < step && setStep(i)} className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${i === step ? 'bg-tangerine text-espresso-900' : i < step ? 'bg-lime/15 text-lime hover:bg-lime hover:text-espresso-900' : 'border border-white/15 text-cream/50'}`}>
                <span className="font-display text-xs">{i < step ? <Check className="h-3.5 w-3.5" /> : `0${i + 1}`}</span> {t}
              </button>
              {i < steps.length - 1 && <span className="h-px w-8 bg-white/15" />}
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <form onSubmit={next} className="space-y-6 lg:col-span-7">
            {step === 0 && (
              <div key="0" className="grid animate-fade-in gap-5 sm:grid-cols-2">
                <Field label="Full name"><Input value={form.name} onChange={set('name')} placeholder="Lin Qiao" /></Field>
                <Field label="Email"><Input type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" /></Field>
                <Field label="Phone"><Input value={form.phone} onChange={set('phone')} placeholder="+86 138 0000 0000" /></Field>
                <Field label="District">
                  <select value={form.district} onChange={set('district')} className={`${inputClass} bg-espresso-900`}>
                    {['Xuhui', "Jing'an", 'Huangpu', 'Changning', 'Hongkou', 'Putuo', 'Pudong', 'Other city'].map((d) => <option key={d}>{d}</option>)}
                  </select>
                </Field>
                <div className="sm:col-span-2"><Field label="Street address" hint={delivery === 'pickup' ? 'Not needed for pick-up' : undefined}><Input value={form.address} onChange={set('address')} placeholder="322 Anfu Rd, Apt 3" /></Field></div>
              </div>
            )}
            {step === 1 && (
              <div key="1" className="animate-fade-in space-y-3">
                {deliveryOptions.map((d) => (
                  <label key={d.id} className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition-colors ${delivery === d.id ? 'border-tangerine bg-tangerine/10' : 'border-white/10 hover:border-lime'}`}>
                    <input type="radio" name="delivery" checked={delivery === d.id} onChange={() => setDelivery(d.id)} className="h-4 w-4 accent-tangerine" />
                    <span className="flex-1"><span className="block font-serif text-xl">{d.label}</span><span className="text-sm text-cream/50">{d.detail}</span></span>
                    <span className="font-display">{d.id === 'standard' && s.subtotal >= FREE_SHIPPING ? 'Free' : d.price ? fmt(d.price) : 'Free'}</span>
                  </label>
                ))}
                {delivery === 'pickup' && (
                  <div className="grid animate-fade-in grid-cols-2 gap-2 pt-2 sm:grid-cols-3">
                    {cafes.map((c) => (
                      <button type="button" key={c.id} onClick={() => setPickup(c.id)} className={`cursor-pointer rounded-xl border p-3 text-left text-sm transition-colors ${pickup === c.id ? 'border-lime bg-lime text-espresso-900' : 'border-white/10 hover:border-lime'}`}>
                        <span className="block font-serif">{c.name}</span><span className="text-xs opacity-60">{c.district}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            {step === 2 && (
              <div key="2" className="animate-fade-in space-y-3">
                {payments.map((p) => (
                  <label key={p.id} className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition-colors ${payment === p.id ? 'border-tangerine bg-tangerine/10' : 'border-white/10 hover:border-lime'}`}>
                    <input type="radio" name="payment" checked={payment === p.id} onChange={() => setPayment(p.id)} className="h-4 w-4 accent-tangerine" />
                    <span className="flex-1"><span className="block font-serif text-xl">{p.label}</span><span className="font-cn text-sm text-cream/50">{p.sub}</span></span>
                  </label>
                ))}
                {payment === 'card' && <Field label="Card number" hint="Demo only, nothing is charged"><Input value={card} onChange={(e) => setCard(e.target.value)} placeholder="4242 4242 4242 4242" inputMode="numeric" /></Field>}
                {payment !== 'card' && <p className="rounded-xl border border-dashed border-white/15 p-4 text-sm text-cream/50">A QR code would appear here in the live store. For this demo, placing the order completes payment instantly.</p>}
              </div>
            )}
            <div className="flex items-center justify-between pt-4">
              {step > 0 ? <button type="button" onClick={() => setStep(step - 1)} className="flex cursor-pointer items-center gap-2 text-sm text-cream/60 hover:text-lime"><ArrowLeft className="h-4 w-4" /> Back</button> : <Link to="/cart" className="text-sm text-cream/60 hover:text-lime">← Back to bag</Link>}
              <button disabled={placing} className={buttonClass('primary')}>
                {placing ? 'Brewing your order…' : step === 2 ? <>Place order · {fmt(total)}</> : <>Continue <ArrowRight className="h-4 w-4" /></>}
              </button>
            </div>
          </form>

          <aside className="lg:col-span-5">
            <div className="glass rounded-3xl p-6">
              <Kicker>Order · {s.count} items</Kicker>
              <ul className="mt-5 space-y-4">
                {s.lines.map((l) => (
                  <li key={l.key} className="flex items-center gap-4">
                    <span className="relative"><ProductThumb p={l.product} className="h-16 w-16" /><span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-tangerine text-[10px] font-bold text-espresso-900">{l.qty}</span></span>
                    <span className="flex-1"><span className="block font-serif">{l.product.name}</span><span className="text-xs text-cream/50">{l.option}</span></span>
                    <span className="text-sm">{fmt(l.price * l.qty)}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-6 space-y-2 border-t border-white/10 pt-4 text-sm">
                <div className="flex justify-between"><dt className="text-cream/60">Subtotal</dt><dd>{fmt(s.subtotal)}</dd></div>
                {s.discount > 0 && <div className="flex justify-between text-lime"><dt>Discount ({s.promo})</dt><dd>−{fmt(s.discount)}</dd></div>}
                <div className="flex justify-between"><dt className="text-cream/60">{opt.label}</dt><dd>{shipping ? fmt(shipping) : 'Free'}</dd></div>
                <div className="flex justify-between pt-3 font-serif text-2xl"><dt>Total</dt><dd>{fmt(total)}</dd></div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
