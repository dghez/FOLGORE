# FOLGORE — Agent Guide

Nuxt 4 starter for creative/animation-heavy websites: Lenis smooth scroll, GSAP, Tailwind 4, Pinia, custom page transitions, and a priority-based event bus. Statically generated (`nuxt generate`), no server routes.

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run generate` — static production build (this is the deploy target, not `build`)
- `npm run preview` — preview the generated output
- Node version is pinned in `.nvmrc`

## Code style

- Plain JavaScript, not TypeScript (despite `tsconfig.json` — do not convert files to TS)
- 4-space indentation, no semicolons, single quotes (enforced by ESLint, see `eslint.config.js`)
- `@js/*` alias resolves to `app/assets/js/*` (defined in both `nuxt.config.ts` and `tsconfig.json` — keep them in sync if you touch aliases)
- Components live in folders with an `index.vue` (e.g. `app/components/Library/Image/index.vue`, used as `<LibraryImage />`)

## Architecture

### Plugins (all client-only, registered in `nuxt.config.ts`)

Plugins provide app-wide singletons via injection. Order matters: `resize` must load before `scroll`, and `scroll` before `ticker`.

- `$resize` — window dimensions and breakpoints (`ww`, `wh`, `small`, `mouse`, `bounds`), plus `add(cb)`/`remove(cb)` for resize callbacks. Driven by a debounced `ResizeObserver`.
- `$scroll` — Lenis instance (`lenis`), current position (`y`), and `to(target, duration)` for animated scrolling. Lenis is driven by the GSAP ticker and keeps ScrollTrigger in sync.
- `$device` — user agent info (via `detect-ua`) and feature flags (`hasTouch`, `lowPowerMode`, `reducedMotion`, ...)
- `gsap` — registers `CustomEase` (`snappy`, `expo-hard`, `unmask`) and effects (`masks`, `fadeUps`)
- `debug` — sets `isDebug` in the Pinia store from the `?debug` query param
- `disableScrollRestoration`, `ticker` — self-explanatory

Because everything is client-only, never access `$scroll`/`$resize`/`$device` in code that runs during SSR/prerender (top-level of `setup` is fine only if the value is used inside callbacks or `onMounted`).

### Event bus (`app/assets/js/events/`)

A vanilla emitter (not Vue-reactive) shared between Vue and plain JS. Event names live in the `EVENTS` map (`APP_TICK`, `APP_RESIZE`, `APP_SCROLL`, `PAGE_TRANSITION_*`); callbacks accept a `PRIORITY` to control invocation order (lower runs first). Always add new event names to `EVENTS` — `on()` warns on unknown events.

In components, do not call `events.on/off` directly; use the composables below so listeners are cleaned up on unmount.

### Composables

- `useEvent(event, cb, priority)` — bind/unbind an event bus listener over the component lifecycle
- `usePageTransitionEvent(event, cb)` — like `useEvent` but scoped to the current route (fires only when the transition involves this page)
- `useSeo({ title, description, image })` — per-page meta tags; base values are constants at the top of `app/composables/useSeo.js`
- `useStaticStore(id)` / `useReactiveStore(id)` — Pinia access; static returns the raw store (destructure actions), reactive returns `storeToRefs` (destructure state). New stores must be registered in the `stores` map inside both composables.
- `useTransitionType()` — shared state that selects which transition the middleware runs

### Page transitions (`app/middleware/page-transition.global.js`)

All transitions are defined in this global middleware using GSAP timelines. It emits `PAGE_TRANSITION_{ENTER,LEAVE}_{START,END}` on the event bus with the timeline attached (`{ to, from, el, tl }`), so pages hook into transitions via `usePageTransitionEvent` and add tweens to `tl` rather than editing the middleware. Navigation is blocked (`abortNavigation`) while a transition is in flight.

## Conventions and gotchas

- Site identity (URL, name) is configured in the `site` key of `nuxt.config.ts` and duplicated in `useSeo.js` constants — a new project must update both.
- Global CSS lives in `app/assets/css/` (`main.css` imports `typography.css`, `variables.css`, `tailwind.css`). The root font size is fluid (based on `--size` in `variables.css`), so `rem` values scale with the viewport — prefer `rem` over `px`.
- Layout primitives: `.site-max` (padded container) and `.main-grid` (6-col mobile / 12-col desktop grid) from `main.css`.
- `<LibraryImage />` for static images (lazy load + fade-in), `<LibraryJesperMedia />` for CMS media objects (responsive image/video, not ready for use).
- Do not commit `.DS_Store`, `dist`, `.output`, or `.nuxt`.
