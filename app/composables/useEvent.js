import { onMounted, onUnmounted } from 'vue'
import events, { PRIORITY } from '@js/events'

export const useEvent = (event, cb, priority = PRIORITY.INSTANT) => {
  onMounted(() => {
    events.on(event, cb, priority)
  })

  onUnmounted(() => {
    events.off(event, cb)
  })
}
