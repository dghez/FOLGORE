<script setup>
// DEBUG
const { setIsDebug } = useStaticStore()
const route = useRoute()

const isDebug = !!route.query?.debug
setIsDebug(isDebug)
</script>

<template>
  <div class="app-wrapper">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
