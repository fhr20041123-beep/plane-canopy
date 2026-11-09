import { useState } from 'react'
import { Cat } from './Cat'
import { ArrowUpRight, Telegram } from './Icons'
import { Accent, Kicker, Reveal, SectionTitle, buttonClass } from './ui'
import { useStore } from '../lib/store'

export const BOT_URL = 'https://t.me/HeyPearlBot'
export const BOT_HANDLE = '@HeyPearlBot'

/** Lustrous pearl avatar for the Pearl Telegram bot. */
export function PearlAvatar({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <span className={`relative inline-block shrink-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,#ffffff_0%,#f7efe3_28%,#e8d3b8_62%,#b8946c_100%)] shadow-[inset_-3px_-4px_8px_rgba(120,80,40,0.35),0_4px_14px_rgba(255,122,26,0.35)] ${className}`}>
      <span className="absolute left-[22%] top-[18%] h-[22%] w-[22%] rounded-full bg-white/90 blur-[1px]" />
    </span>
  )
}

const demo = {
  cafe: 'Today’s pick: Anfu Window Bar. Honey cappuccino, plane-tree stools, and Mochi napping on the sill.',
  route: 'Try the Concession loop: Wukang → Yongkang → Anfu. 2.4 km, three stamps, zero bad cups.',
  deals: 'Members get first dibs on limited roasts. This week: Yunnan Natural drops Friday 10:00.',
}
type DemoKey = keyof typeof demo

const linkProps = { href: BOT_URL, target: '_blank', rel: 'noopener noreferrer' } as const

