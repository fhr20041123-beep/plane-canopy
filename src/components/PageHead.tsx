import type { ReactNode } from 'react'
import { Breadcrumbs, Kicker } from './ui'

export function PageHead({ kicker, title, cn, intro, crumbs, children, aside }: { kicker: string; title: ReactNode; cn?: string; intro?: string; crumbs: [string, string?][]; children?: ReactNode; aside?: ReactNode }) {
  return (
    <section className="relative overflow-hidden pb-14 pt-36 md:pt-44">
      <div className="pointer-events-none absolute -right-40 -top-20 h-[520px] w-[520px] rounded-full bg-tangerine/20 blur-[140px]" />
      {cn && <p className="pointer-events-none absolute -right-6 top-24 select-none font-cn text-[22vw] font-black leading-none text-cream/[0.03] md:text-[16rem]">{cn}</p>}
      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Kicker>{kicker}</Kicker>
            <h1 className="mt-6 animate-rise font-display text-[clamp(2.6rem,7vw,6.5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.03em]">{title}</h1>
            {intro && <p className="mt-6 max-w-xl animate-rise text-cream/60" style={{ animationDelay: '120ms' }}>{intro}</p>}
          </div>
          {aside && <div className="lg:col-span-4">{aside}</div>}
        </div>
        {children}
      </div>
    </section>
  )
}
