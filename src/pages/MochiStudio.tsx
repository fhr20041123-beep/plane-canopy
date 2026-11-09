import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import type { OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/controls/OrbitControls.js'
import { MochiStage, MODELS, type ModelId } from '../components/three/MochiModel'
import { Cat } from '../components/Cat'
import { ArrowUpRight, Camera, Cube, Download, Expand, Rotate, Sun, ZoomIn, ZoomOut } from '../components/Icons'
import { Accent, Kicker, Reveal, SectionTitle, buttonClass } from '../components/ui'
import { getCafe } from '../data/cafes'
import { mochiLines } from '../data/misc'
import { useStore } from '../lib/store'

const scenes = [
  { id: 'espresso', label: 'Espresso Night', cn: '浓缩之夜', bg: 'bg-[radial-gradient(ellipse_at_50%_40%,#4a2f21,#120a06_70%)]', text: 'text-cream', rim: '#ff7a1a', swatch: '#25160e' },
  { id: 'latte', label: 'Latte Paper', cn: '拿铁纸', bg: 'bg-[radial-gradient(ellipse_at_50%_40%,#fffaf2,#e8d3b8_75%)]', text: 'text-espresso-900', rim: '#c9a27a', swatch: '#f4ebdf' },
  { id: 'neon', label: 'Neon Bund', cn: '霓虹外滩', bg: 'bg-[radial-gradient(ellipse_at_50%_40%,#3a1650,#0b0614_70%)]', text: 'text-cream', rim: '#ff3d9a', swatch: '#2a0f3a' },
  { id: 'lime', label: 'Lime Pop', cn: '青柠波普', bg: 'bg-[radial-gradient(ellipse_at_50%_40%,#e4ff9a,#9fdc1f_75%)]', text: 'text-espresso-900', rim: '#ff7a1a', swatch: '#c6ff3d' },
] as const

const rims = ['#ff7a1a', '#c6ff3d', '#c9a27a', '#ff3d9a', '#5ac8ff']

const traits: [string, number][] = [
  ['Curiosity', 92],
  ['Latte art', 78],
  ['Nap discipline', 99],
  ['Bean protectiveness', 100],
  ['Punctuality', 41],
]

export function MochiStudio() {
  const { pets, pet, toast } = useStore()
  const [model, setModel] = useState<ModelId>('cat-3')
  const [sceneId, setSceneId] = useState<(typeof scenes)[number]['id']>('espresso')
  const [autoRotate, setAutoRotate] = useState(true)
  const [wireframe, setWireframe] = useState(false)
  const [rim, setRim] = useState<string>('#ff7a1a')
  const [light, setLight] = useState(1.4)
  const [hop, setHop] = useState(0)
  const [bubble, setBubble] = useState<string | null>(null)
  const controls = useRef<OrbitControlsImpl | null>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const bubbleTimer = useRef<number>(0)

  const scene = scenes.find((s) => s.id === sceneId)!
  const def = MODELS.find((m) => m.id === model)!

  const onPet = useCallback(() => {
    setHop((h) => h + 1)
    pet()
    const next = pets + 1
    setBubble(next % 10 === 0 ? `${next} pets! You’re officially my best friend ♡` : mochiLines[next % mochiLines.length])
    window.clearTimeout(bubbleTimer.current)
    bubbleTimer.current = window.setTimeout(() => setBubble(null), 2200)
    if (next === 10) toast('Achievement unlocked: Best Friend 最好的朋友', 'lime')
  }, [pet, pets, toast])

  const zoom = (factor: number) => {
    const c = controls.current
    if (!c) return
    const dir = c.object.position.clone().sub(c.target).multiplyScalar(factor)
    const len = Math.min(5, Math.max(1.1, dir.length()))
    c.object.position.copy(c.target).add(dir.setLength(len))
    c.update()
  }
  const reset = () => {
    controls.current?.reset()
    setAutoRotate(false)
  }
  const snapshot = () => {
    const canvas = stageRef.current?.querySelector('canvas')
    if (!canvas) return
    const a = document.createElement('a')
    a.href = canvas.toDataURL('image/png')
    a.download = `mochi-${model}-${Date.now()}.png`
    a.click()
    toast('Snapshot saved. Mochi says cheese!')
  }
  const fullscreen = () => {
    const el = stageRef.current
    if (!el) return
    if (document.fullscreenElement) document.exitFullscreen()
    else el.requestFullscreen?.()
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest('input, textarea')) return
      if (e.code === 'Space') {
        e.preventDefault()
        onPet()
      } else if (e.key === 'r') reset()
      else if (e.key === 'a') setAutoRotate((v) => !v)
      else if (e.key === 'w') setWireframe((v) => !v)
      else if (e.key === '+' || e.key === '=') zoom(0.85)
      else if (e.key === '-') zoom(1.18)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onPet])

  const tools = [
    { icon: Rotate, label: autoRotate ? 'Stop auto-rotate (A)' : 'Auto-rotate (A)', on: autoRotate, act: () => setAutoRotate((v) => !v) },
    { icon: ZoomIn, label: 'Zoom in (+)', act: () => zoom(0.82) },
    { icon: ZoomOut, label: 'Zoom out (−)', act: () => zoom(1.2) },
    { icon: Cube, label: 'Wireframe (W)', on: wireframe, act: () => setWireframe((v) => !v) },
    { icon: Camera, label: 'Snapshot PNG', act: snapshot },
    { icon: Expand, label: 'Fullscreen', act: fullscreen },
  ]
  const dark = scene.text === 'text-cream'

  return (
    <>
      <section ref={stageRef} className={`relative h-[100svh] min-h-[640px] overflow-hidden ${scene.bg} ${scene.text}`}>
        {/* giant background type */}
        <div className="pointer-events-none absolute inset-0 flex select-none flex-col items-center justify-center">
          <p className={`stroke-text font-display text-[24vw] font-black uppercase leading-[0.8] tracking-tighter ${dark ? 'opacity-[0.12]' : 'opacity-20'}`}>Mochi</p>
          <p className={`font-cn text-[12vw] font-black leading-none ${dark ? 'opacity-[0.06]' : 'opacity-10'}`}>麻薯</p>
        </div>
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-current opacity-15" />

        <MochiStage
          model={model}
          className="absolute inset-0"
          autoRotate={autoRotate}
          wireframe={wireframe}
          rimColor={rim}
          keyIntensity={light}
          hop={hop}
          onPet={onPet}
          enablePan
          controlsRef={controls}
          cameraZ={3.3}
          preserveDrawingBuffer
        />

        {/* speech bubble */}
        {bubble && (
          <div key={bubble + pets} className="pointer-events-none absolute left-1/2 top-[18%] z-20 -translate-x-1/2 animate-pop">
            <div className="relative rounded-2xl bg-cream px-5 py-3 font-serif text-lg italic text-espresso-900 shadow-2xl">
              {bubble}
              <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-cream" />
            </div>
          </div>
        )}

        {/* left info */}
        <div className="pointer-events-none absolute inset-x-0 top-28 z-10 mx-auto max-w-7xl px-6 md:px-8">
          <div className="pointer-events-auto max-w-sm">
            <Kicker num="3D" dark={!dark}>Studio · 麻薯工作室</Kicker>
            <h1 className="mt-5 font-display text-5xl font-semibold uppercase leading-[0.9] md:text-6xl">
              Hello,
              <br />
              I’m <Accent className="text-tangerine">Mochi.</Accent>
            </h1>
            <p className={`mt-4 text-sm leading-relaxed ${dark ? 'text-cream/70' : 'text-espresso-900/70'}`}>
              The real 3D sculpt of our head barista. Drag to orbit, scroll to zoom, right-drag to pan, and click Mochi (or press Space) to make it hop.
            </p>
            <div className="mt-6 flex gap-2">
              {MODELS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setModel(m.id)}
                  className={`flex-1 cursor-pointer rounded-2xl border px-4 py-3 text-left transition-all ${
                    model === m.id ? 'border-tangerine bg-tangerine text-espresso-900' : dark ? 'border-white/15 bg-espresso-900/40 backdrop-blur hover:border-lime hover:bg-lime hover:text-espresso-900' : 'border-espresso-900/20 bg-white/40 backdrop-blur hover:border-lime hover:bg-lime'
                  }`}
                >
                  <span className="block font-display text-[10px] uppercase tracking-[0.2em] opacity-70">{m.label}</span>
                  <span className="block font-serif text-lg leading-tight">{m.title}</span>
                  <span className="font-cn text-xs opacity-70">{m.cn}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* right toolbar */}
        <div className="absolute right-4 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2 rounded-full bg-espresso-900/70 p-1.5 text-cream backdrop-blur-xl md:right-8">
          {tools.map((t) => (
            <button
              key={t.label}
              onClick={t.act}
              title={t.label}
              aria-label={t.label}
              aria-pressed={t.on}
              className={`group relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-colors ${t.on ? 'bg-tangerine text-espresso-900' : 'hover:bg-lime hover:text-espresso-900'}`}
            >
              <t.icon className="h-5 w-5" />
              <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-cream px-3 py-1 text-xs text-espresso-900 opacity-0 transition-opacity group-hover:opacity-100">{t.label}</span>
            </button>
          ))}
          <a href={def.file} download={`mochi-${model}.glb`} title="Download GLB" aria-label="Download GLB" className="group relative flex h-11 w-11 items-center justify-center rounded-full hover:bg-lime hover:text-espresso-900">
            <Download className="h-5 w-5" />
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-cream px-3 py-1 text-xs text-espresso-900 opacity-0 transition-opacity group-hover:opacity-100">Download .glb</span>
          </a>
        </div>

        {/* bottom controls */}
        <div className="absolute inset-x-0 bottom-6 z-10 mx-auto flex max-w-7xl flex-col gap-3 px-6 md:px-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap items-center gap-3 rounded-3xl bg-espresso-900/70 p-3 text-cream backdrop-blur-xl">
            <div className="flex items-center gap-2 pr-2">
              {scenes.map((s) => (
                <button key={s.id} onClick={() => { setSceneId(s.id); setRim(s.rim) }} title={s.label} aria-label={`Scene: ${s.label}`} className={`h-8 w-8 cursor-pointer rounded-full border-2 transition-transform hover:scale-110 ${sceneId === s.id ? 'scale-110 border-lime' : 'border-white/30'}`} style={{ background: s.swatch }} />
              ))}
              <span className="ml-1 hidden text-xs sm:block">
                <span className="block font-display text-[9px] uppercase tracking-[0.2em] text-latte">Scene</span>
                {scene.label} <span className="font-cn text-cream/50">{scene.cn}</span>
              </span>
            </div>
            <span className="hidden h-8 w-px bg-white/15 sm:block" />
            <div className="flex items-center gap-1.5">
              <span className="mr-1 font-display text-[9px] uppercase tracking-[0.2em] text-latte">Rim</span>
              {rims.map((c) => (
                <button key={c} onClick={() => setRim(c)} aria-label={`Rim light ${c}`} className={`h-5 w-5 cursor-pointer rounded-full transition-transform hover:scale-125 ${rim === c ? 'ring-2 ring-cream ring-offset-2 ring-offset-espresso-900' : ''}`} style={{ background: c }} />
              ))}
            </div>
            <span className="hidden h-8 w-px bg-white/15 sm:block" />
            <label className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-latte" />
              <input type="range" min={0.2} max={3} step={0.1} value={light} onChange={(e) => setLight(+e.target.value)} className="w-28 accent-tangerine" aria-label="Key light intensity" />
            </label>
          </div>
          <div className="flex items-center gap-3 rounded-full bg-espresso-900/70 px-4 py-2.5 text-xs text-cream/80 backdrop-blur-xl lg:mr-20">
            <span className="font-display text-[9px] uppercase tracking-[0.2em] text-latte">Pets</span>
            <span className="font-display text-lg text-tangerine tabular-nums">{pets}</span>
            <span className="hidden md:inline">· Drag ↻ · Scroll ± · Space = hop · R = reset</span>
            <button onClick={reset} className="cursor-pointer rounded-full border border-white/20 px-3 py-1 hover:border-lime hover:bg-lime hover:text-espresso-900">Reset</button>
          </div>
        </div>
      </section>

      <CharacterFile />
    </>
  )
}

