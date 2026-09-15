# Event bus

FOLGORE priority event bus: register `EVENTS`, use `PRIORITY` keys, and bind via `useEvent`.

**Use when:** adding `APP_TICK` / `APP_RESIZE` / `APP_SCROLL` listeners, custom bus events, or choosing `useEvent` vs the raw emitter.

Vanilla emitter in `app/assets/js/events/` (not Vue-reactive). Shared between Vue and plain JS.

## Register events

Add every new name to the `EVENTS` map in `app/assets/js/events/index.js`:

```js
const EVENTS = {
    // …
    'MY_EVENT': 'APP:MY:EVENT',
}
```

`on()` warns if the event string is not in `Object.values(EVENTS)`. Always emit with `EVENTS.MY_EVENT`, not ad-hoc strings.

## PRIORITY (lowercase keys)

```js
PRIORITY.first   // -10 — runs first
PRIORITY.instant // 0
PRIORITY.high    // 10
PRIORITY.mid     // 20
PRIORITY.low     // 30
```

Lower number runs first. **Use lowercase keys** (`PRIORITY.instant`). `PRIORITY.INSTANT` is `undefined` (composables currently default to that; Emitter falls back to `0`). Prefer passing an explicit lowercase key.

## Vue: use composables

```js
import { EVENTS, PRIORITY } from '@js/events'

useEvent(EVENTS.APP_RESIZE, ({ ww, wh, small }) => {
    // …
}, PRIORITY.high)
```

`useEvent` binds on mount and unbinds on unmount. Do **not** call `events.on` / `events.off` directly in SFCs.

Page transition hooks → `usePageTransitionEvent` (see [page-transitions](page-transitions.md)).

## Plugins / plain JS

```js
import events, { EVENTS, PRIORITY } from '@js/events'

const off = events.on(EVENTS.APP_TICK, (payload) => { /* … */ }, PRIORITY.mid)
// later: off() or events.off(EVENTS.APP_TICK, cb)
```

## Built-in events

| Key | Typical payload |
|-----|-----------------|
| `APP_TICK` | `{ y, time, ratio, force }` |
| `APP_RESIZE` | `{ ww, wh, small }` |
| `APP_SCROLL` | `{ y, target, lenis }` |
| `PAGE_TRANSITION_*_{START,END}` | `{ to, from, el, tl }` |

## Related

- [gsap-lenis](gsap-lenis.md) — tick / scroll / GSAP
- [page-transitions](page-transitions.md) — transition timelines
