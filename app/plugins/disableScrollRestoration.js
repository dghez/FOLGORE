export default defineNuxtPlugin(() => {
    if (typeof window !== 'undefined') {
        window.history.scrollRestoration = 'manual'
    }
})
