<script setup>
import { EVENTS } from '@js/events'
const { $resize } = useNuxtApp()

const onResize = () => {
    document.documentElement.style.setProperty(
        '--vh', `${$resize.wh / 100}px`
    )
}

// EVENTS
useEvent(EVENTS.APP_RESIZE, onResize)
</script>

<template>
  <div>
    <LibraryIntro />
    <Header />
    <slot />
  </div>
</template>
