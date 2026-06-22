import { useEffect, useState } from 'react'
import { metricsApi, playersApi } from '../../api'
import MetricRadar from '../../components/common/MetricRadar'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts'

const emptyMetric = {
  player_id: '', speed_kmh: '', stamina_score: '', dribbling_score: '',
  passing_accuracy: '', shooting_accuracy: '', heading_score: '',
  positioning_score: '', teamwork_score: '', notes: '',
}

export default function PlayerMetricsAdmin() {
  const [players, setPlayers] = useState([])
  const [selected, setSelected] = useState('')
  const [history, setHistory] = useState([])
  const [form, setForm] = useState(emptyMetric)

  useEffect(() => { playersApi.list().then((r) => setPlayers(r.data)) }, [])
  useEffect(() => {
    if (!selected) return
    metricsApi.player(selected).then((r) => setHistory(r.data)).catch(() => setHistory([]))
  }, [selected])

  const submit = async (e) => {
    e.preventDefault()
    if (!selected) return
    const payload = { ...form, player_id: selected }
    Object.keys(payload).forEach((k) => { if (payload[k] === '') payload[k] = null })
    ;['speed_kmh','stamina_score','dribbling_score','passing_accuracy','shooting_accuracy','heading_score','positioning_score','teamwork_score']
      .forEach((k) => { if (payload[k] != null) payload[k] = Number(payload[k]) })
    await metricsApi.create(payload)
    setForm(emptyMetric)
    metricsApi.player(selected).then((r) => setHistory(r.data))
  }

  const latest = history[history.length - 1] || null
  const trendData = history.map((m) => ({
    date: new Date(m.recorded_at).toLocaleDateString(),
    stamina: Number(m.stamina_score) || 0,
    dribbling: Number(m.dribbling_score) || 0,
    passing: Number(m.passing_accuracy) || 0,
    shooting: Number(m.shooting_accuracy) || 0,
  }))

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <p className="tracking-[0.4em] text-brand-gold text-xs">PERFORMANCE LAB</p>
      <h1 className="font-display text-4xl text-brand-green-dark mb-6">Player Metrics</h1>

      <select className="input max-w-md mb-8" value={selected} onChange={(e) => setSelected(e.target.value)}>
        <option value="">Select a player…</option>
        {players.map((p) => <option key={p.id} value={p.id}>{p.full_name}</option>)}
      </select>

      {selected && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-xl text-brand-green-dark mb-4">Latest Snapshot</h3>
            {latest ? <MetricRadar metric={latest} /> : <p className="text-gray-500">No metrics yet.</p>}
          </div>

          <form onSubmit={submit} className="card">
            <h3 className="text-xl text-brand-green-dark mb-4">Record New Session</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                ['speed_kmh', 'Speed (km/h)'],
                ['stamina_score', 'Stamina /100'],
                ['dribbling_score', 'Dribbling /100'],
                ['passing_accuracy', 'Passing %'],
                ['shooting_accuracy', 'Shooting %'],
                ['heading_score', 'Heading /100'],
                ['positioning_score', 'Positioning /100'],
                ['teamwork_score', 'Teamwork /100'],
              ].map(([k, l]) => (
                <div key={k}>
                  <label className="label">{l}</label>
                  <input className="input" type="number" step="0.1" value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
                </div>
              ))}
            </div>
            <label className="label mt-3">Notes</label>
            <textarea className="input mb-3" rows="2" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}></textarea>
            <button className="btn-primary w-full">Save Metric Session</button>
          </form>

          {trendData.length > 1 && (
            <div className="card lg:col-span-2">
              <h3 className="text-xl text-brand-green-dark mb-4">Progress Over Time</h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={trendData}>
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

