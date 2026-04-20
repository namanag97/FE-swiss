# Analytics And Conversion Setup

The marketing site tracks the funnel from visit to booked call:

```text
visitor -> article/page view -> CTA click -> contact form start -> contact submit -> booked call
```

## Required Vercel Environment Variables

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
CONTACT_WEBHOOK_URL=https://...
NEWSLETTER_WEBHOOK_URL=https://...
```

`CONTACT_WEBHOOK_URL` and `NEWSLETTER_WEBHOOK_URL` should point at the real system of record: HubSpot, Airtable, Customer.io, Loops, Zapier, Make, or an internal API. PostHog is used for analytics, not lead storage.

## Tracked Events

```text
$pageview
blog_article_viewed
cta_clicked
blog_cta_clicked
secondary_cta_clicked
contact_form_started
contact_form_submit_clicked
contact_form_submitted
contact_form_saved
contact_mailto_fallback_clicked
calendar_direct_opened
calendar_booking_started
calendar_booking_completed
newsletter_submit_clicked
newsletter_signup
share_clicked
performance_navigation
performance_web_vital
```

## Recommended PostHog Dashboard

Create one dashboard with:

- Visitors by source and landing page.
- Blog article views by slug.
- CTA clicks by location.
- Contact form starts vs. saved submissions.
- Calendar booking starts and completions.
- Newsletter signups.
- Navigation timing and web vitals trend.

Use this funnel:

```text
$pageview
  -> cta_clicked OR blog_cta_clicked
  -> contact_form_started
  -> contact_form_saved
```

Segment by:

```text
utm_source
utm_medium
utm_campaign
landing_page
referrer
page_path
```

## Publishing And Performance

Blog content can now be runtime-loaded from GitHub. Keep `BLOG_REVALIDATE_SECONDS` at 300 seconds or higher unless there is a strong reason to refresh faster.

Use externally hosted article images from the approved media host for no-build publishing. Adding new local files under `public/` still requires a Vercel deployment.
