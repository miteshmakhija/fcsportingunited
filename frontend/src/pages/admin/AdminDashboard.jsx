import { Link } from 'react-router-dom'

const tiles = [
  { to: '/admin/enquiries', title: 'Join Enquiries',    desc: 'Review admission requests from parents and arrange trials.' },
  { to: '/admin/players',   title: 'Manage Players',   desc: 'Create kid logins, edit profiles, deactivate accounts.' },
  { to: '/admin/exercises', title: 'Exercises',        desc: 'Build the YouTube exercise library and assign to players.' },
  { to: '/admin/metrics',   title: 'Player Metrics',   desc: 'Record speed, stamina, technique scores and review trends.' },
  { to: '/admin/fees',      title: 'Fee Tracker',      desc: 'Generate monthly fees, mark payments and track dues.' },
]

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <p className="tracking-[0.4em] text-brand-gold text-xs">CONTROL CENTRE</p>
      <h1 className="font-display text-5xl text-brand-green-dark mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {tiles.map((t) => (
          <Link to={t.to} key={t.to}
                className="card hover:bg-brand-green hover:text-white transition group">
            <h3 className="text-2xl text-brand-green-dark group-hover:text-brand-gold">{t.title}</h3>
            <p className="text-sm mt-2 text-gray-600 group-hover:text-white/90">{t.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

