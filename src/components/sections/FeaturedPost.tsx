import type { ReactNode } from 'react'
import { Badge } from '../ui/Badge'
import s from './FeaturedPost.module.css'

interface FeaturedPostProps {
  tag: string
  title: ReactNode
  excerpt: string
  authorInitials: string
  authorName: string
  date: string
}

export function FeaturedPost({
  tag,
  title,
  excerpt,
  authorInitials,
  authorName,
  date,
}: FeaturedPostProps) {
  return (
    <div className={s.root}>
      <div className={s.card}>
        {/* Text panel */}
        <div className={s.textPanel}>
          <div className={s.body}>
            <Badge variant="active">{tag}</Badge>
            <h2 className={s.title}>{title}</h2>
            <p className={s.excerpt}>{excerpt}</p>
          </div>

          <div className={s.foot}>
            <div className={s.meta}>
              <div className={s.authorRow}>
                <div className={s.avatar}>{authorInitials}</div>
                <div>
                  <div className={s.authorName}>{authorName}</div>
                  <div className={s.postDate}>{date}</div>
                </div>
              </div>
              <a href="#" className={s.arrowLink}>
                Read
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M2 6h8M6 2l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Visual panel */}
        <div className={s.visualPanel}>
          {/* Mini bar chart */}
          <div className={s.panelBlock}>
            <div className={s.panelEyebrow}>
              Revenue by segment &middot; Q4
            </div>
            <div className={s.miniBars}>
              <div
                className={s.miniBar}
                style={{ height: '72%', opacity: 0.85 }}
              />
              <div
                className={s.miniBar}
                style={{ height: '45%', opacity: 0.5 }}
              />
              <div
                className={s.miniBar}
                style={{ height: '100%', opacity: 0.9 }}
              />
              <div
                className={s.miniBar}
                style={{ height: '60%', opacity: 0.65 }}
              />
              <div
                className={s.miniBar}
                style={{ height: '80%', opacity: 0.8 }}
              />
              <div
                className={s.miniBar}
                style={{ height: '35%', opacity: 0.45 }}
              />
              <div
                className={s.miniBar}
                style={{ height: '90%', opacity: 0.9 }}
              />
            </div>
          </div>

          {/* Animated stroke sparkline */}
          <div className={[s.panelBlock, s.panelSvg].join(' ')}>
            <svg
              width="100%"
              height="28"
              viewBox="0 0 320 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 14 C40 4, 80 24, 120 14 C160 4, 200 24, 240 14 C280 4, 310 22, 320 14"
                stroke="#047A55"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M0 20 C40 10, 80 30, 120 20 C160 10, 200 30, 240 20 C280 10, 310 28, 320 20"
                stroke="rgba(255,255,255,.1)"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>

          {/* Code block */}
          <div className={s.panelBlock}>
            <div className={s.codeBlock}>
              <div className={s.cm}>-- Ana &middot; confidence 94%</div>
              <div>
                <span className={s.kw}>SELECT</span>{' '}
                <span className={s.fd}>segment</span>,
              </div>
              <div>
                &nbsp;&nbsp;<span className={s.kw}>SUM</span>(
                <span className={s.fd}>revenue</span>){' '}
                <span className={s.kw}>AS</span> total
              </div>
              <div>
                <span className={s.kw}>FROM</span>{' '}
                <span className={s.st}>orders</span>
              </div>
              <div>
                <span className={s.kw}>WHERE</span>{' '}
                <span className={s.fd}>quarter</span> ={' '}
                <span className={s.st}>&apos;Q4&apos;</span>
              </div>
              <div>
                <span className={s.kw}>GROUP BY</span>{' '}
                <span className={s.fd}>segment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
