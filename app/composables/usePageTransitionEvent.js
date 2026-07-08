import { onMounted, onUnmounted } from 'vue'
import events, { EVENTS, PRIORITY } from '@js/events'

export const usePageTransitionEvent = (event, cb, priority = PRIORITY.INSTANT) => {
    const route = useRoute()

    const enterEvents = [EVENTS.PAGE_TRANSITION_ENTER_START, EVENTS.PAGE_TRANSITION_ENTER_END]
    const leaveEvents = [EVENTS.PAGE_TRANSITION_LEAVE_START, EVENTS.PAGE_TRANSITION_LEAVE_END]

    const internalCb = (v) => {
        if (v.to.name === route.name && enterEvents.includes(event)) {
            // console.log(`hey I'm ${event}`, { toName: v.to.name, routeName: route.name })
            cb(v)
        }
        //
        else if (v.from.name === route.name && leaveEvents.includes(event)) { // is correct to be, counterintuitive because route doesn't change state
            // console.log(`hey I'm ${event}`, { fromName: v.from.name, routeName: route.name })
            cb(v)
        }
    }
    onMounted(() => {
        events.on(event, internalCb, priority)
    })

    onUnmounted(() => {
        events.off(event, internalCb)
    })
}
