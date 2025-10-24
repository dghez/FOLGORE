import { gsap } from "gsap"
import { CustomEase } from "gsap/CustomEase"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default defineNuxtPlugin({
    name: 'gsap',
    parallel: true,
    async setup() {
        gsap.registerPlugin(CustomEase, ScrollTrigger)

        CustomEase.create("snappy", "M0,0 C0.094,0.026 0.124,0.127 0.157,0.29 0.197,0.486 0.254,0.8 0.348,0.884 0.42,0.949 0.374,1 1,1")
        CustomEase.create("expo-hard", "M0,0 C0.084,0.61 0.156,0.822 0.218,0.883 0.287,0.951 0.374,1 1,1")
        CustomEase.create("unmask", "M0,0 C0.16,1 0.3,1 1,1")

        // Staggered text mask
        gsap.registerEffect({
            name: 'masks',
            effect: (targets, config) => {
                return gsap.from(targets, {
                    duration: config.duration,
                    yPercent: 100,
                    stagger: config.stagger,
                    delay: config.delay,
                    ease: config.ease
                })
            },
            defaults: {
                duration: 1.5,
                stagger: .1,
                delay: 0,
                ease: 'unmask'
            },
            extendTimeline: true
        })

        // Staggered fade
        gsap.registerEffect({
            name: 'fadeUps',
            effect: (targets, config) => {
                return gsap.from(targets, {
                    duration: config.duration,
                    y: config.y,
                    alpha: 0,
                    stagger: config.stagger,
                    delay: config.delay,
                    ease: config.ease
                })
            },
            defaults: {
                y: '5rem',
                alpha: 0,
                duration: 1.5,
                stagger: .1,
                delay: 0,
                ease: 'unmask'
            },
            extendTimeline: true
        })
    }
})
