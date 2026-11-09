import { CafeMap } from '../components/CafeMap'
import { PageHead } from '../components/PageHead'
import { Accent } from '../components/ui'
import { useStore } from '../lib/store'
import { cafes } from '../data/cafes'

export function MapPage() {
  const { stamps, savedCafes } = useStore()
  return (
    <>
      <PageHead
        crumbs={[['Home', '/'], ['Art map']]}
        kicker="The art map · 咖啡艺术地图"
        cn="地图"
        title={<>Ten cafés, <br /> one <Accent className="text-tangerine">river.</Accent></>}
        intro="Search by name, drink or district. Filter by mood. Pin a node to preview it, then open the café for menus, Mochi tips and your passport stamp."
        aside={
          <div className="grid grid-cols-3 gap-3">
            {[[cafes.length, 'Cafés'], [stamps.length, 'Stamped'], [savedCafes.length, 'Saved']].map(([n, l]) => (
              <div key={l} className="glass rounded-2xl p-4 text-center">
                <p className="font-display text-3xl text-tangerine">{n}</p>
                <p className="mt-1 font-display text-[9px] uppercase tracking-[0.2em] text-cream/50">{l}</p>
              </div>
            ))}
          </div>
        }
      />
      <section className="pb-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <CafeMap variant="full" />
        </div>
      </section>
    </>
  )
}
