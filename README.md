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

- `/` — marketing site (Hero, About, Services, Process, Engagement, FAQs, CTA)
- `/card` — Michael's digital business card (vCard download, QR, contact links). `noindex` so it doesn't show up in search.
