import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Exhibit, HBarChart, WaterfallChart, StatRow } from "./charts";

const mdxComponents = { Exhibit, HBarChart, WaterfallChart, StatRow };

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

    return <MDXContent components={mdxComponents} />;
  } catch {
    return (
      <div className="card-feature">
        <p className="type-body-sm text-mid">
          This post could not be rendered. Please try refreshing the page.
        </p>
      </div>
    );
  }
}
