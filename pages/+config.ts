import vikeReact from 'vike-react/config'
import { Config } from 'vike/types'

import App from '#components/App'
import HeadDefault from '#pages/HeadDefault'

// Default configs (can be overridden by pages)
export default {
  Head: HeadDefault,
  Layout: App, // invoke the app component instead special layout
  // https://vike.dev/stream
  stream: true,
  // https://vike.dev/ssr - this line can be removed since `true` is the default
  ssr: true,
  // https://vike.dev/clientRouting
  clientRouting: true,
  // https://vike.dev/extends
  extends: vikeReact,
} satisfies Config
