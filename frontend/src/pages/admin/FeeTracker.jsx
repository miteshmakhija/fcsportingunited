import { useEffect, useState } from 'react'
import { feesApi, playersApi } from '../../api'

const emptyFee = { player_id: '', amount: '', period_label: '', due_date: '', payment_method: '', notes: '' }

export default function FeeTracker() {
  const [fees, setFees] = useState([])
  const [players, setPlayers] = useState([])
  const [summary, setSummary] = useState({ total_collected: 0, total_pending: 0, total_overdue: 0 })
  const [form, setForm] = useState(emptyFee)
  const [filter, setFilter] = useState('')

  const load = async () => {
    setFees((await feesApi.list(filter ? { status: filter } : {})).data)
    setSummary((await feesApi.summary()).data)
  }
  useEffect(() => { playersApi.list().then((r) => setPlayers(r.data)) }, [])
  useEffect(() => { load() }, [filter])

  const submit = async (e) => {
    e.preventDefault()
    await feesApi.create({
      ...form,
      amount: Number(form.amount),
      due_date: form.due_date || null,
    })
    setForm(emptyFee); load()
  }

  const markPaid = async (id) => {
    await feesApi.update(id, { status: 'paid', paid_date: new Date().toISOString().slice(0, 10) })
    load()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <p className="tracking-[0.4em] text-brand-gold text-xs">FINANCE</p>
      <h1 className="font-display text-4xl text-brand-green-dark mb-8">Fee Tracker</h1>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="card border-l-4 border-green-600"><p className="text-xs uppercase text-gray-500">Collected</p><p className="font-display text-3xl text-green-700">₹{summary.total_collected.toLocaleString()}</p></div>
        <div className="card border-l-4 border-yellow-500"><p className="text-xs uppercase text-gray-500">Pending</p><p className="font-display text-3xl text-yellow-700">₹{summary.total_pending.toLocaleString()}</p></div>
        <div className="card border-l-4 border-red-500"><p className="text-xs uppercase text-gray-500">Overdue</p><p className="font-display text-3xl text-red-700">₹{summary.total_overdue.toLocaleString()}</p></div>
      </div>

      <form onSubmit={submit} className="card grid md:grid-cols-3 gap-4 mb-8">
        <div>
          <label className="label">Player</label>
          <select className="input" required value={form.player_id} onChange={(e) => setForm({ ...form, player_id: e.target.value })}>
            <option value="">Select…</option>
            {players.map((p) => <option key={p.id} value={p.id}>{p.full_name}</option>)}
          </select>
        </div>
        <div><label className="label">Amount (₹)</label><input className="input" type="number" required value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} /></div>
        <div><label className="label">Period</label><input className="input" required placeholder="Jan 2026" value={form.period_label} onChange={(e) => setForm({ ...form, period_label: e.target.value })} /></div>
        <div><label className="label">Due Date</label><input className="input" type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} /></div>
        <div><label className="label">Method</label><input className="input" placeholder="Cash / UPI / Bank" value={form.payment_method} onChange={(e) => setForm({ ...form, payment_method: e.target.value })} /></div>
        <div><label className="label">Notes</label><input className="input" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
        <div className="md:col-span-3"><button className="btn-primary">Create Fee Record</button></div>
      </form>

      <div className="card overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl text-brand-green-dark">Fee Records</h3>
          <select className="input max-w-xs" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        <table className="w-full text-sm">
          <thead className="text-left text-brand-green-dark border-b">
            <tr><th className="p-2">Player</th><th>Period</th><th>Amount</th><th>Due</th><th>Status</th><th>Method</th><th></th></tr>
          </thead>
          <tbody>
            {fees.map((f) => {
              const player = players.find((p) => p.id === f.player_id)
              return (
                <tr key={f.id} className="border-b last:border-0">
                  <td className="p-2 font-semibold">{player?.full_name ?? '—'}</td>
                  <td>{f.period_label}</td>
                  <td>₹{Number(f.amount).toLocaleString()}</td>
                  <td>{f.due_date}</td>
                  <td>
                    <span className={`badge ${
                      f.status === 'paid' ? 'bg-green-100 text-green-700' :
                      f.status === 'overdue' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>{f.status}</span>
                  </td>
                  <td>{f.payment_method ?? '—'}</td>
                  <td>{f.status !== 'paid' && <button onClick={() => markPaid(f.id)} className="text-brand-green text-xs font-bold">Mark Paid</button>}</td>
                </tr>
              )
            })}
            {fees.length === 0 && <tr><td colSpan="7" className="p-4 text-center text-gray-500">No fee records.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