export function PearlBotSection() {
  const { toast } = useStore()
  const [answer, setAnswer] = useState<DemoKey | null>(null)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(BOT_HANDLE)
      toast(`${BOT_HANDLE} copied`, 'lime')
    } catch {
      toast(`Search ${BOT_HANDLE} in Telegram`)
    }
  }
  return (
    <section id="bot" className="relative overflow-hidden bg-espresso-950 py-24 md:py-32">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-tangerine/15 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[360px] w-[360px] rounded-full bg-lime/10 blur-[140px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 md:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <Kicker num="08">Our Telegram bot · 电报机器人</Kicker>
          <SectionTitle className="mt-6">
            Coffee tips, <br /> <Accent className="text-tangerine">always on call.</Accent>
          </SectionTitle>
          <p className="mt-6 max-w-md text-cream/65">
            Meet <b className="text-cream">Pearl</b>, the Plane Canopy bot on Telegram. Ask for a café near you, get walking routes between stamps, and hear about limited roasts before anyone else.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {['◎ Café near me', '↝ Stamp routes', '✦ Roast drops', '✎ Send a tip'].map((t) => (
              <span key={t} className="rounded-full border border-white/15 px-4 py-2 text-xs text-cream/75">{t}</span>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a {...linkProps} className={buttonClass('primary')}>
              <Telegram className="h-4 w-4" /> Open {BOT_HANDLE} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <button onClick={copy} className={buttonClass('ghost')}>Copy handle</button>
          </div>
          <p className="mt-6 flex items-center gap-2 font-display text-[10px] uppercase tracking-[0.25em] text-cream/40">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" /> Free · replies in seconds · t.me/HeyPearlBot
          </p>
        </Reveal>

        <Reveal delay={150} className="relative flex justify-center lg:col-span-5 lg:col-start-8">
          <span className="absolute -top-8 left-0 z-10 hidden -rotate-6 rounded-2xl bg-cream px-4 py-2 font-serif text-lg italic text-espresso-900 shadow-xl sm:block md:-left-6">
            Say hi to Pearl <span className="not-italic text-tangerine">↘</span>
          </span>
          <Cat pose="wave" eyes="happy" className="absolute -right-6 bottom-6 z-10 hidden w-36 drop-shadow-2xl sm:block md:-right-12" />

          <div className="relative w-[300px] rotate-[2deg] rounded-[44px] border-[10px] border-espresso-700 bg-espresso-900 p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:rotate-0">
            <span className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-espresso-700" />
            <a {...linkProps} className="mt-6 flex items-center gap-3 rounded-2xl px-2 py-2 transition-colors hover:bg-white/5">
              <PearlAvatar />
              <span className="flex-1 leading-tight">
                <b className="block text-sm">Pearl · Plane Canopy</b>
                <small className="text-xs text-lime">bot · {BOT_HANDLE}</small>
              </span>
              <ArrowUpRight className="h-4 w-4 text-cream/50" />
            </a>
            <div className="mt-3 min-h-[250px] space-y-2.5 rounded-2xl bg-[radial-gradient(circle_at_20%_10%,#352117,#1a0f0a_70%)] p-3">
              <p className="text-center font-display text-[9px] uppercase tracking-[0.25em] text-cream/30">demo preview</p>
              <div className="max-w-[88%] rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2 text-[13px] leading-snug">
                Hi, I’m Pearl ✦ Mochi’s assistant on Telegram. What are you in the mood for?
              </div>
              {answer && (
                <div key={answer} className="ml-auto max-w-[80%] animate-fade-in rounded-2xl rounded-br-sm bg-lime px-3 py-2 text-[13px] text-espresso-900">
                  {answer === 'cafe' ? 'Café near me' : answer === 'route' ? 'Plan a stamp route' : 'Any roast drops?'}
                </div>
              )}
              <div key={`a-${answer}`} className="max-w-[88%] animate-fade-in rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2 text-[13px] leading-snug">
                {answer ? demo[answer] : 'Tap a button below to see how I reply.'}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {([['cafe', '◎ Café near me'], ['route', '↝ Stamp route'], ['deals', '✦ Roast drops']] as [DemoKey, string][]).map(([k, label]) => (
                <button key={k} onClick={() => setAnswer(k)} className={`cursor-pointer rounded-xl px-2 py-2 text-xs transition-colors ${answer === k ? 'bg-tangerine text-espresso-900' : 'bg-white/10 hover:bg-lime hover:text-espresso-900'}`}>
                  {label}
                </button>
              ))}
              <a {...linkProps} className="flex items-center justify-center gap-1 rounded-xl bg-tangerine px-2 py-2 text-xs font-medium text-espresso-900 transition-colors hover:bg-lime">
                Open bot <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
            <a {...linkProps} className="mt-3 flex items-center justify-between rounded-full bg-white/5 px-4 py-2.5 text-xs text-cream/40 transition-colors hover:bg-white/10">
              Message Pearl… <Telegram className="h-4 w-4 text-tangerine" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** Compact Telegram bot card for the footer. */
export function PearlBotFooterCard() {
  return (
    <a {...linkProps} className="group relative mt-16 flex flex-col gap-5 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-espresso-800 to-espresso-900 p-6 transition-colors hover:border-lime sm:flex-row sm:items-center md:p-8">
      <span className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-tangerine/20 blur-3xl transition-opacity group-hover:opacity-80" />
      <PearlAvatar className="h-14 w-14" />
      <span className="relative flex-1">
        <span className="block font-display text-[10px] uppercase tracking-[0.25em] text-latte">Plane Canopy on Telegram · 电报机器人</span>
        <span className="mt-1 block font-serif text-2xl leading-tight md:text-3xl">
          Chat with <em className="text-tangerine">Pearl</em>, our café concierge.
        </span>
        <span className="mt-1 block text-sm text-cream/50">Café picks, stamp routes and roast drops, right in your chats.</span>
      </span>
      <span className="relative inline-flex items-center gap-2 self-start rounded-full bg-tangerine px-5 py-3 text-sm font-medium text-espresso-900 transition-colors group-hover:bg-lime sm:self-center">
        <Telegram className="h-4 w-4" /> {BOT_HANDLE} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </a>
  )
}
