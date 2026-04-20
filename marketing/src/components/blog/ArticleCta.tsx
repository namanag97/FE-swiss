import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

function ctaFor(post: BlogPost) {
  const text = `${post.slug} ${post.title} ${post.tags.join(" ")}`.toLowerCase();
  if (text.includes("servicenow") || text.includes("incident")) {
    return {
      eyebrow: "ITSM walkthrough",
      heading: "See where incidents actually slow down.",
      body: "Bring one ServiceNow process. We will map reassignment loops, reopen paths, and SLA risk from the audit trail.",
      primary: "Analyze incident flow",
    };
  }
  if (text.includes("s4hana") || text.includes("migration")) {
    return {
      eyebrow: "Migration readiness",
      heading: "Baseline the process before the migration changes it.",
      body: "Use event data to find variants, undocumented workarounds, and conformance gaps before cutover planning hardens.",
      primary: "Book migration review",
    };
  }
  if (text.includes("semantic") || text.includes("architecture") || text.includes("ontology")) {
    return {
      eyebrow: "Architecture review",
      heading: "Talk through your data and process architecture.",
      body: "We will help identify the first process, source systems, and signals worth mapping before a broader rollout.",
      primary: "Book architecture review",
    };
  }
  return {
    eyebrow: "Process walkthrough",
    heading: "Map one real process with us.",
    body: "Bring the systems, workflow, and KPI pain. We will show how Sancalana turns event data into the paths behind performance.",
    primary: "Map your first process",
  };
}

export function ArticleCta({ post }: { post: BlogPost }) {
  const cta = ctaFor(post);
  return (
    <section className="border border-[var(--border)] bg-[var(--bg)] p-[var(--sp-5)]">
      <p className="type-label text-[color:var(--emerald)]">{cta.eyebrow}</p>
      <h2 className="type-h3 mt-[var(--sp-2)]">{cta.heading}</h2>
      <p className="type-body mt-[var(--sp-3)] text-mid">{cta.body}</p>
      <div className="mt-[var(--sp-4)] flex flex-wrap gap-[var(--sp-3)]">
        <Link href={`/contact?source=blog&article=${post.slug}`} className="btn btn-primary" data-track="blog_cta_clicked" data-track-location={post.slug}>
          {cta.primary}
        </Link>
        <Link href="/platform" className="btn btn-ghost" data-track="blog_secondary_cta_clicked" data-track-location={post.slug}>
          See the product
        </Link>
      </div>
    </section>
  );
}
