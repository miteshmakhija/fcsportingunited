import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const linkCls = ({ isActive }) =>
  `px-3 py-2 text-sm font-semibold transition ${
    isActive ? 'text-brand-gold' : 'text-white hover:text-brand-gold'
  }`

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate('/')
  }

  const publicLinks = [
    ['/', 'Home'],
    ['/coaches', 'Coaches'],
    ['/achievements', 'Achievements'],
    ['/high-performance', 'High Performance'],
    ['/athlete-care', 'Athlete Care'],
    ['/i-league-mission', 'I-League Mission'],
  ]

  return (
    <header className="bg-brand-green-dark text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-3">
          <img src="/assets/sporting-united-powder.svg" alt="Sporting United Academy" className="h-11 sm:h-14 w-auto drop-shadow" />
          <div className="hidden sm:block leading-tight">
            <div className="font-display text-lg lg:text-xl tracking-wider text-brand-gold">SPORTING UNITED</div>
            <div className="text-[10px] tracking-[0.4em] text-white/70">ACADEMY</div>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-1">
          {publicLinks.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} className={linkCls}>{label}</NavLink>
          ))}
          <Link to="/join" className="btn-gold text-sm ml-2">Join Us</Link>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <Link
                to={user.role === 'admin' ? '/admin' : '/dashboard'}
                className="btn-gold text-sm"
              >
                {user.role === 'admin' ? 'Admin Panel' : 'My Dashboard'}
              </Link>
              <button onClick={handleLogout} className="btn-outline text-sm border-white/40 text-white hover:bg-white hover:text-brand-green">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-gold text-sm">Login</Link>
          )}
        </div>

        <button
          type="button"
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/30"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      <nav className="hidden md:flex xl:hidden items-center justify-center gap-1 border-t border-white/10" aria-label="Page navigation">
        {publicLinks.map(([to, label]) => (
          <NavLink key={to} to={to} end={to === '/'} className={linkCls}>{label}</NavLink>
        ))}
        <NavLink to="/join" className={linkCls}>Join Us</NavLink>
      </nav>

      {menuOpen && (
        <nav className="md:hidden border-t border-white/10 px-4 py-3" aria-label="Mobile navigation">
          <div className="max-w-7xl mx-auto grid sm:grid-cols-2 gap-1">
          {publicLinks.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === '/'} onClick={() => setMenuOpen(false)} className="rounded-md px-4 py-3 font-semibold text-white hover:bg-white/10 hover:text-brand-gold">{label}</NavLink>
          ))}
            <Link to="/join" onClick={() => setMenuOpen(false)} className="rounded-md px-4 py-3 font-semibold text-brand-gold">Join Us</Link>
            {user ? (
              <>
                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setMenuOpen(false)} className="rounded-md px-4 py-3 font-semibold text-brand-gold">
                  {user.role === 'admin' ? 'Admin Panel' : 'My Dashboard'}
                </Link>
                <button onClick={handleLogout} className="rounded-md px-4 py-3 text-left font-semibold text-white">Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="rounded-md px-4 py-3 font-semibold text-brand-gold">Login</Link>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}

