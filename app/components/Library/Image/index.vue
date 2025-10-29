<template>
    <figure>
        <slot/>
        <img
            ref="image"
            :src="src"
            :alt="alt"
            :class="loaded ? 'transition-opacity duration-500 ease-out opacity-100' : 'opacity-0'"
            :loading="eager ? 'eager' : 'lazy'"
            draggable="false"
            decoding="async"
        >
    </figure>
</template>

<script setup>
const props = defineProps({
    src: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        default: ''
    },
    eager: {
        type: Boolean,
        default: false
    }
})

const image = ref(null)
const loaded = ref(false)

onMounted(async() => {
    await nextTick()

    if (image.value) {
        if (image.value.complete) {
            loaded.value = true
        } else {
            image.value.onload = () => loaded.value = true
        }
    }
})
</script>
