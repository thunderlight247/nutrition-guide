# Nutrition Guide by Small Madam — Website

A Next.js (App Router, TypeScript, Tailwind CSS) website for Nutrition
Guide by Small Madam, an independent Herbalife distributor in Kumasi,
Ghana.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploy to Vercel (Version 1)

1. Push this folder to a GitHub repository.
2. Go to https://vercel.com/new and import that repository.
3. Framework preset: Next.js (auto-detected). No environment variables
   are required for Version 1.
4. Deploy. Vercel will give you a URL like
   `nutrition-guide-by-small-madam.vercel.app` — share that with the
   client for review.

The contact form sends submissions through Resend. Configure these
server-only environment variables locally and in the production host:

- `RESEND_API_KEY` — a Resend API key.
- `CONTACT_FROM_EMAIL` — a sender address verified with Resend.

The recipient is the business email in `src/data/business.ts`. Without
the required Resend configuration, the form reports that it is unavailable
and does not redirect to the contact success page.

## Editing business information

All business details (name, phone, email, address, hours, services,
product categories, and the WhatsApp message) live in one place:

```
src/data/business.ts
```

Update that file and the whole site updates — header, footer, hero,
contact section, and every WhatsApp/call button.

## Adding tracking later (Google Ads / GA4 / GTM)

Every WhatsApp, call, and email link goes through:

- `src/lib/links.ts` — the URL builders
- `WhatsAppButton.tsx` / `CallButton.tsx` — the reusable CTA components

Each rendered CTA already carries `data-cta` and `data-cta-id`
attributes, so once Google Tag Manager or GA4 is added, you can bind
conversion events to `[data-cta="whatsapp"]`, `[data-cta="call"]`, and
`[data-cta="email"]` without touching the component code.

## Adding campaign landing pages later

Add new folders under `src/app/`, e.g. `src/app/wellness/page.tsx`,
and compose them from the existing components in `src/components/`
and `src/components/sections/`. Each section is already a standalone,
reusable piece.

## Images

Real client photographs and product photography live in
`public/images/`. Replace or add files there and reference them with
`next/image` for automatic optimization.

## Custom domain (later)

The intended domain, `nutritionguide.xyz`, is referenced in
`src/app/layout.tsx` (metadata) and `src/app/sitemap.ts` /
`src/app/robots.ts`. Once the domain is purchased and connected in
Vercel, no code changes are needed — everything already points to it.
