import Link from 'next/link'
import { versusContent } from '@/content/versus'
import { Button } from '@/components/ui/Button'
import s from './versus.module.css'

/* ═══════════════════════════════════════════════════════════════
   Versus Page — competitor comparison grid
   Sections: PageHero -> CompareGrid -> SectionDivider -> CTABand
   ═══════════════════════════════════════════════════════════════ */

function ArrowSvg() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M2 5h6M5 2.5L7.5 5 5 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function VersusPage() {
  const { hero, competitors, cta } = versusContent

  return (
    <>
      <div className="page" style={{ overflow: 'hidden' }}>
        {/* Decorative wave SVG */}
        <div className={s.pageWaves}>
          <svg width="300" height="400" viewBox="0 0 300 400" fill="none" preserveAspectRatio="xMidYMid slice">
            <g opacity="0.4">
              <path d="M-50 50C-30 50 20 120 80 118C140 116 100 200 50 280C0 360 250 400 320 420" stroke="currentColor" strokeWidth="0.5" />
              <path d="M200 0C160 60 80 250 180 300C280 350 400 50 380 220" stroke="currentColor" strokeWidth="0.5" />
              <path d="M-30 45C-20 50 30 120 90 125C150 130 110 210 70 285C30 360 270 380 330 410" stroke="currentColor" strokeWidth="0.5" />
              <path d="M-10 40C5 50 40 120 100 130C160 140 120 220 90 290C60 360 290 360 340 400" stroke="currentColor" strokeWidth="0.5" />
              <path d="M10 35C30 50 50 120 110 135C170 150 130 230 110 295C90 360 310 340 350 390" stroke="currentColor" strokeWidth="0.5" />
              <path d="M30 30C55 50 60 120 120 140C180 160 140 240 130 300C120 360 330 320 360 380" stroke="currentColor" strokeWidth="0.5" />
              <path d="M50 25C80 50 70 120 130 145C190 170 150 250 150 305C150 360 350 300 370 370" stroke="currentColor" strokeWidth="0.5" />
              <path d="M70 20C105 50 80 120 140 150C200 180 160 260 170 310C180 360 370 280 380 360" stroke="currentColor" strokeWidth="0.5" />
              <path d="M90 15C130 50 90 120 150 155C210 190 170 270 190 315C210 360 390 260 390 350" stroke="currentColor" strokeWidth="0.5" />
              <path d="M110 10C155 50 100 120 160 160C220 200 180 280 210 320C240 360 410 240 400 340" stroke="currentColor" strokeWidth="0.5" />
            </g>
          </svg>
        </div>

        {/* ── VERSUS HERO ── */}
        <div className={s.versusHero}>
          <h1>{hero.title}</h1>
          <p>{hero.subtitle}</p>
        </div>

        {/* ── COMPARE GRID ── */}
        <div className={s.compareGrid}>
          {competitors.map((comp) => (
            <Link key={comp.name} href={comp.href} className={s.compareCard}>
              <div className={s.compareIcon}>
                <div
                  className={s.compareIconDot}
                  style={{ background: comp.color }}
                />
              </div>
              <span className={s.compareName}>{comp.name}</span>
              <span className={s.compareDesc}>{comp.description}</span>
              <span className={s.compareArrow}>
                Compare <ArrowSvg />
              </span>
            </Link>
          ))}
        </div>

        <div className="section-divider" />
      </div>

      {/* ── CTA BAND (full-bleed) ── */}
      <div className={s.ctaBand}>
        <h2>{cta.title} <em>{cta.titleAccent}</em></h2>
        <p>{cta.subtitle}</p>
        <div className={s.ctaActions}>
          <Button variant="light" href="#">Get Started</Button>
          <Button variant="ghost-light" href="/request-demo">Request Demo</Button>
        </div>
      </div>
    </>
  )
}
