import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { NewsletterForm } from "./NewsletterForm";

function Col({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-300/60">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-[13px] text-forest-200/70 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-forest-900">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-base font-bold tracking-tight text-white">
              {siteConfig.name}
            </Link>
            <p className="mt-3 max-w-[220px] text-[13px] leading-relaxed text-forest-200/60">
              {siteConfig.description}
            </p>
            <NewsletterForm />
          </div>
          <Col title="Platform" links={siteConfig.footer.platform} />
          <Col title="Company" links={siteConfig.footer.company} />
          <Col title="Legal" links={siteConfig.footer.legal} />
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-forest-800 pt-6 text-[11px] text-forest-200/40 md:flex-row">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-5">
            {Object.entries(siteConfig.links).map(([name, url]) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-forest-200/80">
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
