
export class Emitter {
    constructor() {
        this.events = {}
    }

    emit(event, ...args) {
        const callbacks = this.events[event] || []
        for (let i = 0, { length } = callbacks; i < length; i++) {
            callbacks[i].cb(...args)
        }
    }

    on(event, cb, priority = 0) {

        if (!Object.values(EVENTS).includes(event)) {
            console.log(`The ${event} event doesn't exists on ${EVENTS}`)
            console.warn(`The ${event} event doesn't exists on ${EVENTS}`)
        }

        // Add the callback to the event's callback list, or create a new list with the callback
        const data = { cb, priority }
        this.events[event]?.push(data) || (this.events[event] = [data])
        this.events[event].sort((a, b) => a.priority - b.priority)

        // Return an unsubscribe function
        return () => {
            this.events[event] = this.events[event]?.filter((v) => cb !== v.cb)
        }
    }

    off(event, callback) {
        this.events[event] = this.events[event]?.filter(({ cb }) => callback !== cb)
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

