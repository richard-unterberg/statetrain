# statetrain 🚂🚃
## Gain control of Tone.js' transport with a routable React application.
### Written in [TypeScript](https://www.typescriptlang.org/), bundled with [Vite](https://vitejs.dev/).

For another project, I needed a routable TypeScript-React application with access to a shared [Tone.js](https://tonejs.github.io/) context. To test the code, I built a small metronome, which required a communication layer to and from the imperatively designed Tone.js library.

#### Features of this toolkit
- Register Tone.js on a user interaction and put it and its transport into a React context.
- Extensible custom hook to retrieve and control Tone-specific actions.
- Web audio portal.
- Schedule a synth metronome on the Tone.js transport and visualize it with a React component.
- Start/stop the global transport via context access.
- Set BPM (on the fly).
- Set time signature (this will stop the transport and recalculate the new tick times).
- Clean, extensible TypeScript code.
- Modern linting & pre-commit checks.

### Table of Contents

1. [Startup](#startup)
2. [A few words on the implementation](#tone)
    1. [React](#tone-react)
    2. [Vike](#tone-vike)
3. [Tone Portal](#tone-portal)
4. [The `useTone()` hook](#use-tone)
    1. [React context: `useInternalToneContext()`](#use-tone-internal-context)
    2. [Zustand: `useInternalTransportStore()`](#use-tone-internal-store)
    3. [Returned states and events](#use-tone-returns)
5. [Routing & Rendering: Vike / React](#vike)
    1. [Base URL](#vike-base)
    2. [Prerendering mode](#vike-ssg)
    3. [Page Context](#vike-page-context)
6. [Styling with Uno/Tailwind and TW Styled Components](#uno-tailwind)
7. [Icons: lucide-react](#lucide)
8. [Aliases](#aliases)
9. [Troubleshooting](#troubleshooting)
10. ["Roadmap"](#roadmap)

## <a id="startup"></a>Startup Process

1. Clone this repo.

2. Install dependencies:
  ```bash
  npm install or yarn
  ```

3. Run the development preview:
  ```bash
  npm run dev or yarn dev
  ```

4. Run the production preview:
  ```bash
  npm run prod or yarn prod
  ```

5. Build the production package:
  ```bash
  npm run build or yarn build
  ```

*TODO: add check/linter scripts*
## <a id="tone"></a>A few words on the implementation

[tone.js](https://tonejs.github.io/) is a JavaScript library that makes it easier to work with the low-level [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API). It provides its own [transport](https://github.com/Tonejs/Tone.js?tab=readme-ov-file#transport), where you can register and accurately schedule events with musical notations like `1m, 8n, etc`. Additionally, tone.js enables complex routing scenarios and audio bus systems to work with various audio sources.

### <a id="tone-react"></a>⚛️ The spicy part: React

Getting an imperative tool like tone.js to work with a modern declarative UI-library can be tricky, especially when it requires [explicit user actions](https://stackoverflow.com/questions/57289003/tone-js-the-audiocontext-was-not-allowed-to-start) to initialize browser API functions, load libraries, and maintain states. See [Tone Portal](#tone-portal) and [useTone()](#use-tone) for how this was achieved.

### <a id="tone-vike"></a>🔥 The hot part: Vike

I wanted to use page routing to extend the examples. While I could have used simpler libraries like react-router, I decided to go a step further and implement a fully capable SSR/SSG framework. In my opinion, the one and only is Vike ❤️

See more information on the local implementation of Vike [here](#vike).

## <a id="tone-portal"></a>The `<TonePortal>` interceptor portal

It needed some kind of "moderator" for AudioContext, and thus the `TonePortal` was born. It blocks on first page visit the page output, forcing user to click a button, which is linking to load, init tone and put it into the context.

See also [React context: `useInternalToneContext()`](#use-tone-internal-context)

## <a id="use-tone"></a>useTone() - a hook to control tone and global states

The `useTone()` hook is basically our middleware, covering various scenarios and designed to be extended and modified.

It's a good place to keep your actions separated from the rest of the React code. Simply use the hook to retrieve data and handlers to work with.

```tsx
const SomeComponent = () => {
  const { isPlaying, handlePlay, handleStop } = useTone()

  return (
    <div>
      <button onClick={() => isPlaying ? handleStop() : handlePlay()} type="button">
        {isPlaying ? 'Stop' : 'Play'}
      </button>
      <p>Something is {isPlaying ? 'playing' : 'stopped'}</p>
    </div>
  )
}
```

Under the hood it does:

```tsx
const useTone = () => {
  const { transport, ... } = useInternalToneContext()
  const { setIsPlaying, ... } = useInternalTransportStore()

  const handlePlay = useCallback(() => {
    transport?.start() // transport changed
    setIsPlaying(true) // store changed (mostly UI updates)
  }, [setIsPlaying, transport])

  const handleStop = useCallback(() => {
    transport?.stop() // transport changed
    setIsPlaying(false) // store changed (mostly UI updates)
  }, [setIsPlaying, transport])

  return {
    handlePlay,
    handleStop,
    ...
  }
}
```
#### <a id="use-tone-internal-context"></a>Okay, what is `useInternalToneContext()` doing?

It sets and retrieves the unserialized tone.js instance from a React context, which spans over the whole application and ensures tone.js is accessible before React components get access to it.

*Do not use `useInternalToneContext()` in your page templates - always use `useTone()`*

#### <a id="use-tone-internal-store"></a>Aha, and `useInternalTransportStore()`?

We use a [React context](https://react.dev/learn/passing-data-deeply-with-context) for utilizing one instance of tone.js and accessing its methods. It feels right that we want to maintain global serialized data provided within the context. Under the hood, [zustand](https://github.com/pmndrs/zustand) manages this for us.

*Do not use `useInternalTransportStore()` in your page templates - always use `useTone()`*

### <a id="use-tone-returns"></a>`useTone()` returns the following states and actions

#### Callbacks
- `handlePlay` - starts the transport
- `handleStop` - stops the transport and resets progress
- `handleChangeBpm` - changes the playback BPM of the transport
- `handleChangeTimeSignature` - changes the time signature of the transport (this will stop the transport by design)

#### States
- `tone` - tone instance
- `transport` - transport of `tone`
- `bpm` - BPM of the transport
- `timeSignature` - time signature of the transport
- `loopLength` - count of measures before restart
- `isPlaying` - play state of the transport

#### Setters
- `setMetronome` - clear and reset context metronome
- `setTone` - set context tone instance (should be only set up once)
- `setTransport` - set context transport instance (should be only set up once)

## <a id="vike"></a>Routing & Rendering: vike / vike-react

With [vike](https://vike.dev/), which is built on top of the Vite bundler, we can activate modern JavaScript features like SSG, SPA, SSR, and/or client-side page routing within the same framework. Similar to [next.js](https://nextjs.org/), but more flexible and not bound to React. Thanks to its design, you can easily adapt it to your workflow.

This application uses the [vike-react](https://vike.dev/vike-react) plugin on top of vike.

### <a id="vike-base"></a>Base URL

For absolute references bypassing vike's page routing system, I created the `APP_CONFIG.viteUrl` to guarantee access to the full URL from the page root and any given `base`.

In `vite.config.js`, you can set the `base`, which appends this to the URL. In our case, it's `'/statetrain/'`.

If you only need to output the base URL, you can use the Vite environment variable `${import.meta.env.BASE_URL}`.

### <a id="vike-ssg"></a>Prerendering mode is active (SSG)

To publish to GitHub Pages, the page is built on the server and delivered [prerendered](https://vike.dev/pre-rendering) to the client. To change that on your local machine, you can go to `vite.config.ts` and activate rendering on the server (SSR).

```ts
// ./vite.config.ts
plugins: [
    ...SomePlugin,
    react(),
    vike({
      prerender: true, // set to false / remove to enable ssr
    }),
  ],
```

See the full ``vite.config.ts`` here (TODO: link to repo)

SSR users: [See this implementation guide](https://vike.dev/add)

#### <a id="vike-page-context"></a>Vike Page context - Current route

If you need the currently routed url, you can use the usePageContext provided by [vike-react](https://vike.dev/vike-react):

```ts
const pageContext = usePageContext()
const { urlPathname } = pageContext
```

## <a id="lucide"></a>Icons: Lucide React

This application uses the [lucide-react](https://lucide.dev/guide/packages/lucide-react) bundle from the [Lucide Icon Pack](https://lucide.dev/)

See [all icons](https://lucide.dev/icons/)

## <a id="uno-tailwind"></a>Styling with Uno/Tailwind and TW Styled Components

This application uses [uno.css](https://unocss.dev/) for more scalability and custom presets. The [tailwind-preset](https://unocss.dev/presets/wind) is active by default, which means you can rely on the classic Tailwind CSS syntax.

To reduce "className-cluttering," we use [tailwind-styled-components](https://github.com/MathiasGilson/tailwind-styled-component).

For example, a simple button:

```ts
const SimpleButton = tw.button`
  p-2
  bg-darkLight
  border-darkLightBorder
  border-1
  rounded
`
```

the properties from the used element are provided. for example getting auto-suggestion and passing ``tw.button``'s type attribute
```tsx
<SimpleButton type="button" onClick={someHandler}>Some Text</SimpleButton>
```

conditional styles in action.

```tsx
interface LayoutTwProps {
  $fullWidth?: boolean // use $ to not pass it to the actual DOM element
}

export default tw.div<LayoutTwProps>`
  m-auto
  ${p => (p.$fullWidth ? 'w-full' : 'container max-w-screen-lg')}
  px-4
  px-lg-0
`
```

See the full uno.config.ts (TODO: link to repo)

## <a id="aliases"></a>Aliases

You will see this absolute import references all over the place. These should be automatically detected when auto-importing via your IDE:

```ts
import Something from '#components/Something'
```

### Revisit & Change Aliases

We must set and keep it in sync for vite (``vite.config.ts``) and your IDE (``tsconfig.json``)

``vite.config.ts``:
```ts
...viteConfig,
resolve: {
  alias: {
    '#pages': path.resolve(__dirname, './pages/'),
    '#components': path.resolve(__dirname, './components/'),
    '#lib': path.resolve(__dirname, './lib/'),
    ...
  },
},
  ```

``tsconfig.json``:
```json
...tsConfig,
"paths": {
  "#pages/*": ["pages/*"],
  "#components/*": ["./components/*"],
  "#lib/*": ["./lib/*"],
}
```

## <a id="troubleshooting"></a>Troubleshooting

### Events must be cleared!

I encountered issues with improperly unregistering events in React. We **must** clear the event from the transport to avoid overlapping sounds or timing mishaps.

### Register a React ref for every event you schedule

As the [docs suggest](https://github.com/Tonejs/Tone.js/wiki/Using-Tone.js-with-React-React-Typescript-or-Vue), one basic way to properly access registered events with React is to store them as refs, which essentially "unbinds" them from React state updates.

```ts
const tickEventId = useRef<number | undefined>()
```

All registered tone.js events return a `number`, which is the ID of the event in the internal transport.


This example clears and sets a state change on every quarter note of the transport

```tsx
const tickEventId = useRef<number | undefined>()

const registerTickEvent = useCallback(() => {
  // important: do the explicit !== undefined check, because eventID can be 0 ;)
  if (tickEventId.current !== undefined) {
    tone?.getDraw().cancel() // this clears all "draw" events
    transport?.clear(tickEventId.current) // here the actual schedule is cleared
  }

  // see time - this is important to use for precision
  const tick = transport?.scheduleRepeat(time => {
    // getDraw() commonly used to draw state updates synced with nearest animation frame
    tone?.getDraw()?.schedule(() => {
      handleTick()
    }, time)
  }, '4n')
  tickEventId.current = tick // set new returned id
  setCurrentPosition(transportLength) // reset
}, [...deps])
```

**By design, tone.js does not recalculate timings internally if something changes in the transport's time.** For example, if you change the time signature (thus altering loop timing), you need to manually apply the `transport.loopEnd` afterwards, if it differs from tone's defaults, to properly recalculate the tick times.

Additionally, we must clear all events on the transport and re-register them if timing changes. At least for now! I am currently working on an event bus where all events will be automatically re-registered after timing or other changes.

## <a id="roadmap"></a>Roadmap / Todos:

- more documentation (linting, pre-commit, types)
- Template the existing pages and add more tone.js controls and visuals
- Create an effect bus and display it on one of these pages
- Create event bus, where events are automatically re-scheduled after transport time has changed
- Add UI to clear metronome events


