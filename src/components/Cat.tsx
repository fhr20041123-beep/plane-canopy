import { useId } from 'react'

type Pose = 'wave' | 'point' | 'hold' | 'idle'
type Prop = 'none' | 'book' | 'portafilter' | 'latte' | 'bean' | 'heart'
type Eyes = 'open' | 'happy' | 'down' | 'wink'

interface CatProps {
  pose?: Pose
  prop?: Prop
  eyes?: Eyes
  apron?: boolean
  className?: string
  title?: string
}

/**
 * 2D companion drawing of Mochi (麻薯), the Plane Canopy IP: a cream plush cat
 * with chocolate points, matching the GLB models used in the 3D studio.
 */
export function Cat({ pose = 'idle', prop = 'none', eyes = 'open', apron = false, className, title = 'Mochi the cat' }: CatProps) {
  const id = useId().replace(/:/g, '')
  const g = (n: string) => `url(#${n}-${id})`

  return (
    <svg viewBox="0 0 300 400" className={className} role="img" aria-label={title}>
      <Defs id={id} />
      <ellipse cx="150" cy="386" rx="88" ry="10" fill="#000" opacity="0.3" />

      {/* tail */}
      <path d="M196 330 Q268 336 258 264 Q252 226 230 222" fill="none" stroke={g('point')} strokeWidth="30" strokeLinecap="round" />

      {/* back arm (left) */}
      {pose !== 'hold' && (
        <path d="M100 236 Q78 280 96 312" fill="none" stroke={g('point')} strokeWidth="30" strokeLinecap="round" />
      )}

      {/* body */}
      <path d="M92 222 Q74 352 112 356 L188 356 Q226 352 208 222 Q150 196 92 222 Z" fill={g('fur')} />
      <ellipse cx="128" cy="262" rx="20" ry="36" fill="#fff" opacity="0.35" />

      {apron && (
        <g>
          <path d="M124 240 L138 214 M176 240 L162 214" stroke="#c4500a" strokeWidth="5" strokeLinecap="round" />
          <path d="M116 238 L184 238 L192 340 L108 340 Z" fill={g('apron')} />
          <rect x="132" y="284" width="36" height="24" rx="5" fill="none" stroke="#ffe2c4" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
          <text x="150" y="268" textAnchor="middle" fontFamily="Playfair Display, serif" fontStyle="italic" fontSize="14" fill="#fff4e6">PC</text>
        </g>
      )}

      {/* feet */}
      <ellipse cx="124" cy="364" rx="26" ry="16" fill={g('point')} />
      <ellipse cx="176" cy="364" rx="26" ry="16" fill={g('point')} />

      {/* props */}
      {prop === 'book' && (
        <g>
          <path d="M102 262 L150 274 L198 262 L198 302 L150 314 L102 302 Z" fill="#c4500a" />
          <path d="M106 258 L150 268 L150 308 L106 298 Z" fill="#fbf3e6" />
          <path d="M194 258 L150 268 L150 308 L194 298 Z" fill="#f2e6d2" />
          <path d="M114 272 l28 6 M114 280 l28 6 M114 288 l22 5 M158 278 l28 -6 M158 286 l28 -6 M158 294 l22 -5" stroke="#b9a184" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      )}
      {prop === 'portafilter' && (
        <g>
          <rect x="176" y="262" width="80" height="14" rx="7" fill="#1b1311" />
          <ellipse cx="146" cy="266" rx="38" ry="10" fill="#cfd3d6" />
          <path d="M108 266 L112 294 Q146 308 180 294 L184 266 Z" fill={g('steel')} />
          <ellipse cx="146" cy="266" rx="32" ry="7" fill="#3a2214" />
        </g>
      )}
      {prop === 'latte' && (
        <g>
          <g className="animate-steam">
            <path d="M138 236 q-6 -10 0 -20 q6 -10 0 -20" stroke="#fff" strokeOpacity="0.7" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
          <g className="animate-steam" style={{ animationDelay: '1.2s' }}>
            <path d="M160 236 q-6 -10 0 -20 q6 -10 0 -20" stroke="#fff" strokeOpacity="0.6" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
          <path d="M124 248 L130 300 Q150 308 170 300 L176 248 Z" fill="#fffaf2" />
          <rect x="126" y="266" width="48" height="18" fill="#ff7a1a" />
          <ellipse cx="150" cy="248" rx="27" ry="6" fill="#f0e2cf" />
          <ellipse cx="150" cy="248" rx="22" ry="4" fill="#8a5a36" />
        </g>
      )}
      {prop === 'bean' && (
        <g transform="rotate(-25 150 280)">
          <ellipse cx="150" cy="280" rx="26" ry="38" fill={g('bean')} />
          <path d="M150 244 Q138 280 150 316" stroke="#2a160c" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
      )}
      {prop === 'heart' && (
        <path d="M150 312 C110 288 110 252 132 250 C142 249 148 256 150 262 C152 256 158 249 168 250 C190 252 190 288 150 312 Z" fill="#ff7a1a" stroke="#fff4e6" strokeWidth="3" />
      )}

      {/* front arms */}
      {pose === 'wave' && (
        <g className="origin-[202px_232px] animate-wave">
          <path d="M200 232 Q238 206 240 152" fill="none" stroke={g('point')} strokeWidth="30" strokeLinecap="round" />
          <path d="M266 118 q10 10 6 26 M276 108 q16 18 8 42" stroke="#c6ff3d" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      )}
      {pose === 'point' && (
        <path d="M200 234 Q236 238 270 210" fill="none" stroke={g('point')} strokeWidth="30" strokeLinecap="round" />
      )}
      {pose === 'idle' && (
        <path d="M200 236 Q222 280 204 312" fill="none" stroke={g('point')} strokeWidth="30" strokeLinecap="round" />
      )}
      {pose === 'hold' && (
        <>
          <path d="M104 232 Q96 276 124 282" fill="none" stroke={g('point')} strokeWidth="30" strokeLinecap="round" />
          <path d="M196 232 Q204 276 176 282" fill="none" stroke={g('point')} strokeWidth="30" strokeLinecap="round" />
        </>
      )}

      <CatHeadShapes id={id} eyes={eyes} />
    </svg>
  )
}

