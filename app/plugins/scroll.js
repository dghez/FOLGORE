import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Lenis from 'lenis'

import { rect, qs } from '@js/utils/common'
import events, { EVENTS } from '@js/events'

export default defineNuxtPlugin((nuxtApp) => {
    const { $resize } = nuxtApp

    const to = (target = 0, d = 1) => {
        const type = typeof target
        let t = 0

        if (type === 'number') {
            t = target
        } else if (type === 'string') {
            const element = qs(target)
            if (element) {
                t = rect(element).top + lenis.scroll
            } else {
                console.error('Target is a string but no element was found')
            }
        } else if (target instanceof Node) {
            t = rect(target).top + lenis.scroll
        } else {
            console.error('Target is neither a number, a string, nor a node')
        }

        lenis.scrollTo(t, {
            duration: d,
            easing: x => x === 0
                ? 0
                : x === 1
                    ? 1
                    : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
                        : (2 - Math.pow(2, -20 * x + 10)) / 2
        })
    }

    const lenis = new Lenis({
        lerp: 0.15,
        wheelMultiplier: 1.25,
        autoResize: false
    })

    lenis.on('scroll', (lenis) => {
        ScrollTrigger.update()

        events.emit(EVENTS.APP_SCROLL, {
            y: lenis.scroll,
            target: lenis.targetScroll,
            lenis
        })
    })

    // GSAP TICKER
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
    })

    // SMOOTHING
    gsap.ticker.lagSmoothing(0)

    $resize.add(() => {
        ScrollTrigger.refresh()
        lenis.resize()
    })

    return {
        provide: {
            scroll: {
                to,
                lenis,
                get y() {
                    return lenis.scroll
                },
            },
        }
    }
})
