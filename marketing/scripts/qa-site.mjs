const BASE_URL = (process.env.QA_BASE_URL || "http://localhost:3001").replace(/\/$/, "");
const NEW_POST = "/blog/consolidated-production-failure-ontology";
const SEMANTIC_POST = "/blog/semantic-layer-history-evolution";
const REQUIRED_ROUTES = [
  "/",
  "/blog",
  NEW_POST,
  SEMANTIC_POST,
  "/admin/index.html",
  "/admin/config.yml",
  "/feed.xml",
  "/sitemap.xml",
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function request(pathname, options = {}) {
  const response = await fetch(`${BASE_URL}${pathname}`, options);
  const body = await response.text();
  return { response, body };
}

function localAssets(html) {
  const assets = new Set();
  const attrPattern = /\b(?:href|src)=["']([^"']+)["']/g;
  let match;
  while ((match = attrPattern.exec(html)) !== null) {
    const href = match[1];
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    if (href === "/_next/static/chunks/polyfills.js") continue;
    if (href.startsWith("/_next/") || href.startsWith("/favicon") || href.startsWith("/site.webmanifest")) {
      assets.add(href);
    }
  }
  return [...assets];
}

async function checkRoute(pathname) {
  const { response, body } = await request(pathname);
  assert(response.ok, `${pathname} returned ${response.status}`);

  if (response.headers.get("content-type")?.includes("text/html")) {
    assert(!body.includes("This post could not be rendered"), `${pathname} hit the MDX render fallback`);
    assert(!body.includes("Application error"), `${pathname} rendered an application error`);
  }

  return body;
}

async function checkAssets(html) {
  const assets = localAssets(html);
  assert(assets.length > 0, "No local Next/static assets found in rendered HTML");

  for (const asset of assets) {
    const { response, body } = await request(asset);
    assert(response.ok, `${asset} returned ${response.status}`);
    assert(body.length > 0, `${asset} was empty`);
  }
}

async function checkRedirect() {
  const { response } = await request("/blog/building-meridian-architecture", { redirect: "manual" });
  assert([301, 302, 307, 308].includes(response.status), "Old architecture slug did not redirect");
  const location = response.headers.get("location") || "";
  assert(location.includes("/blog/building-sancalana-architecture"), "Old architecture slug redirects to the wrong place");
}

async function main() {
  const htmlByRoute = new Map();

  for (const route of REQUIRED_ROUTES) {
    htmlByRoute.set(route, await checkRoute(route));
  }

  const blogHtml = htmlByRoute.get("/blog");
  const postHtml = htmlByRoute.get(NEW_POST);
  const semanticPostHtml = htmlByRoute.get(SEMANTIC_POST);
  const sitemap = htmlByRoute.get("/sitemap.xml");
  const feed = htmlByRoute.get("/feed.xml");
  const adminConfig = htmlByRoute.get("/admin/config.yml");

  assert(blogHtml.includes("Consolidated Production Failure Ontology"), "Blog index does not list the new post");
  assert(blogHtml.includes("The Semantic Layer Keeps Coming Back"), "Blog index does not list the semantic layer post");
  assert(postHtml.includes("Coverage Matrix"), "New post is missing the coverage matrix section");
  assert(postHtml.includes("<pre"), "New post did not render ASCII chart code blocks");
  assert(postHtml.includes("Data integrity"), "New post is missing ontology content");
  assert(postHtml.includes("class=\"prose\"") || postHtml.includes("class=\"prose "), "New post is missing prose styling");
  assert(semanticPostHtml.includes("LLMs Make Semantics Hard To Ignore"), "Semantic layer post is missing the LLM section");
  assert(semanticPostHtml.includes("What This Means For Process Intelligence"), "Semantic layer post is missing the Sancalana section");
  assert(semanticPostHtml.includes("<pre"), "Semantic layer post did not render ASCII chart code blocks");
  assert(sitemap.includes(NEW_POST), "Sitemap does not include the new published post");
  assert(sitemap.includes(SEMANTIC_POST), "Sitemap does not include the semantic layer post");
  assert(feed.includes("Consolidated Production Failure Ontology"), "RSS feed does not include the new published post");
  assert(feed.includes("The Semantic Layer Keeps Coming Back"), "RSS feed does not include the semantic layer post");
  assert(adminConfig.includes("namanag97/FE-swiss"), "Admin CMS config is not pointing at the GitHub repo");

  await checkAssets(blogHtml);
  await checkAssets(postHtml);
  await checkAssets(semanticPostHtml);
  await checkRedirect();

  console.log(`Site QA passed against ${BASE_URL}`);
}

main().catch((error) => {
  console.error(`Site QA failed: ${error.message}`);
  process.exit(1);
});
