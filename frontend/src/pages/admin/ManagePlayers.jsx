import { useEffect, useState } from 'react'
import { playersApi } from '../../api'

const empty = {
  email: '', password: '', full_name: '', date_of_birth: '',
  position: 'MF', jersey_number: '', parent_name: '', parent_phone: '',
  age_group: 'U13',
}

export default function ManagePlayers() {
  const [players, setPlayers] = useState([])
  const [form, setForm] = useState(empty)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const load = () => playersApi.list().then((r) => setPlayers(r.data))
  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const payload = {
        ...form,
        jersey_number: form.jersey_number ? Number(form.jersey_number) : null,
        date_of_birth: form.date_of_birth || null,
      }
      await playersApi.create(payload)
      setForm(empty); setShowForm(false); load()
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create player')
    } finally { setLoading(false) }
  }

  const deactivate = async (id) => {
    if (!confirm('Deactivate this player?')) return
    await playersApi.delete(id); load()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="tracking-[0.4em] text-brand-gold text-xs">SQUAD</p>
          <h1 className="font-display text-4xl text-brand-green-dark">Manage Players</h1>
        </div>
        <button className="btn-primary" onClick={() => setShowForm((s) => !s)}>
          {showForm ? 'Close' : '+ New Player'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="card mb-8 grid md:grid-cols-3 gap-4">
          <div><label className="label">Full Name *</label><input className="input" required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></div>
          <div><label className="label">Email (login) *</label><input className="input" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <div><label className="label">Password *</label><input className="input" type="text" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
          <div><label className="label">Date of Birth</label><input className="input" type="date" value={form.date_of_birth} onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })} /></div>
          <div>
            <label className="label">Position</label>
            <select className="input" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })}>
              {['GK', 'DF', 'MF', 'FW'].map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Age Group</label>
            <select className="input" value={form.age_group} onChange={(e) => setForm({ ...form, age_group: e.target.value })}>
              {['U10', 'U13', 'U16', 'U18', 'U21'].map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div><label className="label">Jersey #</label><input className="input" type="number" value={form.jersey_number} onChange={(e) => setForm({ ...form, jersey_number: e.target.value })} /></div>
          <div><label className="label">Parent Name</label><input className="input" value={form.parent_name} onChange={(e) => setForm({ ...form, parent_name: e.target.value })} /></div>
          <div><label className="label">Parent Phone</label><input className="input" value={form.parent_phone} onChange={(e) => setForm({ ...form, parent_phone: e.target.value })} /></div>
          {error && <p className="text-red-600 md:col-span-3">{error}</p>}
          <div className="md:col-span-3"><button className="btn-primary" disabled={loading}>{loading ? 'Saving…' : 'Create Player'}</button></div>
        </form>
      )}

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-brand-green-dark border-b">
            <tr>
              <th className="p-2">Name</th><th>Age Group</th><th>Position</th>
              <th>Jersey</th><th>Parent</th><th>Joined</th><th></th>
            </tr>
          </thead>
          <tbody>
            {players.map((p) => (
              <tr key={p.id} className="border-b last:border-0">
                <td className="p-2 font-semibold">{p.full_name}</td>
                <td>{p.age_group}</td>
                <td>{p.position}</td>
                <td>{p.jersey_number ?? '-'}</td>
                <td>{p.parent_name ?? '-'}</td>
                <td>{p.joined_date}</td>
                <td><button onClick={() => deactivate(p.id)} className="text-red-600 text-xs">Deactivate</button></td>
              </tr>
            ))}
            {players.length === 0 && <tr><td colSpan="7" className="p-4 text-gray-500 text-center">No players yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

