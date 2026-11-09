import { Link } from 'react-router'
import { Cat } from '../components/Cat'
import { buttonClass } from '../components/ui'

export function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 pt-24 text-center">
      <p className="font-display text-[22vw] font-black leading-none text-tangerine/90 md:text-[12rem]">404</p>
      <Cat pose="idle" eyes="down" prop="bean" className="-mt-16 w-40" />
      <p className="font-serif text-3xl">This lane is a dead end.</p>
      <p className="text-cream/60">Even Mochi gets lost in Tianzifang sometimes.</p>
      <div className="flex gap-3">
        <Link to="/" className={buttonClass('primary')}>Back home</Link>
        <Link to="/map" className={buttonClass('ghost')}>Open the map</Link>
      </div>
    </section>
  )
}
