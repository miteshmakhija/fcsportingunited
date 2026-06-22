import { useEffect, useState } from 'react'
import { enquiriesApi } from '../../api'

const STATUSES = ['new', 'contacted', 'enrolled', 'closed']
const statusCls = {
  new: 'bg-brand-gold text-brand-ink',
  contacted: 'bg-brand-accent text-brand-ink',
  enrolled: 'bg-green-500 text-white',
  closed: 'bg-gray-300 text-gray-700',
}

export default function Enquiries() {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    enquiriesApi.list(filter ? { status: filter } : undefined)
      .then((r) => setItems(r.data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }

  useEffect(load, [filter])

  const changeStatus = async (id, status) => {
    await enquiriesApi.updateStatus(id, status)
    load()
  }

  const remove = async (id) => {
    if (!confirm('Delete this enquiry?')) return
    await enquiriesApi.delete(id)
    load()
  }

  const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <p className="tracking-[0.4em] text-brand-gold text-xs">ADMISSIONS</p>
      <h1 className="font-display text-5xl text-brand-primary-dark mb-6">Join Enquiries</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setFilter('')}
                className={`badge px-3 py-1 ${filter === '' ? 'bg-brand-primary text-white' : 'bg-white border'}`}>
          All
        </button>
        {STATUSES.map((s) => (
          <button key={s} onClick={() => setFilter(s)}
                  className={`badge px-3 py-1 capitalize ${filter === s ? 'bg-brand-primary text-white' : 'bg-white border'}`}>
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : items.length === 0 ? (
        <div className="card text-center text-gray-500 py-12">No enquiries yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl overflow-hidden shadow-md text-sm">
            <thead className="bg-brand-primary text-white text-left">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Child</th>
                <th className="px-4 py-3">Parent</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Program</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((e) => (
                <tr key={e.id} className="border-t border-black/5 align-top">
                  <td className="px-4 py-3 whitespace-nowrap text-gray-500">{fmt(e.created_at)}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-brand-primary-dark">{e.child_name}</div>
                    {e.child_age && <div className="text-xs text-gray-500">Age {e.child_age}</div>}
                  </td>
                  <td className="px-4 py-3">{e.parent_name}</td>
                  <td className="px-4 py-3">
                    <a href={`tel:${e.phone}`} className="block text-brand-primary hover:underline">{e.phone}</a>
                    {e.email && <a href={`mailto:${e.email}`} className="block text-xs text-gray-500 hover:underline">{e.email}</a>}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{e.program || '—'}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-xs">{e.message || '—'}</td>
                  <td className="px-4 py-3">
                    <select
                      value={e.status}
                      onChange={(ev) => changeStatus(e.id, ev.target.value)}
                      className={`badge px-2 py-1 capitalize border-0 cursor-pointer ${statusCls[e.status] || ''}`}
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => remove(e.id)} className="text-red-500 hover:text-red-700 text-xs">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
