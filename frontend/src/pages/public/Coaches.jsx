import { useEffect, useState } from 'react'
import { coachesApi } from '../../api'
import { HEAD_COACH, COACHES } from '../../data/academy'

function CoachPhoto({ name, photo_url, className = '' }) {
  if (!photo_url) {
    return (
      <div className={`bg-brand-green/5 flex items-center justify-center ${className}`}>
        <span className="text-brand-green text-7xl font-display">{name[0]}</span>
      </div>
    )
  }
  return (
    <div className={`bg-brand-green/5 overflow-hidden ${className}`}>
      <img src={photo_url} alt={name} className="w-full h-full object-cover object-top" />
    </div>
  )
}

function Certs({ items }) {
  return (
    <div className="mt-3 flex flex-wrap gap-1">
      {items.map((cert) => (
        <span key={cert} className="badge bg-brand-green/10 text-brand-green">{cert}</span>
      ))}
    </div>
  )
}

export default function Coaches() {
  const [apiCoaches, setApiCoaches] = useState([])
  useEffect(() => { coachesApi.list().then((r) => setApiCoaches(r.data)).catch(() => {}) }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <p className="tracking-[0.4em] text-brand-gold text-xs">OUR TEAM</p>
      <h1 className="font-display text-5xl text-brand-green-dark mb-8">Our Coaches</h1>

      {/* Featured head coach */}
      <div className="card grid md:grid-cols-3 gap-6 mb-10 border-t-4 border-brand-gold">
        <CoachPhoto name={HEAD_COACH.name} photo_url={HEAD_COACH.photo_url}
                    className="md:col-span-1 w-full aspect-[4/5] rounded-lg" />
        <div className="md:col-span-2 flex flex-col justify-center">
          <h2 className="font-display text-4xl text-brand-green-dark">{HEAD_COACH.name}</h2>
          <p className="text-brand-gold text-sm tracking-widest mt-1">{HEAD_COACH.role_title}</p>
          <Certs items={HEAD_COACH.certifications} />
          <p className="text-gray-600 mt-4 leading-relaxed">{HEAD_COACH.bio}</p>
        </div>
      </div>

      {/* Coaching team */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {COACHES.map((c) => (
          <div key={c.name} className="card">
            <CoachPhoto name={c.name} photo_url={c.photo_url}
                        className="w-full aspect-[4/5] rounded-lg mb-4" />
            <h3 className="text-2xl text-brand-green-dark">{c.name}</h3>
            <p className="text-brand-gold text-sm tracking-wider">{c.role_title}</p>
            <Certs items={c.certifications} />
          </div>
        ))}

        {/* Any coaches added via the admin panel */}
        {apiCoaches.map((c) => (
          <div key={c.id} className="card">
            <CoachPhoto name={c.name} photo_url={c.photo_url}
                        className="w-full aspect-[4/5] rounded-lg mb-4" />
            <h3 className="text-2xl text-brand-green-dark">{c.name}</h3>
            <p className="text-brand-gold text-sm tracking-wider">{c.role_title}</p>
            {c.bio && <p className="text-sm text-gray-600 mt-3">{c.bio}</p>}
            {Array.isArray(c.certifications) && c.certifications.length > 0 && <Certs items={c.certifications} />}
          </div>
        ))}
      </div>
    </div>
  )
}
