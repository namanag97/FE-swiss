import Link from 'next/link'
import { aboutContent } from '@/content/about'
import { Button } from '@/components/ui/Button'
import s from './about.module.css'

/* ═══════════════════════════════════════════════════════════════
   About Page — text-heavy manifesto layout
   ═══════════════════════════════════════════════════════════════ */

function ArrowSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 7h8M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function AboutPage() {
  const { sections, cta } = aboutContent

  return (
    <>
      <div className="page" style={{ padding: '0 var(--sp-5)' }}>
        {sections.map((section, i) => {
          const isFirst = i === 0
          return (
            <div key={section.eyebrow}>
              <div className={s.aboutBlock}>
                <span className={s.aboutEyebrow}>{section.eyebrow}</span>

                {/* First section uses h1, rest use h2 */}
                {isFirst ? (
                  <h1
                    className={s.aboutH1}
                    dangerouslySetInnerHTML={{
                      __html: section.titleAccent
                        ? section.title.replace(
                            section.titleAccent,
                            `<em>${section.titleAccent}</em>`
                          )
                        : section.title,
                    }}
                  />
                ) : (
                  <h2 className={s.aboutH2}>{section.title}</h2>
                )}

                {/* Optional pull quote */}
                {section.pullQuote && (
                  <div className={s.aboutPullQuote}>{section.pullQuote}</div>
                )}

                {/* Body paragraphs */}
                {section.body.map((paragraph, j) => (
                  <p
                    key={j}
                    className={s.aboutBody}
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))}

                {/* Optional links list */}
                {section.links && (
                  <div className={s.aboutLinkList}>
                    {section.links.map((link) => (
                      <Link key={link.label} href={link.href} className={s.aboutLink}>
                        <ArrowSvg />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Section divider after each section */}
              <div className="section-divider" />
            </div>
          )
        })}

        <div style={{ height: 'var(--sp-7)' }} />
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
