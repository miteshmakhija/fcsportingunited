import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { achievementsApi } from '../../api'
import { SUCCESS_STATS, SELECTIONS, ACHIEVEMENT_PHOTOS } from '../../data/academy'

const BG = "linear-gradient(rgba(26,32,53,0.45), rgba(26,32,53,0.6)), url('/assets/gallery/academy-group.jpg') center/cover"

export default function Achievements() {
  const [items, setItems] = useState([])
  useEffect(() => { achievementsApi.list().then((r) => setItems(r.data)).catch(() => {}) }, [])

  return (
    <div>
      {/* Hero */}
      <section className="text-white py-20 px-4" style={{ background: BG }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="tracking-[0.4em] text-brand-gold text-sm mb-3">HONOURS</p>
          <h1 className="font-display text-5xl md:text-6xl mb-4">A Track Record of Success</h1>
          <p className="text-white/85 max-w-2xl mx-auto text-lg">
            From district grounds to national camps — our players keep rising. And we're only getting started.
          </p>
        </div>
      </section>

      {/* Headline success stats */}
      <section className="grid sm:grid-cols-3 gap-4 max-w-5xl mx-auto -mt-14 relative z-10 px-4">
        {SUCCESS_STATS.map((s) => (
          <div key={s.label} className="card text-center border-t-4 border-brand-gold">
            <div className="font-display text-5xl text-brand-primary">{s.value}</div>
            <div className="text-brand-primary-dark font-semibold mt-1">{s.label}</div>
            <div className="text-xs text-gray-500 mt-1">{s.sub}</div>
          </div>
        ))}
      </section>

      <section className="max-w-4xl mx-auto px-4 py-14 text-center">
        <p className="text-gray-600 leading-relaxed">
          Sporting United Academy has already produced <strong className="text-brand-primary">an international player</strong> and
          <strong className="text-brand-primary"> 21 national-level players</strong>. Building on that foundation, our mission is
          to develop <strong className="text-brand-primary">51 future international footballers</strong> from this academy.
        </p>
      </section>

      {/* Featured selections */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="tracking-[0.4em] text-brand-gold text-xs">RECENT SELECTIONS</p>
            <h2 className="font-display text-4xl text-brand-primary-dark">Our Players, Representing Higher</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {SELECTIONS.map((s) => (
              <div key={s.name + s.honour} className="card p-0 overflow-hidden">
                <div className="aspect-[3/4] bg-brand-primary/10"
                     style={{ backgroundImage: `url(${s.img})`, backgroundSize: 'cover', backgroundPosition: 'center top' }} />
                <div className="p-4">
                  <h3 className="text-lg text-brand-primary-dark leading-tight">{s.name}</h3>
                  <p className="text-xs text-brand-gold font-semibold tracking-wide mt-1">{s.honour}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admin-entered milestones (if any) */}
      {items.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-14">
          <div className="text-center mb-10">
            <p className="tracking-[0.4em] text-brand-gold text-xs">MILESTONES</p>
            <h2 className="font-display text-4xl text-brand-primary-dark">Trophies & Honours</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((a) => (
              <div key={a.id} className="card border-l-4 border-brand-gold">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl text-brand-primary-dark">{a.title}</h3>
                  {a.date_achieved && <span className="text-xs text-gray-500">{new Date(a.date_achieved).toLocaleDateString()}</span>}
                </div>
                {a.category && <span className="badge bg-brand-gold/20 text-brand-primary-dark mt-2">{a.category}</span>}
                <p className="text-sm text-gray-600 mt-3">{a.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Full photo wall */}
      <section className="bg-brand-cream py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="tracking-[0.4em] text-brand-gold text-xs">THE JOURNEY</p>
            <h2 className="font-display text-4xl text-brand-primary-dark">Moments From the Academy</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {ACHIEVEMENT_PHOTOS.map((src, i) => (
              <div key={src} className="rounded-lg overflow-hidden shadow-md bg-brand-primary/10">
                <img
                  src={src}
                  alt={`Sporting United Academy — moment ${i + 1}`}
                  loading="lazy"
                  className="w-full h-48 object-cover hover:scale-105 transition duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-primary text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl mb-3">Be Our Next Success Story</h2>
          <p className="text-white/85 max-w-2xl mx-auto mb-8">
            Every international and national player started with a first session. Yours could be next.
          </p>
          <Link to="/join" className="btn-gold text-lg px-8 py-3">Join the Academy</Link>
        </div>
      </section>
    </div>
  )
}
