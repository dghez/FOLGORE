
export default class Emitter {
    constructor() {
        this.events = {}
    }

    emit(event, ...args) {
        const callbacks = this.events[event] || []
        for (let i = 0, { length } = callbacks; i < length; i++) {
            callbacks[i].cb.apply(callbacks[i].context, [...args])
        }
    }

    on(event, cb, context = null, priority = 0) {
        // Add the callback to the event's callback list, or create a new list with the callback
        const data = { cb, priority, context }
        this.events[event]?.push(data) || (this.events[event] = [data])
        this.events[event].sort((a, b) => a.priority - b.priority)

        // Return an unsubscribe function
        return () => {
            this.events[event] = this.events[event]?.filter((v) => cb !== v.cb)
        }
    }

    off(event, cb) {
        this.events[event] = this.events[event]?.filter((v) => cb !== v.cb)
    }

    once(event, cb, priority = 0) {
        const onceCallback = (...args) => {
            cb(...args)
            this.off(event, onceCallback)
        }

        this.on(event, onceCallback, priority)

        return () => {
            this.off(event, cb)
        }
    }

    destroy() {
        this.events = {}
    }
}
