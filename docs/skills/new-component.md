# New component

Creates FOLGORE Vue components using the folder/`index.vue` convention, Library vs feature placement, and `LibraryImage`.

**Use when:** adding a component, Library primitive, Header chrome, or choosing Image vs JesperMedia.

## Folder convention

Path → auto tag:

| Path | Tag |
|------|-----|
| `app/components/Library/Image/index.vue` | `<LibraryImage />` |
| `app/components/Header/index.vue` | `<Header />` |
| `app/components/Foo/Bar/index.vue` | `<FooBar />` |

Always `…/<Name>/index.vue`. Never `Foo.vue` as a lone file in `components/`.

## Where it goes

- **Library/** — reusable primitives (Image, Intro, media helpers).
- **Feature / chrome** — site-specific UI at the group root (e.g. `Header/`).

## Images

- Static assets → `<LibraryImage src="..." :eager="false" alt="" />` (`app/components/Library/Image/index.vue`).
- CMS media → `<LibraryJesperMedia />` is **not ready** (`v-observe-vid`, `aspect-modern`, `media-fill` missing). Do not build on it.

## Intro

`<LibraryIntro />` is mounted once in `app/layouts/default.vue`. Do not remount per page.

## Events in components

Use `useEvent` / `usePageTransitionEvent` so listeners unbind on unmount. Do not call `events.on` / `events.off` directly in Vue SFCs. See [event-bus](event-bus.md).

## Skeleton

```vue
<script setup>
defineProps({
    label: {
        type: String,
        default: '',
    },
})
</script>

<template>
    <div class="…">
        <slot />
    </div>
</template>
```

## Related

- [css-scale](css-scale.md) — spacing / `text-*` / grid
- [new-page](new-page.md) — pages that consume components
