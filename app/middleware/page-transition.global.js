import { gsap } from 'gsap/all'
import events, { EVENTS } from '@js/events'

let leaveTl, enterTl, y
let isTransitioning = false

/**
 * If you need page events, use usePageTransitionEvent
 * To change transitionType > const transitionType = useTransitionType() > transitionType.value = whatever
 */

export default defineNuxtRouteMiddleware((to, from) => {
    if (isTransitioning) {
        console.log("BLOCKED: Transition already in progress")
        return abortNavigation()
    }

    const transitionType = useTransitionType()
    const { $scroll } = useNuxtApp()

    const t = {}

    t.css = false
    t.name = transitionType.value
    t.mode = '' // use in-out to give some time to the images to load
    // t.mode = transitionType.value === 'next' ? '' : 'out-in'

    /** ENTER */
    t.onBeforeEnter = (el) => {
        // UNFORTUNATELY THIS TRIGGERS ONLY ON PAGE CHANGE, NOT THE FIRST TIME.
        // SAME LOGIC IN onBeforeMount on layout
        el.classList.add(`page--${to.name}`)
        el.classList.add(`page--enter`)
    }

    t.onEnter = async(el, done) => {
        console.log(`%c PAGE:TRANSITION:ENTER [${from.name}=>${to.name}] :START || TYPE: [${transitionType.value}]`, 'background: #8FFE09; color: #222222; padding: 10px 10px 10px 0px;')

        const onComplete = () => {
            console.log(`%c PAGE:TRANSITION:ENTER [${from.name}=>${to.name}] :DONE  || TYPE: [${transitionType.value}]`, 'background: #8FFE09; color: #222222; padding: 10px 10px 10px 0px;')
            events.emit(EVENTS.PAGE_TRANSITION_ENTER_END, { to, from, el, tl: enterTl })
            events.emit(EVENTS.APP_RESIZE)
            done()

            isTransitioning = false // ENABLE TRANSITIONS
        }

        gsap.set(el, { autoAlpha: 0.01, y: 50 })

        enterTl?.kill()
        enterTl = gsap.timeline({ delay: 0.45 })

        enterTl
            .to(el, { duration: 0.35, autoAlpha: 1, y: 0, ease: 'power1.out' })
            .call(onComplete)

        // EMIT EVENT WITH TL HOOK
        await nextTick() // wait until is mounted or it won't listen the event
        events.emit(EVENTS.PAGE_TRANSITION_ENTER_START, { to, from, el, tl: enterTl })
    }

    /** LEAVE */
    t.onBeforeLeave = (el) => {
        isTransitioning = true // BLOCK TRANSITIONS

        y = $scroll.y

        $scroll.lenis.scrollTo(0, { immediate: true })
        gsap.set(el, { position: 'absolute', top: 0, left: 0, y: -y })
    }

    t.onLeave = async(el, done) => {
        console.log(`%c PAGE:TRANSITION:LEAVE [${from.name}=>${to.name}] :START || TYPE: [${transitionType.value}]`, 'background: #222222; color: #8FFE09; padding: 10px 10px 10px 0px;')
        const onComplete = () => {
            console.log(`%c PAGE:TRANSITION:LEAVE [${from.name}=>${to.name}] :DONE  || TYPE: [${transitionType.value}]`, 'background: #222222; color: #8FFE09; padding: 10px 10px 10px 0px;')
            events.emit(EVENTS.PAGE_TRANSITION_LEAVE_END, { to, from, el, tl: leaveTl })
            done()
        }

        leaveTl?.kill()
        leaveTl = gsap.timeline({ delay: 0.1 })

        leaveTl
            .to(el, { duration: 0.35, autoAlpha: 0, y: '-=50', ease: 'power1.in' })
            .call(onComplete, false)

        // EMIT EVENT WITH TL HOOK
        await nextTick()
        events.emit(EVENTS.PAGE_TRANSITION_LEAVE_START, { to, from, el, tl: leaveTl })
    }

    from.meta.pageTransition = t
    to.meta.pageTransition = t
})
