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

  // SEO
  site: {
    url: 'https://batcloud.art/',
    name: 'THE BAT CLOUD',
  },

  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1',
      // title: TITLE,
      meta:  [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'robots', content: 'index, follow' },
        // { name: 'description', content: DESCRIPTION },

        // { name: 'author', content: TITLE},
        { name: 'robots', content: 'index, follow' },

        // { name: 'twitter:creator', content: CREATOR },
        // { name: 'twitter:url', content: URL },

        // { property: 'og:title', content: TITLE},
        // // { property: 'og:site_name', content: TITLE},
        // { property: 'og:description', content: DESCRIPTION},
        { property: 'og:locale', content: 'en_gb' },
        { property: 'og:type', content: 'website' },
        // { property: 'og:url', content: URL},

        // { property: 'og:image', content: `${URL}/share.jpg` },
        // { property: 'og:image:secure_url', content: `${URL}/share.jpg` },
        // { property: 'og:image:type', content: 'image/jpeg' },
        // { property: 'og:image:width', content: '1200' },
        // { property: 'og:image:height', content: '630' },

        // { name: 'twitter:image', content: `${URL}/share.jpg` },
        // { name: 'twitter:card', content: 'summary_large_image' },

        // { name: 'theme-color', content: MAIN_COLOR },
        // { name: 'msapplication-TileColor', content: MAIN_COLOR },
      ],
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        // GENERATED USING https://realfavicongenerator.net/
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon-48x48.png' },
        { rel: 'icon', type: 'image/svg+xml', sizes: '16x16', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'manifest', href: '/site.webmanifest' },
        // { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: MAIN_COLOR },
      ],
    },
  },

  modules: [
    '@nuxtjs/sitemap',
    '@nuxt/eslint'
  ],

  eslint: {
    config: {
      stylistic: false // <---
    }
  },
  plugins: [
    { src: "~/plugins/disableScrollRestoration.js", mode: 'client' },
    { src: '~/plugins/gsap.js', mode: 'client' },
    { src: '~/plugins/resize.js', mode: 'client' },
    { src: '~/plugins/scroll.js', mode: 'client' },
    { src: '~/plugins/ticker.js', mode: 'client' },
    { src: '~/plugins/device.js', mode: 'client' },
  ]
})
