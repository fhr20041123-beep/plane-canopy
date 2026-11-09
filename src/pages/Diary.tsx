import { useEffect, useState, type FormEvent } from 'react'
import { Link, useLocation } from 'react-router'
import { articles } from '../data/articles'
import { useStore, fmtDate } from '../lib/store'
import { CatArt } from '../components/CatArt'
import { Cat } from '../components/Cat'
import { Avatar } from '../components/Avatar'
import { PageHead } from '../components/PageHead'
import { ArrowUpRight } from '../components/Icons'
import { Accent, Field, Input, Kicker, Reveal, Textarea, buttonClass } from '../components/ui'

const prompts = ['Once, at a café on…', 'The barista remembered…', 'It was raining, and…', 'Mochi, you have to try…']

export function Diary() {
  const entries = articles.filter((a) => a.category === "Mochi's Diary").sort((a, b) => b.date.localeCompare(a.date))
  const store = useStore()
  const loc = useLocation()
  const [name, setName] = useState(store.profile.name)
  const [text, setText] = useState('')
  const [agree, setAgree] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (loc.hash === '#letters') window.setTimeout(() => document.getElementById('letters')?.scrollIntoView({ behavior: 'smooth' }), 100)
  }, [loc.hash])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (text.trim().length < 20) return store.toast('A letter needs at least 20 characters')
    if (!agree) return store.toast('Please tick the consent box')
    store.addLetter({ name: name.trim() || 'Anonymous', text: text.trim() })
    setText('')
    setSent(true)
    store.toast('Letter delivered to Mochi’s windowsill ♡', 'lime')
  }

  return (
    <>
      <PageHead crumbs={[['Home', '/'], ['Diary']]} kicker="Mochi’s diary · 麻薯日记" cn="日记" title={<>Notes from <br /> the <Accent className="text-tangerine">windowsill.</Accent></>} intro="Short, soft, mostly true. Mochi writes after every closing shift." />

      <section className="pb-24">
        <div className="relative mx-auto max-w-5xl px-6 md:px-8">
          <span className="absolute bottom-0 left-[39px] top-0 w-px bg-gradient-to-b from-tangerine via-latte/40 to-transparent md:left-1/2" />
          {entries.map((e, i) => (
            <Reveal key={e.slug} className={`relative mb-16 grid gap-6 pl-16 md:grid-cols-2 md:pl-0 ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
              <span className="absolute left-[31px] top-6 flex h-4 w-4 items-center justify-center rounded-full bg-tangerine ring-4 ring-espresso-900 md:left-1/2 md:-translate-x-1/2" />
              <Link to={`/article/${e.slug}`} className={`group block overflow-hidden rounded-2xl border border-white/10 transition-all hover:-translate-y-1 hover:border-lime ${i % 2 ? 'md:ml-10 md:rotate-1' : 'md:mr-10 md:-rotate-1'}`}>
                <CatArt art={e.art ?? 'wave'} className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-105" />
              </Link>
              <div className={`flex flex-col justify-center ${i % 2 ? 'md:pr-10 md:text-right' : 'md:pl-10'}`}>
                <p className="font-display text-[10px] uppercase tracking-[0.25em] text-latte">{fmtDate(e.date)} · {e.weather}</p>
                <h2 className="mt-3 font-serif text-3xl leading-tight">{e.title}</h2>
                <p className="mt-1 font-cn text-latte/80">{e.cn}</p>
                <p className="mt-3 text-cream/60">{e.dek}</p>
                <p className={`mt-4 flex gap-2 text-xs ${i % 2 ? 'md:justify-end' : ''}`}><span className="rounded-full bg-tangerine/15 px-3 py-1 text-tangerine">Mood: {e.mood}</span></p>
                <Link to={`/article/${e.slug}`} className={buttonClass('ghost', `mt-6 ${i % 2 ? 'md:self-end' : 'self-start'}`)}>Read entry <ArrowUpRight className="h-4 w-4" /></Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="letters" className="scroll-mt-24 bg-paper py-24 text-espresso-900">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Kicker num="✉" dark>Letters to Mochi · 给麻薯写信</Kicker>
            <h2 className="mt-6 font-display text-5xl font-semibold uppercase leading-[0.95]">Tell me <br /> <Accent className="text-tangerine">everything.</Accent></h2>
            <p className="mt-6 max-w-md text-espresso-900/70">A café you love, a barista who made your day, a cup you still think about. Mochi reads every letter on the windowsill.</p>
            <div className="relative mt-10 flex items-end gap-4">
              <Cat pose="hold" prop="heart" eyes="happy" className="w-40" />
              <p className="mb-10 rotate-3 rounded-2xl bg-lime px-4 py-3 font-serif text-lg italic">Your story might <br /> warm someone ♡</p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <form onSubmit={submit} className="relative rounded-3xl border border-espresso-900/10 bg-cream p-8 shadow-[0_30px_60px_-30px_rgba(26,15,10,0.4)] [&_input]:border-espresso-900/15 [&_input]:bg-white/60 [&_input]:text-espresso-900 [&_textarea]:border-espresso-900/15 [&_textarea]:bg-white/60 [&_textarea]:text-espresso-900">
              <span className="absolute -top-3 left-8 rounded-full bg-espresso-900 px-4 py-1 font-display text-[10px] uppercase tracking-[0.2em] text-cream">Letter No. {String(store.letters.length + 13).padStart(3, '0')}</span>
              {sent && <p className="mb-6 animate-fade-in rounded-xl bg-lime px-4 py-3 text-sm">Delivered! Your letter is pinned below. Write another?</p>}
              <div className="grid gap-5">
                <Field label="Signed by"><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" /></Field>
                <div className="flex flex-wrap gap-2">
                  {prompts.map((p) => <button type="button" key={p} onClick={() => setText((t) => (t ? t : p + ' '))} className="cursor-pointer rounded-full border border-espresso-900/20 px-3 py-1.5 text-xs hover:border-lime hover:bg-lime">{p}</button>)}
                </div>
                <Field label="Your letter" hint={`${text.length} / 800`}><Textarea rows={6} maxLength={800} value={text} onChange={(e) => setText(e.target.value)} placeholder="Dear Mochi…" className="paper-lines" /></Field>
                <label className="flex cursor-pointer items-start gap-3 text-sm text-espresso-900/70">
                  <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1 h-4 w-4 accent-tangerine" />
                  I won’t include other people’s private details, and I’m happy for Mochi to quote my letter.
                </label>
                <button className={buttonClass('dark', 'justify-self-start')}>Send to the windowsill <ArrowUpRight className="h-4 w-4" /></button>
              </div>
            </form>
            {store.letters.length > 0 && (
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {store.letters.map((l, i) => (
                  <li key={l.id} className={`animate-pop rounded-2xl bg-white p-5 shadow-lg ${i % 2 ? 'rotate-1' : '-rotate-1'}`}>
                    <div className="flex items-center gap-2"><Avatar index={store.profile.avatar} className="h-7 w-7" /><b className="text-sm">{l.name}</b><span className="text-xs text-espresso-900/40">{fmtDate(l.date)}</span></div>
                    <p className="mt-3 font-serif text-lg italic leading-snug">“{l.text}”</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
