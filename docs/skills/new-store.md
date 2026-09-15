# New store

Adds a FOLGORE Pinia store and registers it in both `useStaticStore` and `useReactiveStore`.

**Use when:** creating a new store, accessing state/actions via those helpers, or wiring Pinia in components/plugins.

## Checklist

1. Add a setup store under `app/stores/` (plain JS), matching `app/stores/store.js`.
2. Register the factory in **both** maps:
   - `app/composables/useStaticStore.js`
   - `app/composables/useReactiveStore.js`
3. Missing either registration throws `Cant find <id> store`.
4. Do not call `useMainStore()` (or the raw store) from components — use the helpers.

## Define

```js
// app/stores/cart.js
export const useCartStore = defineStore('cart', () => {
    const items = ref([])

    const setItems = (v) => {
        items.value = v
    }

    return { items, setItems }
})
```

## Dual register

```js
// useStaticStore.js AND useReactiveStore.js
import { useMainStore } from '@/stores/store'
import { useCartStore } from '@/stores/cart'

const stores = {
    main: useMainStore,
    cart: useCartStore,
}
```

## Access

```js
// actions / setters — raw store
const { setItems } = useStaticStore('cart')

// reactive state — storeToRefs
const { items } = useReactiveStore('cart')
```

Example in-repo: `app/plugins/debug.js` uses `useStaticStore('main')` for `setIsDebug`.
