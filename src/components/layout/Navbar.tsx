'use client'

import Link from 'next/link'
import { navItems, navActions } from '@/config/nav'
import styles from './Navbar.module.css'

export function Navbar() {
  return (
    <div className={styles.navWrap}>
      <nav className={styles.nav}>
        <Link className={styles.navLogo} href="/">
          <div className={styles.navLogoMark}>
            <span className={styles.navLogoDot} />
          </div>
          TextQL
        </Link>

        <div className={styles.navLinks}>
          {navItems.map((item) => (
            <Link key={item.label} className={styles.navLink} href={item.href}>
              {item.label}
              {item.hasDropdown && (
                <svg
                  className={styles.navLinkChevron}
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <path
                    d="M2.5 4l2.5 2.5L7.5 4"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </Link>
          ))}
        </div>

        <div className={styles.navActions}>
          <Link className={styles.btnGhost} href={navActions.secondary.href}>
            {navActions.secondary.label}
          </Link>
          <Link className={styles.btnPrimary} href={navActions.primary.href}>
            {navActions.primary.label}
          </Link>
        </div>
      </nav>
    </div>
  )
}
