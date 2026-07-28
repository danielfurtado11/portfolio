# Daniel Furtado — Portfolio ("Daniel OS")

An interactive, **Windows XP + Aero**-inspired portfolio. It boots up, shows a
personalized login screen (avatar, animated name, green "Bliss"-style hills) and
opens into a fully working desktop where every section of the portfolio is a
draggable "app" window — with a taskbar, Start menu, a real Minesweeper, an
interactive terminal, floating gadgets and mouse-reactive parallax.

Built with **React + Vite + TypeScript**, bilingual **PT/EN**, and deployable to
**Vercel**. All Windows-style artwork (wallpaper, icons, startup sound) is
**original** (SVG / CSS / Web Audio) — no Microsoft assets are used.

## Quick start

```bash
npm install      # install dependencies
npm run dev      # start the dev server → http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # preview the production build locally
```

## The experience

1. **Boot** — animated splash with a progress bar (auto-advances, click/press to skip).
2. **Login** — a glass card over rolling green hills: avatar, animated "Daniel
   Furtado" name, rotating taglines, and an **Enter** button. Language (PT/EN),
   sound and day/night toggles live in the corner.
3. **Desktop** — desktop icons, a taskbar with a green **Start** button, Start
   menu, live clock, Aero gadgets, and windows you can drag, resize, minimize,
   maximize and close.

### Apps

About Me · Experience · Education · Skills · Projects · Erasmus & Networks ·
Contact · CV.pdf · Minesweeper 💣 · Terminal 🖥️ · Recycle Bin 🗑️

Terminal commands: `help`, `whoami`, `about`, `skills`, `projects`,
`experience`, `education`, `contact`, `open <app>`, `date`, `sudo`, `clear`.

## Editing content

All content is **typed and bilingual** in [`src/data/`](src/data/) — edit these,
no UI changes needed:

| File | What |
| --- | --- |
| `profile.ts` | Name, bio, taglines, interests, avatar/photo paths |
| `experience.ts` | Work timeline |
| `education.ts` | Degrees |
| `skills.ts` | Skill groups + bar levels |
| `projects.ts` | Project cards + links (repo/demo) |
| `erasmus.ts` | Erasmus+, networks, mentoring |
| `contact.ts` | Contact links |

UI strings (buttons, labels) live in [`src/i18n/strings.ts`](src/i18n/strings.ts).

### Assets

- `public/assets/avatar.jpg` — square login avatar (cropped from your photo).
- `public/assets/profile-full.jpg` — full photo used in "About Me".
- `public/cv/Daniel-Furtado-CV.pdf` — the downloadable CV.
- `public/favicon.svg` — the little four-tile logo.

To use the **original** Windows startup sound / Bliss wallpaper instead of the
recreations, drop your files in `public/assets/` and swap the references (see
`src/lib/sfx.ts` and `src/components/Wallpaper.tsx`).

## Project structure

```
src/
├─ App.tsx                 Stage machine (boot → login → desktop)
├─ stages/                 BootScreen, LoginScreen, Desktop
├─ desktop/                Window, WindowManager, Taskbar, StartMenu, icons, gadgets
├─ apps/                   One component per window + apps.config.ts + registry.tsx
├─ components/             Wallpaper, AppIcon (SVG set), BrandLogo, XPButton
├─ store/useOS.ts          Zustand store: windows, focus, language, sound, theme
├─ i18n/                   Bilingual helpers + string table
├─ hooks/                  useDrag, useMediaQuery, useNow, useViews
├─ lib/sfx.ts              Synthesized Web Audio sound engine
├─ data/                   All portfolio content (typed, PT/EN)
└─ theme/                  tokens.css, xp-aero.css, apps.css, responsive.css
```

## Deploy (Vercel)

1. Push the repo to GitHub.
2. Import it in Vercel — it auto-detects Vite (`vercel.json` is included).
3. Deploy. That's it.

Or from the CLI: `npx vercel`.

## Visitor counter

The retro odometer gadget on the desktop is served by `api/views.ts` (a Vercel Edge
Function) backed by an Upstash Redis key. To enable it:

1. Vercel dashboard → project → **Storage** → **Upstash Redis** → create a database
   (the free tier is plenty) and connect it to the project.
2. Redeploy. The integration injects `KV_REST_API_URL` / `KV_REST_API_TOKEN`
   automatically — no code changes needed.

Without those env vars the endpoint returns `{ views: null }` and the gadget simply
doesn't render, so `npm run dev` stays clean. For local testing use `npx vercel dev`
with a `.env.local` (see `.env.example`).

Counting rules: one increment per browser (localStorage flag) *and* per IP per day
(Redis `SET NX EX`), with known bot user-agents skipped. To reset the number, delete
the `portfolio:views` key in the Upstash console.

## Notes / to confirm

- **AgroMoreira demo** points to `https://agromoreira.vercel.app/`.
- **Dissertation** has no public repo yet — add a link in `projects.ts` when ready.
- Social links shown: LinkedIn, GitHub, email, phone (Instagram/Twitter omitted).
- The **background figure** ([`src/components/PixelRunner.tsx`](src/components/PixelRunner.tsx))
  cycles through Daniel's own pixel emotes in `public/assets/emotes/` and can be
  **grabbed and dragged** with the mouse (drop it anywhere; it carries on). To add
  or change emotes, drop transparent PNGs in that folder and edit the `EMOTES` array.
  The originals live in the repo root as `*_emote.png` (processed with alpha cutout +
  crop + resize into `public/assets/emotes/`).
- **Cursor + click spark**: enlarged normal arrow/hand cursors in
  [`src/theme/globals.css`](src/theme/globals.css) and the click burst in
  [`src/components/ClickFX.tsx`](src/components/ClickFX.tsx).
- **Night mode** (🌙 toggle) only changes the sky/hills so all windows stay readable.

## Tech

React 19 · Vite 6 · TypeScript · Zustand · Framer Motion · Web Audio API.
