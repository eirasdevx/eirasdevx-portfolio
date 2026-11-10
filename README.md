# EIRAS.DEVX

Portfolio and independent app store of Serafín Eiras.
Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · fully static.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all routes prerendered)
npm run lint && npm run typecheck
```

## Configuration

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL, sitemap, Open Graph. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional. Empty hides every email button; GitHub stays as contact. |

Personal settings (availability, GitHub, hero photo, skills, hero stack) live in `src/data/site.ts`.

## Adding an app

Add one object to `src/data/apps.ts`. That entry feeds the store cards, the detail page (`/apps/<slug>`), search, filters, featured blocks, related apps, the sitemap and the hero counter. No component changes are needed.

- Add `websiteUrl` / `downloadUrl` / `repositoryUrl` **only** when public. Buttons appear automatically.
- Leave `version`, `releaseDate`, `updatedAt` undefined until they are real.
- Icons: `public/app-icons/<slug>.png` → `icon: "/app-icons/<slug>.png"`. Without one, a generated monochrome mark is used.
- Original logos: `logo` and `logoBackground` provide a contained brand cover until screenshots are available. Sources and the Gameiras typographic wordmark are documented in `public/app-logos/SOURCES.md`. Impostor has no public logo and retains its placeholder.
- Screenshots: `public/screenshots/<slug>/01.webp` → `screenshots: ["/screenshots/<slug>/01.webp"]`.
- `featured: true` puts the app in the Featured row and in the hero. The hero shows up to three visible featured apps and adapts its layout to how many there are (one large card with the real phone capture, two, or the original three-card composition).
- `hidden: true` keeps an entry in the catalog but publishes it nowhere: store, projects, detail pages (they return 404), hero, search, sitemap and counters all skip it. The filter lives only in `src/lib/catalog.ts`.

### Publishing policy

Only projects whose code is public on GitHub are shown. Right now that is **San Apptolín**, **FastPass** and **KGBA**; every other entry is `hidden: true`. To publish one, push its repository first, then in `src/data/apps.ts` delete its `hidden: true` line and add its `repositoryUrl`.

Case studies live in `src/data/projects.ts` and link to an app through `appSlug`. Name, status, stack and artwork come from the catalog, so nothing is duplicated. Any case-study field left undefined renders as "Documentation in progress".

## Published websites and screenshots

These six websites are linked from both the app catalog and the project portfolio:

| App slug | Public website | Suggested first screenshot |
|---|---|---|
| `fastpass` | https://fastpass-ticketmanager.netlify.app/ | `public/screenshots/fastpass/01.webp` |
| `cuadrilla-la-catola` | https://cuadrillalacatola.netlify.app/ | `public/screenshots/cuadrilla-la-catola/01.webp` |
| `carretazo` | https://carretazo.netlify.app/ | `public/screenshots/carretazo/01.webp` |
| `impostor` | https://impostor-eirasdevx.netlify.app/ | `public/screenshots/impostor/01.webp` |
| `gameiras` | https://gameiras.netlify.app/ | `public/screenshots/gameiras/01.webp` |
| `san-apptolin` | https://san-apptolin.netlify.app/ | `public/screenshots/san-apptolin/01.webp` |

Screenshots are pending; the existing decorative artwork remains until real captures are supplied. Capture the public interface with no browser toolbar or personal data, preferably at 1440 × 900. PNG and JPEG also work: use the matching extension in the catalog.

After saving a capture, add its public path to the matching entry in `src/data/apps.ts`, for example `screenshots: ["/screenshots/fastpass/01.webp"]`. The first screenshot automatically becomes the project cover and appears in the gallery. Set `coverImage` only if you want a separate cover. For phone captures, add `screenshotOrientation: "portrait"`: the gallery uses tall 1:2 tiles and the cover keeps the original logo instead of cropping the capture (San Apptolín works this way). Do not add image paths before the files exist.

## Logo

The logo lives in `public/brand/`. `logo.png` is white on a transparent background. `logo-black-bg.png` is the version on a black background, used for the favicon and the Open Graph image.

`site.logo.src` (in `src/data/site.ts`) points to the file. The logo is drawn as a mask, so it takes the surrounding text colour: black on the navbar and white in the footer. To change it, replace the file with another monochrome PNG/SVG on a transparent background. For the browser tab icon, replace `src/app/icon.png` and `src/app/apple-icon.png`.

The hero combines the original FastPass, Carretazo and La Catola logos with editorial artwork and links to their project pages. These covers are not screenshots. Edit `src/components/hero/HeroVisual.tsx` and the showcase styles in `src/app/globals.css`; hero copy and service labels live in both language dictionaries. The primary action opens the contact page.

## App colours

Each published app's `theme` in `src/data/apps.ts` supplies its background, surfaces, text and button colours. `appThemeStyle` scopes these tokens to cards and detail pages, so related apps keep their own colours. `logoBackground` controls the surface directly behind an original logo; La Catola uses `#2d173d` consistently in the hero, icons and covers.

## Card motion

The three hero cards retain their layout and base angles in stationary `.showcase-slot` wrappers. Their links use separate CSS properties for floating (`translate`, 3–4 px over 6.2–7.6 seconds) and interaction (`transform`, 560 ms). Hover never changes the animation declaration, so its phase continues while the card lifts and returns. Coarse pointers use a 1.5 px float with no hover transform; reduced motion keeps the cards static at their original angles.

`CardStage` uses one IntersectionObserver and a visibility listener to pause CSS animation timelines off screen or in a hidden tab. It does not track the cursor or run animation-frame loops. Preview normal/reduced motion, touch and rapid pointer changes in a browser when browser access is available.

## Languages (ES / EN)

Spanish is the default and uses clean URLs (`/`, `/apps`…). English lives under `/en/…`. The ES/EN switch in the navbar keeps the current page.

- **Interface texts:** `src/i18n/dictionaries/es.ts` (the reference shape) and `en.ts`. TypeScript flags a missing key.
- **Content:** every text in `src/data/apps.ts` and `src/data/projects.ts` takes `{ es, en }`.
- **Routing:** handled by `src/proxy.ts`. It rewrites unprefixed URLs to the `[lang]` segment and redirects `/es/…` to the clean URL. All pages are still prerendered.

## Moving to a database

Components never import `src/data/*` directly. They go through `src/lib/catalog.ts`. To move to Supabase or PostgreSQL, rewrite those functions (they can become `async`) and keep the `StoreApp` type from `src/types/app.ts`. That type already includes optional `releases`, `files` (with `checksum` for integrity) and `stats` for future versioning, downloads and analytics.

## Deploy

Works on Vercel or Netlify with zero config (framework preset: Next.js). Set the env variables above in the dashboard.

The previous static template was moved to `legacy-static/` and is not part of the build.
