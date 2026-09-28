import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Lenis from 'lenis'

import { rect, qs } from '@js/utils/common'
import events, { EVENTS } from '@js/events'

export default defineNuxtPlugin((nuxtApp) => {
    const { $resize } = nuxtApp

    let lenis = undefined
    let resize = undefined
    let tick = undefined

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

    const unmount = () => {
        if (tick) gsap.ticker.remove(tick)
        tick = null

        lenis?.destroy()
        lenis = null
    }

    const mount = () => {
        const mouse = $resize.mouse
        const wrapper = !mouse ? qs('[data-mobile-scroll]') : undefined
        const content = !mouse ? qs('[data-mobile-scroll-content]') : undefined

        ScrollTrigger.defaults({ scroller: wrapper ?? window })
        lenis = new Lenis({
            lerp: 0.15,
            wheelMultiplier: 1.25,
            autoResize: false,
            ...(wrapper && { wrapper, content }),
        })

        lenis.on('scroll', (lenis) => {
            ScrollTrigger.update()
            events.emit(EVENTS.APP_SCROLL, {
                y: lenis.scroll,
                target: lenis.targetScroll,
                lenis
            })
        })

        tick = (time) => {
            lenis.raf(time * 1000)
        }

        // GSAP TICKER
        gsap.ticker.add(tick)

        // SMOOTHING
        gsap.ticker.lagSmoothing(0)

        resize = () => {
            ScrollTrigger.refresh()
            lenis.resize()
        }

        $resize.add(() => {
            resize()
        })
    }

    mount()

    watch($resize.reactiveMouse, (value) => {
        if (!value) { document.body.classList.add('overflow-hidden') }
        else { document.body.classList.remove('overflow-hidden') }

        unmount()
        mount()

        ScrollTrigger.refresh()
    }, { immediate: true })

    return {
        provide: {
            scroll: {
                to,
                lenis,
                resize,
                get y() {
                    return lenis.scroll
                },
            },
        }
    }
})
