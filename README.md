# FOLGORE - Nuxt4 Starter

It is what it is. You may like it or not, i don't care.



## Pieces

- [x] ~~Tailwind~~

- [ ] Plugins
  -  [x] ~~Lenis / Scroll~~
  -  [x] ~~Resize~~
  
- [x] ~~Eslint~~

- [x] ~~Page transitions~~
  
  - [x] ~~Block pop state~~
  
- [ ] SEO

- [x] ~~Custom events~~

- [ ] YAML support

- [ ] Store / pinia?

  

## Helpers

- `useEvent`: bind/unbind events
- `useTransitionType`: for page transitions, used in middleware
- `usePageTransitionEvent`: a shortcut for page transitions events



## Library

- `<LibraryImage />`: static images component, supports loading / decoding and more
- `<LibraryIntro />`: cover everything base logic

 

## TIPS

1. Apparently Tailwind4 is messing with Nuxt4 but everything is fixed if you run a `npm run generate` before starting. FOUC should be fixed in this way.

   

## Setup

Make sure to install dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run generate

```

Locally preview production build:

```bash
# npm
npm run preview

```

---



