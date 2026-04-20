import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, max = 2000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

async function parseBody(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const parsed = await request.json();
    return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed) ? parsed as Record<string, unknown> : {};
  }

  const form = await request.formData();
  return Object.fromEntries(form.entries());
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  const wantsHtml = request.headers.get("accept")?.includes("text/html") === true;
  const respondError = (message: string, status: number) => {
    if (wantsHtml) {
      const redirectUrl = new URL("/contact", request.url);
      redirectUrl.searchParams.set("error", message);
      return NextResponse.redirect(redirectUrl, 303);
    }
    return NextResponse.json({ error: message }, { status });
  };

  try {
    body = await parseBody(request);
  } catch {
    return respondError("Invalid request body.", 400);
  }

  const name = text(body.name, 200);
  const email = text(body.email, 320).toLowerCase();
  const company = text(body.company, 200);
  const processName = text(body.process, 120);

  if (!name || !EMAIL_RE.test(email) || !company || !processName) {
    return respondError("Name, work email, company, and process are required.", 400);
  }

  const endpoint = process.env.CONTACT_WEBHOOK_URL;
  if (!endpoint) {
    return respondError("Contact intake is temporarily unavailable.", 503);
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      company,
      role: text(body.role, 200),
      process: processName,
      systems: text(body.systems, 500),
      urgency: text(body.urgency, 120),
      notes: text(body.notes),
      attribution: body.attribution,
      source: "marketing-contact",
      submittedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    return respondError("Contact intake could not be saved.", 502);
  }

  if (wantsHtml) {
    return NextResponse.redirect(new URL("/thank-you", request.url), 303);
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
