import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

interface Props {
  source: string;
}

export async function BlogContent({ source }: Props) {
  try {
    const compiled = await compile(source, {
      outputFormat: "function-body",
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    });

    const { default: MDXContent } = await run(String(compiled), {
      ...runtime,
      baseUrl: import.meta.url,
    });

    return <MDXContent />;
  } catch {
    return (
      <div style={{ padding: "var(--sp-5)", border: "1px solid var(--border)" }}>
        <p style={{ fontFamily: "var(--sans)", fontSize: "var(--fs-sm)", color: "var(--ink-mid)" }}>
          This post could not be rendered. Please try refreshing the page.
        </p>
      </div>
    );
  }
}
