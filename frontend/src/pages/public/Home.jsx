import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroSlider from '../../components/common/HeroSlider'
import { coachesApi } from '../../api'
import { PROGRAMS, GALLERY, SELECTIONS } from '../../data/academy'

const BG_PITCH = "url('/assets/gallery/academy-group.jpg')"
const BG_TRAIN = "url('/assets/gallery/matchday.jpg')"
const BG_KIDS  = "url('/assets/gallery/champions-tinytots.jpg')"
const BG_TEAM  = "url('/assets/gallery/team-champions-night.jpg')"

export default function Home() {
  const [coaches, setCoaches] = useState([])

  useEffect(() => {
    coachesApi.list().then((r) => setCoaches(r.data.slice(0, 3))).catch(() => {})
  }, [])

  const slides = [
    {
      eyebrow: 'SPORTING UNITED ACADEMY',
      title: 'Building Tomorrow’s Champions',
      subtitle: 'World-class youth football development, rooted in discipline, joy and ambition.',
      bg: BG_PITCH,
      cta: { label: 'Join the Academy', href: '/join' },
    },
    {
      eyebrow: 'COACHING PHILOSOPHY',
      title: 'Total Football. Total Character.',
      subtitle: 'We develop technical mastery, tactical intelligence and the values to thrive on and off the pitch.',
      bg: BG_TRAIN,
      cta: { label: 'Meet Our Coaches', href: '/coaches' },
    },
    {
      eyebrow: 'HIGH PERFORMANCE CENTRE',
      title: 'Where Talent Meets Science',
      subtitle: 'Professional match analysis, movement tracking and complete athlete care.',
      bg: BG_KIDS,
      cta: { label: 'Explore the HPC', href: '/high-performance' },
    },
    {
      eyebrow: 'OUR MISSION',
      title: 'Road to the I-League by 2031',
      subtitle: 'A six-year roadmap to launch a professional senior team and put our academy on India’s footballing map.',
      bg: BG_TEAM,
      pos: 'center 80%',
      cta: { label: 'See the Mission', href: '/i-league-mission' },
    },
  ]

  return (
    <div>
      <HeroSlider slides={slides} />

      {/* Philosophy */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-6">
        {[
          { title: 'TECHNIQUE', body: 'Daily ball-mastery, 1v1s and possession drills. Skill before system.' },
          { title: 'INTELLIGENCE', body: 'Decision-making, scanning, positional play — the football brain.' },
          { title: 'CHARACTER', body: 'Discipline, respect, and resilience — habits of high-performers.' },
        ].map((p) => (
          <div key={p.title} className="card border-t-4 border-brand-gold">
            <h3 className="text-2xl text-brand-green">{p.title}</h3>
            <p className="text-sm text-gray-600 mt-3">{p.body}</p>
          </div>
        ))}
      </section>

      {/* Programs / Age groups */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="tracking-[0.4em] text-brand-gold text-xs">FOR EVERY AGE</p>
              <h2 className="font-display text-4xl text-brand-green-dark">Our Programs</h2>
            </div>
            <Link to="/join" className="btn-gold">Enrol Your Child</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROGRAMS.map((p) => (
              <div key={p.name} className="card flex flex-col border-t-4 border-brand-gold">
                <div className="text-brand-gold font-display text-2xl">{p.ages}</div>
                <h3 className="text-2xl text-brand-green-dark">{p.name}</h3>
                <p className="text-sm text-gray-600 mt-2 flex-1">{p.blurb}</p>
                <Link to="/join" className="text-brand-primary text-sm font-semibold mt-4 hover:text-brand-gold">
                  Join {p.name} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent selections */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <p className="tracking-[0.4em] text-brand-gold text-xs">PROUD MOMENTS</p>
          <h2 className="font-display text-4xl text-brand-green-dark">Our Players, Selected</h2>
          <p className="text-gray-600 mt-2">From our pitches to district, state & national camps.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {SELECTIONS.map((s) => (
            <div key={s.name + s.honour} className="card p-0 overflow-hidden">
              <div className="aspect-[3/4] bg-brand-green/10"
                   style={{ backgroundImage: `url(${s.img})`, backgroundSize: 'cover', backgroundPosition: 'center top' }} />
              <div className="p-4">
                <h3 className="text-lg text-brand-green-dark leading-tight">{s.name}</h3>
                <p className="text-xs text-brand-gold font-semibold tracking-wide mt-1">{s.honour}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* I-League CTA */}
      <section className="bg-brand-green text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="tracking-[0.4em] text-brand-gold text-sm mb-2">2026 — 2031</p>
          <h2 className="font-display text-5xl mb-4">THE ROAD TO I-LEAGUE</h2>
          <p className="text-white/85 max-w-3xl mx-auto mb-8">
            Sporting United Academy is on a six-year mission to launch a senior team in India's I-League.
            Every kid we develop is part of this journey.
          </p>
          <Link to="/i-league-mission" className="btn-gold">Explore Our 6-Year Roadmap</Link>
        </div>
      </section>

      {/* Coaches preview */}
      {coaches.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="tracking-[0.4em] text-brand-gold text-xs">OUR TEAM</p>
              <h2 className="font-display text-4xl text-brand-green-dark">Meet the Coaches</h2>
            </div>
            <Link to="/coaches" className="btn-outline">View All</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {coaches.map((c) => (
              <div key={c.id} className="card">
                <div className="w-full aspect-[4/5] rounded-lg bg-brand-green/10 mb-4 flex items-center justify-center text-brand-green text-5xl font-display"
                     style={c.photo_url ? { backgroundImage: `url(${c.photo_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
                  {!c.photo_url && c.name?.[0]}
                </div>
                <h3 className="text-2xl text-brand-green-dark">{c.name}</h3>
                <p className="text-brand-gold text-sm tracking-wider">{c.role_title}</p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">{c.bio}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className="bg-brand-cream py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="tracking-[0.4em] text-brand-gold text-xs">LIFE AT THE ACADEMY</p>
            <h2 className="font-display text-4xl text-brand-green-dark">Our Academy in Action</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY.map((g) => (
              <figure key={g.src} className="relative rounded-xl overflow-hidden group shadow-md">
                <img src={g.src} alt={g.caption} loading="lazy"
                     className="w-full h-56 object-cover transition duration-500 group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-ink/80 to-transparent text-white text-sm p-3">
                  {g.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Final Join CTA */}
      <section className="bg-brand-gold text-brand-ink py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-5xl mb-3">READY TO BEGIN?</h2>
          <p className="text-brand-ink/80 max-w-2xl mx-auto mb-8">
            Book a free trial session and let your child experience training with Sporting United Academy.
          </p>
          <Link to="/join" className="btn-primary text-lg px-8 py-3">Join the Academy</Link>
        </div>
      </section>
    </div>
  )
}

