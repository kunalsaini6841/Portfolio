# Kunal Saini — Portfolio

Personal portfolio for a Data Scientist / GenAI Engineer. Static-rendered
Next.js, no client-side data fetching, no backend.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build — all routes prerender static
npm start            # serve the production build
npm run lint         # ESLint
npm run visual-check # screenshots + overflow/a11y audit (needs `npm start` running)
```

`visual-check` requires Chromium once: `npx playwright install chromium`.

## Where the content lives

All copy is data, not markup. Edit these and every surface updates:

| File | Contains |
|---|---|
| `src/data/profile.ts` | Name, contact, headline, about, stats, education, certifications |
| `src/data/experience.ts` | Roles, bullets, tech per role |
| `src/data/skills.ts` | Capability groups |
| `src/data/projects.ts` | Projects and full case-study content |

`content/blueprint.md` is the planning document — positioning, project
evidence inventory, and open decisions. Not shipped to the site.

### Adding a project

Append to `src/data/projects.ts`. A project renders as a large card when
`featured: true`, otherwise in the compact grid. Adding a `caseStudy` object
generates `/projects/<slug>` and adds it to the sitemap automatically.

Link buttons render conditionally — omit `repo` or `demo` and no button
appears. Never point one at a repo that doesn't exist publicly.

## Design system

Tokens live in `src/app/globals.css`. Light is the designed default; dark is
a separate deliberate palette, applied via `data-theme` on `<html>` and set
before first paint by an inline script in `layout.tsx`.

- Type: Instrument Serif (display) · Inter (body) · JetBrains Mono (labels)
- Motion is CSS-only on `transform`/`opacity`, disabled under
  `prefers-reduced-motion`
- Colours are oklch; change the `:root` block and the whole site follows

## Deploying

Set `NEXT_PUBLIC_SITE_URL` to the final origin so canonical URLs, OG tags,
JSON-LD and the sitemap resolve correctly. Without it Vercel's generated
production URL is used, which still works but is uglier in search results.
