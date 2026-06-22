import { Link } from 'react-router-dom'
import { CONTACT, TRAINING_CENTRES, REGISTERED_OFFICE, SOCIALS } from '../../data/academy'

export default function Footer() {
  return (
    <footer className="bg-brand-ink text-white/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3">
            <img src="/assets/sporting-united-powder.svg" alt="Sporting United Academy" className="h-16 w-auto" />
            <div>
              <div className="font-display text-lg text-brand-gold">SPORTING UNITED</div>
              <div className="text-xs tracking-[0.3em] text-white/60">ACADEMY</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/60">
            Building tomorrow's champions. On a mission to field an I-League team by 2031.
          </p>
        </div>
        <div>
          <h4 className="text-brand-gold mb-3 text-sm tracking-widest">EXPLORE</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/join" className="hover:text-brand-gold">Join the Academy</Link></li>
            <li><Link to="/coaches" className="hover:text-brand-gold">Coaches</Link></li>
            <li><Link to="/achievements" className="hover:text-brand-gold">Achievements</Link></li>
            <li><Link to="/high-performance" className="hover:text-brand-gold">High Performance Centre</Link></li>
            <li><Link to="/athlete-care" className="hover:text-brand-gold">Athlete Care</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-brand-gold mb-3 text-sm tracking-widest">MISSION</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/i-league-mission" className="hover:text-brand-gold">Road to I-League</Link></li>
            <li>Coaching Philosophy</li>
            <li>Youth Development</li>
          </ul>
        </div>
        <div>
          <h4 className="text-brand-gold mb-3 text-sm tracking-widest">CONTACT</h4>
          <p className="text-sm text-white/80">{CONTACT.headCoach}</p>
          <p className="text-xs text-white/50 mb-2">{CONTACT.headCoachTitle}</p>
          <p className="text-sm text-white/60">
            <a href={`tel:${CONTACT.phoneRaw}`} className="hover:text-brand-gold">{CONTACT.phone}</a>
          </p>
          <p className="text-sm text-white/60">
            <a href={`mailto:${CONTACT.email}`} className="hover:text-brand-gold break-all">{CONTACT.email}</a>
          </p>
          <p className="text-xs text-white/40 mt-2">Reg. No. {CONTACT.regNo}</p>

          <div className="flex items-center gap-3 mt-4">
            <a href={SOCIALS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"
               className="text-[#E4405F] hover:text-[#F77737] transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.62c-3.15 0-3.52.01-4.76.07-1.15.05-1.77.24-2.19.4-.55.22-.94.47-1.35.88-.41.41-.66.8-.88 1.35-.16.42-.35 1.04-.4 2.19-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.05 1.15.24 1.77.4 2.19.22.55.47.94.88 1.35.41.41.8.66 1.35.88.42.16 1.04.35 2.19.4 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.15-.05 1.77-.24 2.19-.4.55-.22.94-.47 1.35-.88.41-.41.66-.8.88-1.35.16-.42.35-1.04.4-2.19.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-1.15-.24-1.77-.4-2.19a3.64 3.64 0 0 0-.88-1.35 3.64 3.64 0 0 0-1.35-.88c-.42-.16-1.04-.35-2.19-.4-1.24-.06-1.61-.07-4.76-.07zm0 2.76a5.3 5.3 0 1 1 0 10.6 5.3 5.3 0 0 1 0-10.6zm0 1.62a3.68 3.68 0 1 0 0 7.36 3.68 3.68 0 0 0 0-7.36zm5.5-2.9a1.24 1.24 0 1 1 0 2.48 1.24 1.24 0 0 1 0-2.48z"/>
              </svg>
            </a>
            <a href={SOCIALS.google} target="_blank" rel="noreferrer" aria-label="Google profile"
               className="transition hover:brightness-125">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M12.24 10.4v3.32h4.62c-.2 1.2-.83 2.22-1.77 2.9l2.86 2.22c1.67-1.54 2.63-3.8 2.63-6.5 0-.62-.06-1.22-.16-1.8z"/>
                <path fill="#34A853" d="M5.27 14.28l-.64.49-2.27 1.77C3.84 19.6 7.66 22 12 22c2.7 0 4.96-.9 6.62-2.42l-2.86-2.22c-.8.54-1.82.86-3.76.86-2.9 0-5.36-1.96-6.24-4.6z"/>
                <path fill="#FBBC05" d="M2.36 7.46A9.97 9.97 0 0 0 2 12c0 1.62.39 3.14 1.06 4.5l3.42-2.66A5.98 5.98 0 0 1 6.16 12c0-.63.1-1.24.3-1.82z"/>
                <path fill="#EA4335" d="M12 6.18c1.46 0 2.78.5 3.82 1.49l2.85-2.85C16.95 3.24 14.7 2.4 12 2.4 7.66 2.4 3.84 4.8 2.36 8.18l3.96 3.06C7.2 8.14 9.36 6.18 12 6.18z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Locations */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
          {TRAINING_CENTRES.map((c) => (
            <div key={c.name}>
              <h4 className="text-brand-gold mb-2 text-xs tracking-widest">TRAINING CENTRE</h4>
              <p className="text-sm text-white/80 font-semibold">{c.name}</p>
              <p className="text-xs text-white/50 mt-1">{c.address}</p>
            </div>
          ))}
          <div>
            <h4 className="text-brand-gold mb-2 text-xs tracking-widest">REGISTERED OFFICE</h4>
            <p className="text-sm text-white/80 font-semibold">{REGISTERED_OFFICE.name}</p>
            <p className="text-xs text-white/50 mt-1">{REGISTERED_OFFICE.address}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Sporting United Academy. All rights reserved.
      </div>
    </footer>
  )
}

