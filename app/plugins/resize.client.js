import debounce from 'lodash-es/debounce'
import events, { EVENTS } from '@js/events'

export default defineNuxtPlugin(() => {
    const cbs = new Set()
    const o = ref(null)

    const ww = useState(
        '_width', () => document.documentElement.clientWidth
    )
    const wh = useState(
        '_height', () => document.documentElement.clientHeight,
    )
    const small = useState(
        '_small', () => window.matchMedia('(max-width: 649px)').matches,
    )
    const mouse = useState(
        '_mouse', () => window.matchMedia('(hover: hover) and (pointer: fine)').matches,
    )

    const resize = debounce(() => {
        ww.value = document.documentElement.clientWidth
        wh.value = document.documentElement.clientHeight

        small.value = window.matchMedia('(max-width: 649px)').matches
        mouse.value = window.matchMedia('(hover: hover) and (pointer: fine)').matches

        cbs?.forEach((cb) => cb(ww.value, wh.value, small.value))

        // EMIT RESIZE FOR VANILLA
        events.emit(EVENTS.APP_RESIZE, { ww: ww.value, wh: wh.value, small: small.value })
    }, 50)

    o.value = new ResizeObserver(resize)
    o.value.observe(document.documentElement)

    resize()

    return {
        provide: {
            resize: {
                add(cb) {
                    cbs.add(cb)
                    cb(ww.value, wh.value, small.value)
                },
                remove(cb) {
                    cbs.delete(cb)
                },
                get ww() {
                    return ww.value
                },
                get wh() {
                    return wh.value
                },
                get small() {
                    return small.value
                },
                get mouse() {
                    return mouse.value
                },
                get bounds() {
                    return {
                        ww: ww.value,
                        wh: wh.value,
                    }
                }
            },
        }
    }
})
