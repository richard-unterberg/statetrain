import type { TransportConfigType } from "#lib/types"

export const APP_CONFIG = {
  // if you are using a cdn or a subdirectory, you can set it here accordingly
  viteUrl: `${
    import.meta.env.PROD ? "https://richard-unterberg.github.io" : "http://localhost:5247"
  }${import.meta.env.BASE_URL.slice(0, -1)}`,
  description: "Gain control of the tone.js transport in a modern routable typescript-react environment.",
}

export const TRANSPORT_CONFIG: TransportConfigType = {
  bpm: {
    default: 130,
    min: 60,
    max: 240,
  },
  loop: {
    default: true,
  },
  timeSignature: {
    default: 4,
    min: 2,
    max: 8,
  },
  loopLength: {
    default: 4,
    min: 1,
    max: 8,
  },
  isPlaying: false,
}
