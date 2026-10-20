# Satum Digital — landing page

Marketing site + digital business card. SvelteKit + Vite, statically prerendered, deployed to Cloudflare Pages.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # outputs to ./build
npm run preview  # preview the production build
```

## Branching & deployment

- `master` → production. Merging here triggers a Cloudflare Pages deploy to **www.satumdigital.ca**.
- `development` → preview. Pushing here triggers a Cloudflare Pages preview deploy at `development.<project>.pages.dev`.
- Every other branch and PR also gets its own preview URL automatically.

### Workflow

1. Branch off `development` (or push directly to it for small changes).
2. Commit and push.
3. Open a PR `development` → `master`.
4. Merging the PR deploys to production. No manual deploy command.

## Routes

- `/` — company site for Satum Digital Inc.: Hero, ibelo (our first product), About, Client work (services and
  engagement models), FAQs, Contact. Title, description, preview tags and structured data are in
  `src/routes/(site)/+page.svelte`.
- `/card` — Michael's digital business card (vCard download, QR, contact links). `noindex` so it doesn't show up in search.

## Search and link previews

- The canonical address is `https://www.satumdigital.ca/`. `static/robots.txt` points to `static/sitemap.xml`
  (update its `lastmod` when the page changes).
- The page links to ibelo.app (the product section, FAQs, contact and footer), and ibelo.app links back. Keep
  those links on the plain `https://ibelo.app/` addresses (no tracking parameters), so search engines credit them
  to the right page.
- `static/og.png` is the link-preview image, drawn from `scripts/og.html`. Re-render it with
  `node scripts/render-og.mjs` (needs Chrome, and the brand kit next to this repo).
- Logos: `static/logo-mark.svg` is the black mark used on the page (header, footer, card). `static/favicon.svg` is
  for browser tabs only: it turns white in dark mode, so it would vanish on the white page.
- Location in public copy is "Ontario, Canada" only, with no street address.