function Defs({ id }: { id: string }) {
  const n = (s: string) => `${s}-${id}`
  return (
    <defs>
      <radialGradient id={n('fur')} cx="38%" cy="28%" r="85%">
        <stop offset="0%" stopColor="#fffaf2" />
        <stop offset="55%" stopColor="#f1e2cf" />
        <stop offset="100%" stopColor="#c9ab8c" />
      </radialGradient>
      <radialGradient id={n('point')} cx="35%" cy="30%" r="80%">
        <stop offset="0%" stopColor="#8a5a3c" />
        <stop offset="55%" stopColor="#5a3622" />
        <stop offset="100%" stopColor="#2e190f" />
      </radialGradient>
      <linearGradient id={n('apron')} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffa45c" />
        <stop offset="100%" stopColor="#d9580c" />
      </linearGradient>
      <linearGradient id={n('steel')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#8d949a" />
        <stop offset="40%" stopColor="#eef1f3" />
        <stop offset="100%" stopColor="#7b8187" />
      </linearGradient>
      <radialGradient id={n('bean')} cx="35%" cy="30%" r="80%">
        <stop offset="0%" stopColor="#9a6038" />
        <stop offset="100%" stopColor="#3b2214" />
      </radialGradient>
    </defs>
  )
}

function CatHeadShapes({ id, eyes }: { id: string; eyes: Eyes }) {
  const g = (n: string) => `url(#${n}-${id})`
  return (
    <g>
      <path d="M72 112 L82 30 L138 68 Z" fill={g('point')} stroke="#4a2a1a" strokeWidth="12" strokeLinejoin="round" />
      <path d="M228 112 L218 30 L162 68 Z" fill={g('point')} stroke="#4a2a1a" strokeWidth="12" strokeLinejoin="round" />
      <path d="M90 94 L94 50 L124 72 Z" fill="#e9a99a" stroke="#e9a99a" strokeWidth="4" strokeLinejoin="round" />
      <path d="M210 94 L206 50 L176 72 Z" fill="#e9a99a" stroke="#e9a99a" strokeWidth="4" strokeLinejoin="round" />
      <path d="M150 54 C214 54 246 104 244 150 C242 198 202 212 150 212 C98 212 58 198 56 150 C54 104 86 54 150 54 Z" fill={g('fur')} />
      <ellipse cx="114" cy="92" rx="34" ry="16" fill="#fff" opacity="0.5" transform="rotate(-18 114 92)" />
      {/* chocolate mask */}
      <ellipse cx="150" cy="162" rx="36" ry="30" fill={g('point')} />
      <ellipse cx="96" cy="172" rx="12" ry="7" fill="#ff8a7a" opacity="0.3" />
      <ellipse cx="204" cy="172" rx="12" ry="7" fill="#ff8a7a" opacity="0.3" />
      {eyes === 'open' && (
        <>
          <circle cx="110" cy="146" r="9" fill="#120a06" />
          <circle cx="190" cy="146" r="9" fill="#120a06" />
          <circle cx="113" cy="142" r="3" fill="#fff" />
          <circle cx="193" cy="142" r="3" fill="#fff" />
        </>
      )}
      {eyes === 'happy' && (
        <path d="M98 150 Q110 134 122 150 M178 150 Q190 134 202 150" stroke="#120a06" strokeWidth="6" fill="none" strokeLinecap="round" />
      )}
      {eyes === 'down' && (
        <path d="M98 144 Q110 156 122 144 M178 144 Q190 156 202 144" stroke="#120a06" strokeWidth="6" fill="none" strokeLinecap="round" />
      )}
      {eyes === 'wink' && (
        <>
          <path d="M98 150 Q110 134 122 150" stroke="#120a06" strokeWidth="6" fill="none" strokeLinecap="round" />
          <circle cx="190" cy="146" r="9" fill="#120a06" />
          <circle cx="193" cy="142" r="3" fill="#fff" />
        </>
      )}
      <path d="M144 154 Q150 150 156 154 Q153 160 150 161 Q147 160 144 154 Z" fill="#e9a99a" />
      <path d="M150 161 Q150 170 140 172 M150 161 Q150 170 160 172" stroke="#f6e6d6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M96 156 L72 150 M96 166 L74 170 M204 156 L228 150 M204 166 L226 170" stroke="#4a2a1a" strokeWidth="3" strokeLinecap="round" />
    </g>
  )
}

/** Head-only Mochi icon for brand marks, avatars and tooltips. */
export function CatHead({ className, eyes = 'open' }: { className?: string; eyes?: Eyes }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="56 18 190 200" className={className} aria-hidden="true">
      <Defs id={id} />
      <CatHeadShapes id={id} eyes={eyes} />
    </svg>
  )
}
