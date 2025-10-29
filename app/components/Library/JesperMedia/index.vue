<!-- NO READY TO USE -->

<template>
	<figure v-if="item" :class="classes">
		<div v-if="aspect && !outer" class="aspect-modern w-full" :style="`--aspect: ${ratio};`"/>
		<div v-if="background && !showVid" class="absolute inset-0 bg-purple"/>

        <video v-if="showVid" v-observe-vid :src="vid.mp4high || vid.mp4medium || vid.mp4low" muted loop playsinline class="z-2"/>

		<picture v-else ref="pic" class="absolute inset-0">
			<source
				v-if="!useThumb"
				:srcset="img.webpSrcSet || ''"
				:sizes="img.sizes || ''"
				type="image/webp"
			>
			<source
				v-if="!useThumb"
				:srcset="img.srcSet || ''"
				:sizes="img.sizes || ''"
				type="image/jpeg"
			>
			<img
				ref="imgEl"
				:src="useThumb ? vid.thumbnailUrl : img.src"
				:width="img.width"
				:height="img.height"
				:alt="img.alt"
				:title="img.title"
				:style="styles"
				:class="[loaded ? 'opacity-100' : 'opacity-0', 'transition-opacity duration-500 ease-out']"
				loading="lazy"
				decoding="async"
				draggable="false"
			>
		</picture>

		<slot/>
	</figure>
</template>

<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
    aspect: {
        type: [Number, Boolean],
        default: true,
    },
    background: {
        type: Boolean,
        default: true,
    },
    full: {
        type: Boolean,
        default: true,
    },
    outer: {
        type: Boolean,
        default: false,
    }
})

const { $device } = useNuxtApp()

const loaded = ref(false)
const pic = ref(null)
const imgEl = ref(null)

const vid = computed(() => props.item.video || null)
const img = computed(() => props.item.responsiveImage || {})
const showVid = computed(() => (vid.value?.mp4high || vid.value?.mp4medium || vid.value?.mp4low) && !$device.features.lowPowerMode)
const useThumb = computed(() => vid.value && !showVid.value)

const classes = computed(() => [
    'media-fill',
    !props.aspect || props.outer ? 'absolute inset-0' : props.full ? 'relative w-full' : 'relative'
])

const styles = computed(() => ({
    objectFit: 'cover',
    objectPosition: props.item.focalPoint
        ? `${props.item.focalPoint.x * 100}% ${props.item.focalPoint.y * 100}%`
        : 'center'
}))

const ratio = computed(() => {
    if (typeof props.aspect === 'number') return props.aspect
    if (props.aspect === false && !props.outer) return null

    if (showVid.value && vid.value.width && vid.value.height) {
        return vid.value.height / vid.value.width
    }

    if (useThumb.value && vid.value.width && vid.value.height) {
        return vid.value.height / vid.value.width
    }

    if (img.value?.aspectRatio) {
        return 1 / img.value.aspectRatio
    }

    if (props.item.width && props.item.height) {
        return props.item.height / props.item.width
    }

    return 0.5625 // 16:9 aspect ratio
})

onMounted(async() => {
    await nextTick()
    if (imgEl.value) {
        if (imgEl.value.complete) {
            loaded.value = true
        } else {
            imgEl.value.onload = () => loaded.value = true
        }
    }
})

defineExpose({
    ratio
})
</script>
