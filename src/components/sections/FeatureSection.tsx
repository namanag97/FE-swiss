import type { ReactNode } from 'react'
import { Eyebrow } from '../ui/Eyebrow'
import s from './FeatureSection.module.css'

interface FeatureSectionProps {
  eyebrow: string
  title: string
  body: string
  reversed?: boolean
  visual?: ReactNode
}

export function FeatureSection({
  eyebrow,
  title,
  body,
  reversed = false,
  visual,
}: FeatureSectionProps) {
  const rootCls = [s.root, reversed ? s.reversed : '']
    .filter(Boolean)
    .join(' ')

  return (
    <section className={rootCls}>
      <div className={s.text}>
        <Eyebrow variant="bracket">{eyebrow}</Eyebrow>
        <h2 className={s.title}>{title}</h2>
        <p className={s.body}>{body}</p>
      </div>
      <div className={s.visual}>
        {visual ?? (
          <div className={s.screenshot}>
            <span className={s.screenshotLabel}>Product Screenshot</span>
          </div>
        )}
      </div>
    </section>
  )
}
