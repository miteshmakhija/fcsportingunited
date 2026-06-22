import { useEffect, useState } from 'react'
import { playersApi, metricsApi } from '../../api'
import MetricRadar from '../../components/common/MetricRadar'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts'

export default function MyStats() {
  const [profile, setProfile] = useState(null)
  const [history, setHistory] = useState([])

  useEffect(() => {
    (async () => {
      const p = (await playersApi.me()).data
      setProfile(p)
      try { setHistory((await metricsApi.player(p.id)).data) } catch {}
    })()
  }, [])

  if (!profile) return <div className="p-10 text-center">Loading…</div>

  const latest = history[history.length - 1] || null
  const trend = history.map((m) => ({
    date: new Date(m.recorded_at).toLocaleDateString(),
    stamina: Number(m.stamina_score) || 0,
    dribbling: Number(m.dribbling_score) || 0,
    passing: Number(m.passing_accuracy) || 0,
    shooting: Number(m.shooting_accuracy) || 0,
  }))

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <p className="tracking-[0.4em] text-brand-gold text-xs">MY PERFORMANCE</p>
      <h1 className="font-display text-4xl text-brand-green-dark mb-6">My Stats</h1>

      {!latest ? (
        <p className="text-gray-500">Your coach hasn't recorded any metrics yet. Check back soon!</p>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-xl text-brand-green-dark mb-4">Latest Snapshot</h3>
            <MetricRadar metric={latest} />
          </div>

          {trend.length > 1 && (
            <div className="card">
              <h3 className="text-xl text-brand-green-dark mb-4">Progress Over Time</h3>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={trend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" /><YAxis domain={[0, 100]} />
                  <Tooltip /><Legend />
                  <Line type="monotone" dataKey="stamina" stroke="#0E1B3A" strokeWidth={2} />
                  <Line type="monotone" dataKey="dribbling" stroke="#D4AF37" strokeWidth={2} />
                  <Line type="monotone" dataKey="passing" stroke="#1E3270" strokeWidth={2} />
                  <Line type="monotone" dataKey="shooting" stroke="#C8102E" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

