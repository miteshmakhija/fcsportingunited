import { Link } from 'react-router-dom'

const BG = "linear-gradient(rgba(26,32,53,0.45), rgba(26,32,53,0.6)), url('/assets/gallery/matchday.jpg') center/cover"

const PILLARS = [
  {
    tag: 'ANALYSIS',
    title: 'Match & Performance Analysis',
    intro:
      'Every competitive fixture is captured and broken down using a structured, evidence-based workflow — the same methods used in professional academies.',
    points: [
      ['Video coding & event tagging', 'Matches are filmed and tagged action-by-action (passes, duels, transitions, set-pieces) to turn footage into searchable data.'],
      ['Possession & expected-goals (xG) models', 'We quantify chance quality and build-up patterns rather than relying on the scoreline alone.'],
      ['Opposition & set-piece scouting', 'Pre-match reports profile the opponent’s shape, threats and routines so players prepare with intent.'],
      ['Individual clip reviews', 'Each player receives personalised highlight & learning reels in weekly feedback sessions.'],
    ],
  },
  {
    tag: 'TRACKING',
    title: 'Player Movement & Physical Output',
    intro:
      'We measure how players move so training load matches match demands — protecting young athletes while developing them.',
    points: [
      ['GPS & positional tracking', 'Distance covered, sprint counts, high-speed running and accelerations are logged per session and game.'],
      ['Heat maps & positional discipline', 'Movement maps show whether players hold their role, find space and support play effectively.'],
      ['Work-rate & intensity zones', 'Output is split into intensity bands to balance volume, recovery and peak efforts across the week.'],
      ['Load monitoring', 'Acute-to-chronic workload is tracked to flag spikes and reduce avoidable injury risk.'],
    ],
  },
  {
    tag: 'PROFILING',
    title: 'Strength & Weakness Profiling',
    intro:
      'Development is individual. Each player is benchmarked across technical, tactical, physical and psychological domains and given a clear plan.',
    points: [
      ['Periodic testing batteries', 'Speed, agility, endurance and ball-skill tests are repeated each term to measure real progress.'],
      ['Four-corner player profile', 'Technical, tactical, physical and mental attributes are scored to reveal strengths and priority areas.'],
      ['Individual Development Plans (IDPs)', 'Targeted goals and drills are assigned to address each player’s specific weaknesses.'],
      ['Benchmarking vs age standards', 'Players are compared to age-group norms to set realistic, ambitious targets.'],
    ],
  },
]

function StatBar() {
  return (
    <div className="grid sm:grid-cols-4 gap-4 max-w-5xl mx-auto -mt-12 relative z-10 px-4">
      {[
        ['Data-led', 'training & selection'],
        ['Individual', 'development plans'],
        ['Injury-aware', 'load management'],
        ['Whole-athlete', 'medical & nutrition'],
      ].map(([a, b]) => (
        <div key={b} className="card text-center border-t-4 border-brand-accent">
          <div className="font-display text-2xl text-brand-primary">{a}</div>
          <div className="text-xs text-gray-600 mt-1">{b}</div>
        </div>
      ))}
    </div>
  )
}

export default function HighPerformance() {
  return (
    <div>
      {/* Hero */}
      <section className="text-white py-24 px-4" style={{ background: BG }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="tracking-[0.4em] text-brand-gold text-sm mb-3">SPORTING UNITED · HPC</p>
          <h1 className="font-display text-5xl md:text-6xl mb-4">High Performance Centre</h1>
          <p className="text-white/85 max-w-2xl mx-auto text-lg">
            Where talent meets science. We combine professional match analysis, movement tracking and
            athlete care to develop complete, healthy footballers.
          </p>
        </div>
      </section>

      <StatBar />

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="tracking-[0.4em] text-brand-accent text-xs">OUR APPROACH</p>
        <h2 className="font-display text-4xl text-brand-primary-dark mb-4">A Professional Performance Model</h2>
        <p className="text-gray-600 leading-relaxed">
          Our High Performance Centre brings the methods of elite football to youth development. Coaches,
          analysts and medical staff work from shared data to make better decisions — turning observation into
          measurable, individual progress for every player on a clear pathway to district, state and national football.
        </p>
      </section>

      {/* Analysis pillars */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-14">
          {PILLARS.map((p) => (
            <div key={p.title} className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <p className="tracking-[0.4em] text-brand-gold text-xs">{p.tag}</p>
                <h3 className="font-display text-3xl text-brand-primary-dark">{p.title}</h3>
                <p className="text-gray-600 mt-3 text-sm leading-relaxed">{p.intro}</p>
              </div>
              <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
                {p.points.map(([h, b]) => (
                  <div key={h} className="card">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-brand-accent">▮</span>
                      <h4 className="text-lg text-brand-primary-dark">{h}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Athlete care link-out */}
      <section className="bg-brand-cream py-16 px-4">
        <div className="max-w-5xl mx-auto card flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="flex-1">
            <p className="tracking-[0.4em] text-brand-accent text-xs">ATHLETE CARE</p>
            <h2 className="font-display text-3xl text-brand-primary-dark">Looking After the Whole Player</h2>
            <p className="text-sm text-gray-600 mt-2">
              Performance is only half the story. Explore our physiotherapy, recovery, nutrition and wellbeing
              programmes that keep young athletes healthy and thriving.
            </p>
          </div>
          <Link to="/athlete-care" className="btn-primary whitespace-nowrap">Explore Athlete Care</Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-primary text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl mb-3">Train the Smart Way</h2>
          <p className="text-white/85 max-w-2xl mx-auto mb-8">
            Give your child access to professional-grade coaching, analysis and athlete care.
          </p>
          <Link to="/join" className="btn-gold text-lg px-8 py-3">Join the Academy</Link>
        </div>
      </section>
    </div>
  )
}
