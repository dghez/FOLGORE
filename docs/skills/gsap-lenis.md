# GSAP + Lenis

FOLGORE GSAP + Lenis stack: eases, effects, `$scroll`, ScrollTrigger sync, `APP_TICK`, and client-only plugin order.

**Use when:** animating, scrolling programmatically, using ScrollTrigger, or reading `$scroll` / `$resize` / `$device`.

All animation plugins are **client-only**. Order in `nuxt.config.ts` must stay:

`resize` → `scroll` → `ticker`

Do not reorder.

## `$scroll` (`app/plugins/scroll.js`)

```js
const { $scroll } = useNuxtApp()

$scroll.to(0)           // number = scroll Y
$scroll.to('#section')  // selector
$scroll.to(el, 1.2)     // Node + duration
$scroll.y               // current Lenis scroll
$scroll.lenis           // raw Lenis instance
```

Lenis uses `autoResize: false` — resize goes through `$resize` / `APP_RESIZE` (already wired).

## Frame loop and scroll events

```js
import { EVENTS, PRIORITY } from '@js/events'

useEvent(EVENTS.APP_TICK, ({ y, time, ratio, force }) => {
    // per-frame; force ≈ scroll lag
}, PRIORITY.high)

useEvent(EVENTS.APP_SCROLL, ({ y, target, lenis }) => {
    // Lenis scroll callback
}, PRIORITY.mid)
```

ScrollTrigger is already synced (`ScrollTrigger.update` on scroll; `refresh` + `lenis.resize` on resize). Do **not** add a second RAF to drive Lenis.

## Registered eases and effects (`app/plugins/gsap.js`)

| Name | Kind |
|------|------|
| `snappy`, `expo-hard`, `unmask` | CustomEase |
| `masks` | effect — `yPercent: 100` stagger (text unmask) |
| `fadeUps` | effect — `y: 5rem`, `alpha: 0` stagger |

```js
import { gsap } from 'gsap'

tl.masks('.line', {}, 0)
tl.fadeUps('.block', { stagger: 0.1 }, 0)
```

## SSR / prerender

Never read `$scroll`, `$resize`, or `$device` during SSR/prerender. `useNuxtApp()` at setup top-level is fine if values are only used inside callbacks or `onMounted`.

## reducedMotion

`$device.features.reducedMotion` is a **MediaQueryList** — check `.matches`. Nothing in the stack gates GSAP/Lenis on it today; gate yourself if required.

## Related

- [page-transitions](page-transitions.md) — page enter/leave timelines
- [event-bus](event-bus.md) — `useEvent` / `EVENTS`
