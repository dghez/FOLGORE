# New page

Adds a FOLGORE Nuxt page with `site-max` layout, `useSeo`, `LibraryImage`, and `NuxtLink` navigation.

**Use when:** creating a new route, `app/pages/*.vue` screen, page SEO, or wiring a page into the header nav.

## Checklist

1. Create `app/pages/<name>.vue` — plain JS, 4-space indent, no semicolons (see [AGENTS.md](../../AGENTS.md)).
2. Wrap content in `.site-max`. Use `.main-grid` when laying out columns. See [css-scale](css-scale.md) for spacing/`text-*` math.
3. Call `useSeo` in `<script setup>`.
4. Static images: `<LibraryImage src="..." />`. Do not use `NuxtImg`.
5. Link with `<NuxtLink>` from `app/components/Header/index.vue` (or the page). Global transition middleware already runs.
6. Page-specific enter/leave motion → follow [page-transitions](page-transitions.md). Do **not** edit `app/middleware/page-transition.global.js` for one page’s tweens.
7. First visit has **no** enter transition. First-paint motion belongs in `onMounted` (or Intro), not `PAGE_TRANSITION_ENTER_START`.

## useSeo

```js
useSeo(
    { title: 'About', description: 'Short page description' },
    'About'
)
```

Signature: `useSeo({ title, description, image }, pageTitle, slug)`.

Site identity (`BASE_URL`, `BASE_TITLE_TEMPLATE` in `app/composables/useSeo.js` and `site` in `nuxt.config.ts`) is updated only when bootstrapping a real project — not per page.

## Skeleton

```vue
<script setup>
useSeo(
    { title: 'Page', description: 'Description' },
    'Page'
)
</script>

<template>
    <div class="site-max">
        <div class="pt-100">
            <h1 class="f-h1">Title</h1>
        </div>
    </div>
</template>
```

## Related

- [css-scale](css-scale.md) — layout / spacing
- [page-transitions](page-transitions.md) — enter/leave GSAP
- [new-component](new-component.md) — new components
