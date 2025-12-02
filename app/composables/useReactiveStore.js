import { storeToRefs } from "pinia"
import { useMainStore } from "@/stores/store"

const stores = {
    main: useMainStore,
}

export const useReactiveStore = (id = 'main') => {
    if (!Object.keys(stores).includes(id)) {
        throw new Error(`Cant find ${id} store`)
    }
    const store = stores[id]()

    return storeToRefs(store)
}
