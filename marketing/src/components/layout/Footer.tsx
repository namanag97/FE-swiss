import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { NewsletterForm } from "./NewsletterForm";

function Col({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div className="flex flex-col gap-[var(--sp-4)]">
      <p className="footer-heading">{title}</p>
      <div className="flex flex-col gap-[var(--sp-2)]">
        {links.map((l) => (
          <Link key={l.href + l.label} href={l.href} className="footer-link">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:[grid-template-columns:1.8fr_repeat(4,1fr)] lg:gap-[64px] pb-[var(--sp-6)] footer-divider">
          {/* Brand + newsletter */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 flex flex-col gap-[var(--sp-4)]">
            <Link href="/" className="nav-brand nav-brand--light">
              <div className="flex items-center justify-center w-[18px] h-[18px] border-[1.5px] border-[var(--footer-text-muted)]">
                <span className="rounded-full w-[6px] h-[6px] bg-[var(--emerald)]" />
              </div>
              {siteConfig.name}
            </Link>
            <div className="flex flex-col gap-[var(--sp-3)]">
              <p className="footer-subtitle">Stay in the loop</p>
              <p className="footer-desc">
                Product updates, engineering insights, and process mining perspectives.
              </p>
              <NewsletterForm />
            </div>
          </div>

          <Col title="Platform" links={siteConfig.footer.platform} />
          <Col title="Solutions" links={siteConfig.footer.solutions} />
          <Col title="Company" links={siteConfig.footer.company} />
          <Col title="Legal" links={siteConfig.footer.legal} />
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pt-[var(--sp-5)]">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            {Object.entries(siteConfig.links).map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social capitalize"
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
