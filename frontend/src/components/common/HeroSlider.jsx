import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

export default function HeroSlider({ slides }) {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation, EffectFade]}
      effect="fade"
      autoplay={{ delay: 5500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      loop
      className="h-[520px]"
    >
      {slides.map((s, i) => (
        <SwiperSlide key={i}>
          <div
            className="relative h-full w-full flex items-center justify-center text-white"
            style={{
              background: `linear-gradient(rgba(26,32,53,0.1), rgba(26,32,53,0.28)), ${s.bg}`,
              backgroundSize: 'cover',
              backgroundPosition: s.pos || 'center',
            }}
          >
            <div className="max-w-4xl text-center px-4" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.55)' }}>
              <p className="text-brand-gold tracking-[0.4em] text-sm mb-3">{s.eyebrow}</p>
              <h2 className="font-display text-5xl md:text-7xl mb-4">{s.title}</h2>
              <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto">{s.subtitle}</p>
              {s.cta && (
                <a href={s.cta.href} className="btn-gold mt-8 inline-block">
                  {s.cta.label}
                </a>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

