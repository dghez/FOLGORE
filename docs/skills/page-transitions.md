# Page transitions

Extends FOLGORE GSAP page transitions via `usePageTransitionEvent` timelines.

**Use when:** adding enter/leave animation, hooking `PAGE_TRANSITION_*` events, `useTransitionType`, or changing route transition behavior.

Base fade lives in `app/middleware/page-transition.global.js`. Pages **append** tweens to the emitted timeline — do not fork middleware for page-specific motion.

## Hook from a page

```js
import { EVENTS } from '@js/events'

usePageTransitionEvent(EVENTS.PAGE_TRANSITION_ENTER_START, ({ tl, el }) => {
    tl.fadeUps('.my-lines', { stagger: 0.08 }, '-=0.2')
})

usePageTransitionEvent(EVENTS.PAGE_TRANSITION_LEAVE_START, ({ tl }) => {
    // optional leave tweens on leaveTl
})
```

Payload: `{ to, from, el, tl }`.

`usePageTransitionEvent` scopes callbacks: enter only when `to.name` matches the current route; leave when `from.name` matches.

## Prefer registered GSAP effects

From `app/plugins/gsap.js` (also see [gsap-lenis](gsap-lenis.md)):

- Effects: `masks`, `fadeUps` (timeline-extendable: `tl.masks(...)`, `tl.fadeUps(...)`)
- Eases: `snappy`, `expo-hard`, `unmask`

## Gotchas

1. **First load** — `onBeforeEnter` / enter events do **not** run on cold visit. First-paint motion → `onMounted` or Intro.
2. **Leave scroll freeze** — middleware captures `$scroll.y`, jumps Lenis to `0` immediately, absolute-positions the leaving page. Do not call `window.scrollTo` during transitions.
3. **Nav lock** — `abortNavigation()` while `isTransitioning`. Rapid clicks fail until the timeline finishes.
4. **`useTransitionType()`** — defaults to `'page'`. Middleware sets `t.name` from it but does **not** branch on type yet. Changing `.value` only names the transition until middleware gains `t.name` logic. Do not invent extra middleware files.

## Related

- [gsap-lenis](gsap-lenis.md) — GSAP / Lenis / ScrollTrigger
- [event-bus](event-bus.md) — event names / priority
- [new-page](new-page.md) — new page wiring
