import type { Art } from '../data/articles'
import { Cat } from './Cat'

/** Illustrated Mochi scenes used as article covers and editorial cards. */
export function CatArt({ art, className = '' }: { art: Art; className?: string }) {
  if (art === 'reading')
    return (
      <div className={`relative overflow-hidden bg-gradient-to-b from-[#2b3a4a] via-espresso-700 to-espresso-800 ${className}`}>
        <div className="absolute inset-x-[12%] bottom-[18%] top-[8%] rounded-t-[999px] border-[6px] border-espresso-600 bg-gradient-to-b from-[#1d2b3c] to-[#3c2a3a]">
          <div className="absolute inset-y-0 left-1/2 w-1.5 -translate-x-1/2 bg-espresso-600" />
          <div className="absolute inset-x-0 top-1/2 h-1.5 bg-espresso-600" />
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="absolute h-3 w-px bg-white/40" style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 90}%` }} />
          ))}
          <span className="absolute bottom-6 left-6 h-2 w-2 rounded-full bg-tangerine blur-[2px]" />
          <span className="absolute bottom-10 right-10 h-2 w-2 rounded-full bg-lime blur-[2px]" />
        </div>
        <div className="absolute inset-x-[6%] bottom-[16%] h-4 rounded bg-espresso-600" />
        <Cat pose="hold" prop="book" eyes="down" className="absolute -bottom-[6%] left-1/2 w-[44%] -translate-x-1/2 drop-shadow-2xl" />
      </div>
    )
  if (art === 'espresso')
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-tangerine to-[#c4500a] ${className}`}>
        <div className="absolute inset-x-[8%] top-[8%] h-[28%] rounded-2xl bg-espresso-900/90 shadow-xl">
          <div className="absolute left-5 top-5 flex gap-2">
            <span className="h-3 w-3 rounded-full bg-lime" />
            <span className="h-3 w-3 rounded-full bg-tangerine" />
          </div>
          <div className="absolute right-5 top-4 h-10 w-10 rounded-full border-2 border-latte/60">
            <div className="absolute left-1/2 top-1 h-4 w-0.5 origin-bottom -translate-x-1/2 rotate-45 bg-lime" />
          </div>
          <p className="absolute bottom-3 left-5 font-display text-[10px] uppercase tracking-widest text-latte">9 bar</p>
        </div>
        <Cat pose="hold" prop="portafilter" apron className="absolute -bottom-[4%] left-1/2 w-[54%] -translate-x-[58%] drop-shadow-2xl" />
      </div>
    )
  if (art === 'latte')
    return (
      <div className={`relative overflow-hidden bg-[radial-gradient(circle_at_30%_20%,#5a2a5a,#1a0f0a_70%)] ${className}`}>
        {Array.from({ length: 30 }).map((_, i) => (
          <span key={i} className="absolute top-0 w-px animate-rain bg-gradient-to-b from-transparent to-white/40" style={{ left: `${(i * 31) % 100}%`, height: 30 + ((i * 7) % 40), animationDelay: `${(i % 10) / 10}s` }} />
        ))}
        <span className="absolute left-[12%] top-[20%] h-16 w-16 rounded-full bg-tangerine/50 blur-2xl" />
        <span className="absolute right-[10%] top-[30%] h-20 w-20 rounded-full bg-lime/30 blur-2xl" />
        <svg viewBox="0 0 400 200" className="absolute left-1/2 top-[8%] w-[70%] -translate-x-1/2" aria-hidden="true">
          <path d="M20 180 Q200 -40 380 180 Q290 160 200 180 Q110 160 20 180 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
          <path d="M200 180 V200" stroke="#ddd" strokeWidth="4" />
        </svg>
        <Cat pose="hold" prop="latte" eyes="happy" apron className="absolute -bottom-[4%] left-1/2 w-[42%] -translate-x-1/2 drop-shadow-2xl" />
      </div>
    )
  if (art === 'bean')
    return (
      <div className={`relative overflow-hidden bg-lime ${className}`}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#1a0f0a 1.5px, transparent 1.5px)', backgroundSize: '18px 18px' }} />
        <p className="absolute left-5 top-4 font-display text-[clamp(2rem,6vw,4rem)] font-black uppercase leading-none text-espresso-900/90">Mine.</p>
        <Cat pose="hold" prop="bean" eyes="wink" className="absolute -bottom-[4%] left-1/2 w-[46%] -translate-x-1/2 drop-shadow-2xl" />
      </div>
    )
  return (
    <div className={`relative overflow-hidden bg-gradient-to-b from-espresso-700 to-espresso-900 ${className}`}>
      <Cat pose="wave" eyes="happy" className="absolute -bottom-[4%] left-1/2 w-[46%] -translate-x-1/2" />
    </div>
  )
}
