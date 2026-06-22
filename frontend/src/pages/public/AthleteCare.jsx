import { Link } from 'react-router-dom'

const BG = "linear-gradient(rgba(26,32,53,0.45), rgba(26,32,53,0.6)), url('/assets/gallery/action-match.jpg') center/cover"

const CARE = [
  {
    tag: 'MEDICAL',
    title: 'Physiotherapy & Recovery',
    img: '/assets/gallery/coach-group.jpg',
    intro:
      'Healthy players develop fastest. Our physiotherapy and recovery framework keeps athletes available, resilient and progressing — with special care for growing bodies.',
    points: [
      'Pre-season musculoskeletal screening to identify injury risk early',
      'Injury-prevention programmes (mobility, stability & strength)',
      'Structured rehabilitation and graded return-to-play protocols',
      'Post-match recovery: cool-downs, mobility, hydration and rest guidance',
      'Growth-aware loading for adolescent athletes during growth spurts',
    ],
  },
  {
    tag: 'WELLBEING',
    title: 'Nutrition & Wellbeing',
    img: '/assets/gallery/juniors.jpg',
    intro:
      'Performance is built off the pitch too. We guide players and parents on fuelling, recovery and mental wellbeing so every child thrives in a safe, positive environment.',
    points: [
      'Age-appropriate nutrition & hydration guidance for training and match days',
      'Healthy-eating education for players and parents',
      'Sleep & recovery habits that support growth and concentration',
      'Mental wellbeing: confidence, focus and handling competition pressure',
      'A safe, positive environment built on respect and enjoyment',
    ],
  },
]

const PILLARS = [
  ['Prevent', 'Screening and prehab to keep players fit and available.'],
  ['Recover', 'Structured recovery so bodies adapt and grow stronger.'],
  ['Fuel', 'Nutrition and hydration habits that power performance.'],
  ['Thrive', 'Mental wellbeing and a positive, respectful environment.'],
]

export default function AthleteCare() {
  return (
    <div>
      {/* Hero */}
      <section className="text-white py-24 px-4" style={{ background: BG }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="tracking-[0.4em] text-brand-gold text-sm mb-3">SPORTING UNITED · ATHLETE CARE</p>
          <h1 className="font-display text-5xl md:text-6xl mb-4">Athlete Care</h1>
          <p className="text-white/85 max-w-2xl mx-auto text-lg">
            Looking after the whole player — physiotherapy, recovery, nutrition and wellbeing — so young
            footballers stay healthy, happy and able to reach their potential.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="grid sm:grid-cols-4 gap-4 max-w-5xl mx-auto -mt-12 relative z-10 px-4">
        {PILLARS.map(([a, b]) => (
          <div key={a} className="card text-center border-t-4 border-brand-accent">
            <div className="font-display text-2xl text-brand-primary">{a}</div>
            <div className="text-xs text-gray-600 mt-1">{b}</div>
          </div>
        ))}
      </section>

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="tracking-[0.4em] text-brand-accent text-xs">OUR COMMITMENT</p>
        <h2 className="font-display text-4xl text-brand-primary-dark mb-4">Healthy Players, Better Footballers</h2>
        <p className="text-gray-600 leading-relaxed">
          Talent only develops when players are fit, fuelled and confident. Our medical, fitness and coaching
          staff work together to protect each child during their key growing years — building good habits that
          last well beyond the pitch.
        </p>
      </section>

      {/* Physio + Nutrition */}
      <section className="bg-brand-cream py-16 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
          {CARE.map((c) => (
            <div key={c.title} className="card p-0 overflow-hidden flex flex-col">
              <div className="h-52 bg-brand-primary/10"
                   style={{ backgroundImage: `url(${c.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="p-6">
                <p className="tracking-[0.3em] text-brand-gold text-xs">{c.tag}</p>
                <h3 className="font-display text-3xl text-brand-primary-dark">{c.title}</h3>
                <p className="text-sm text-gray-600 mt-2 mb-4">{c.intro}</p>
                <ul className="space-y-2">
                  {c.points.map((pt) => (
                    <li key={pt} className="text-sm text-gray-700 flex gap-2">
                      <span className="text-brand-accent mt-0.5">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-primary text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl mb-3">Care That Builds Champions</h2>
          <p className="text-white/85 max-w-2xl mx-auto mb-8">
            Give your child a programme that develops the athlete and looks after the person.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Link to="/join" className="btn-gold text-lg px-8 py-3">Join the Academy</Link>
            <Link to="/high-performance" className="text-sm text-brand-gold hover:text-white underline underline-offset-4">
              or explore the High Performance Centre
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
