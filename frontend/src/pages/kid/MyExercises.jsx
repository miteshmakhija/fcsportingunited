import { useEffect, useState } from 'react'
import { exercisesApi, playersApi, progressApi } from '../../api'

function getYoutubeEmbed(url) {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) return `https://www.youtube-nocookie.com/embed/${u.pathname.slice(1)}`
    if (u.searchParams.get('v')) return `https://www.youtube-nocookie.com/embed/${u.searchParams.get('v')}`
  } catch {}
  return url
}

export default function MyExercises() {
  const [profile, setProfile] = useState(null)
  const [assignments, setAssignments] = useState([])
  const [tab, setTab] = useState('pending')

  const load = async (p) => {
    const data = (await exercisesApi.assigned((p ?? profile).id)).data
    setAssignments(data)
  }

  useEffect(() => {
    (async () => {
      const p = (await playersApi.me()).data
      setProfile(p); load(p)
    })()
  }, [])

  const complete = async (assignmentId) => {
    await progressApi.complete(assignmentId, { rating: 5 })
    load()
  }

  if (!profile) return <div className="p-10 text-center">Loading…</div>

  const filtered = assignments.filter((a) => (tab === 'pending' ? !a.completed : a.completed))

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <p className="tracking-[0.4em] text-brand-gold text-xs">TRAINING</p>
      <h1 className="font-display text-4xl text-brand-green-dark mb-6">My Exercises</h1>

      <div className="flex border-b mb-6">
        {['pending', 'completed'].map((t) => (
          <button key={t} onClick={() => setTab(t)}
                  className={`px-4 py-2 font-semibold uppercase text-sm tracking-widest ${
                    tab === t ? 'border-b-2 border-brand-green text-brand-green' : 'text-gray-400'
                  }`}>
            {t} ({assignments.filter((a) => (t === 'pending' ? !a.completed : a.completed)).length})
          </button>
        ))}
      </div>

      {filtered.length === 0 && <p className="text-gray-500">No {tab} exercises.</p>}

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((a) => (
          <div key={a.id} className="card">
            <div className="aspect-video mb-3 bg-black rounded overflow-hidden">
              <iframe className="w-full h-full" src={getYoutubeEmbed(a.exercise.youtube_url)}
                      title={a.exercise.title} allowFullScreen
                      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" />
            </div>
            <h3 className="text-xl text-brand-green-dark">{a.exercise.title}</h3>
            <div className="flex gap-2 mt-2">
              <span className="badge bg-brand-green/10 text-brand-green">{a.exercise.category}</span>
              <span className="badge bg-brand-gold/20 text-brand-green-dark capitalize">{a.exercise.difficulty}</span>
              {a.due_date && <span className="badge bg-orange-100 text-orange-700">Due {a.due_date}</span>}
            </div>
            <p className="text-sm text-gray-600 mt-3">{a.exercise.description}</p>
            {!a.completed ? (
              <button onClick={() => complete(a.id)} className="btn-primary mt-4 w-full">Mark as Complete ✓</button>
            ) : (
              <p className="mt-4 text-green-700 font-semibold text-center">✓ Completed</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

