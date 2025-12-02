# FOLGORE - Nuxt4 Starter with Lenis / Tailwind

It is what it is. You may like it or not, i don't care. 
This is still under development, subjected to changes.



## Pieces

- [x] ~~Tailwind~~

- [ ] Plugins
  -  [x] ~~Lenis / Scroll~~
  -  [x] ~~Resize~~
  -  [x] ~~Ticker~~
  -  [x] ~~Device~~
  
- [x] ~~Eslint~~

- [x] ~~Page transitions~~
  
  - [x] ~~Block pop state~~
  
- [ ] SEO

- [x] ~~Custom events~~

- [ ] YAML support

- [ ] Store / pinia?

  - [ ] useStaticStore / useReactiveStore
  - [ ] set debug by default
  
  

## Composables

- `useEvent`: bind/unbind events using the Event class
- `useTransitionType`: for page transitions, used in middleware
- `usePageTransitionEvent`: a shortcut for page transitions events (enter, leave etc)
- `useSeo`: seo customization x page



## Library Components

- `<LibraryImage />`: static images component, supports loading / decoding and more
- `<LibraryIntro />`: cover everything base logic



 ## Javascript helpers

- `Events`: an event bus class, for events. It supports `priority` so you can change the order of the callbacks
- `common`: includes some fancy reusable things



## TIPS

1. Apparently Tailwind4 is messing with Nuxt4 but everything is fixed if you run a `npm run generate` before starting. FOUC should be fixed in this way. (TBC, looks solved now).

   

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



