import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { BLOG_CACHE_TAG } from "@/lib/blog";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const configuredSecret = process.env.BLOG_REVALIDATE_SECRET;
  if (!configuredSecret) {
    return NextResponse.json(
      { error: "Blog revalidation is not configured." },
      { status: 503 },
    );
  }

  let body: { secret?: string; slug?: string } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const providedSecret = request.headers.get("x-blog-revalidate-secret") || body.secret || "";
  if (providedSecret !== configuredSecret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const slug = typeof body.slug === "string" ? body.slug.trim() : "";

  revalidateTag(BLOG_CACHE_TAG);
  revalidatePath("/blog");
  revalidatePath("/feed.xml");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/blog/${slug}`);

  return NextResponse.json({
    ok: true,
    revalidated: slug ? ["blog-content", "/blog", `/blog/${slug}`, "/feed.xml", "/sitemap.xml"] : ["blog-content", "/blog", "/feed.xml", "/sitemap.xml"],
  });
}
