import { useEffect, useState } from 'react'
import { exercisesApi, playersApi } from '../../api'

const emptyEx = { title: '', description: '', youtube_url: '', category: 'Dribbling', difficulty: 'beginner' }

export default function AssignExercises() {
  const [exercises, setExercises] = useState([])
  const [players, setPlayers] = useState([])
  const [form, setForm] = useState(emptyEx)
  const [assignSel, setAssignSel] = useState({ player_id: '', exercise_id: '', due_date: '' })

  const load = async () => {
    setExercises((await exercisesApi.list()).data)
    setPlayers((await playersApi.list()).data)
  }
  useEffect(() => { load() }, [])

  const submitExercise = async (e) => {
    e.preventDefault()
    await exercisesApi.create(form)
    setForm(emptyEx); load()
  }

  const submitAssign = async (e) => {
    e.preventDefault()
    if (!assignSel.player_id || !assignSel.exercise_id) return
    await exercisesApi.assign({
      ...assignSel,
      due_date: assignSel.due_date || null,
    })
    setAssignSel({ player_id: '', exercise_id: '', due_date: '' })
    alert('Exercise assigned!')
  }

  const remove = async (id) => {
    if (!confirm('Delete exercise?')) return
    await exercisesApi.delete(id); load()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
      <div>
        <p className="tracking-[0.4em] text-brand-gold text-xs">TRAINING LIBRARY</p>
        <h1 className="font-display text-4xl text-brand-green-dark">Exercises & Assignments</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Create */}
        <form onSubmit={submitExercise} className="card">
          <h3 className="text-2xl text-brand-green-dark mb-4">Add Exercise</h3>
          <label className="label">Title</label>
          <input className="input mb-3" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <label className="label">YouTube URL</label>
          <input className="input mb-3" required placeholder="https://youtube.com/..." value={form.youtube_url} onChange={(e) => setForm({ ...form, youtube_url: e.target.value })} />
          <label className="label">Category</label>
          <select className="input mb-3" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {['Dribbling', 'Passing', 'Shooting', 'Fitness', 'Defending', 'Goalkeeping', 'Tactics'].map((c) => <option key={c}>{c}</option>)}
          </select>
          <label className="label">Difficulty</label>
          <select className="input mb-3" value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}>
            {['beginner', 'intermediate', 'advanced'].map((d) => <option key={d}>{d}</option>)}
          </select>
          <label className="label">Description</label>
          <textarea className="input mb-3" rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
          <button className="btn-primary">Add to Library</button>
        </form>

        {/* Assign */}
        <form onSubmit={submitAssign} className="card">
          <h3 className="text-2xl text-brand-green-dark mb-4">Assign to Player</h3>
          <label className="label">Player</label>
          <select className="input mb-3" required value={assignSel.player_id} onChange={(e) => setAssignSel({ ...assignSel, player_id: e.target.value })}>
            <option value="">Select player…</option>
            {players.map((p) => <option key={p.id} value={p.id}>{p.full_name} ({p.age_group})</option>)}
          </select>
          <label className="label">Exercise</label>
          <select className="input mb-3" required value={assignSel.exercise_id} onChange={(e) => setAssignSel({ ...assignSel, exercise_id: e.target.value })}>
            <option value="">Select exercise…</option>
            {exercises.map((e) => <option key={e.id} value={e.id}>{e.title} · {e.category}</option>)}
          </select>
          <label className="label">Due Date (optional)</label>
          <input className="input mb-3" type="date" value={assignSel.due_date} onChange={(e) => setAssignSel({ ...assignSel, due_date: e.target.value })} />
          <button className="btn-primary">Assign Exercise</button>
        </form>
      </div>

      <div className="card overflow-x-auto">
        <h3 className="text-2xl text-brand-green-dark mb-4">Exercise Library ({exercises.length})</h3>
        <table className="w-full text-sm">
          <thead className="text-left text-brand-green-dark border-b">
            <tr><th className="p-2">Title</th><th>Category</th><th>Difficulty</th><th>Video</th><th></th></tr>
          </thead>
          <tbody>
            {exercises.map((e) => (
              <tr key={e.id} className="border-b last:border-0">
                <td className="p-2 font-semibold">{e.title}</td>
                <td><span className="badge bg-brand-green/10 text-brand-green">{e.category}</span></td>
                <td className="capitalize">{e.difficulty}</td>
                <td><a className="text-brand-green underline" href={e.youtube_url} target="_blank" rel="noreferrer">Open</a></td>
                <td><button className="text-red-600 text-xs" onClick={() => remove(e.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

