import { DetectUA } from "detect-ua"

export default defineNuxtPlugin(() => {
    const device = reactive({
        ...new DetectUA(),
        features: {
            hasMouse: false,
            hasWheelEvent: false,
            hasMouseWheelEvent: false,
            hasTouch: false,
            hasKeyDown: false,
            lowPowerMode: false,
            reducedMotion: false,
        },
    })

    const init = () => {
        device.features.hasMouse = !("ontouchstart" in window)
        device.features.hasWheelEvent = "onwheel" in document
        device.features.hasMouseWheelEvent = "onmousewheel" in document
        device.features.hasTouch = "ontouchstart" in window
        device.features.hasKeyDown = "onkeydown" in document
        device.features.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

        checkLowPowerMode()
    }

    const checkLowPowerMode = () => {
        const video = document.createElement("video")
        video.setAttribute("id", "test-video")
        video.setAttribute("muted", "")
        video.setAttribute("preload", "")
        video.setAttribute("loop", "")
        video.setAttribute("autoplay", "")
        video.setAttribute("playsinline", "")
        video.setAttribute("webkit-playsinline", "")

        const source = document.createElement("source")
        source.setAttribute("src", "data:video/mp4;base64,AAAAIGZ0eXBtcDQyAAACAGlwbDJpc28yYXZjMWlvNDEAAAM0bW9vdgAAAGxtdmhkAAAAAA5QnjgO0J4AAAD4AAAAEAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAAA0t0cmFrAAAAXHRyaGQAAAAD4D1CeQA5QnjgAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAABNpbWVkYXRhAAAAxWZtZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAAC1pbHN0AAAAJal0b28AAAAdZGF0YQAAAAEAAAAATGF2ZjU4LjQ1LjEwMA==")
        source.setAttribute("type", "video/mp4")
        video.appendChild(source)

        video.style.width = "0"
        video.style.height = "0"
        video.style.position = "absolute"
        video.style.top = "-9999px"

        document.body.appendChild(video)

        video.addEventListener("timeupdate", () => {
            device.features.lowPowerMode = video.playbackRate < 1

            video.remove()
        })
    }

    if (import.meta.client) {
        init()
        console.log("Device:", device)
    }

    return {
        provide: {
            device: readonly(device),
        },
    }
})
