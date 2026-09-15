# CSS scale and layout

FOLGORE fluid rem scale, Tailwind spacing/text utilities, `sm=650` breakpoints, and `site-max` / `main-grid` layout.

**Use when:** writing CSS/Tailwind classes, spacing, typography sizes, layout grids, or mobile viewport height.

## Rem root (not fixed 16px)

`--size` is `390` (mobile) / `1500` at `sm` (`app/assets/css/variables.css`). Root `font-size` in `main.css`:

```css
font-size: clamp(1px, calc(10 * (100vw / var(--size))), 14px);
```

Prefer `rem` over `px`. Design units scale with the viewport.

## Spacing and `text-*` are design units

`--spacing: 0.1rem` (`tailwind.css`) → utility numbers are **not pixels**:

| Class | Meaning |
|-------|---------|
| `pt-100` | `10rem` padding-top |
| `h-70` | `7rem` height |
| `max-w-200` | `20rem` max-width |
| `text-14` | `1.4rem` font-size (`N * 0.1rem`) |

Using a default Tailwind mental model (where `p-4` ≈ 16px) produces huge or tiny UI.

## Breakpoints

`sm` is **650px** (not Tailwind’s 640). `$resize.small` is `max-width: 649px`.

Useful variants: `max-sm`, `has-hover`, `landscape`, `portrait`, `portrait-large`.

## Layout primitives (`main.css`)

- `.site-max` — padded full-width container (`--containerPadding`)
- `.main-grid` — 6 columns mobile, 12 at `sm`

Type helpers like `.f-h1` live in `app/assets/css/typography.css`.

## Mobile viewport height

`app/layouts/default.vue` sets `--vh` from `$resize.wh` on `APP_RESIZE`. Prefer `var(--vh)` patterns over raw `100vh` when matching the layout.

## Related

- [new-page](new-page.md) — pages using these classes
- [new-component](new-component.md) — components using these classes
