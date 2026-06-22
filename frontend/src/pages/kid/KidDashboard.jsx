import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { playersApi, exercisesApi, metricsApi } from '../../api'

export default function KidDashboard() {
  const [profile, setProfile] = useState(null)
  const [assignments, setAssignments] = useState([])
  const [latest, setLatest] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const p = (await playersApi.me()).data
        setProfile(p)
        const a = (await exercisesApi.assigned(p.id)).data
        setAssignments(a)
        try { setLatest((await metricsApi.latest(p.id)).data) } catch {}
      } catch (e) { console.error(e) }
    })()
  }, [])

  if (!profile) return <div className="p-10 text-center">Loading…</div>

  const pending = assignments.filter((a) => !a.completed).length
  const done = assignments.length - pending

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <p className="tracking-[0.4em] text-brand-gold text-xs">DASHBOARD</p>
      <h1 className="font-display text-5xl text-brand-green-dark mb-1">Welcome, {profile.full_name.split(' ')[0]}!</h1>
      <p className="text-gray-500 mb-8">{profile.age_group} · {profile.position}</p>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="card border-l-4 border-brand-green"><p className="text-xs uppercase text-gray-500">Pending Drills</p><p className="font-display text-4xl text-brand-green">{pending}</p></div>
        <div className="card border-l-4 border-brand-gold"><p className="text-xs uppercase text-gray-500">Completed</p><p className="font-display text-4xl text-brand-gold">{done}</p></div>
        <div className="card border-l-4 border-brand-green-dark"><p className="text-xs uppercase text-gray-500">Latest Stamina</p><p className="font-display text-4xl text-brand-green-dark">{latest ? Number(latest.stamina_score).toFixed(0) : '—'}</p></div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Link to="/dashboard/exercises" className="card hover:bg-brand-green hover:text-white transition group">
          <h3 className="text-2xl text-brand-green-dark group-hover:text-brand-gold">📺 My Exercises</h3>
          <p className="text-sm mt-2 group-hover:text-white/90">Watch your assigned videos and mark them complete.</p>
        </Link>
        <Link to="/dashboard/stats" className="card hover:bg-brand-green hover:text-white transition group">
          <h3 className="text-2xl text-brand-green-dark group-hover:text-brand-gold">📈 My Stats</h3>
          <p className="text-sm mt-2 group-hover:text-white/90">See your performance metrics and progress.</p>
        </Link>
      </div>
    </div>
  )
}