function CharacterFile() {
  const home = getCafe('anfu')!
  const spots = ['anfu', 'wukang', 'm50', 'tianzifang'].map((id) => getCafe(id)!)
  const stickers = [
    { pose: 'wave' as const, eyes: 'happy' as const, prop: 'none' as const, label: 'Hello!', to: '/' },
    { pose: 'hold' as const, eyes: 'down' as const, prop: 'book' as const, label: 'Reading', to: '/article/diary-07-plane-trees' },
    { pose: 'hold' as const, eyes: 'open' as const, prop: 'portafilter' as const, label: 'On bar', to: '/article/nine-bar-rule', apron: true },
    { pose: 'hold' as const, eyes: 'happy' as const, prop: 'latte' as const, label: 'For you', to: '/article/diary-12-closing-shift', apron: true },
    { pose: 'hold' as const, eyes: 'wink' as const, prop: 'bean' as const, label: 'Mine!', to: '/article/diary-09-the-bean' },
    { pose: 'hold' as const, eyes: 'happy' as const, prop: 'heart' as const, label: 'Love', to: '/diary#letters' },
  ]
  return (
    <section className="bg-paper py-24 text-espresso-900 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Kicker num="01" dark>Character file · 角色档案</Kicker>
            <SectionTitle className="mt-6">
              Not just <br /> a <Accent className="text-tangerine">mascot.</Accent>
            </SectionTitle>
            <p className="mt-6 max-w-md text-espresso-900/70">
              Mochi (麻薯) is a cream plush cat with chocolate ears, a soft spot for Yunnan beans, and a firm belief that every café needs a windowsill.
            </p>
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7">
            <div className="paper-lines relative rotate-[0.6deg] rounded-2xl border border-espresso-900/15 bg-cream p-8 shadow-[0_30px_60px_-30px_rgba(26,15,10,0.5)]">
              <span className="absolute -top-3 left-8 rounded-full bg-tangerine px-3 py-1 font-display text-[10px] uppercase tracking-[0.2em]">ID card · No. 001</span>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
                {[
                  ['Name', 'Mochi 麻薯'],
                  ['Species', 'Siamese-ish plush cat'],
                  ['Job', 'Head barista (self-appointed)'],
                  ['Birthday', '14 October, under a plane tree'],
                  ['Favourite drink', 'Honey cappuccino'],
                  ['Most prized', 'One Yunnan bean'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-display text-[9px] uppercase tracking-[0.2em] text-espresso-600">{k}</dt>
                    <dd className="mt-1 font-serif text-lg leading-tight">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 space-y-3 border-t border-espresso-900/10 pt-6">
                {traits.map(([t, v]) => (
                  <div key={t} className="flex items-center gap-4 text-xs">
                    <span className="w-36 shrink-0">{t}</span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-espresso-900/10">
                      <span className="block h-full rounded-full bg-gradient-to-r from-tangerine to-lime" style={{ width: `${v}%` }} />
                    </span>
                    <span className="w-8 text-right font-display tabular-nums">{v}</span>
                  </div>
                ))}
              </div>
              <Link to={`/cafe/${home.id}`} className="mt-6 flex items-center justify-between rounded-xl bg-espresso-900 px-4 py-3 text-sm text-cream transition-colors hover:bg-lime hover:text-espresso-900">
                <span>Home café: <b>{home.name}</b></span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-24">
          <Kicker num="02" dark>Sticker sheet · 表情包</Kicker>
          <p className="mt-3 max-w-md text-sm text-espresso-900/60">Every mood has a story. Tap a sticker to read it.</p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {stickers.map((s, i) => (
              <Link
                key={s.label}
                to={s.to}
                className="group relative flex aspect-[3/4] flex-col items-center justify-end overflow-hidden rounded-2xl border border-espresso-900/10 bg-cream p-3 transition-all duration-300 hover:-translate-y-2 hover:rotate-[-2deg] hover:border-lime hover:bg-lime hover:shadow-xl"
                style={{ transform: `rotate(${(i % 2 ? 1 : -1) * 1.5}deg)` }}
              >
                <Cat pose={s.pose} eyes={s.eyes} prop={s.prop} apron={s.apron} className="w-[88%] transition-transform duration-500 group-hover:scale-110" />
                <span className="mt-2 font-display text-[11px] font-semibold uppercase tracking-[0.15em]">{s.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-24 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Kicker num="03" dark>Favourite spots · 常去的店</Kicker>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {spots.map((c) => (
                <Link key={c.id} to={`/cafe/${c.id}`} className="group flex items-center justify-between rounded-2xl border border-espresso-900/10 bg-cream p-5 transition-all hover:border-lime hover:bg-lime">
                  <span>
                    <span className="block font-serif text-xl">{c.name}</span>
                    <span className="text-xs text-espresso-900/60">{c.district} · {c.signature}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-2xl bg-espresso-900 p-6 text-cream">
            <div>
              <p className="font-display text-[10px] uppercase tracking-[0.2em] text-latte">Take Mochi home</p>
              <p className="mt-3 font-serif text-3xl leading-tight">The 12 cm vinyl figure, spin-before-you-buy.</p>
            </div>
            <Link to="/product/mochi-figure" className={buttonClass('primary', 'mt-6 self-start')}>
              View figure <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
