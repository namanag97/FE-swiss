import { expect, test } from "@playwright/test";

const postPath = "/blog/consolidated-production-failure-ontology";
const semanticPostPath = "/blog/semantic-layer-history-evolution";

test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  await page.addInitScript(() => {
    window.localStorage.setItem("cookie-consent", "declined");
  });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.exposeFunction("__qaErrors", () => errors);
});

async function expectNoDocumentOverflow(page: import("@playwright/test").Page) {
  const overflow = await page.evaluate(() => ({
    viewport: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(overflow.scrollWidth, `document width ${overflow.scrollWidth} exceeded viewport ${overflow.viewport}`).toBeLessThanOrEqual(
    overflow.viewport + 2,
  );
}

async function expectNoRuntimeErrors(page: import("@playwright/test").Page) {
  const errors = (await page.evaluate(async () => {
    const fn = (window as unknown as { __qaErrors: () => Promise<string[]> }).__qaErrors;
    return fn();
  })).filter((message) => ![
    "Invalid or unexpected token",
    "Unexpected end of input",
    "Failed to load resource: the server responded with a status of 404 ()",
  ].includes(message));
  expect(errors).toEqual([]);
}

test("blog index lists the published ontology post with stable styling", async ({ page }) => {
  await page.goto("/blog");

  await expect(page.getByRole("heading", { name: /Ops, process mining/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Consolidated Production Failure Ontology/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /The Semantic Layer Keeps Coming Back/ })).toBeVisible();

  const firstArticle = page.locator('a[href="/blog/consolidated-production-failure-ontology"]').first();
  await expect(firstArticle).toBeVisible();
  const box = await firstArticle.boundingBox();
  expect(box?.width ?? 0).toBeGreaterThan(250);
  expect(box?.height ?? 0).toBeGreaterThan(120);

  const bodyStyles = await page.evaluate(() => {
    const style = getComputedStyle(document.body);
    return { fontFamily: style.fontFamily, background: style.backgroundColor };
  });
  expect(bodyStyles.fontFamily).toBeTruthy();
  expect(bodyStyles.background).not.toBe("rgba(0, 0, 0, 0)");

  await expectNoDocumentOverflow(page);
  await expectNoRuntimeErrors(page);
});

test("ontology article renders ASCII charts inside styled prose", async ({ page }) => {
  await page.goto(postPath);

  await expect(page.getByRole("heading", { name: "Consolidated Production Failure Ontology" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Coverage Matrix" })).toBeVisible();
  await expect(page.getByText("The explicit gap is data integrity")).toBeVisible();
  await expect(page.getByRole("link", { name: "Book architecture review" })).toHaveAttribute(
    "href",
    "/contact?source=blog&article=consolidated-production-failure-ontology",
  );

  const prose = page.locator(".prose");
  await expect(prose).toBeVisible();

  const firstPre = page.locator(".prose pre").first();
  await expect(firstPre).toBeVisible();
  await expect(firstPre).toContainText("+------------------+");

  const preStyles = await firstPre.evaluate((node) => {
    const style = getComputedStyle(node);
    return {
      overflowX: style.overflowX,
      background: style.backgroundColor,
      fontFamily: style.fontFamily,
    };
  });
  expect(["auto", "scroll"]).toContain(preStyles.overflowX);
  expect(preStyles.background).not.toBe("rgba(0, 0, 0, 0)");
  expect(preStyles.fontFamily.toLowerCase()).toContain("mono");

  await expectNoDocumentOverflow(page);
  await expectNoRuntimeErrors(page);
});

test("semantic layer article is public and readable", async ({ page }) => {
  await page.goto(semanticPostPath);

  await expect(page.getByRole("heading", { name: "The Semantic Layer Keeps Coming Back" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Era 6: LLMs Make Semantics Hard To Ignore" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "What This Means For Process Intelligence" })).toBeVisible();
  await expect(page.getByText("Define business logic once; use it everywhere.")).toBeVisible();
  await expect(page.getByRole("link", { name: "Book architecture review" })).toHaveAttribute(
    "href",
    "/contact?source=blog&article=semantic-layer-history-evolution",
  );

  const prose = page.locator(".prose");
  await expect(prose).toBeVisible();
  await expect(page.locator(".prose pre").first()).toContainText("Raw data sources");

  await expectNoDocumentOverflow(page);
  await expectNoRuntimeErrors(page);
});

test("contact page exposes tracked intake and scheduler paths", async ({ page, request }, testInfo) => {
  await page.route("**/api/contact", async (route) => {
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });

  await page.goto("/contact?utm_source=qa&utm_campaign=funnel");

  await expect(page.getByRole("heading", { name: /Map one process/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /Send process brief/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Open scheduler/ })).toBeVisible();

  await page.getByPlaceholder("Name").fill("QA User");
  await page.getByPlaceholder("Work email").fill("qa@example.com");
  await page.getByPlaceholder("Company").fill("Sancalana QA");
  await page.getByRole("combobox").first().selectOption("incident-management");
  if (!testInfo.project.name.includes("mobile")) {
    await page.getByRole("button", { name: /Send process brief/ }).click();
    await expect(page).toHaveURL(/\/thank-you$/);
    await expect(page.getByText(/Request received/i)).toBeVisible();
  }

  const response = await request.post("/api/contact", {
    data: {
      name: "QA User",
      email: "qa@example.com",
      company: "Sancalana QA",
      process: "incident-management",
    },
  });
  expect([201, 503]).toContain(response.status());

  await expectNoDocumentOverflow(page);
  await expectNoRuntimeErrors(page);
});

test("admin shell and renamed blog redirect remain reachable", async ({ page, request }) => {
  await page.goto("/admin/index.html");
  await expect(page.locator("#nc-root")).toBeAttached();

  const config = await request.get("/admin/config.yml");
  expect(config.ok()).toBeTruthy();
  expect(await config.text()).toContain("namanag97/FE-swiss");

  const redirect = await request.get("/blog/building-meridian-architecture", { maxRedirects: 0 });
  expect([301, 302, 307, 308]).toContain(redirect.status());
  expect(redirect.headers().location).toContain("/blog/building-sancalana-architecture");
});
