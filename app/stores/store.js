import { defineStore } from "pinia"

export const useMainStore = defineStore("main", () => {
    const isDebug = ref(false)
    const setIsDebug = (v) => (isDebug.value = v)

    const isMenuOpened = ref(false)
    const setIsMenuOpened = (v) => (isMenuOpened.value = v)

    return {
        isDebug, setIsDebug,
        isMenuOpened, setIsMenuOpened,
    }
})
