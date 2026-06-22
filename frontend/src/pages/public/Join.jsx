import { useState } from 'react'
import { enquiriesApi } from '../../api'
import { CONTACT, PROGRAMS, TRAINING_CENTRES, whatsappLink, WEB3FORMS_KEY } from '../../data/academy'

const BG = "linear-gradient(rgba(26,32,53,0.45), rgba(26,32,53,0.6)), url('/assets/gallery/academy-group.jpg') center/cover"

const empty = {
  parent_name: '',
  child_name: '',
  child_age: '',
  phone: '',
  email: '',
  program: '',
  message: '',
}

export default function Join() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending'); setError('')

    // Best-effort: also store the enquiry in the admin panel (ignore if backend is offline).
    enquiriesApi.create({
      ...form,
      child_age: form.child_age ? Number(form.child_age) : null,
      email: form.email || null,
    }).catch(() => {})

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New Academy Enquiry — ${form.child_name}`,
          from_name: 'Sporting United Academy Website',
          name: form.parent_name,
          email: form.email || CONTACT.email,
          phone: form.phone,
          child_name: form.child_name,
          child_age: form.child_age || '—',
          program: form.program || 'Any / not sure',
          message: form.message || '—',
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message || 'Submission failed')
      setStatus('done')
      setForm(empty)
    } catch (err) {
      setError('Something went wrong. Please call or WhatsApp us instead.')
      setStatus('error')
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="text-white py-20 px-4" style={{ background: BG }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="tracking-[0.4em] text-brand-gold text-sm mb-3">ADMISSIONS OPEN</p>
          <h1 className="font-display text-5xl md:text-6xl mb-4">JOIN THE ACADEMY</h1>
          <p className="text-white/85 max-w-2xl mx-auto text-lg">
            Give your child the chance to train like a champion. From first kicks to district & state leagues —
            Sporting United has a place for every young footballer.
          </p>
          <a href="#enquiry" className="btn-gold mt-8">Enrol Your Child</a>
        </div>
      </section>

      {/* Why join */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-4 gap-6">
        {[
          { stat: `Since ${CONTACT.established}`, label: 'Proven youth development' },
          { stat: 'AFC-Licensed', label: 'Qualified, caring coaches' },
          { stat: 'District & State', label: 'Competitive match pathway' },
          { stat: 'I-League', label: 'Players selected to elite camps' },
        ].map((b) => (
          <div key={b.label} className="card text-center border-t-4 border-brand-gold">
            <div className="font-display text-3xl text-brand-primary">{b.stat}</div>
            <p className="text-sm text-gray-600 mt-2">{b.label}</p>
          </div>
        ))}
      </section>

      {/* Programs */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="tracking-[0.4em] text-brand-gold text-xs">CHOOSE A PROGRAM</p>
            <h2 className="font-display text-4xl text-brand-primary-dark">Age Groups We Coach</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROGRAMS.map((p) => (
              <div key={p.name} className="card flex flex-col">
                <div className="text-brand-gold font-display text-2xl">{p.ages}</div>
                <h3 className="text-2xl text-brand-primary-dark">{p.name}</h3>
                <p className="text-sm text-gray-600 mt-2 flex-1">{p.blurb}</p>
                <ul className="mt-4 space-y-1">
                  {p.focus.map((f) => (
                    <li key={f} className="text-xs text-brand-primary flex items-center gap-2">
                      <span className="text-brand-gold">●</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry form + contact */}
      <section id="enquiry" className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3">
          <p className="tracking-[0.4em] text-brand-gold text-xs">ENQUIRE NOW</p>
          <h2 className="font-display text-4xl text-brand-primary-dark mb-2">Book a Free Trial Session</h2>
          <p className="text-gray-600 mb-6">
            Fill in your details and our coaching team will call you to arrange a free trial. No commitment.
          </p>

          {status === 'done' ? (
            <div className="card border-t-4 border-green-500">
              <h3 className="text-2xl text-brand-primary-dark">Thank you! ⚽</h3>
              <p className="text-gray-600 mt-2">
                We've received your enquiry. Coach {CONTACT.headCoach.split(' ')[0]} or a team member will
                contact you shortly to arrange your child's free trial.
              </p>
              <button onClick={() => setStatus('idle')} className="btn-outline mt-4">Submit another</button>
            </div>
          ) : (
            <form onSubmit={submit} className="card grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Parent / Guardian name *</label>
                <input className="input" required value={form.parent_name} onChange={set('parent_name')} />
              </div>
              <div>
                <label className="label">Child's name *</label>
                <input className="input" required value={form.child_name} onChange={set('child_name')} />
              </div>
              <div>
                <label className="label">Child's age</label>
                <input className="input" type="number" min="3" max="18" value={form.child_age} onChange={set('child_age')} />
              </div>
              <div>
                <label className="label">Preferred program</label>
                <select className="input" value={form.program} onChange={set('program')}>
                  <option value="">Not sure / any</option>
                  {PROGRAMS.map((p) => (
                    <option key={p.name} value={`${p.name} (${p.ages})`}>{p.name} ({p.ages})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Phone / WhatsApp *</label>
                <input className="input" required value={form.phone} onChange={set('phone')} placeholder="+91" />
              </div>
              <div>
                <label className="label">Email</label>
                <input className="input" type="email" value={form.email} onChange={set('email')} />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Anything else? (optional)</label>
                <textarea className="input" rows="3" value={form.message} onChange={set('message')} />
              </div>
              {error && <p className="text-red-600 text-sm sm:col-span-2">{error}</p>}
              <div className="sm:col-span-2">
                <button className="btn-primary w-full" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Request Free Trial'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Contact card */}
        <div className="lg:col-span-2">
          <div className="rounded-xl shadow-md p-6 bg-brand-primary text-white">
            <h3 className="font-display text-3xl text-brand-gold">Talk to us</h3>
            <p className="text-white/80 text-sm mt-2">Prefer to chat? Reach our head coach directly.</p>
            <div className="mt-6 space-y-4 text-sm">
              <div>
                <div className="text-brand-gold text-xs tracking-widest">HEAD COACH</div>
                <div className="font-semibold">{CONTACT.headCoach}</div>
                <div className="text-white/70 text-xs">{CONTACT.headCoachTitle}</div>
              </div>
              <div>
                <div className="text-brand-gold text-xs tracking-widest">PHONE</div>
                <a href={`tel:${CONTACT.phoneRaw}`} className="font-semibold hover:text-brand-gold">{CONTACT.phone}</a>
              </div>
              <div>
                <div className="text-brand-gold text-xs tracking-widest">EMAIL</div>
                <a href={`mailto:${CONTACT.email}`} className="font-semibold hover:text-brand-gold break-all">{CONTACT.email}</a>
              </div>
            </div>
            <a href={whatsappLink()} target="_blank" rel="noreferrer"
               className="btn-gold w-full mt-6">Chat on WhatsApp</a>
          </div>

          {/* Training centres */}
          <div className="card mt-6">
            <h3 className="font-display text-2xl text-brand-primary-dark mb-1">Where We Train</h3>
            <p className="text-sm text-gray-500 mb-4">Come and watch a session at either of our Pune grounds.</p>
            <ul className="space-y-4">
              {TRAINING_CENTRES.map((c) => (
                <li key={c.name}>
                  <div className="flex items-center gap-2 text-brand-primary-dark font-semibold">
                    <span className="text-brand-accent">📍</span> {c.name}
                  </div>
                  <p className="text-xs text-gray-600 ml-6 mt-1">{c.address}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
