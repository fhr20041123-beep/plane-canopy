import { CatHead } from './Cat'

export const avatarPresets = [
  { bg: 'bg-tangerine', eyes: 'open' as const },
  { bg: 'bg-lime', eyes: 'happy' as const },
  { bg: 'bg-latte', eyes: 'wink' as const },
  { bg: 'bg-cream', eyes: 'down' as const },
  { bg: 'bg-[#8fb8de]', eyes: 'open' as const },
  { bg: 'bg-[#e9a99a]', eyes: 'happy' as const },
]

export function Avatar({ index = 0, className = 'h-10 w-10' }: { index?: number; className?: string }) {
  const p = avatarPresets[index % avatarPresets.length]
  return (
    <span className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ${p.bg} ${className}`}>
      <CatHead eyes={p.eyes} className="mt-[18%] h-[92%] w-[92%]" />
    </span>
  )
}
