import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },

  // TAILWIND
  css: ['@/assets/css/main.css'],
  vite: {
    resolve:{
      alias:{ // add those in tsconfig.json too, be smart
        '@js': '@/assets/js',
      }
    },
    plugins: [
      tailwindcss(),
    ],
  },

  nitro: {
    prerender: {
      crawlLinks: true,
    }
  },

  modules: ['@nuxt/eslint'],
  eslint: {
    config: {
      stylistic: false // <---
    }
  },
  plugins: [
    { src: '~/plugins/gsap.client.js' },
    { src: '~/plugins/resize.client.js' },
    { src: '~/plugins/scroll.client.js' },
  ]
})
