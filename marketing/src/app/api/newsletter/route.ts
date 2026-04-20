import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = typeof body === "object" && body !== null && "email" in body
    ? String((body as { email?: unknown }).email ?? "").trim().toLowerCase()
    : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  const endpoint = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!endpoint) {
    return NextResponse.json(
      { error: "Newsletter signup is temporarily unavailable." },
      { status: 503 },
    );
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      email,
      source: "marketing-footer",
      submittedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Newsletter signup could not be saved." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
