import type { Product } from '../data/products'
import { img } from '../data/img'
import { CatHead } from './Cat'

export function ProductThumb({ p, className = 'h-20 w-20' }: { p: Product; className?: string }) {
  return (
    <span className={`block shrink-0 overflow-hidden rounded-xl bg-espresso-800 ${className}`}>
      {p.model || !p.images[0] ? (
        <span className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle,#4a2f21,#1a0f0a)]"><CatHead className="h-3/4 w-3/4" eyes="happy" /></span>
      ) : (
        <img src={img(p.images[0], 240, 240)} alt="" className="h-full w-full object-cover" />
      )}
    </span>
  )
}
