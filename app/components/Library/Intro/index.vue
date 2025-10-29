<script setup>
import { gsap } from 'gsap'

const el = ref(null)
onMounted(async() => {
    await document.fonts.ready
    gsap.to(el.value, { duration: 0.1, autoAlpha: 0 })

})
</script>

<template>
  <div ref=el class="fixed inset-0 bg-black z-100"/>
</template>
