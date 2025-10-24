// Selectors
export const qs = (s, o = document) => o.querySelector(s)
export const qsa = (s, o = document) => [...o.querySelectorAll(s)]

// Get vars
export const getCssVar = (key, scope = document.documentElement) => {
    return getComputedStyle(scope).getPropertyValue(key)
}

// Get rects
export const rect = (el) => el.getBoundingClientRect()

// Clamp
export const clamp = (min, max, value) => Math.min(Math.max(value, min), max)

// Randomize
export const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

// Preload vid
export const preload = (el, cb) => {
    if (el.readyState >= 2) {
        cb()
    } else {
        el.addEventListener('canplay', cb, { once: true })
        el.addEventListener('error', cb, { once: true })
    }
}

export const diagonal = (w, h) => Math.sqrt(w * w + h * h)

/**
 * Distance between two points
 *
 * @param x1 X coord of the first point
 * @param y1 Y coord of the first point
 * @param x2 X coord of the second point
 * @param y2 Y coord of the second point
 * @returns Computed distance
 */
export const distance = (x1, y1, x2, y2) => diagonal(x1 - x2, y1 - y2)
