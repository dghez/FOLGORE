import { gsap } from 'gsap'
import events, { EVENTS } from '@js/events'

export default defineNuxtPlugin((nuxtApp) => {
    const { $scroll } = nuxtApp
    const { lenis } = $scroll

    const tick = (time) => {
        events.emit(EVENTS.APP_TICK, {
            y: lenis.scroll,
            time,
            ratio: gsap.ticker.deltaRatio(60),
            force: lenis.scroll - lenis.targetScroll
        })
    }

    gsap.ticker.add(tick)

    return {
        provide: {}
    }
})
