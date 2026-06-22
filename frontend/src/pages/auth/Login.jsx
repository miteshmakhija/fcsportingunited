import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [tab, setTab] = useState('kid')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const u = await login(email, password)
      navigate(u.role === 'admin' ? '/admin' : '/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] grid md:grid-cols-2">
      <div
        className="hidden md:flex items-center justify-center text-white p-12"
        style={{
          background: "linear-gradient(rgba(26,32,53,0.45), rgba(26,32,53,0.6)), url('/assets/gallery/squad.jpg') center/cover",
        }}
      >
        <div className="max-w-sm text-center">
          <img src="/assets/sua_logo_v1.png" alt="Sporting United Academy" className="h-40 mx-auto mb-6 drop-shadow-xl" />
          <h2 className="font-display text-4xl mb-2">Welcome Back</h2>
          <p className="text-white/80">Track your training. Watch your videos. Become a champion.</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-8 bg-brand-cream">
        <div className="w-full max-w-md card">
          <div className="flex border-b mb-6">
            {['kid', 'admin'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-3 font-semibold text-sm uppercase tracking-widest ${
                  tab === t ? 'border-b-2 border-brand-green text-brand-green' : 'text-gray-400'
                }`}
              >
                {t === 'kid' ? 'Kid / Parent' : 'Admin'}
              </button>
            ))}
          </div>

          <h2 className={`font-display text-3xl text-brand-green-dark ${tab === 'kid' ? 'mb-1' : 'mb-6'}`}>
            Sign In
          </h2>
          {tab === 'kid' && (
            <p className="text-sm text-gray-500 mb-6">Use the credentials issued by your coach.</p>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="label">Password</label>
              <input className="input" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button className="btn-primary w-full" disabled={loading}>
              {loading ? 'Signing in…' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

