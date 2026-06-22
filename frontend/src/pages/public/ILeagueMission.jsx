export default function ILeagueMission() {
  const timeline = [
    { year: '2026', title: 'Foundation', body: 'Academy accreditation with a 1-star rating, district league participation in the Sub-Junior (U-13) category, and partnerships with corporates.' },
    { year: '2027', title: 'State Champions', body: 'Compete and win state-level youth leagues, and partner with European clubs for a technical curriculum and coach development.' },
    { year: '2028', title: 'National Champions', body: 'Compete and win the National Qualification Round. Form a senior team in the regional league, build a full-time staff and high-performance unit, and establish a residency program and elite scouting network.' },
    { year: '2029', title: 'I-League Qualifier', body: 'Promote into the I-League 2nd Division. Strengthen the squad with academy graduates and select professionals.' },
    { year: '2030', title: 'Promotion Push', body: 'Top-3 finish in the I-League 2nd Division. Secure top-tier infrastructure and broadcast partnerships.' },
    { year: '2031', title: 'I-LEAGUE',  body: 'Sporting United FC competes in the Indian I-League — graduates of the academy lead the squad.' },
  ]

  return (
    <div>
      <section className="bg-brand-green-dark text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="tracking-[0.5em] text-brand-gold text-xs mb-3">SIX-YEAR MISSION</p>
          <h1 className="font-display text-6xl mb-4">ROAD TO I-LEAGUE</h1>
          <p className="text-white/85 max-w-3xl mx-auto">
            By 2031, Sporting United Academy will field a professional senior team in India's I-League —
            built on a generation of players developed at our academy. This is our roadmap.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="relative border-l-4 border-brand-gold pl-8 space-y-10">
          {timeline.map((t) => (
            <div key={t.year} className="relative">
              <span className="absolute -left-[42px] top-1 w-7 h-7 rounded-full bg-brand-gold border-4 border-brand-green-dark"></span>
              <p className="font-display text-3xl text-brand-green">{t.year}</p>
              <h3 className="text-xl text-brand-green-dark mt-1">{t.title}</h3>
              <p className="text-gray-600 mt-2">{t.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

