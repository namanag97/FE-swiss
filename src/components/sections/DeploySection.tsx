import { Eyebrow } from '../ui/Eyebrow'
import { Badge } from '../ui/Badge'
import s from './DeploySection.module.css'

interface DeploySectionProps {
  eyebrow: string
  title: string
  body: string
  clouds: string[]
  certifications: string[]
  components?: string[]
  llms?: string[]
  useCases?: string[]
}

export function DeploySection({
  eyebrow,
  title,
  body,
  clouds,
  certifications,
  components,
  llms,
  useCases,
}: DeploySectionProps) {
  return (
    <section className={s.root}>
      <div className={s.head}>
        <Eyebrow variant="bracket">{eyebrow}</Eyebrow>
        <h2 className={s.title}>{title}</h2>
        <p className={s.body}>{body}</p>
      </div>

      <div className={s.grid}>
        <div className={s.left}>
          <div className={s.subtitle}>Your Air-Gapped Environment</div>
          <div className={s.sectionBody}>
            Full data sovereignty with your cloud provider of choice.
          </div>
          <div className={s.group}>
            <div className={s.groupLabel}>Cloud Providers</div>
            <div className={s.badgeRow}>
              {clouds.map((c) => (
                <Badge key={c} variant="neutral">
                  {c}
                </Badge>
              ))}
            </div>
          </div>
          {components && (
            <div className={s.group}>
              <div className={s.groupLabel}>Components</div>
              <div className={s.badgeRow}>
                {components.map((c) => (
                  <Badge key={c} variant="neutral">
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={s.right}>
          <div className={s.subtitle}>Security &amp; Compliance</div>
          <div className={s.sectionBody}>
            Enterprise-grade security with industry certifications.
          </div>
          <div className={s.group}>
            <div className={s.groupLabel}>Certifications</div>
            <div className={s.badgeRow}>
              {certifications.map((c) => (
                <Badge key={c} variant="green">
                  {c}
                </Badge>
              ))}
            </div>
          </div>
          {llms && (
            <div className={s.group}>
              <div className={s.groupLabel}>LLM Providers</div>
              <div className={s.badgeRow}>
                {llms.map((l) => (
                  <Badge key={l} variant="neutral">
                    {l}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {useCases && (
            <div className={s.group}>
              <div className={s.groupLabel}>Use Cases</div>
              <div className={s.badgeRow}>
                {useCases.map((u) => (
                  <Badge key={u} variant="neutral">
                    {u}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
