import type { ButtonHTMLAttributes, ElementType, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react'
import { Link } from 'react-router'
import { useInView } from '../lib/store'
import { img } from '../data/img'
import { Star } from './Icons'

type Variant = 'primary' | 'ghost' | 'dark' | 'outline-dark' | 'link'

const styles: Record<Variant, string> = {
  primary: 'bg-tangerine text-espresso-900 hover:bg-lime hover:shadow-[0_0_32px_-4px_var(--color-lime)] px-6 py-3.5 rounded-full',
  ghost: 'glass text-cream hover:bg-lime hover:text-espresso-900 hover:border-lime px-6 py-3.5 rounded-full',
  dark: 'bg-espresso-900 text-cream hover:bg-lime hover:text-espresso-900 px-6 py-3.5 rounded-full',
  'outline-dark': 'border border-espresso-900/25 text-espresso-900 hover:bg-lime hover:border-lime px-6 py-3.5 rounded-full',
  link: 'text-cream hover:text-lime px-0 py-1',
}

export const buttonClass = (variant: Variant = 'primary', className = '') =>
  `group inline-flex items-center justify-center gap-2 text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer select-none active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime ${styles[variant]} ${className}`

export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; children: ReactNode }) {
  return (
    <button {...rest} className={buttonClass(variant, className)}>
      {children}
    </button>
  )
}

export function Kicker({ num, children, className = '', dark = false }: { num?: string; children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <p className={`flex items-center gap-3 font-display text-[10px] font-medium uppercase tracking-[0.28em] ${dark ? 'text-espresso-600' : 'text-latte'} ${className}`}>
      {num && <span className={`rounded-full border px-2 py-0.5 ${dark ? 'border-espresso-900/30 text-espresso-900' : 'border-latte/40 text-cream'}`}>{num}</span>}
      <span className={`h-px w-6 ${dark ? 'bg-espresso-900/30' : 'bg-latte/50'}`} />
      {children}
    </p>
  )
}
export const Eyebrow = Kicker

export function Chip({ active, onClick, children, dark = false, className = '' }: { active?: boolean; onClick?: () => void; children: ReactNode; dark?: boolean; className?: string }) {
  const base = 'inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-all duration-300 active:scale-95'
  const tone = active
    ? 'bg-tangerine text-espresso-900 hover:bg-lime'
    : dark
      ? 'border border-espresso-900/20 text-espresso-900 hover:bg-lime hover:border-lime'
      : 'border border-white/15 text-cream/80 hover:bg-lime hover:text-espresso-900 hover:border-lime'
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={`${base} ${tone} ${className}`}>
      {children}
    </button>
  )
}

export function Stars({ value, size = 'h-3.5 w-3.5', onChange }: { value: number; size?: string; onChange?: (v: number) => void }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-tangerine">
      {[1, 2, 3, 4, 5].map((i) =>
        onChange ? (
          <button key={i} type="button" onClick={() => onChange(i)} aria-label={`${i} stars`} className="cursor-pointer transition-transform hover:scale-125">
            <Star className={`${size} ${i <= value ? '' : 'opacity-25'}`} />
          </button>
        ) : (
          <Star key={i} className={`${size} ${i <= Math.round(value) ? '' : 'opacity-25'}`} />
        ),
      )}
    </span>
  )
}

export function Reveal({ children, delay = 0, className = '', as: As = 'div' }: { children: ReactNode; delay?: number; className?: string; as?: ElementType }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <As ref={ref} className={`${inView ? 'animate-rise' : 'opacity-0'} ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </As>
  )
}

export function Photo({ id, w = 1200, alt, className = '' }: { id: string; w?: number; alt: string; className?: string }) {
  return <img src={img(id, w)} alt={alt} loading="lazy" className={`h-full w-full object-cover ${className}`} />
}

export function Breadcrumbs({ items, dark = false }: { items: [string, string?][]; dark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={`flex flex-wrap items-center gap-2 font-display text-[10px] uppercase tracking-[0.22em] ${dark ? 'text-espresso-600' : 'text-cream/50'}`}>
      {items.map(([label, to], i) => (
        <span key={label} className="flex items-center gap-2">
          {i > 0 && <span className="opacity-50">/</span>}
          {to ? (
            <Link to={to} className="transition-colors hover:text-lime">
              {label}
            </Link>
          ) : (
            <span className={dark ? 'text-espresso-900' : 'text-cream'}>{label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

export const inputClass =
  'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-cream placeholder:text-cream/35 transition-colors focus:border-lime focus:bg-white/10 focus:outline-none'

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-baseline justify-between font-display text-[10px] uppercase tracking-[0.2em] text-latte">
        {label}
        {hint && <span className="normal-case tracking-normal text-cream/40">{hint}</span>}
      </span>
      {children}
    </label>
  )
}
export const Input = (p: InputHTMLAttributes<HTMLInputElement>) => <input {...p} className={`${inputClass} ${p.className ?? ''}`} />
export const Textarea = (p: TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea {...p} className={`${inputClass} resize-none ${p.className ?? ''}`} />

export function Ticker({ items, className = '', fast = false }: { items: string[]; className?: string; fast?: boolean }) {
  const row = [...items, ...items]
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className={`flex w-max ${fast ? 'animate-marquee-fast' : 'animate-marquee'}`}>
        {row.map((t, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6">{t}</span>
            <span className="text-tangerine">✳</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function SectionTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h2 className={`font-display text-[clamp(2.2rem,5.6vw,5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.02em] ${className}`}>{children}</h2>
}

/** Italic serif accent used inside display headings. */
export function Accent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <em className={`font-serif font-normal normal-case italic tracking-normal ${className}`}>{children}</em>
}
