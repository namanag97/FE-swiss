import s from './TimelineSteps.module.css'

interface Step {
  label: string
  title: string
  body: string
}

interface TimelineStepsProps {
  title: string
  subtitle?: string
  steps: Step[]
  tagline?: string
}

export function TimelineSteps({
  title,
  subtitle,
  steps,
  tagline,
}: TimelineStepsProps) {
  return (
    <section className={s.root}>
      <div className={s.head}>
        <h2 className={s.sectionTitle}>{title}</h2>
        {subtitle && <p className={s.sectionSubtitle}>{subtitle}</p>}
      </div>

      <div className={s.grid}>
        {steps.map((step) => (
          <div key={step.label} className={s.card}>
            <span className={s.stepLabel}>{step.label}</span>
            <h3 className={s.stepTitle}>{step.title}</h3>
            <p className={s.stepBody}>{step.body}</p>
          </div>
        ))}
      </div>

      {tagline && <p className={s.tagline}>{tagline}</p>}
    </section>
  )
}
