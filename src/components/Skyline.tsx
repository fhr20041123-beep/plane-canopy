/** Stylized neon line-art of the Pudong skyline across the Huangpu. */
export function Skyline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 320" className={className} aria-hidden="true">
      <defs>
        <filter id="neon" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff7a1a" stopOpacity="0.25" />
          <stop offset="1" stopColor="#ff7a1a" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#neon)">
        {/* background low-rise */}
        <path d="M0 268 V240 h30 v-18 h26 v30 h22 v-40 h20 v40 h18 V230 h24 v38" stroke="#c9a27a" strokeOpacity="0.45" strokeWidth="1.5" />
        <path d="M470 268 v-46 h24 v-22 h20 v34 h26 v-50 h22 v36 h18 v-24 h20 v72" stroke="#c9a27a" strokeOpacity="0.45" strokeWidth="1.5" />

        {/* Oriental Pearl Tower */}
        <g stroke="#ff7a1a" strokeWidth="2.2">
          <path d="M150 268 L170 216 M210 268 L190 216 M180 268 V216" />
          <circle cx="180" cy="200" r="24" />
          <path d="M174 176 V128 M186 176 V128" />
          <circle cx="180" cy="116" r="13" />
          <path d="M180 103 V82" />
          <circle cx="180" cy="76" r="6" />
          <path d="M180 70 V22" />
        </g>

        {/* Jin Mao Tower */}
        <g stroke="#e8d3b8" strokeWidth="1.8">
          <path d="M262 268 V160 L266 150 H294 L298 160 V268" />
          <path d="M266 150 V120 L270 112 H290 L294 120 V150" />
          <path d="M270 112 V90 L274 84 H286 L290 90 V112" />
          <path d="M274 84 V68 L280 60 L286 68 V84" />
          <path d="M280 60 V36" />
        </g>

        {/* Shanghai Tower */}
        <g stroke="#c6ff3d" strokeWidth="2.2">
          <path d="M318 268 Q314 150 336 24 L344 18 Q362 150 360 268" />
          <path d="M324 210 Q340 150 352 80" strokeOpacity="0.6" />
        </g>

        {/* SWFC "bottle opener" */}
        <g stroke="#ffa45c" strokeWidth="2">
          <path d="M394 268 L398 70 Q412 52 428 54 L432 268" />
          <path d="M404 70 h18 v14 h-18 z" />
        </g>

        {/* Bund-side classical domes */}
        <g stroke="#c9a27a" strokeWidth="1.6" strokeOpacity="0.8">
          <path d="M60 268 V212 h40 v56" />
          <path d="M68 212 q12 -22 24 0" />
          <path d="M80 190 v-8" />
          <path d="M104 268 V196 h28 v72 M110 196 v-12 h16 v12" />
          <path d="M440 268 V236 h26 v32" />
        </g>
      </g>

      {/* river */}
      <path d="M0 270 H600" stroke="#ff7a1a" strokeOpacity="0.6" strokeWidth="1" />
      <rect x="0" y="270" width="600" height="50" fill="url(#water)" />
      <g strokeLinecap="round" strokeWidth="2">
        <path d="M174 282 h12 M170 292 h20 M176 302 h8" stroke="#ff7a1a" strokeOpacity="0.7" />
        <path d="M332 284 h14 M328 296 h22 M334 308 h10" stroke="#c6ff3d" strokeOpacity="0.6" />
        <path d="M404 282 h20 M408 294 h12" stroke="#ffa45c" strokeOpacity="0.5" />
        <path d="M270 286 h20 M274 298 h12" stroke="#e8d3b8" strokeOpacity="0.4" />
      </g>
    </svg>
  )
}
