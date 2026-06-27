// ── Central academy info — edit here to update across the whole site ──

export const CONTACT = {
  headCoach: 'Jagdish Khade',
  headCoachTitle: 'Technical Director & Head Coach',
  phone: '+91 83909 29498',
  phoneRaw: '918390929498', // for tel:/wa.me links
  email: 'contact@fcsportingunited.com',
  regNo: 'NSK0000154/2018',
  established: 2012,
}

export const whatsappLink = (text = "Hi, I'd like to enrol my child at Sporting United Academy.") =>
  `https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(text)}`

// ── Social / external links ──
export const SOCIALS = {
  instagram: 'https://www.instagram.com/sportingunitedacademy2012',
  google: 'https://share.google/lldpylzzTc26cmgMs',
}

// ── Web3Forms public access key (enquiry emails) ──
export const WEB3FORMS_KEY = '70f89652-936f-4cf7-89f7-8d38b8593fc0'

// ── Featured head coach ──
export const HEAD_COACH = {
  name: 'Jagdish Khade',
  role_title: 'Technical Director & Head Coach',
  certifications: ['AFC B License'],
  photo_url: '/assets/coaches/jagdish-khade.jpg',
  bio: 'Jagdish leads Sporting United Academy’s coaching and player development. Holding the AFC ‘B’ Licence, he oversees the academy’s curriculum, high-performance programme and the pathway that takes players from grassroots to competitive district, state and national football.',
}

// ── Coaching team ──
export const COACHES = [
  {
    name: 'Dnyandeo Khade',
    role_title: 'Coach',
    certifications: ['AFC D License'],
    photo_url: '/assets/coaches/dnyandeo-khade.jpg',
  },
  {
    name: 'Aditya Gondhale',
    role_title: 'Coach',
    certifications: ['AFC D License'],
    photo_url: '/assets/coaches/aditya-gondhale.jpg',
  },
  {
    name: 'Bhuvan',
    role_title: 'Coach',
    certifications: ['AFC D License'],
    photo_url: '/assets/coaches/bhuvan.jpg',
  },
]

// ── Programs / age groups offered ──
export const PROGRAMS = [
  {
    name: 'First Kicks Program',
    ages: 'Toddlers · Up to U-7',
    blurb: 'A fun, safe first introduction to football where little ones build coordination, balance and confidence through play — taking their first touches, learning simple passing and receiving, and enjoying playful 1v1 games that spark a lifelong love for the ball.',
    focus: ['First touches', 'Passing & receiving', 'Confidence through play'],
  },
  {
    name: 'Future Stars',
    ages: '7 – 9 years',
    blurb: 'A structured skill-building phase that sharpens first touch, dribbling, passing and movement through fast small-sided games. Players are challenged to win their 1v1s, make quick decisions and play with the discipline, teamwork and competitive spirit that turn potential into real ability.',
    focus: ['Ball mastery', 'Winning 1v1s', 'Discipline & teamwork'],
  },
  {
    name: 'Foundation Phase',
    ages: '9 – 12 years',
    blurb: 'A demanding technical and tactical phase that refines passing, receiving and 1v1 mastery under pressure while developing game intelligence, positional play and a winning mentality. Here we shape disciplined, intelligent and complete young footballers ready to compete — and win — at district and state level.',
    focus: ['Technique under pressure', 'Tactical game sense', 'Discipline & winning mindset'],
  },
  {
    name: 'Youth Development Phase',
    ages: '13 – 16 years',
    blurb: 'A high-intensity competitive phase where players test themselves in district and state leagues. We deepen tactical understanding, positional mastery and game management while building strength, speed and resilience — instilling the discipline, leadership and winning habits that define standout young footballers.',
    focus: ['Tactical mastery', 'Strength & conditioning', 'Leadership & winning'],
  },
  {
    name: 'Elite Performance Phase',
    ages: '17 – 19 years',
    blurb: 'Our professional pathway for the most committed players — elite training, video and data analysis, and individual plans built to win. Athletes are pushed to peak physical and mental standards and given the platform to earn trials, district and state selections, and a genuine route into senior and professional football.',
    focus: ['Performance analysis', 'Elite conditioning', 'Trials & pro pathway'],
  },
]

// ── Training centres & registered office ──
export const TRAINING_CENTRES = [
  {
    name: 'Amanora School Ground',
    address: 'Amanora School, Amanora Park Town, No. 194, Village Sade Satara Nali, Malwadi Road, Hadapsar–Kharadi Bypass, Pune, Maharashtra 411028',
  },
  {
    name: 'Gera Ground, Kharadi',
    address: 'Gera Ground, Kharadi, Pune, Maharashtra 411014 (opposite Pind Punjab)',
  },
]

export const REGISTERED_OFFICE = {
  name: 'Registered Office',
  address: 'TEN Labs Cowork, udChalo House, 10, Phoenix Boundary Road, Viman Nagar, Pune, Maharashtra 411014',
}

// ── Real selections / achievements (from academy records) ──
export const SELECTIONS = [
  { name: 'Ritika Singh', honour: 'Indian National Team — AFC Women’s Futsal Asian Cup Qualifiers', img: '/assets/gallery/selected-ritika.jpg' },
  { name: 'Anshuman Katyan', honour: 'Selected — U-14 I-League', img: '/assets/gallery/selected-anshuman.jpg' },
  { name: 'Vedant R. Shirsath', honour: 'U-13 Sub-Junior National Camp', img: '/assets/gallery/selected-vedant-national.jpg' },
  { name: 'Sparsh Bangar', honour: 'ICSC Nationals — Team Maharashtra', img: '/assets/gallery/selected-sparsh.jpg' },
]

// ── Academy success headline stats ──
export const SUCCESS_STATS = [
  { value: '1', label: 'International Player', sub: 'produced by the academy' },
  { value: '21', label: 'National-Level Players', sub: 'selected to date' },
  { value: '51', label: 'Future Internationals', sub: 'our target from the academy' },
]

// ── All achievement photos (auto-listed from /assets/achievements) ──
export const ACHIEVEMENT_PHOTOS = [
  '/assets/achievements/featured-champions.jpg',
  ...Array.from(
    { length: 33 },
    (_, i) => `/assets/achievements/achv-${String(i + 1).padStart(2, '0')}.jpg`
  ),
]

// ── Gallery (team / action / community) ──
export const GALLERY = [
  { src: '/assets/gallery/academy-group.jpg', caption: 'Academy festival at Amanora, Pune' },
  { src: '/assets/gallery/squad.jpg', caption: 'Our youth squad' },
  { src: '/assets/gallery/matchday.jpg', caption: 'Maharashtra State Youth League' },
  { src: '/assets/gallery/champions-tinytots.jpg', caption: 'Tiny Tots — tournament champions' },
  { src: '/assets/gallery/juniors.jpg', caption: 'Juniors with their coach' },
  { src: '/assets/gallery/coach-group.jpg', caption: 'Training group on match day' },
]
